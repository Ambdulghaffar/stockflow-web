"use server";

import { revalidatePath } from "next/cache";
import {
  createSupplierOrder as createSupplierOrderService,
  updateSupplierOrderStatus as updateSupplierOrderStatusService,
} from "../services/supplier-order.services";
import {
  SupplierOrderReqDto,
  SupplierOrderStatus,
} from "../types/supplier-order.types";

export async function createSupplierOrderAction(request: SupplierOrderReqDto) {
  try {
    const order = await createSupplierOrderService(request);
    revalidatePath("/dashboard/suppliers/orders");
    return { success: true, order };
  } catch (error) {
    console.error("Error creating supplier order:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateSupplierOrderStatusAction(
  id: number,
  status: SupplierOrderStatus,
) {
  try {
    const order = await updateSupplierOrderStatusService(id, status);
    revalidatePath("/dashboard/suppliers/orders");
    revalidatePath("/dashboard/stock/levels");
    return { success: true, order };
  } catch (error) {
    console.error("Error updating supplier order status:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}