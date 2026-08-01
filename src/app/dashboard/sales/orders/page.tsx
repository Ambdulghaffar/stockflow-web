import DashboardPageContainer from "@/components/dashboard/dashboard-page-container";
import ListOrders from "@/features/orders/components/list-orders";
import { getAllOrders } from "@/features/orders/services/order.services";
import { OrderStatus } from "@/features/orders/types/order.types";

interface SalesOrdersPageProps {
  searchParams: Promise<{ page?: string; status?: string }>;
}

export const dynamic = "force-dynamic";

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
    <DashboardPageContainer>
      <ListOrders
        initialData={orders}
        currentPage={currentPage}
        currentStatus={status || ""}
      />
    </DashboardPageContainer>
  );
}
