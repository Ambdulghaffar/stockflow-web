export type Role = "ADMIN" | "MANAGER" | "CLIENT";

export const ROUTE_ROLE_MAP: { prefix: string; roles: Role[] }[] = [
  { prefix: "/dashboard/users", roles: ["ADMIN"] },
  { prefix: "/dashboard/settings", roles: ["ADMIN"] },
  { prefix: "/dashboard/account", roles: ["CLIENT"] },
  { prefix: "/dashboard/sales", roles: ["ADMIN", "MANAGER"] },
  { prefix: "/dashboard/stock", roles: ["ADMIN", "MANAGER"] },
  { prefix: "/dashboard/suppliers", roles: ["ADMIN", "MANAGER"] },
  { prefix: "/dashboard/reports", roles: ["ADMIN", "MANAGER"] },
  { prefix: "/dashboard/marketing", roles: ["ADMIN", "MANAGER"] },
  { prefix: "/dashboard/categories", roles: ["ADMIN", "MANAGER"] },
  { prefix: "/dashboard/products", roles: ["ADMIN", "MANAGER"] },
];
