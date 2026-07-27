export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface OrderItemReqDto {
  productId: number;
  quantity: number;
}

export interface OrderReqDto {
  shippingAddress: string;
  items: OrderItemReqDto[];
}

export interface OrderItemRespDto {
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface OrderRespDto {
  id: number;
  customerUsername: string;
  shippingAddress: string;
  status: OrderStatus;
  items: OrderItemRespDto[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string | null;
}
