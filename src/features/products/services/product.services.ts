import { PageResponse } from "@/types/pagination.types";
import { ProductReqDto, ProductResDto } from "../types/product.types";
import apiClient from "@/lib/axios/api-client";
import { PRODUCTS_ENDPOINTS } from "../constants/products.endpoints";
import { getAuthHeaders } from "@/lib/auth/auth-helpers";
import axios from "axios";
import { handleApiError } from "@/lib/axios/handle-api-error";

export const getAllProducts = async (
  page = 0,
  size = 10,
  sortBy = "id",
  sortDir = "desc",
  status?: string,
  categoryId?: number,
  search?: string,
  minPrice?: number,
  maxPrice?: number,
  excludeInactive?: boolean,
): Promise<PageResponse<ProductResDto>> => {
  try {
    const { data } = await apiClient.get<PageResponse<ProductResDto>>(
      PRODUCTS_ENDPOINTS.base,
      {
        headers: await getAuthHeaders(),
        params: {
          page,
          size,
          sortBy,
          sortDir,
          ...(status && status !== "" && { status }),
          ...(categoryId && { categoryId }),
          ...(search && search !== "" && { search }),
          ...(minPrice !== undefined && { minPrice }),
          ...(maxPrice !== undefined && { maxPrice }),
          ...(excludeInactive !== undefined && { excludeInactive }),
        },
      },
    );
    return data;
  } catch (error) {
    return handleApiError(error, "getAllProducts");
  }
};

export const getProductById = async (
  id: number,
): Promise<ProductResDto | null> => {
  try {
    const { data } = await apiClient.get<ProductResDto>(
      PRODUCTS_ENDPOINTS.byId(id),
      {
        headers: await getAuthHeaders(),
      },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    return handleApiError(error, `getProductById (id: ${id})`);
  }
};

export const createProduct = async (
  request: ProductReqDto,
): Promise<ProductResDto> => {
  try {
    const { data } = await apiClient.post<ProductResDto>(
      PRODUCTS_ENDPOINTS.base,
      request,
      { headers: await getAuthHeaders() },
    );
    return data;
  } catch (error) {
    return handleApiError(error, "createProduct");
  }
};

export const updateProduct = async (
  id: number,
  request: ProductReqDto,
): Promise<ProductResDto> => {
  try {
    const { data } = await apiClient.put<ProductResDto>(
      PRODUCTS_ENDPOINTS.byId(id),
      request,
      { headers: await getAuthHeaders() },
    );
    return data;
  } catch (error) {
    return handleApiError(error, "updateProduct");
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(PRODUCTS_ENDPOINTS.byId(id), {
      headers: await getAuthHeaders(),
    });
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    return handleApiError(error, `deleteProduct (id: ${id})`);
  }
};
