import { getAuthHeaders } from "../auth/auth-helpers";
import apiClient from "../axios/api-client";
import { handleApiError } from "../axios/handle-api-error";
import { UploadSignatureRespDto } from "./upload.types";
import { UPLOADS_ENDPOINTS } from "./uploads.endpoints";

export const getUploadSignature = async (
  folder: string,
): Promise<UploadSignatureRespDto> => {
  try {
    const { data } = await apiClient.post<UploadSignatureRespDto>(
      UPLOADS_ENDPOINTS.signature,
      null,
      {
        params: { folder },
        headers: await getAuthHeaders(),
      },
    );
    return data;
  } catch (error) {
    return handleApiError(error, "getUploadSignature");
  }
};
