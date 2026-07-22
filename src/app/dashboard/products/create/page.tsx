import SidebarBreadcrumb from "@/components/dashboard/sidebar-breadcrumb";
import ProductForm from "@/features/products/components/product-form";
import { getAllCategories } from "@/features/categories/services/category.services";
import React from "react";

export default async function CreateProductPage() {
  const categories = await getAllCategories(0, 100, "name", "asc");

  return (
    <>
      <SidebarBreadcrumb />
      <ProductForm mode="create" categories={categories.content} />
    </>
  );
}
