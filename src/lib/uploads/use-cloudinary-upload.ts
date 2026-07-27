"use client";

import { useState } from "react";
import { getUploadSignatureAction } from "./upload.actions";

interface UseCloudinaryUploadReturn {
  upload: (file: File) => Promise<string>;
  isUploading: boolean;
}

export function useCloudinaryUpload(folder: string): UseCloudinaryUploadReturn {
  const [isUploading, setIsUploading] = useState(false);

  const upload = async (file: File): Promise<string> => {
    setIsUploading(true);
    try {
      const signatureResult = await getUploadSignatureAction(folder);
      if (!signatureResult.success) {
        throw new Error(signatureResult.error);
      }
      const { signature, timestamp, apiKey, folder: signedFolder } = signatureResult.data;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", String(timestamp));
      formData.append("signature", signature);
      formData.append("folder", signedFolder);

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData },
      );

      if (!response.ok) {
        throw new Error("Échec de l'envoi de l'image.");
      }

      const data = await response.json();
      return data.secure_url as string;
    } finally {
      setIsUploading(false);
    }
  };

  return { upload, isUploading };
}
