export const CATEGORIES_ENDPOINTS = {
    base: "/categories",
    byId: (id: number) => `/categories/${id}`,
    create: "/categories",
    update: (id: number) => `/categories/${id}`,
    delete: (id: number) => `/categories/${id}`,
}