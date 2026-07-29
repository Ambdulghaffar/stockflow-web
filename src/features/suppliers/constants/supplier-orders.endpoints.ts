export const SUPPLIER_ORDERS_ENDPOINTS = {
  base: "/supplier-orders",
  byId: (id: number) => `/supplier-orders/${id}`,
  updateStatus: (id: number) => `/supplier-orders/${id}/status`,
} as const;