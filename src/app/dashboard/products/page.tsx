import PageStatsHeader from "@/components/dashboard/page-stats-header";
import DashboardPageContainer from "@/components/dashboard/dashboard-page-container";
import ListProducts from "@/features/products/components/list-products";
import { getAllProducts } from "@/features/products/services/product.services";
import { Package } from "lucide-react";
import React from "react";

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
    size?: string;
    sortBy?: string;
    sortDir?: string;
    search?: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { page, size, sortBy, sortDir, search } = await searchParams;

  const [products] = await Promise.all([
    getAllProducts(
      Number(page) || 0,
      Number(size) || 10,
      sortBy || "id",
      sortDir || "desc",
      undefined,
      undefined,
      search,
    ),
  ]);

  return (
    <DashboardPageContainer>
      <PageStatsHeader
        icon={Package}
        title="Gestion des produits"
        description="Administration et supervision des produits"
        stats={[
          {
            title: "Total des produits",
            value: products.totalElements,
            icon: Package,
            description: "Tous les produits du catalogue",
          },
        ]}
      />
      <ListProducts
        initialData={products}
        currentPage={Number(page) || 0}
        currentSearch={search || ""}
      />
    </DashboardPageContainer>
  );
}
