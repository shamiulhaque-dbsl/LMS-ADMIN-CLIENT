"use server";

import type {
  AssignmentCreateFormValues,
  Assignment,
  AssignmentList,
  AssignmentSubmission,
} from "@/features/assignment/types/type-matric";
import { ApiError, ApiResponse, apiRequest } from "@/api";
import { cache } from "react";
import { revalidateTag, revalidatePath } from "next/cache";
import { getAuthToken } from "@/lib/cookie";

const ASSIGNMENT_API_PREFIX = "/assignments";

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; message: string; errors?: Record<string, string[]> };

export async function createAssignment(
  body: Partial<AssignmentCreateFormValues>
): Promise<ActionResult<Assignment>> {
  console.log(body);
  try {
    const token = await getAuthToken();

    const response = await apiRequest<{ data: Assignment }>("/assignments", "POST", {
      body,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);

    revalidateTag("assignments");
    revalidateTag("assignments-list");
    revalidatePath("/dashboard/assignments");

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message || "Failed to create assignment",
        errors: error.errors as Record<string, string[]>,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

export const getAssignments = cache(
  async (params?: {
    dateFrom?: string;
    dateTo?: string;
    category?: string;
    instructor?: string;
    status?: string;
    page?: number;
  }): Promise<ApiResponse<AssignmentList>> => {
    const token = await getAuthToken();

    const queryParams = new URLSearchParams();
    if (params?.dateFrom) queryParams.set("dateFrom", params.dateFrom);
    if (params?.dateTo) queryParams.set("dateTo", params.dateTo);
    if (params?.category) queryParams.set("category", params.category);
    if (params?.instructor) queryParams.set("instructor", params.instructor);
    if (params?.status) queryParams.set("status", params.status);
    if (params?.page) queryParams.set("page", params.page.toString());

    const queryString = queryParams.toString();
    const endpoint = `${ASSIGNMENT_API_PREFIX}${queryString ? `?${queryString}` : ""}`;

    return apiRequest<ApiResponse<AssignmentList>>(endpoint, "GET", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 60, // Cache for 60 seconds
        tags: ["assignments", "assignments-list"], // Multiple tags for flexibility
      },
    });
  }
);

export async function getAssignment(id: string | number): Promise<ApiResponse<Assignment>> {
  const token = await getAuthToken();

  return apiRequest<ApiResponse<Assignment>>(`${ASSIGNMENT_API_PREFIX}/${id}`, "GET", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * Update Assignment - Returns standardized result
 */
export async function updateAssignment(
  id: string | number,
  body: Partial<Assignment>
): Promise<ActionResult<Assignment>> {
  try {
    const token = await getAuthToken();

    const response = await apiRequest<{ data: Assignment }>(`/assignments/${id}`, "PUT", {
      body,
      headers: { Authorization: `Bearer ${token}` },
    });

    // Invalidate specific caches
    revalidateTag("assignments");
    revalidateTag("assignments-list");
    revalidateTag(`assignment-${id}`);
    revalidatePath("/dashboard/assignments");
    revalidatePath(`/dashboard/assignments/${id}`);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Update assignment error:", error);

    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message || "Failed to update assignment",
        errors: error.errors as Record<string, string[]>,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

/**
 * Delete Assignment - Returns standardized result
 */
export async function deleteAssignment(id: string | number): Promise<ActionResult<null>> {
  try {
    const token = await getAuthToken();

    await apiRequest<void>(`/assignments/${id}`, "DELETE", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Invalidate caches
    revalidateTag("assignments");
    revalidateTag("assignments-list");
    revalidateTag(`assignment-${id}`);
    revalidatePath("/dashboard/assignments");

    return {
      success: true,
      data: null,
    };
  } catch (error) {
    console.error("Delete assignment error:", error);

    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message || "Failed to delete assignment",
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

export async function getAssignmentWiseSubmission(
  id: string | number
): Promise<ApiResponse<Assignment>> {
  const token = await getAuthToken();

  return apiRequest<ApiResponse<Assignment>>(`${ASSIGNMENT_API_PREFIX}/${id}/submissions`, "GET", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function submissionsGrading(
  id: string | number,
  body: Partial<AssignmentSubmission>
): Promise<ActionResult<AssignmentSubmission>> {
  try {
    const token = await getAuthToken();

    const response = await apiRequest<{ data: AssignmentSubmission }>(
      `/submissions/${id}/grade`,
      "PUT",
      {
        body,
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Invalidate specific caches
    revalidatePath(`/dashboard/assignments/${id}/submissions`);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Update assignment error:", error);

    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message || "Failed to update assignment",
        errors: error.errors as Record<string, string[]>,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
