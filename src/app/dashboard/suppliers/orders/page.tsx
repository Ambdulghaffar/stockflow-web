import DashboardPageContainer from "@/components/dashboard/dashboard-page-container";
import PageStatsHeader from "@/components/dashboard/page-stats-header";
import ListSupplierOrders from "@/features/suppliers/components/list-supplier-orders";
import { getAllSupplierOrders } from "@/features/suppliers/services/supplier-order.services";
import { SupplierOrderStatus } from "@/features/suppliers/types/supplier-order.types";
import { Truck } from "lucide-react";

interface SupplierOrdersPageProps {
  searchParams: Promise<{
    page?: string;
    status?: string;
  }>;
}

export default async function SupplierOrdersPage({ searchParams }: SupplierOrdersPageProps) {
  const { page, status } = await searchParams;

  const [orders] = await Promise.all([
    getAllSupplierOrders(Number(page) || 0, 10, status as SupplierOrderStatus | undefined),
  ]);

  return (
    <DashboardPageContainer>
      <PageStatsHeader
        icon={Truck}
        title="Commandes fournisseurs"
        description="Suivi des commandes passées aux fournisseurs"
        stats={[
          {
            title: "Total des commandes",
            value: orders.totalElements,
            icon: Truck,
            description: "Toutes les commandes fournisseurs",
          },
        ]}
      />
      <ListSupplierOrders
        initialData={{ ...orders }}
        currentPage={Number(page) || 0}
        currentStatus={status || ""}
      />
    </DashboardPageContainer>
  );
}
