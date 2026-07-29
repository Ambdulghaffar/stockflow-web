"use server";

import { revalidatePath } from "next/cache";
import {
  createSupplier as createSupplierService,
  deleteSupplier as deleteSupplierService,
  updateSupplier as updateSupplierService,
} from "../services/supplier.services";
import { SupplierReqDto } from "../types/supplier.types";

export async function createSupplierAction(request: SupplierReqDto) {
  try {
    const supplier = await createSupplierService(request);
    revalidatePath("/dashboard/suppliers");
    return { success: true, supplier };
  } catch (error) {
    console.error("Error creating supplier:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateSupplierAction(id: number, request: SupplierReqDto) {
  try {
    const supplier = await updateSupplierService(id, request);
    revalidatePath("/dashboard/suppliers");
    return { success: true, supplier };
  } catch (error) {
    console.error("Error updating supplier:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function deleteSupplierAction(supplierId: number) {
  try {
    await deleteSupplierService(supplierId);
    revalidatePath("/dashboard/suppliers");
    return { success: true };
  } catch (error) {
    console.error("Error deleting supplier:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}