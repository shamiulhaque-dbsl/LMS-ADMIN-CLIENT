import type { CourseMetric, CourseMetricResponse } from "@/features/course/types";
import { COURSE_METRIC_TITLE } from "@/features/course/lib/constant";

export function formatCourseMetrics(data: CourseMetricResponse | null): CourseMetric[] {
  if (!data) return [];

  return [
    { title: COURSE_METRIC_TITLE.ACTIVE_COURSES, value: data.activeCourses },
    { title: COURSE_METRIC_TITLE.UPCOMING_COURSES, value: data.upcomingCourses },
    { title: COURSE_METRIC_TITLE.PENDING_COURSES, value: data.pendingCourses },
    { title: COURSE_METRIC_TITLE.FREE_COURSES, value: data.freeCourses },
    { title: COURSE_METRIC_TITLE.PAID_COURSES, value: data.paidCourses },
  ];
}
