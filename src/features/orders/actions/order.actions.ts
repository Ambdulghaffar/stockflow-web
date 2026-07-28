"use server";
import { revalidatePath } from "next/cache";
import {
  createOrder as createOrderService,
  updateOrderStatus as updateOrderStatusService,
} from "../services/order.services";
import { OrderReqDto, OrderStatus } from "../types/order.types";

export async function createOrderAction(request: OrderReqDto) {
  try {
    const order = await createOrderService(request);
    revalidatePath("/dashboard/account/orders");
    return { success: true as const, order };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateOrderStatusAction(id: number, status: OrderStatus) {
  try {
    const order = await updateOrderStatusService(id, status);
    revalidatePath("/dashboard/sales/orders");
    revalidatePath(`/dashboard/sales/orders/${id}`);
    return { success: true as const, order };
  } catch (error) {
    console.error("Error updating order status:", error);
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
