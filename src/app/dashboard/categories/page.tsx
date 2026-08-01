import PageStatsHeader from "@/components/dashboard/page-stats-header";
import DashboardPageContainer from "@/components/dashboard/dashboard-page-container";
import ListCategories from "@/features/categories/components/list-categories";
import { getAllCategories } from "@/features/categories/services/category.services";
import { UsersRound } from "lucide-react";
import React from "react";

interface CategoriesPageProps {
  searchParams: Promise<{
    page?: string;
    size?: string;
    sortBy?: string;
    sortDir?: string;
    search?: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function CategoriesPage({
  searchParams,
}: CategoriesPageProps) {
  const { page, size, sortBy, sortDir, search } = await searchParams;

  const [categories] = await Promise.all([
    getAllCategories(
      Number(page) || 0,
      Number(size) || 10,
      sortBy || "id",
      sortDir || "desc",
      search,
    ),
  ]);

  return (
    <DashboardPageContainer>
      <PageStatsHeader
        icon={UsersRound}
        title="Gestion des catégories de produits"
        description="Administration et supervision des catégories de produits"
        stats={[
          {
            title: "Total des catégories",
            value: categories.totalElements,
            icon: UsersRound,
            description: "Toutes les catégories de produits",
          },
        ]}
      />
      <ListCategories
        initialData={{ ...categories }}
        currentPage={Number(page) || 0}
        currentSearch={search || ""}
      />
    </DashboardPageContainer>
  );
}
