import type { Course, CourseLesson, CourseModule } from "@/features/course/types";
import { ApiResponse, apiRequest } from "@/api";

const LESSON_API_PREFIX = "/admin/lessons";

export async function createLesson(
  body: Partial<CourseLesson>
): Promise<ApiResponse<CourseLesson>> {
  return apiRequest<ApiResponse<CourseLesson>>(`${LESSON_API_PREFIX}/create`, "POST", {
    body,
  });
}

export async function updateLesson(id: number | string, body: Partial<CourseLesson>) {
  return apiRequest<ApiResponse<CourseLesson>>(`${LESSON_API_PREFIX}/${id}`, "PUT", { body });
}

export async function deleteLesson(id: number | string): Promise<ApiResponse<null>> {
  return apiRequest<ApiResponse<null>>(`${LESSON_API_PREFIX}/${id}`, "DELETE");
}

export async function getLesson(id: number | string): Promise<ApiResponse<CourseLesson>> {
  return apiRequest<ApiResponse<CourseLesson>>(`${LESSON_API_PREFIX}/${id}`, "GET");
}
