import { Category } from "@/features/category/types";
import { ApiResponse, apiRequest } from "@/api";

const CATEGORY_API_PREFIX = "/admin/categories";

/*
  #TODO:
  1. Implement caching for categories
*/
export async function getCategories(): Promise<ApiResponse<Category[]>> {
  return apiRequest<ApiResponse<Category[]>>(CATEGORY_API_PREFIX, "GET");
}

export async function getCategory(id: number | string): Promise<ApiResponse<Category>> {
  return apiRequest<ApiResponse<Category>>(`${CATEGORY_API_PREFIX}/${id}`, "GET");
}

export async function createCategory(body: Partial<Category>): Promise<ApiResponse<Category>> {
  return apiRequest<ApiResponse<Category>>(`${CATEGORY_API_PREFIX}/create`, "POST", { body });
}

export async function updateCategory(
  id: string | number,
  body: Partial<Category>
): Promise<ApiResponse<Category>> {
  return apiRequest<ApiResponse<Category>>(`${CATEGORY_API_PREFIX}/${id}`, "PUT", {
    body,
  });
}

export async function deleteCategory(id: number | string): Promise<ApiResponse<null>> {
  return apiRequest<ApiResponse<null>>(`${CATEGORY_API_PREFIX}/${id}`, "DELETE");
}
