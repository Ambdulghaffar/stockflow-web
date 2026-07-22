"use server";
import { revalidatePath } from "next/cache";
import {
  createProduct as createProductService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
} from "../services/product.services";
import { ProductReqDto } from "../types/product.types";

export async function createProductAction(request: ProductReqDto) {
  try {
    const product = await createProductService(request);
    revalidatePath("/dashboard/products");
    return { success: true, product };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateProductAction(id: number, request: ProductReqDto) {
  try {
    const product = await updateProductService(id, request);
    revalidatePath("/dashboard/products");
    return { success: true, product };
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function deleteProductAction(productId: number) {
  try {
    await deleteProductService(productId);
    revalidatePath("/dashboard/products"); // Revalidate the products page
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}