import DashboardPageContainer from "@/components/dashboard/dashboard-page-container";
import UserForm from "@/features/users/components/user-form";
import { getUserById } from "@/features/users/services/user.services";
import { notFound } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

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
    <DashboardPageContainer breadcrumbValues={{ [id]: user.username }}>
      <UserForm mode="edit" defaultValues={user} />
    </DashboardPageContainer>
  );
}
