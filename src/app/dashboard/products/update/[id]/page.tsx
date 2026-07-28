import DashboardPageContainer from "@/components/dashboard/dashboard-page-container";
import ProductForm from "@/features/products/components/product-form";
import { getProductById } from "@/features/products/services/product.services";
import { getAllCategories } from "@/features/categories/services/category.services";
import { notFound } from "next/navigation";
import React from "react";

export default async function UpdateProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) notFound();

  const [product, categories] = await Promise.all([
    getProductById(numericId),
    getAllCategories(0, 100, "name", "asc"),
  ]);

  if (!product) notFound();

  return (
    <DashboardPageContainer breadcrumbValues={{ [id]: product.name }}>
      <ProductForm
        mode="edit"
        defaultValues={product}
        categories={categories.content}
      />
    </DashboardPageContainer>
  );
}
