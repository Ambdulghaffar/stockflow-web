export const ORDERS_ENDPOINTS = {
  base: "/orders",
  me: "/orders/me",
  meById: (id: number) => `/orders/me/${id}`,
  byId: (id: number) => `/orders/${id}`,
  updateStatus: (id: number) => `/orders/${id}/status`,
} as const;
