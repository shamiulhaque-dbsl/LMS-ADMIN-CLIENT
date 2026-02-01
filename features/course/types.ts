export type ID = string | number;
export type STATUS = "active" | "inactive" | "deleted" | null | "";
export type COURSE_TYPE = "blended" | "self-paced" | "live" | "recorded" | "";
type COURSE_LAVEL = "beginner" | "intermediate" | "advanced" | "";

export interface Course {
  id: number;
  uuid: string;
  title: string;
  slug?: string;
  description?: string | null;
  long_description?: string | null;
  category_id: number;
  category_name?: string;
  skill_level?: COURSE_LAVEL;
  price?: string | null; // Decimal stored as string
  selling_price?: string | null;
  thumbnail_url?: string | null;
  video_demo_source?: "youtube" | "vimeo" | "upload" | null;
  video_demo_url?: string | null;
  duration_hours?: number | null;
  status?: STATUS;
  course_type?: COURSE_TYPE;
  is_free?: boolean | null;
  sort_order?: number | null;
  rating?: string | number | null;
  enrollment_count?: number | null;
  course_forum?: boolean | null;
  downloadable_content?: boolean | null;
  expiry_period?: boolean | null;
  number_of_months?: number | null;
  certificate_available?: boolean | null;
  estimated_completion_time?: number | null;
  tags?: string | null;
  created_at: string;
  updated_at: string;
  published_at?: string | null;
  deleted_at?: string | null;

  assignments?: Assignment[];
  certificates?: Certificate[];
  course_details?: CourseDetailsApiFormat;
  course_categories?: CourseCategory;
  course_instructors?: CourseInstructor[];
  course_modules?: CourseModule[];
  courseModules?: CourseModule[];
  course_ratings?: CourseRating[];
  enrollments?: Enrollment[];
  forums?: Forum[];
  live_sessions?: LiveSession[];
  payments?: Payment[];
}

export type CourseDetails = {
  requirements?: string[] | null;
  what_you_learn?: string[] | null;
  target_audience?: string[] | null;
  faqs?:
    | {
        question: string;
        answer: string;
      }[]
    | null;
  projects?:
    | {
        title: string;
        image?: string;
        description: string;
      }[]
    | null;
  duration?: string;
  money_back_days?: string | null;
  for_whom?: string[] | null;
};

export type CourseDetailsApiFormat = {
  requirements?: string;
  what_you_learn?: string;
  for_whom?: string;
  faqs?: {
    question: string;
    answer: string;
  }[];
  projects?: {
    title: string;
    image?: string;
    description: string;
  }[];
  duration?: string;
  money_back_days?: null | number;
};

export interface CourseModule {
  id: ID;
  title: string;
  description?: string | null;
  sort_order?: number | null;
  status?: "draft" | "published" | "archived";
  course_lessons?: CourseLesson[];
  lessons: CourseLesson[];
  course_id?: ID;
  deleted_at?: string | null;
}

export interface CourseLesson {
  id: ID;
  module_id?: ID;
  title: string;
  description?: string | null;
  content_type: string;
  content_url?: string | null;
  notes?: string | null;
  duration?: string | null;
  sort_order?: number | null;
  is_preview?: number | null;
  deleted_at?: string | null;
}

export interface LessonFormData {
  title: string;
  description?: string | null;
  moduleId?: ID;
  contentType: string;
  contentUrl?: string | null;
  notes?: string | null;
  course_id?: ID;
  duration?: string | null;
  isPreview?: number | null;
  deleted_at?: string | null;
}

export interface CourseResource {
  id: number;
  module_id?: number | null;
  lesson_id?: number | null;
  resources_type: "pdf" | "image" | "video" | "audio" | "link";
  resource_url?: string | null;
  title?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Assignment {
  id: number;
}
export interface Certificate {
  id: number;
}
export interface CourseDetail {
  id: number;
}
export interface CourseInstructor {
  id: number;
}

export interface CourseCategory {
  id: number;
  name: string;
}
export interface CourseRating {
  id: number;
}
export interface Enrollment {
  id: number;
}
export interface Forum {
  id: number;
}
export interface LiveSession {
  id: number;
}
export interface Payment {
  id: number;
}

export interface Quiz {
  id: number;
}

export interface CourseFormData {
  // Basic Info
  title: string;
  description?: string | null;
  longDescription?: string | null;
  courseType: COURSE_TYPE;
  level?: COURSE_LAVEL;
  category: number | null;
  instructor?: number | null;
  status: STATUS;

  // Info
  requirements?: string[] | null;
  learningOutcomes?: string[] | null;
  targetAudience?: string[] | null;
  faqs:
    | {
        question: string;
        answer: string;
      }[]
    | undefined;
  projects:
    | {
        title: string;
        image?: string;
        description: string;
      }[]
    | undefined;
  moneyBackDays?: string | null;
  // Media
  thumbnail?: string;
  videoDemoSource?: string;
  videoDemoUrl?: string;
  images?: string[];

  // Pricing
  price: string | number;
  discountPrice?: string | number;
  isFree?: boolean;
  durationHours?: number | undefined;
  numberOfMonths?: number;
  expiryPeriod?: string | number;

  // SEO
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;

  // Features
  courseForum?: boolean;
  downloadableContent?: boolean;
  certificateAvailable?: boolean;
}

export type CourseMetricResponse = {
  activeCourses: number;
  upcomingCourses: number;
  pendingCourses: number;
  freeCourses: number;
  paidCourses: number;
};

export type CourseMetric = {
  title: string;
  value: string | number;
};

export type ActionItem =
  | { id: string; label: string; type: "link"; href: string }
  | { id: string; label: string; type: "modal"; modalKey: string }
  | { id: string; label: string; type: "action"; actionKey: string };

// Course Metadata
export interface CourseMetadata {
  courseResourcesType: string[];
  lessonContentType: string[];
  moduleStatus: string[];
  videoDemoSources: string[];
  courseStatus: string[];
  courseTypes: string[];
  coursesSkillLevels: string[];
}

export type CourseResourceType = CourseMetadata["courseResourcesType"][number];
export type CourseStatus = CourseMetadata["courseStatus"][number];
export type CourseType = CourseMetadata["courseTypes"][number];
export type VideoDemoSource = CourseMetadata["videoDemoSources"][number];
export type CourseLevel = CourseMetadata["coursesSkillLevels"][number];

export type CourseMetadataFormatted = {
  [k in keyof CourseMetadata]: { value: string; label: string }[];
};
