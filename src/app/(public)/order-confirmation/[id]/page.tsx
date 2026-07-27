import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";
import { getMyOrderById } from "@/features/orders/services/order.services";

interface OrderConfirmationPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderConfirmationPage({
  params,
}: OrderConfirmationPageProps) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) notFound();

  const order = await getMyOrderById(numericId);
  if (!order) notFound();

  return (
    <div className="container mx-auto px-4 py-16 md:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-9 w-9 text-emerald-600" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Commande confirmée !
        </h1>
        <p className="mt-2 text-gray-600">
          Votre commande{" "}
          <span className="font-semibold text-gray-900">#{order.id}</span> a
          bien été enregistrée.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl rounded-2xl border bg-gray-50 p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Récapitulatif de la commande
        </h2>

        <div className="mt-4 divide-y">
          {order.items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between py-3 text-sm"
            >
              <div>
                <p className="font-medium text-gray-900">{item.productName}</p>
                <p className="text-gray-500">
                  {item.quantity} × {item.unitPrice.toFixed(2)} €
                </p>
              </div>
              <span className="font-semibold text-gray-900">
                {item.subtotal.toFixed(2)} €
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t pt-4 text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>{order.totalAmount.toFixed(2)} €</span>
        </div>

        <div className="mt-4 border-t pt-4">
          <p className="text-sm font-medium text-gray-700">
            Adresse de livraison
          </p>
          <p className="mt-1 text-sm text-gray-600">
            {order.shippingAddress}
          </p>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild className="bg-pink-600 hover:bg-pink-700">
          <Link href={ROUTES.DASHBOARD_ACCOUNT_ORDER_DETAIL(order.id)}>
            Voir mes commandes
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={ROUTES.PRODUCTS_LIST}>Continuer mes achats</Link>
        </Button>
      </div>
    </div>
  );
}
