export const SUPPLIERS_ENDPOINTS = {
  base: "/suppliers",
  byId: (id: number) => `/suppliers/${id}`,
} as const;