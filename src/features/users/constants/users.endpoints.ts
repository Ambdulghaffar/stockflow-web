export const USERS_ENDPOINTS = {
  base: "/users",
  stats:"/users/stats",
  byId: (id: number) => `/users/${id}`,
  me: "/users/me",
  mePassword: "/users/me/password",
} as const;