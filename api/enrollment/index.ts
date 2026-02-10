"use server";

import { ApiResponse, apiRequest } from "@/api";
import { cache } from "react";
import { getAuthToken } from "@/lib/cookie";
import { EnrollmentResponse } from "@/features/enrollments/types/type-matric";

const ENROLLMENTS_API_PREFIX = "/enrollments/history";

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; message: string; errors?: Record<string, string[]> };

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
