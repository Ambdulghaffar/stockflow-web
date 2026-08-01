import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import DashboardPageContainer from "@/components/dashboard/dashboard-page-container";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ROUTES } from "@/constants/route";
import { formatDate } from "@/utils/format-date";
import { getSupplierOrderById } from "@/features/suppliers/services/supplier-order.services";
import SupplierOrderStatusSelect from "@/features/suppliers/components/supplier-order-status-select";

interface SupplierOrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function SupplierOrderDetailPage({ params }: SupplierOrderDetailPageProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    notFound();
  }

  const order = await getSupplierOrderById(numericId);
  if (!order) notFound();

  return (
    <DashboardPageContainer breadcrumbValues={{ [id]: `Commande fournisseur #${order.id}` }}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Commande fournisseur #{order.id}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Fournisseur {order.supplierName} · Créée le {formatDate(order.createdAt)}
          </p>
        </div>
        <SupplierOrderStatusSelect orderId={order.id} currentStatus={order.status} />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border bg-gray-50 p-6">
          <h2 className="text-sm font-medium text-gray-700">Fournisseur</h2>
          <p className="mt-1 text-gray-900">{order.supplierName}</p>
        </div>
        <div className="rounded-2xl border bg-gray-50 p-6">
          <h2 className="text-sm font-medium text-gray-700">Date de création</h2>
          <p className="mt-1 text-gray-900">{formatDate(order.createdAt)}</p>
        </div>
      </div>

      <div className="rounded-2xl border bg-gray-50 p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Articles</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produit</TableHead>
              <TableHead>Coût unitaire</TableHead>
              <TableHead>Quantité</TableHead>
              <TableHead>Sous-total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((item) => (
              <TableRow key={item.productId}>
                <TableCell className="font-medium">{item.productName}</TableCell>
                <TableCell>{item.unitCost.toFixed(2)} €</TableCell>
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
        <Link href={ROUTES.DASHBOARD_SUPPLIERS_ORDERS}>
          <ArrowLeft className="h-4 w-4" />
          Retour aux commandes fournisseurs
        </Link>
      </Button>
    </DashboardPageContainer>
  );
}