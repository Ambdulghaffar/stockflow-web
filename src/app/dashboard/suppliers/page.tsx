import DashboardPageContainer from "@/components/dashboard/dashboard-page-container";
import PageStatsHeader from "@/components/dashboard/page-stats-header";
import ListSuppliers from "@/features/suppliers/components/list-suppliers";
import { getAllSuppliers } from "@/features/suppliers/services/supplier.services";
import { Truck } from "lucide-react";

interface SuppliersPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function SuppliersPage({ searchParams }: SuppliersPageProps) {
  const { page, search } = await searchParams;

  const [suppliers] = await Promise.all([
    getAllSuppliers(Number(page) || 0, 10, search),
  ]);

  return (
    <DashboardPageContainer>
      <PageStatsHeader
        icon={Truck}
        title="Gestion des fournisseurs"
        description="Administration et supervision de vos fournisseurs"
        stats={[
          {
            title: "Total des fournisseurs",
            value: suppliers.totalElements,
            icon: Truck,
            description: "Tous les fournisseurs",
          },
        ]}
      />
      <ListSuppliers
        initialData={{ ...suppliers }}
        currentPage={Number(page) || 0}
        currentSearch={search || ""}
      />
    </DashboardPageContainer>
  );
}