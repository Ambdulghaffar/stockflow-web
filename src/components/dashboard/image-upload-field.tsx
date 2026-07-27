"use client";

import { useRef } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { useCloudinaryUpload } from "@/lib/uploads/use-cloudinary-upload";

interface ImageUploadFieldProps {
  currentImageUrl?: string | null;
  onUploadSuccess: (url: string) => void;
  folder: string;
  label?: string;
}

export default function ImageUploadField({
  currentImageUrl,
  onUploadSuccess,
  folder,
  label = "Cliquez pour ajouter une image",
}: ImageUploadFieldProps) {
  const { upload, isUploading } = useCloudinaryUpload(folder);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
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

  const handleClick = () => {
    if (isUploading) return;
    inputRef.current?.click();
  };

  return (
    <div
      role="button"
      tabIndex={isUploading ? -1 : 0}
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleClick();
        }
      }}
      className={`relative aspect-video w-full max-w-xs overflow-hidden rounded-xl border-2 border-dashed border-pink-200 transition-colors ${
        isUploading
          ? "pointer-events-none cursor-not-allowed"
          : "cursor-pointer hover:border-pink-300"
      }`}
    >
      {currentImageUrl ? (
        // Cloudinary n'est pas un domaine configuré dans next.config.ts (images.remotePatterns),
        // donc <img> natif plutôt que next/image ici.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={currentImageUrl}
          alt={label}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-pink-50/40 px-4 text-center">
          <ImagePlus className="h-8 w-8 text-pink-300" strokeWidth={1.5} />
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      )}

      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <Loader2 className="h-6 w-6 animate-spin text-white" />
        </div>
      )}

      {currentImageUrl && !isUploading && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white hover:bg-black/60 hover:text-white"
        >
          Changer l&apos;image
        </Button>
      )}

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
