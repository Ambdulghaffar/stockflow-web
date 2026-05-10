import SidebarBreadcrumb from "@/components/dashboard/sidebar-breadcrumb";
import { StatCard } from "@/components/dashboard/stat-card";
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
    <div className="space-y-8">
      <SidebarBreadcrumb />

      {/* Section d'introduction avec statistiques */}
      <div className="bg-gradient-to-r from-pink-50 to-white rounded-2xl p-6 border border-pink-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
            <UsersRound className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Gestion des catégories de produits
            </h1>
            <p className="text-gray-600">
              Administration et supervision des catégories de produits
            </p>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total des catégories de produits "
            value="1,234"
            icon={UsersRound}
            iconBgColor="bg-pink-100 text-pink-600"
            description="Tous les catégories de produits "
          />
        </div>
      </div>
      <ListCategories
        initialData={{ ...categories }}
        currentPage={Number(page) || 0}
        currentSearch={search || ""}
      />
    </div>
  );
}
