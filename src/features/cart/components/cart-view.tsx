"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import { Minus, Package, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/constants/route";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  removeItem,
  selectCartHasHydrated,
  selectCartItems,
  selectCartTotalPrice,
  updateQuantity,
} from "@/store/cart.slice";

export default function CartView() {
  const hasHydrated = useAppSelector(selectCartHasHydrated);
  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const dispatch = useAppDispatch();

  const handleCheckout = () => {
    toast.info("Le passage de commande arrive bientôt !");
  };

  if (!hasHydrated) {
    return (
      <div className="container mx-auto px-4 py-12 md:px-6">
        <Skeleton className="mb-8 h-9 w-56" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-24 text-center md:px-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
          <ShoppingBag className="h-8 w-8 text-pink-500" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-gray-900">
          Votre panier est vide
        </h1>
        <p className="mt-2 max-w-md text-gray-600">
          Parcourez notre catalogue et ajoutez des produits à votre panier.
        </p>
        <Button asChild className="mt-6 bg-pink-600 hover:bg-pink-700">
          <Link href={ROUTES.PRODUCTS_LIST}>Découvrir nos produits</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 pb-32 md:px-6 lg:pb-12">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Mon panier
      </h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="divide-y lg:col-span-2">
          {items.map((item) => (
            <div key={item.productId} className="flex items-center gap-4 py-4">
              <Link
                href={ROUTES.PRODUCT_DETAIL(item.productId)}
                className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-50"
              >
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-200 to-pink-100">
                    <Package className="h-8 w-8 text-pink-400" />
                  </div>
                )}
              </Link>

              <div className="min-w-0 flex-1">
                <Link
                  href={ROUTES.PRODUCT_DETAIL(item.productId)}
                  className="line-clamp-2 font-semibold text-gray-900 hover:underline"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-sm text-gray-500">
                  {item.price.toFixed(2)} €
                </p>
              </div>

              <div className="flex shrink-0 items-center rounded-lg border">
                <button
                  type="button"
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        productId: item.productId,
                        quantity: item.quantity - 1,
                      }),
                    )
                  }
                  disabled={item.quantity <= 1}
                  className="flex h-9 w-9 items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Diminuer la quantité"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        productId: item.productId,
                        quantity: item.quantity + 1,
                      }),
                    )
                  }
                  disabled={item.quantity >= item.stock}
                  className="flex h-9 w-9 items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Augmenter la quantité"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => dispatch(removeItem(item.productId))}
                aria-label="Supprimer l'article"
                className="shrink-0 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="hidden lg:col-span-1 lg:block">
          <div className="sticky top-24 rounded-2xl border bg-gray-50 p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Récapitulatif
            </h2>
            <div className="mt-4 flex items-center justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>{totalPrice.toFixed(2)} €</span>
            </div>
            <Button
              type="button"
              onClick={handleCheckout}
              className="mt-6 w-full bg-pink-600 hover:bg-pink-700"
              size="lg"
            >
              Passer la commande
            </Button>
            <Link
              href={ROUTES.PRODUCTS_LIST}
              className="mt-4 block text-center text-sm text-gray-600 hover:text-gray-900"
            >
              Continuer mes achats
            </Link>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t bg-white p-4 lg:hidden">
        <div className="mb-3 flex items-center justify-between font-bold text-gray-900">
          <span>Total</span>
          <span>{totalPrice.toFixed(2)} €</span>
        </div>
        <Button
          type="button"
          onClick={handleCheckout}
          className="w-full bg-pink-600 hover:bg-pink-700"
          size="lg"
        >
          Passer la commande
        </Button>
      </div>
    </div>
  );
}
