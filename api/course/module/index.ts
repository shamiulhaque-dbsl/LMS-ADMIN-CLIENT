import type { Course, CourseModule } from "@/features/course/types";
import { ApiResponse, apiRequest } from "@/api";

const COURSE_MODULE_API_PREFIX = "/course/modules";

export async function createCourseModule(
  body: Partial<CourseModule>
): Promise<ApiResponse<CourseModule>> {
  return apiRequest<ApiResponse<CourseModule>>(`${COURSE_MODULE_API_PREFIX}/create`, "POST", {
    body,
  });
}

export async function updateCourseModule(id: number | string, body: Partial<CourseModule>) {
  return apiRequest<ApiResponse<Course>>(`${COURSE_MODULE_API_PREFIX}/${id}`, "PUT", { body });
}

export async function deleteCourseModule(id: number | string): Promise<ApiResponse<null>> {
  return apiRequest<ApiResponse<null>>(`${COURSE_MODULE_API_PREFIX}/${id}`, "DELETE");
}

export async function getCourseModule(id: number | string): Promise<ApiResponse<Course>> {
  return apiRequest<ApiResponse<Course>>(`${COURSE_MODULE_API_PREFIX}/${id}`, "GET");
}
