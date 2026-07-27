"use server";
import { revalidatePath } from "next/cache";
import { createOrder as createOrderService } from "../services/order.services";
import { OrderReqDto } from "../types/order.types";

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
