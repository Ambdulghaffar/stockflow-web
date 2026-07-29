import { SupplierOrderStatus } from "../types/supplier-order.types";

export const SUPPLIER_ORDER_STATUS_LABELS: Record<SupplierOrderStatus, string> = {
  PENDING: "En attente",
  ORDERED: "Commandée",
  RECEIVED: "Reçue",
  CANCELLED: "Annulée",
};

export const SUPPLIER_ORDER_STATUS_BADGE_CLASSES: Record<
  SupplierOrderStatus,
  string
> = {
  PENDING: "bg-amber-50 text-amber-700",
  ORDERED: "bg-blue-50 text-blue-700",
  RECEIVED: "bg-emerald-50 text-emerald-700",
  CANCELLED: "bg-red-50 text-red-700",
};

export const SUPPLIER_ORDER_STATUS_TRANSITIONS: Record<
  SupplierOrderStatus,
  SupplierOrderStatus[]
> = {
  PENDING: ["ORDERED", "CANCELLED"],
  ORDERED: ["RECEIVED", "CANCELLED"],
  RECEIVED: [],
  CANCELLED: [],
};