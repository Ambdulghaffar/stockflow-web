export const ORDERS_ENDPOINTS = {
  base: "/orders",
  me: "/orders/me",
  meById: (id: number) => `/orders/me/${id}`,
} as const;
