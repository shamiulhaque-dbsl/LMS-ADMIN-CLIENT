import type {
  CourseMetricResponse,
  Course,
  CourseMetadata,
  CourseMetadataFormatted,
} from "@/features/course/types";
import { ApiResponse, apiRequest } from "@/api";
import { formatCourseMetadata } from "@/features/course/lib/utils";

const COURSE_API_PREFIX = "/courses";

export async function getCourseMetric(): Promise<ApiResponse<CourseMetricResponse>> {
  return apiRequest<ApiResponse<CourseMetricResponse>>(
    `${COURSE_API_PREFIX}/metrics/overview`,
    "GET"
  );
}

export async function getCourses(): Promise<ApiResponse<Course[]>> {
  return apiRequest<ApiResponse<Course[]>>(`${COURSE_API_PREFIX}`, "GET");
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

export async function deleteCourse(id: number | string): Promise<ApiResponse<null>> {
  return apiRequest<ApiResponse<null>>(`${COURSE_API_PREFIX}/${id}`, "DELETE");
}
