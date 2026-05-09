import { PageResponse } from "@/types/pagination.types";
import { CategoryDto, CategoryResDto } from "../types/category.types";
import apiClient from "@/lib/axios/api-client";
import { CATEGORIES_ENDPOINTS } from "../constants/categories.endpoints";
import { getAuthHeaders } from "@/lib/auth/auth-helpers";
import axios from "axios";
import { handleApiError } from "@/lib/axios/handle-api-error";

export const getAllCategories = async (
  page = 0,
  size = 10,
  sortBy = "id",
  sortDir = "desc",
  search?: string,
): Promise<PageResponse<CategoryResDto>> => {
  try {
    const { data } = await apiClient.get<PageResponse<CategoryResDto>>(
      CATEGORIES_ENDPOINTS.base,
      {
        headers: await getAuthHeaders(),
        params: {
          page,
          size,
          sortBy,
          sortDir,
          ...(search && search !== "" && { search }),
        },
      },
    );
    return data;
  } catch (error) {
    return handleApiError(error, "getAllUsers");
  }
};

export const getCategoryById = async (
  id: number,
): Promise<CategoryDto | null> => {
  try {
    const { data } = await apiClient.get<CategoryDto>(
      CATEGORIES_ENDPOINTS.byId(id),
      {
        headers: await getAuthHeaders(),
      },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    return handleApiError(error, `getCategoryById (id: ${id})`);
  }
};

export const deleteCategory = async (id: number): Promise<void> => {
  try{
    await apiClient.delete(CATEGORIES_ENDPOINTS.byId(id), {
      headers: await getAuthHeaders(),
    });
  } catch (error) {
    console.error(`Error deleting category with id ${id}:`, error);
    return handleApiError(error, `deleteCategory (id: ${id})`);
  }
}
