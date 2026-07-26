"use server";

import { revalidatePath } from "next/cache";
import {
  updateCurrentUser as updateCurrentUserService,
  changePassword as changePasswordService,
} from "../services/user.services";
import { ChangePasswordDto, MeUpdateDto, UserDto } from "../types/user.types";
import { ApiError } from "@/types/api.types";

export async function updateCurrentUserAction(
  request: MeUpdateDto,
): Promise<
  { success: true; user: UserDto } | { success: false; error: string }
> {
  try {
    const user = await updateCurrentUserService(request);
    revalidatePath("/dashboard/profile");
    revalidatePath("/dashboard/account/profile");
    return { success: true, user };
  } catch (error) {
    console.error("Error updating current user:", error);
    return {
      success: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Erreur lors de la mise à jour du profil",
    };
  }
}

export async function changePasswordAction(
  request: ChangePasswordDto,
): Promise<
  { success: true; message: string } | { success: false; error: string }
> {
  try {
    const response = await changePasswordService(request);
    return { success: true, message: response.message };
  } catch (error) {
    console.error("Error changing password:", error);
    return {
      success: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Erreur lors du changement de mot de passe",
    };
  }
}
