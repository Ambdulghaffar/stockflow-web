"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { ProductStatus } from "@/features/products/types/product.types";
import { useAppDispatch } from "@/store/hooks";
import { addItem } from "@/store/cart.slice";

interface ProductDetailActionsProps {
  status: ProductStatus;
  productId: number;
  name: string;
  price: number;
  imageUrl: string | null;
  stock: number;
}

export default function ProductDetailActions({
  status,
  productId,
  name,
  price,
  imageUrl,
  stock,
}: ProductDetailActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const isOutOfStock = status === "OUT_OF_STOCK";
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addItem({ productId, name, price, imageUrl, stock, quantity }));
    toast.success(`${quantity} × ${name} ajouté(s) au panier !`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Quantité</span>
        <div className="flex items-center rounded-lg border">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={isOutOfStock}
            className="flex h-9 w-9 items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Diminuer la quantité"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center text-sm font-medium">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
            disabled={isOutOfStock}
            className="flex h-9 w-9 items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Augmenter la quantité"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Button
        type="button"
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className="w-full gap-2 bg-pink-600 hover:bg-pink-700"
        size="lg"
      >
        <ShoppingBag className="h-4 w-4" />
        {isOutOfStock ? "Indisponible" : "Ajouter au panier"}
      </Button>
    </div>
  );
}
