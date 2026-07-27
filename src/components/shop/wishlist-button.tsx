"use client";

import { Heart } from "lucide-react";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  className?: string;
}

export default function WishlistButton({ className }: WishlistButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.info("La liste de souhaits arrive bientôt !");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Ajouter à la liste de souhaits"
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm",
        className,
      )}
    >
      <Heart className="h-[18px] w-[18px] text-gray-700" />
    </button>
  );
}
