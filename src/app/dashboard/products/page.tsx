import SidebarBreadcrumb from "@/components/dashboard/sidebar-breadcrumb";
import { StatCard } from "@/components/dashboard/stat-card";
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
    <div className="space-y-8">
      <SidebarBreadcrumb />

      {/* Section d'introduction avec statistiques */}
      <div className="bg-gradient-to-r from-pink-50 to-white rounded-2xl p-6 border border-pink-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Gestion des produits
            </h1>
            <p className="text-gray-600">
              Administration et supervision des produits
            </p>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total des produits"
            value={products.totalElements}
            icon={Package}
            iconBgColor="bg-pink-100 text-pink-600"
            description="Tous les produits du catalogue"
          />
        </div>
      </div>
      <ListProducts
        initialData={products}
        currentPage={Number(page) || 0}
        currentSearch={search || ""}
      />
    </div>
  );
}
