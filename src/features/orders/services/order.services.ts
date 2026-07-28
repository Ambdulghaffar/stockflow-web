import { PageResponse } from "@/types/pagination.types";
import { OrderReqDto, OrderRespDto, OrderStatus } from "../types/order.types";
import apiClient from "@/lib/axios/api-client";
import { ORDERS_ENDPOINTS } from "../constants/orders.endpoints";
import { getAuthHeaders } from "@/lib/auth/auth-helpers";
import axios from "axios";
import { handleApiError } from "@/lib/axios/handle-api-error";

export const createOrder = async (
  request: OrderReqDto,
): Promise<OrderRespDto> => {
  try {
    const { data } = await apiClient.post<OrderRespDto>(
      ORDERS_ENDPOINTS.base,
      request,
      { headers: await getAuthHeaders() },
    );
    return data;
  } catch (error) {
    return handleApiError(error, "createOrder");
  }
};

export const getMyOrders = async (
  page = 0,
  size = 10,
): Promise<PageResponse<OrderRespDto>> => {
  try {
    const { data } = await apiClient.get<PageResponse<OrderRespDto>>(
      ORDERS_ENDPOINTS.me,
      {
        headers: await getAuthHeaders(),
        params: { page, size },
      },
    );
    return data;
  } catch (error) {
    return handleApiError(error, "getMyOrders");
  }
};

export const getMyOrderById = async (
  id: number,
): Promise<OrderRespDto | null> => {
  try {
    const { data } = await apiClient.get<OrderRespDto>(
      ORDERS_ENDPOINTS.meById(id),
      {
        headers: await getAuthHeaders(),
      },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    return handleApiError(error, `getMyOrderById (id: ${id})`);
  }
};

export const getAllOrders = async (
  page = 0,
  size = 10,
  status?: OrderStatus,
): Promise<PageResponse<OrderRespDto>> => {
  try {
    const { data } = await apiClient.get<PageResponse<OrderRespDto>>(
      ORDERS_ENDPOINTS.base,
      {
        headers: await getAuthHeaders(),
        params: { page, size, ...(status && { status }) },
      },
    );
    return data;
  } catch (error) {
    return handleApiError(error, "getAllOrders");
  }
};

export const getOrderById = async (id: number): Promise<OrderRespDto | null> => {
  try {
    const { data } = await apiClient.get<OrderRespDto>(
      ORDERS_ENDPOINTS.byId(id),
      { headers: await getAuthHeaders() },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    return handleApiError(error, `getOrderById (id: ${id})`);
  }
};

export const updateOrderStatus = async (
  id: number,
  status: OrderStatus,
): Promise<OrderRespDto> => {
  try {
    const { data } = await apiClient.put<OrderRespDto>(
      ORDERS_ENDPOINTS.updateStatus(id),
      { status },
      { headers: await getAuthHeaders() },
    );
    return data;
  } catch (error) {
    return handleApiError(error, `updateOrderStatus (id: ${id})`);
  }
};
