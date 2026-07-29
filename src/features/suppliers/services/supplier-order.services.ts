import axios from "axios";
import apiClient from "@/lib/axios/api-client";
import { getAuthHeaders } from "@/lib/auth/auth-helpers";
import { handleApiError } from "@/lib/axios/handle-api-error";
import { PageResponse } from "@/types/pagination.types";
import { SUPPLIER_ORDERS_ENDPOINTS } from "../constants/supplier-orders.endpoints";
import {
  SupplierOrderReqDto,
  SupplierOrderRespDto,
  SupplierOrderStatus,
} from "../types/supplier-order.types";

export const getAllSupplierOrders = async (
  page = 0,
  size = 10,
  status?: SupplierOrderStatus,
): Promise<PageResponse<SupplierOrderRespDto>> => {
  try {
    const { data } = await apiClient.get<PageResponse<SupplierOrderRespDto>>(
      SUPPLIER_ORDERS_ENDPOINTS.base,
      {
        headers: await getAuthHeaders(),
        params: {
          page,
          size,
          ...(status && { status }),
        },
      },
    );
    return data;
  } catch (error) {
    return handleApiError(error, "getAllSupplierOrders");
  }
};

export const getSupplierOrderById = async (
  id: number,
): Promise<SupplierOrderRespDto | null> => {
  try {
    const { data } = await apiClient.get<SupplierOrderRespDto>(
      SUPPLIER_ORDERS_ENDPOINTS.byId(id),
      {
        headers: await getAuthHeaders(),
      },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    return handleApiError(error, `getSupplierOrderById (id: ${id})`);
  }
};

export const createSupplierOrder = async (
  request: SupplierOrderReqDto,
): Promise<SupplierOrderRespDto> => {
  try {
    const { data } = await apiClient.post<SupplierOrderRespDto>(
      SUPPLIER_ORDERS_ENDPOINTS.base,
      request,
      { headers: await getAuthHeaders() },
    );
    return data;
  } catch (error) {
    return handleApiError(error, "createSupplierOrder");
  }
};

export const updateSupplierOrderStatus = async (
  id: number,
  status: SupplierOrderStatus,
): Promise<SupplierOrderRespDto> => {
  try {
    const { data } = await apiClient.put<SupplierOrderRespDto>(
      SUPPLIER_ORDERS_ENDPOINTS.updateStatus(id),
      { status },
      { headers: await getAuthHeaders() },
    );
    return data;
  } catch (error) {
    return handleApiError(error, `updateSupplierOrderStatus (id: ${id})`);
  }
};