import { ApiError, ApiResponse, apiRequest } from "@/api";
import { UserInfo } from "@/features/user/types";
import { getAuthToken } from "@/lib/cookie";
import { revalidatePath } from "next/cache";

const USER_API_PREFIX = "/admin/users";
interface UserResponse {
  data?: any;
  status?: string;
}

export async function getRoleWiseActiveUsers(role?: string): Promise<ApiResponse<any[]>> {
  const url =
    role === "admin" || role === "instructor"
      ? `${USER_API_PREFIX}/?role=${role}`
      : `${USER_API_PREFIX}`;

  return apiRequest<ApiResponse<any[]>>(url, "GET", {
    next: { tags: ["users", "users-list"] },
  });
}

export async function getAllStudents(): Promise<ApiResponse<any[]>> {
  const url = "/students/list";

  return apiRequest<ApiResponse<any[]>>(url, "GET", {
    next: { tags: ["users", "users-list"] },
  });
}

export async function createUser(body: Partial<any>): Promise<any> {
  try {
    const token = await getAuthToken();

    const response = await apiRequest<{ data: any; message?: string }>(
      `${USER_API_PREFIX}/create`,
      "POST",
      {
        body,
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return {
      success: true,
      message: response.message || "",
      data: response.data,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message || "Failed to create user",
        errors: error.errors as Record<string, string[]>,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

export async function updateUser(payload: UserInfo, id: number) {
  const token = await getAuthToken();
  try {
    const response = await apiRequest<UserResponse>(`${USER_API_PREFIX}/${id}`, "PUT", {
      body: payload,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== "success") {
      return {
        success: false,
        message: "Failed to update user",
      };
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.log("response error", error);
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message || "Failed to update user",
        errors: error.errors as Record<string, string[]>,
      };
    }

    return {
      success: false,
      message: "Error occurred in update user",
    };
  }
}

export async function deleteUser(id: number | string): Promise<ApiResponse<null>> {
  return await apiRequest<ApiResponse<null>>(`${USER_API_PREFIX}/${id}`, "DELETE");
}

export async function getIdWiseUser(id: number | string): Promise<ApiResponse<any>> {
  const response = await apiRequest<ApiResponse<any>>(`${USER_API_PREFIX}/${id}`, "GET");
  return response;
}
