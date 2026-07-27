"use server";
import { revalidatePath } from "next/cache";
import { adjustStock as adjustStockService } from "../services/stock-movement.services";
import { StockAdjustmentReqDto } from "../types/stock-movement.types";

export async function adjustStockAction(request: StockAdjustmentReqDto) {
  try {
    const movement = await adjustStockService(request);
    revalidatePath("/dashboard/stock/movements");
    revalidatePath("/dashboard/stock/levels");
    return { success: true as const, movement };
  } catch (error) {
    console.error("Error adjusting stock:", error);
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
