"use server";

import type {
  CourseMetricResponse,
  Course,
  CourseMetadata,
  CourseMetadataFormatted,
  CourseFormData,
} from "@/features/course/types";
import { ApiError, ApiResponse, apiRequest } from "@/api";
import { formatCourseMetadata } from "@/features/course/lib/utils";
import { getAuthToken } from "@/lib/cookie";

const COURSE_API_PREFIX = "/admin/courses";

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; message: string; errors?: Record<string, string[]> };

export async function getCourseMetric(): Promise<ApiResponse<CourseMetricResponse>> {
  const token = await getAuthToken();

  return apiRequest<ApiResponse<CourseMetricResponse>>(
    `${COURSE_API_PREFIX}/metrics/overview`,
    "GET",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function getCourses(): Promise<ApiResponse<Course[]>> {
  const token = await getAuthToken();
  return apiRequest<ApiResponse<Course[]>>(`${COURSE_API_PREFIX}`, "GET", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getCoursesForSelect(): Promise<ApiResponse<Course[]>> {
  return apiRequest<ApiResponse<Course[]>>(`${COURSE_API_PREFIX}/select/options`, "GET");
}

export async function getCourseMetadata(): Promise<ApiResponse<CourseMetadata>> {
  return apiRequest<ApiResponse<CourseMetadata>>(`${COURSE_API_PREFIX}/config/metadata`, "GET");
}

export async function getFormattedCourseMetadata(): Promise<ApiResponse<CourseMetadataFormatted>> {
  const response = await apiRequest<ApiResponse<CourseMetadata>>(
    `${COURSE_API_PREFIX}/config/metadata`,
    "GET"
  );

  if (!response.data) return { ...response, data: {} as CourseMetadataFormatted };
  const formatted = formatCourseMetadata(response.data);
  return { ...response, data: formatted };
}

export async function createCourse(body: Partial<CourseFormData>): Promise<ApiResponse<Course>> {
  return apiRequest<ApiResponse<Course>>(`${COURSE_API_PREFIX}/create`, "POST", { body });
}

export async function updateCourse(id: number | string, body: Partial<CourseFormData>) {
  return apiRequest<ApiResponse<Course>>(`${COURSE_API_PREFIX}/${id}`, "PUT", { body });
}

export async function deleteCourse(id: number | string): Promise<ApiResponse<null>> {
  return apiRequest<ApiResponse<null>>(`${COURSE_API_PREFIX}/${id}`, "DELETE");
}

export async function getCourse(id: number | string): Promise<ApiResponse<Course>> {
  return apiRequest<ApiResponse<Course>>(`${COURSE_API_PREFIX}/${id}`, "GET");
}
