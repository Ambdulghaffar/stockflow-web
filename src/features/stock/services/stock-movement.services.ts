import { PageResponse } from "@/types/pagination.types";
import {
  StockAdjustmentReqDto,
  StockMovementDto,
  StockMovementType,
} from "../types/stock-movement.types";
import apiClient from "@/lib/axios/api-client";
import { STOCK_MOVEMENTS_ENDPOINTS } from "../constants/stock-movements.endpoints";
import { getAuthHeaders } from "@/lib/auth/auth-helpers";
import { handleApiError } from "@/lib/axios/handle-api-error";

export const getStockMovements = async (
  page = 0,
  size = 10,
  productId?: number,
  type?: StockMovementType,
): Promise<PageResponse<StockMovementDto>> => {
  try {
    const { data } = await apiClient.get<PageResponse<StockMovementDto>>(
      STOCK_MOVEMENTS_ENDPOINTS.base,
      {
        headers: await getAuthHeaders(),
        params: {
          page,
          size,
          ...(productId && { productId }),
          ...(type && { type }),
        },
      },
    );
    return data;
  } catch (error) {
    return handleApiError(error, "getStockMovements");
  }
};

export const adjustStock = async (
  request: StockAdjustmentReqDto,
): Promise<StockMovementDto> => {
  try {
    const { data } = await apiClient.post<StockMovementDto>(
      STOCK_MOVEMENTS_ENDPOINTS.adjust,
      request,
      { headers: await getAuthHeaders() },
    );
    return data;
  } catch (error) {
    return handleApiError(error, "adjustStock");
  }
};
