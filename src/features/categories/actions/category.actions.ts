"use server"
import { revalidatePath } from "next/cache";
import { deleteCategory as deleteCategoryService} from "../services/category.services";

export async function deleteCategoryAction(categoryId: number){
    try{
        await deleteCategoryService(categoryId);
        revalidatePath("/dashboard/categories"); // Revalidate the categories page
        return { success: true };
    } catch(error){
        console.error("Error deleting category:", error);
        return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
}