import type {
  CourseMetadata,
  CourseMetric,
  CourseMetricResponse,
  CourseMetadataFormatted,
} from "@/features/course/types";
import { COURSE_METRIC_TITLE } from "@/features/course/lib/constant";
import { formatEnumOptions } from "@/lib/utils/enumFormatter";
import type { Course, CourseFormData, STATUS, COURSE_TYPE } from "@/features/course/types";
import { number } from "zod";

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
 * Map course_modules to a curriculum-friendly structure:
 * We keep each module as a "section" with possible lectures (empty for now).
 */
function mapModulesToSections(modules: any[] | undefined) {
  if (!Array.isArray(modules)) return [];
  return modules.map((m) => ({
    id: m.id,
    title: m.title ?? "",
    description: m.description ?? "",
    sortOrder: m.sort_order ?? m.sortOrder ?? 0,
    lectures: Array.isArray(m.course_lessons) ? m.course_lessons : [],
  }));
}

/**
 * Top-level mapper from API course response to your CourseFormData shape.
 */
export function normalizeCourseToForm(course: Course): CourseFormData {
  // course.course_details is an array (backend shape). Usually there's one object we care about.
  const details =
    Array.isArray(course.course_details) && course.course_details.length > 0
      ? course.course_details[0]
      : null;

  const requirements = safeParseJSON<string[]>(details?.requirements) ?? [];
  const learningOutcomes = safeParseJSON<string[]>(details?.what_you_learn) ?? [];
  const targetAudience = safeParseJSON<string[]>(details?.for_whom) ?? [];

  const faqsParsed = safeParseJSON<{ question: string; answer: string }[]>(details?.faqs) ?? [];
  // backend projects string contains objects with title/description (+maybe image)
  const projectsParsed =
    safeParseJSON<{ title: string; description: string; image?: string }[]>(details?.projects) ??
    [];

  // Some backends provide both `category` and `category_id` — prefer `category_id` if present
  const categoryValue = (course as any).category_id ?? (course as any).category ?? null;

  // Map modules -> curriculum sections
  const sections = mapModulesToSections(course.course_modules);
  console.log("normalizeCourseToForm mapped sections:", sections);

  // Compose normalized form
  const normalized: CourseFormData = {
    title: course.title ?? "",
    description: course.description ?? "",
    longDescription: course.longDescription ?? course.long_description ?? "",
    category: categoryValue,
    level: course.level ?? course.skill_level ?? "",
    courseType: (course.course_type ?? course.courseType ?? "") as COURSE_TYPE,
    status: course.status ?? "",
    // media
    thumbnail: course.thumbnail_url ?? course.thumbnail ?? "",
    videoDemoSource: course.videoDemoSource ?? course.video_demo_source ?? "",
    videoDemoUrl: course.videoDemoUrl ?? course.video_demo_url ?? "",
    // details
    durationHours: (course.duration_hours ?? course.duration ?? undefined) as any,
    requirements,
    learningOutcomes,
    targetAudience,
    faqs: faqsParsed,
    projects: projectsParsed,
    moneyBackDays: details?.money_back_days ?? null,
    // pricing & features
    price: typeof course.price === "number" ? course.price : parseFloat(course.price ?? "0") || 0,
    discountPrice:
      typeof course.discountPrice === "number"
        ? course.discountPrice
        : parseFloat((course.discountPrice ?? course.selling_price ?? 0) as any) || 0,
    isFree: Boolean(course.isFree ?? course.is_free),
    numberOfMonths: (course.numberOfMonths ?? course.number_of_months ?? 0) as any,
    courseForum: Boolean(course.courseForum ?? course.course_forum),
    downloadableContent: Boolean(course.downloadableContent ?? course.downloadable_content),
    certificateAvailable: Boolean(course.certificateAvailable ?? course.certificate_available),
    // seo
    // metaTitle: course.metaTitle ?? course.meta_title ?? "",
    // metaDescription: course.metaDescription ?? course.meta_description ?? "",
    // metaKeywords:
    //   typeof course.metaKeywords === "string"
    //     ? course.metaKeywords
    //     : Array.isArray(course.metaKeywords)
    //       ? (course.metaKeywords as string[]).join(", ")
    //       : (course.metaKeywords ?? ""),
    // curriculum (sections)
    sections,
    // keep backward-compatible fields if your form expects them
    // NOTE: depending on your CourseFormData type adjust field names
  };

  return normalized;
}
