"use server";
import { revalidatePath } from "next/cache";
import {
  createCategory as createCategoryService,
  updateCategory as updateCategoryService,
  deleteCategory as deleteCategoryService,
} from "../services/category.services";
import { CategoryReqDto } from "../types/category.types";

export async function createCategoryAction(request: CategoryReqDto) {
  try {
    const category = await createCategoryService(request);
    revalidatePath("/dashboard/categories");
    return { success: true, category };
  } catch (error) {
    console.error("Error creating category:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateCategoryAction(id: number, request: CategoryReqDto) {
  try {
    const category = await updateCategoryService(id, request);
    revalidatePath("/dashboard/categories");
    return { success: true, category };
  } catch (error) {
    console.error("Error updating category:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function deleteCategoryAction(categoryId: number) {
  try {
    await deleteCategoryService(categoryId);
    revalidatePath("/dashboard/categories"); // Revalidate the categories page
    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
