import SidebarBreadcrumb from "@/components/dashboard/sidebar-breadcrumb";
import UserForm from "@/features/users/components/user-form";
import { getUserById } from "@/features/users/services/user.services";
import { notFound } from "next/navigation";
import React from "react";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numbericId = Number(id);
  if (!Number.isInteger(numbericId) || numbericId <= 0) notFound();

  const user = await getUserById(numbericId);

  if (!user) notFound();
  return (
    <>
      <SidebarBreadcrumb values={{ [id]: user.username }} />
      <UserForm mode="edit" defaultValues={user} />
    </>
  );
}
