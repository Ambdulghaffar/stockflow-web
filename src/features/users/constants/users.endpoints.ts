export const USERS_ENDPOINTS = {
  base: "/users",
  stats:"/users/stats",
  byId: (id: number) => `/users/${id}`,
} as const;