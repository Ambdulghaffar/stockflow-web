export type SupplierOrderStatus = "PENDING" | "ORDERED" | "RECEIVED" | "CANCELLED";

export interface SupplierOrderItemReqDto {
  productId: number;
  quantity: number;
  unitCost: number;
}

export interface SupplierOrderReqDto {
  supplierId: number;
  items: SupplierOrderItemReqDto[];
}

export interface SupplierOrderItemRespDto {
  productId: number;
  productName: string;
  unitCost: number;
  quantity: number;
  subtotal: number;
}

export interface SupplierOrderRespDto {
  id: number;
  supplierId: number;
  supplierName: string;
  status: SupplierOrderStatus;
  items: SupplierOrderItemRespDto[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string | null;
}