import type {
  CourseMetadata,
  CourseMetric,
  CourseMetricResponse,
  CourseMetadataFormatted,
} from "@/features/course/types";
import { COURSE_METRIC_TITLE } from "@/features/course/lib/constant";
import { formatEnumOptions } from "@/lib/utils/enumFormatter";
import type { Course, CourseFormData } from "@/features/course/types";

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
    instructor_id: formData?.instructor != null ? Number(formData.instructor) : null,
    category_id: formData?.category != null ? Number(formData.category) : null,
    skill_level: formData?.level,
    price: formData?.price,
    number_of_months: formData?.numberOfMonths,
    thumbnail_url: formData?.thumbnail,
    video_demo_source: formData?.videoDemoSource,
    video_demo_url: formData?.videoDemoUrl,
    duration_hours: formData?.durationHours != null ? Number(formData.durationHours) : null,
    status: formData?.status,
    course_type: formData?.courseType,
    is_free: formData?.isFree,
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

/**
 * Parse a value that might be:
 * - a JSON-encoded string (e.g. '["a","b"]' or '[{"question":"..."}]')
 * - an already parsed object/array
 * - null/undefined
 */
function safeParseJSON<T>(value: any): T | undefined {
  if (value === null || value === undefined || value === "") return undefined;
  if (typeof value === "object") return value as T;
  try {
    return JSON.parse(value as string) as T;
  } catch {
    return undefined;
  }
}

/**
 * Top-level mapper from API course response to your CourseFormData shape.
 */
export function normalizeCourseToForm(course: Course): CourseFormData {
  const details =
    Array.isArray(course.course_details) && course.course_details.length > 0
      ? course.course_details[0]
      : null;

  const requirements = safeParseJSON<string[]>(details?.requirements) ?? [];
  const learningOutcomes = safeParseJSON<string[]>(details?.what_you_learn) ?? [];
  const targetAudience = safeParseJSON<string[]>(details?.for_whom) ?? [];

  const faqsParsed = safeParseJSON<{ question: string; answer: string }[]>(details?.faqs) ?? [];
  const projectsParsed =
    safeParseJSON<{ title: string; description: string; image?: string }[]>(details?.projects) ??
    [];

  // Some backends provide both `category` and `category_id` — prefer `category_id` if present
  const categoryValue = (course as any).category_id ?? (course as any).category ?? null;

  // Compose normalized form
  const normalized: CourseFormData = {
    title: course.title ?? "",
    description: course.description ?? "",
    longDescription: course.long_description ?? "", // FIXED
    category: course.category_id ?? null,
    level: course.skill_level ?? "",
    courseType: course.course_type ?? "",
    status: course.status ?? "",

    // media
    thumbnail: course.thumbnail_url ?? "",
    videoDemoSource: course.video_demo_source ?? "",
    videoDemoUrl: course.video_demo_url ?? "",

    // details
    durationHours: course.duration_hours ?? undefined,
    requirements,
    learningOutcomes,
    targetAudience,
    faqs: faqsParsed,
    projects: projectsParsed,
    moneyBackDays: details?.money_back_days ?? null,

    // pricing & features
    price: parseFloat(course.price ?? "0"),
    discountPrice: parseFloat(course.selling_price ?? "0"),
    isFree: !!course.is_free,
    expiryPeriod: course.number_of_months === 1 ? "lifetime" : "limited",
    numberOfMonths: course.number_of_months ?? 0,
    courseForum: !!course.course_forum,
    downloadableContent: !!course.downloadable_content,
    certificateAvailable: !!course.certificate_available,
  };

  return normalized;
}
