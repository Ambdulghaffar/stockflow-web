"use client";

import { useRef } from "react";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCloudinaryUpload } from "@/lib/uploads/use-cloudinary-upload";

interface AvatarUploaderProps {
  currentImageUrl?: string | null;
  fallbackText: string;
  onUploadSuccess: (url: string) => void;
  folder?: string;
}

export default function AvatarUploader({
  currentImageUrl,
  fallbackText,
  onUploadSuccess,
  folder = "avatars",
}: AvatarUploaderProps) {
  const { upload, isUploading } = useCloudinaryUpload(folder);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      const url = await upload(file);
      onUploadSuccess(url);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erreur lors de l'envoi de l'image.",
      );
    }
  };

  return (
    <div className="relative inline-flex h-20 w-20 shrink-0">
      <Avatar className="h-20 w-20">
        <AvatarImage src={currentImageUrl ?? ""} alt={fallbackText} />
        <AvatarFallback className="text-xl">{fallbackText}</AvatarFallback>
      </Avatar>

      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
          <Loader2 className="h-6 w-6 animate-spin text-white" />
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
        aria-label="Changer la photo de profil"
        className="absolute right-0 bottom-0 flex h-7 w-7 items-center justify-center rounded-full bg-pink-500 text-white shadow-md ring-2 ring-white transition-colors hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Camera className="h-3.5 w-3.5" />
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
