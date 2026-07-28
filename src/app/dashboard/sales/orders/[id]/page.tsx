import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import SidebarBreadcrumb from "@/components/dashboard/sidebar-breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ROUTES } from "@/constants/route";
import { formatDate } from "@/utils/format-date";
import { getOrderById } from "@/features/orders/services/order.services";
import OrderStatusSelect from "@/features/orders/components/order-status-select";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) notFound();

  const order = await getOrderById(numericId);
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
        <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border bg-gray-50 p-6">
          <h2 className="text-sm font-medium text-gray-700">Client</h2>
          <p className="mt-1 text-gray-900">{order.customerUsername}</p>
        </div>
        <div className="rounded-2xl border bg-gray-50 p-6">
          <h2 className="text-sm font-medium text-gray-700">
            Adresse de livraison
          </h2>
          <p className="mt-1 text-gray-900">{order.shippingAddress}</p>
        </div>
      </div>

      <div className="rounded-2xl border bg-gray-50 p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Articles</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produit</TableHead>
              <TableHead>Prix unitaire</TableHead>
              <TableHead>Quantité</TableHead>
              <TableHead>Sous-total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((item) => (
              <TableRow key={item.productId}>
                <TableCell className="font-medium">
                  {item.productName}
                </TableCell>
                <TableCell>{item.unitPrice.toFixed(2)} €</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.subtotal.toFixed(2)} €</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 flex items-center justify-between border-t pt-4 text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>{order.totalAmount.toFixed(2)} €</span>
        </div>
      </div>

      <Button asChild variant="outline" className="gap-2">
        <Link href={ROUTES.DASHBOARD_SALES_ORDERS}>
          <ArrowLeft className="h-4 w-4" />
          Retour aux commandes
        </Link>
      </Button>
    </div>
  );
}
