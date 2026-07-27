import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import SidebarBreadcrumb from "@/components/dashboard/sidebar-breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/route";
import { formatDate } from "@/utils/format-date";
import { getMyOrderById } from "@/features/orders/services/order.services";
import {
  ORDER_STATUS_BADGE_CLASSES,
  ORDER_STATUS_LABELS,
} from "@/features/orders/constants/order-status";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) notFound();

  const order = await getMyOrderById(numericId);
  if (!order) notFound();

  return (
    <div className="space-y-8">
      <SidebarBreadcrumb values={{ [id]: `Commande #${order.id}` }} />

      <div className="flex flex-wrap items-center justify-between gap-4 mx-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Commande #{order.id}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Passée le {formatDate(order.createdAt)}
          </p>
        </div>
        <Badge className={ORDER_STATUS_BADGE_CLASSES[order.status]}>
          {ORDER_STATUS_LABELS[order.status]}
        </Badge>
      </div>

      <div className="rounded-2xl border bg-gray-50 p-6">
        <h2 className="text-sm font-medium text-gray-700">
          Adresse de livraison
        </h2>
        <p className="mt-1 text-gray-900">{order.shippingAddress}</p>
      </div>

      <div className="rounded-2xl border bg-gray-50 p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Articles</h2>
        <div className="divide-y">
          {order.items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between py-4"
            >
              <div>
                <p className="font-medium text-gray-900">
                  {item.productName}
                </p>
                <p className="text-sm text-gray-500">
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
      </div>

      <Button asChild variant="outline" className="gap-2">
        <Link href={ROUTES.DASHBOARD_ACCOUNT_ORDERS}>
          <ArrowLeft className="h-4 w-4" />
          Retour à mes commandes
        </Link>
      </Button>
    </div>
  );
}
