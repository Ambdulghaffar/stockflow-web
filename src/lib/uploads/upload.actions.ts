"use server";

import { getUploadSignature } from "./upload.services";
import { UploadSignatureRespDto } from "./upload.types";
import { ApiError } from "@/types/api.types";

export async function getUploadSignatureAction(
  folder: string,
): Promise<
  | { success: true; data: UploadSignatureRespDto }
  | { success: false; error: string }
> {
  try {
    const data = await getUploadSignature(folder);
    return { success: true, data };
  } catch (error) {
    console.error("Error getting upload signature:", error);
    return {
      success: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Erreur lors de la préparation de l'upload",
    };
  }
}
