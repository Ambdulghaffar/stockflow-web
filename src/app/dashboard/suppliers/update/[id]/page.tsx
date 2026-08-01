import { notFound } from "next/navigation";
import SupplierForm from "@/features/suppliers/components/supplier-form";
import { getSupplierById } from "@/features/suppliers/services/supplier.services";

interface UpdateSupplierPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function UpdateSupplierPage({ params }: UpdateSupplierPageProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    notFound();
  }

  const supplier = await getSupplierById(numericId);
  if (!supplier) notFound();

  return <SupplierForm mode="edit" defaultValues={supplier} />;
}