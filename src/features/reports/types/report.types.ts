import { OrderStatus } from "@/features/orders/types/order.types";
import { StockMovementType } from "@/features/stock/types/stock-movement.types";

export interface DailyRevenueDto {
  date: string;
  revenue: number;
  orderCount: number;
}

export interface TopProductDto {
  productId: number;
  productName: string;
  quantitySold: number;
  revenue: number;
}

export interface OrderStatusCountDto {
  status: OrderStatus;
  count: number;
}

export interface SalesReportDto {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  pendingOrdersCount: number;
  revenueByDay: DailyRevenueDto[];
  topProducts: TopProductDto[];
  ordersByStatus: OrderStatusCountDto[];
}

export interface LowStockProductDto {
  productId: number;
  productName: string;
  categoryName: string;
  stock: number;
}

export interface MovementTypeSummaryDto {
  type: StockMovementType;
  count: number;
  totalQuantity: number;
}

export interface StockReportDto {
  totalStockValue: number;
  totalProducts: number;
  lowStockCount: number;
  outOfStockCount: number;
  lowStockProducts: LowStockProductDto[];
  movementsSummary: MovementTypeSummaryDto[];
}
