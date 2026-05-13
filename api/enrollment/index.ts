"use server";

import { ApiResponse, ApiError, apiRequest } from "@/api";
import { cache } from "react";
import { getAuthToken } from "@/lib/cookie";
import { EnrollmentResponse } from "@/features/enrollments/types/type-matric";

const ENROLLMENTS_API_PREFIX = "/enrollments/history";
const ENROLLMENTS_CREATE_PREFIX = "/enrollments/free";

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; message: string; errors?: Record<string, string[]> };

export interface EnrollStudentPayload {
  student_id: number;
  courseId: number;
  enrolled_type: "free" | "paid" | "cash" | "scholarship";
  role: "admin" | "student" | "instructor";
}

export async function getStudentById(
  id: number
): Promise<ActionResult<{ id: number; name?: string; email?: string; avatar_url?: string }>> {
  try {
    const token = await getAuthToken();
    const response = await apiRequest<
      ApiResponse<{
        id: number;
        name?: string;
        email?: string;
        avatar_url?: string;
        first_name?: string;
        last_name?: string;
      }>
    >(`/student/${id}`, "GET", { headers: { Authorization: `Bearer ${token}` } });
    if (!response.data) return { success: false, message: "Student not found" };
    const user = response.data;
    return {
      success: true,
      data: {
        id: user.id,
        name: user.name || `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() || undefined,
        email: user.email,
        avatar_url: user.avatar_url,
      },
    };
  } catch {
    return { success: false, message: "Student not found" };
  }
}

export async function enrollStudentToCourse(
  body: EnrollStudentPayload
): Promise<ActionResult<unknown>> {
  try {
    const token = await getAuthToken();
    console.log("Enrollment payload6521:", body);
    const response = await apiRequest<{ data: unknown; message?: string }>(
      `${ENROLLMENTS_CREATE_PREFIX}`,
      "POST",
      {
        body,
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message || "Failed to enroll student",
        errors: error.errors as Record<string, string[]>,
      };
    }
    return { success: false, message: "An unexpected error occurred. Please try again." };
  }
}

export const getEnrollments = cache(
  async (params?: {
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<EnrollmentResponse>> => {
    const token = await getAuthToken();
    const queryParams = new URLSearchParams();
    if (params?.dateFrom) queryParams.set("from", params.dateFrom);
    if (params?.dateTo) queryParams.set("to", params.dateTo);
    if (params?.page) queryParams.set("page", params.page.toString());
    if (params?.limit) queryParams.set("limit", params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = `${ENROLLMENTS_API_PREFIX}${queryString ? `?${queryString}` : ""}`;
    return apiRequest<ApiResponse<EnrollmentResponse>>(endpoint, "GET", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 60, // Cache for 60 seconds
        tags: ["enrollments"], // Multiple tags for flexibility
      },
    });
  }
);
