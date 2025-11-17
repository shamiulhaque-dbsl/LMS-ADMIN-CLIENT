import type {
  CourseMetadata,
  CourseMetric,
  CourseMetricResponse,
  CourseMetadataFormatted,
} from "@/features/course/types";
import { COURSE_METRIC_TITLE } from "@/features/course/lib/constant";
import { formatEnumOptions } from "@/lib/utils/enumFormatter";

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

const metadataCache = new Map<string, CourseMetadataFormatted>();
export function formatCourseMetadata(metadata: CourseMetadata): {
  [K in keyof CourseMetadata]: { value: string; label: string }[];
} {
  if (metadataCache.has("course")) {
    return metadataCache.get("course")!;
  }

  const formatted = Object.fromEntries(
    Object.entries(metadata).map(([key, values]) => [key, formatEnumOptions(values)])
  ) as CourseMetadataFormatted;

  metadataCache.set("course", formatted);
  return formatted;
}
