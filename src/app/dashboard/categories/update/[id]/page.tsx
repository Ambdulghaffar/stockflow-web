import DashboardPageContainer from "@/components/dashboard/dashboard-page-container";
import CategoryForm from "@/features/categories/components/category-form";
import { getCategoryById } from "@/features/categories/services/category.services";
import { notFound } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

export default async function UpdateCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) notFound();

  const category = await getCategoryById(numericId);

  if (!category) notFound();

  return (
    <DashboardPageContainer breadcrumbValues={{ [id]: category.name }}>
      <CategoryForm mode="edit" defaultValues={category} />
    </DashboardPageContainer>
  );
}
