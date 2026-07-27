"use client";

import Link from "next/link";
import { Package, ShoppingBag } from "lucide-react";
import { toast } from "react-toastify";
import { ROUTES } from "@/constants/route";
import { ProductResDto } from "@/features/products/types/product.types";
import WishlistButton from "@/components/shop/wishlist-button";
import { useAppDispatch } from "@/store/hooks";
import { addItem } from "@/store/cart.slice";

type ProductCardProps = Pick<
  ProductResDto,
  "id" | "name" | "categoryName" | "price" | "imageUrl" | "status" | "stock"
>;

export default function ProductCard({
  id,
  name,
  categoryName,
  price,
  imageUrl,
  status,
  stock,
}: ProductCardProps) {
  const isOutOfStock = status === "OUT_OF_STOCK";
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItem({ productId: id, name, price, imageUrl, stock }));
    toast.success(`${name} ajouté au panier !`);
  };

  return (
    <Link
      href={ROUTES.PRODUCT_DETAIL(id)}
      className="group block overflow-hidden rounded-2xl bg-gray-50"
    >
      <div className="relative aspect-square overflow-hidden">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={name}
            className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              isOutOfStock ? "opacity-70" : ""
            }`}
          />
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-200 to-pink-100 ${
              isOutOfStock ? "opacity-70" : ""
            }`}
          >
            <Package className="h-12 w-12 text-pink-400" />
          </div>
        )}

        {isOutOfStock && (
          <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">
            Rupture de stock
          </span>
        )}

        <WishlistButton className="absolute right-3 top-3" />
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-500">{categoryName}</p>
        <h3 className="mt-1 line-clamp-2 font-semibold text-gray-900">{name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            {price.toFixed(2)} €
          </span>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            aria-label="Ajouter au panier"
            className="flex h-9 w-9 items-center justify-center rounded-full border bg-white shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingBag className="h-4 w-4 text-gray-700" />
          </button>
        </div>
      </div>
    </Link>
  );
}
