import {
  UserDto,
  UserCreateRequest,
  UserUpdateRequest,
  UserStats,
  ChangePasswordDto,
  MeUpdateDto,
} from "../types/user.types";
import apiClient from "@/lib/axios/api-client";
import { handleApiError } from "@/lib/axios/handle-api-error";
import { USERS_ENDPOINTS } from "../constants/users.endpoints";
import { getAuthHeaders } from "@/lib/auth/auth-helpers";
import { PageResponse } from "@/types/pagination.types";
import axios from "axios";
import { MessageResponseDto } from "@/types/api.types";

export const getAllUsers = async (
  page = 0,
  size = 10,
  sortBy = "id",
  sortDir = "desc",
  role?: string,
  search?: string,
): Promise<PageResponse<UserDto>> => {
  try {
    const { data } = await apiClient.get<PageResponse<UserDto>>(
      USERS_ENDPOINTS.base,
      {
        headers: await getAuthHeaders(),
        params: {
          page,
          size,
          sortBy,
          sortDir,
          ...(role && role !== "all" && { role }),
          ...(search && search !== "" && { search }),
        },
      },
    );
    return data;
  } catch (error) {
    return handleApiError(error, "getAllUsers");
  }
};

export const getUserById = async (id: number): Promise<UserDto | null> => {
  try {
    const { data } = await apiClient.get<UserDto>(USERS_ENDPOINTS.byId(id), {
      headers: await getAuthHeaders(),
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    return handleApiError(error, `getUserById (id: ${id})`);
  }
};

// UserCreateRequest — avec password
export const createUser = async (
  request: UserCreateRequest,
): Promise<UserDto> => {
  try {
    const { data } = await apiClient.post<UserDto>(
      USERS_ENDPOINTS.base,
      request,
      { headers: await getAuthHeaders() },
    );
    return data;
  } catch (error) {
    return handleApiError(error, "createUser");
  }
};

// UserUpdateRequest — sans password, id séparé
export const updateUser = async (
  id: number,
  request: UserUpdateRequest,
): Promise<UserDto> => {
  try {
    const { data } = await apiClient.put<UserDto>(
      USERS_ENDPOINTS.byId(id),
      request,
      { headers: await getAuthHeaders() },
    );
    return data;
  } catch (error) {
    return handleApiError(error, `updateUser (id: ${id})`);
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(USERS_ENDPOINTS.byId(id), {
      headers: await getAuthHeaders(),
    });
  } catch (error) {
    return handleApiError(error, `deleteUser (id: ${id})`);
  }
};

export const getUserStats = async (): Promise<UserStats> => {
  try {
    const { data } = await apiClient.get<UserStats>(USERS_ENDPOINTS.stats, {
      headers: await getAuthHeaders(),
    });
    return data;
  } catch (error) {
    return handleApiError(error, "getUserStats");
  }
};

export const getCurrentUser = async (): Promise<UserDto> => {
  try {
    const { data } = await apiClient.get<UserDto>(USERS_ENDPOINTS.me, {
      headers: await getAuthHeaders(),
    });
    return data;
  } catch (error) {
    return handleApiError(error, "getCurrentUser");
  }
};

export const updateCurrentUser = async (
  request: MeUpdateDto,
): Promise<UserDto> => {
  try {
    const { data } = await apiClient.put<UserDto>(USERS_ENDPOINTS.me, request, {
      headers: await getAuthHeaders(),
    });
    return data;
  } catch (error) {
    return handleApiError(error, "updateCurrentUser");
  }
};

export const changePassword = async (
  request: ChangePasswordDto,
): Promise<MessageResponseDto> => {
  try {
    const { data } = await apiClient.put<MessageResponseDto>(
      USERS_ENDPOINTS.mePassword,
      request,
      { headers: await getAuthHeaders() },
    );
    return data;
  } catch (error) {
    return handleApiError(error, "changePassword");
  }
};
