import SidebarBreadcrumb from "@/components/dashboard/sidebar-breadcrumb";
import CategoryForm from "@/features/categories/components/category-form";
import { getCategoryById } from "@/features/categories/services/category.services";
import { notFound } from "next/navigation";
import React from "react";

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
    <>
      <SidebarBreadcrumb values={{ [id]: category.name }} />
      <CategoryForm mode="edit" defaultValues={category} />
    </>
  );
}
