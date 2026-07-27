"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Loader2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ROUTES } from "@/constants/route";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearCart,
  selectCartHasHydrated,
  selectCartItems,
  selectCartTotalPrice,
} from "@/store/cart.slice";
import { createOrderAction } from "@/features/orders/actions/order.actions";
import {
  checkoutSchema,
  CheckoutFormValues,
} from "@/features/orders/schemas/order-schema";

interface CheckoutFormProps {
  defaultAddress: string;
}

export default function CheckoutForm({ defaultAddress }: CheckoutFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const hasHydrated = useAppSelector(selectCartHasHydrated);
  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { shippingAddress: defaultAddress ?? "" },
  });

  useEffect(() => {
    if (hasHydrated && items.length === 0) {
      router.push(ROUTES.CART);
    }
  }, [hasHydrated, items.length, router]);

  const onSubmit = async (values: CheckoutFormValues) => {
    const result = await createOrderAction({
      shippingAddress: values.shippingAddress,
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    });

    if (result.success) {
      dispatch(clearCart());
      toast.success("Commande passée avec succès !");
      router.push(ROUTES.ORDER_CONFIRMATION(result.order.id));
    } else {
      toast.error(result.error || "Une erreur est survenue");
    }
  };

  if (!hasHydrated || items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 md:px-6">
        <Skeleton className="mb-8 h-9 w-56" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <Skeleton className="h-64 rounded-2xl lg:col-span-2" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Finaliser ma commande
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-10 lg:grid-cols-3"
        >
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border bg-gray-50 p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Adresse de livraison
              </h2>
              <FormField
                control={form.control}
                name="shippingAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Adresse</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Numéro, rue, ville, code postal..."
                        {...field}
                        className="min-h-[120px] bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border bg-gray-50 p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Récapitulatif
              </h2>

              <div className="mt-4 divide-y">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-3 py-3"
                  >
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      {item.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-200 to-pink-100">
                          <Package className="h-5 w-5 text-pink-400" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-sm font-medium text-gray-900">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qté {item.quantity}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-gray-900">
                      {(item.price * item.quantity).toFixed(2)} €
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t pt-4 text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>{totalPrice.toFixed(2)} €</span>
              </div>

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="mt-6 w-full gap-2 bg-pink-600 hover:bg-pink-700"
                size="lg"
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                Confirmer la commande
              </Button>

              <Link
                href={ROUTES.CART}
                className="mt-4 block text-center text-sm text-gray-600 hover:text-gray-900"
              >
                Retour au panier
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
