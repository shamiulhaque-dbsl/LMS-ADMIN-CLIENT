import type {
  CourseMetadata,
  CourseMetric,
  CourseMetricResponse,
  CourseMetadataFormatted,
} from "@/features/course/types";
import { COURSE_METRIC_TITLE } from "@/features/course/lib/constant";
import { formatEnumOptions } from "@/lib/utils/enumFormatter";
import { CourseFormData } from "@/features/course/types";

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

export function transformToApiFormat(formData: CourseFormData) {
  return {
    title: formData?.title,
    description: formData?.description,
    long_description: formData?.longDescription,
    category_id: formData?.category != null ? Number(formData.category) : null,
    skill_level: formData?.level,
    price: formData?.price,
    thumbnail_url: formData?.thumbnail,
    video_demo_source: formData?.videoDemoSource,
    video_demo_url: formData?.videoDemoUrl,
    duration_hours: formData?.durationHours != null ? Number(formData.durationHours) : null,
    status: formData?.status,
    course_type: formData?.courseType,
    is_paid: formData?.isPaid,
    course_forum: formData?.courseForum,
    downloadable_content: formData?.downloadableContent,
    certificate_available: formData?.certificateAvailable,
    tags: formData?.metaKeywords,
    course_details: {
      requirements: formData?.requirements,
      what_you_learn: formData?.learningOutcomes,
      for_whom: formData?.targetAudience,
      faqs: formData?.faqs,
      projects: formData?.projects,
      money_back_days: formData?.moneyBackDays,
    },
  };
}
