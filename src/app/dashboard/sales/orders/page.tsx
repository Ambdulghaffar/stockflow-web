import SidebarBreadcrumb from "@/components/dashboard/sidebar-breadcrumb";
import ListOrders from "@/features/orders/components/list-orders";
import { getAllOrders } from "@/features/orders/services/order.services";
import { OrderStatus } from "@/features/orders/types/order.types";

interface SalesOrdersPageProps {
  searchParams: Promise<{ page?: string; status?: string }>;
}

export default async function SalesOrdersPage({
  searchParams,
}: SalesOrdersPageProps) {
  const { page, status } = await searchParams;
  const currentPage = Number(page) || 0;

  const orders = await getAllOrders(
    currentPage,
    10,
    status as OrderStatus | undefined,
  );

  return (
    <div className="space-y-8">
      <SidebarBreadcrumb />
      <ListOrders
        initialData={orders}
        currentPage={currentPage}
        currentStatus={status || ""}
      />
    </div>
  );
}
