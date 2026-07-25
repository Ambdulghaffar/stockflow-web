"use server";

import { handleApiError } from "@/lib/axios/handle-api-error";
import apiPublicClient from "@/lib/axios/api-public-client"; //  pas de token
import { AUTH_ENDPOINTS } from "../constants/auth.endpoints";
import type {
  AuthResponse,
  RegisterDto,
} from "@/features/auth/types/auth.types";

export const registerUser = async (
  userData: Partial<RegisterDto>,
): Promise<AuthResponse> => {
  try {
    const { data } = await apiPublicClient.post<AuthResponse>(
      AUTH_ENDPOINTS.register,
      userData,
    );
    return data;
  } catch (error) {
    return handleApiError(error, "registerUser");
  }
};

export const forgotPassword = async (
  email: string,
): Promise<{ message: string }> => {
  try {
    const { data } = await apiPublicClient.post<{ message: string }>(
      AUTH_ENDPOINTS.forgotPassword,
      { email },
    );
    return data;
  } catch (error) {
    return handleApiError(error, "forgotPassword");
  }
};

export const resetPassword = async (
  token: string,
  newPassword: string,
): Promise<{ message: string }> => {
  try {
    const { data } = await apiPublicClient.post<{ message: string }>(
      AUTH_ENDPOINTS.resetPassword,
      { token, newPassword },
    );
    return data;
  } catch (error) {
    return handleApiError(error, "resetPassword");
  }
};
