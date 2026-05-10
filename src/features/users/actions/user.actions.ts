"use server";

import { revalidatePath } from "next/cache";
import {
  createUser as createUserService,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
} from "../services/user.services";
import { UserCreateRequest, UserUpdateRequest } from "../types/user.types";
import { ApiError } from "@/types/api.types";

export async function createUserAction(request: UserCreateRequest) {
  try {
    const user = await createUserService(request);
    revalidatePath("/dashboard/users");
    return { success: true, user };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Erreur lors de la création",
    };
  }
}

// id séparé du body
export async function updateUserAction(id: number, request: UserUpdateRequest) {
  try {
    const user = await updateUserService(id, request);
    revalidatePath("/dashboard/users");
    return { success: true, user };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      success: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Erreur lors de la modification",
    };
  }
}

export async function deleteUserAction(userId: number) {
  try {
    await deleteUserService(userId);
    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Erreur lors de la suppression",
    };
  }
}
