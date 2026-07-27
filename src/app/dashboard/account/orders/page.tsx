import Link from "next/link";
import { Receipt } from "lucide-react";
import SidebarBreadcrumb from "@/components/dashboard/sidebar-breadcrumb";
import { Button } from "@/components/ui/button";
import DataTablePagination from "@/components/dashboard/data-table-pagination";
import OrderListItem from "@/features/orders/components/order-list-item";
import { getMyOrders } from "@/features/orders/services/order.services";
import { getPageNumbers } from "@/utils/pagination";
import { ROUTES } from "@/constants/route";

interface AccountOrdersPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AccountOrdersPage({
  searchParams,
}: AccountOrdersPageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 0;

  const orders = await getMyOrders(currentPage, 10);

  const buildPageUrl = (targetPage: number) =>
    `${ROUTES.DASHBOARD_ACCOUNT_ORDERS}?page=${targetPage}`;

  return (
    <div className="space-y-8">
      <SidebarBreadcrumb />

      <div className="mx-5">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Mes commandes
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Consultez l&apos;historique et le statut de vos commandes.
        </p>
      </div>

      {orders.content.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-pink-100 bg-gradient-to-br from-white via-pink-50/60 to-white py-24 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg shadow-pink-500/30 ring-4 ring-white">
            <Receipt className="h-8 w-8 text-white" strokeWidth={2} />
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              Vous n&apos;avez pas encore passé de commande
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Découvrez notre catalogue et passez votre première commande.
            </p>
          </div>
          <Button asChild className="bg-pink-600 hover:bg-pink-700">
            <Link href={ROUTES.PRODUCTS_LIST}>Découvrir nos produits</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {orders.content.map((order) => (
              <OrderListItem key={order.id} order={order} />
            ))}
          </div>

          <DataTablePagination
            totalPages={orders.totalPages}
            totalElements={orders.totalElements}
            currentPage={currentPage}
            first={orders.first}
            last={orders.last}
            buildPageUrl={buildPageUrl}
            getPageNumbers={() => getPageNumbers(orders.totalPages, currentPage)}
            itemLabelSingular="commande"
            itemLabelPlural="commandes"
          />
        </>
      )}
    </div>
  );
}
