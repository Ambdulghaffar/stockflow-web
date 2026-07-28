import DashboardPageContainer from "@/components/dashboard/dashboard-page-container";
import ProductForm from "@/features/products/components/product-form";
import { getAllCategories } from "@/features/categories/services/category.services";
import React from "react";

export default async function CreateProductPage() {
  const categories = await getAllCategories(0, 100, "name", "asc");

  return (
    <DashboardPageContainer>
      <ProductForm mode="create" categories={categories.content} />
    </DashboardPageContainer>
  );
}
