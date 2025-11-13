import type { CourseMetricResponse } from "@/features/course/types";
import { ApiResponse, apiRequest } from "@/api";

const COURSE_API_PREFIX = "/courses";

export async function getCourseMetric(): Promise<ApiResponse<CourseMetricResponse>> {
  return apiRequest<ApiResponse<CourseMetricResponse>>(
    `${COURSE_API_PREFIX}/metrics/overview`,
    "GET"
  );
}
