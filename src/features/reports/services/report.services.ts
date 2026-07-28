import { SalesReportDto, StockReportDto } from "../types/report.types";
import apiClient from "@/lib/axios/api-client";
import { REPORTS_ENDPOINTS } from "../constants/reports.endpoints";
import { getAuthHeaders } from "@/lib/auth/auth-helpers";
import { handleApiError } from "@/lib/axios/handle-api-error";

export const getSalesReport = async (
  startDate?: string,
  endDate?: string,
): Promise<SalesReportDto> => {
  try {
    const { data } = await apiClient.get<SalesReportDto>(
      REPORTS_ENDPOINTS.sales,
      {
        headers: await getAuthHeaders(),
        params: {
          ...(startDate && { startDate }),
          ...(endDate && { endDate }),
        },
      },
    );
    return data;
  } catch (error) {
    return handleApiError(error, "getSalesReport");
  }
};

export const getStockReport = async (
  startDate?: string,
  endDate?: string,
): Promise<StockReportDto> => {
  try {
    const { data } = await apiClient.get<StockReportDto>(
      REPORTS_ENDPOINTS.stock,
      {
        headers: await getAuthHeaders(),
        params: {
          ...(startDate && { startDate }),
          ...(endDate && { endDate }),
        },
      },
    );
    return data;
  } catch (error) {
    return handleApiError(error, "getStockReport");
  }
};
