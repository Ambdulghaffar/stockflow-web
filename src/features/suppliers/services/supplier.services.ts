import axios from "axios";
import apiClient from "@/lib/axios/api-client";
import { getAuthHeaders } from "@/lib/auth/auth-helpers";
import { handleApiError } from "@/lib/axios/handle-api-error";
import { PageResponse } from "@/types/pagination.types";
import { SUPPLIERS_ENDPOINTS } from "../constants/suppliers.endpoints";
import { SupplierDto, SupplierReqDto } from "../types/supplier.types";

export const getAllSuppliers = async (
  page = 0,
  size = 10,
  search?: string,
): Promise<PageResponse<SupplierDto>> => {
  try {
    const { data } = await apiClient.get<PageResponse<SupplierDto>>(
      SUPPLIERS_ENDPOINTS.base,
      {
        headers: await getAuthHeaders(),
        params: {
          page,
          size,
          ...(search && search !== "" && { search }),
        },
      },
    );
    return data;
  } catch (error) {
    return handleApiError(error, "getAllSuppliers");
  }
};

export const getSupplierById = async (id: number): Promise<SupplierDto | null> => {
  try {
    const { data } = await apiClient.get<SupplierDto>(SUPPLIERS_ENDPOINTS.byId(id), {
      headers: await getAuthHeaders(),
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    return handleApiError(error, `getSupplierById (id: ${id})`);
  }
};

export const createSupplier = async (
  request: SupplierReqDto,
): Promise<SupplierDto> => {
  try {
    const { data } = await apiClient.post<SupplierDto>(
      SUPPLIERS_ENDPOINTS.base,
      request,
      { headers: await getAuthHeaders() },
    );
    return data;
  } catch (error) {
    return handleApiError(error, "createSupplier");
  }
};

export const updateSupplier = async (
  id: number,
  request: SupplierReqDto,
): Promise<SupplierDto> => {
  try {
    const { data } = await apiClient.put<SupplierDto>(
      SUPPLIERS_ENDPOINTS.byId(id),
      request,
      { headers: await getAuthHeaders() },
    );
    return data;
  } catch (error) {
    return handleApiError(error, "updateSupplier");
  }
};

export const deleteSupplier = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(SUPPLIERS_ENDPOINTS.byId(id), {
      headers: await getAuthHeaders(),
    });
  } catch (error) {
    console.error(`Error deleting supplier with id ${id}:`, error);
    return handleApiError(error, `deleteSupplier (id: ${id})`);
  }
};