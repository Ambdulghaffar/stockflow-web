export type StockMovementType = "SALE" | "CANCELLATION" | "RESTOCK" | "DAMAGE";

export interface StockMovementDto {
  id: number;
  productId: number;
  productName: string;
  type: StockMovementType;
  quantity: number;
  reason: string;
  orderId: number | null;
  createdAt: string;
}

export interface StockAdjustmentReqDto {
  productId: number;
  type: "RESTOCK" | "DAMAGE";
  quantity: number;
  reason: string;
}
