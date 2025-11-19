export type ID = string | number;
export type STATUS = "active" | "inactive" | "deleted" | null | "";
type COURSE_TYPE = "blended" | "self-paced" | "live" | "recorded" | "";
type COURSE_LAVEL = "beginner" | "intermediate" | "advanced" | "";

export type Course = {
  id: ID;
  title: string;
  description: string;
  slug: string;
  category_id: ID;
  thumbnail_url?: string;
  price: string | number;
  status: STATUS;
  course_type: COURSE_TYPE;
  uuid: string;
  enrollment_count?: number;
  created_at?: string;
};

export interface CourseFormData {
  // Basic Info
  title: string;
  description?: string | null;
  longDescription?: string | null;
  courseType: COURSE_TYPE;
  level?: COURSE_LAVEL;
  category: number | null;
  status: STATUS;

  // Info
  duration?: string;
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
  moneyBackDays?: string;
  // Media
  thumbnail?: string;
  videoDemoSource?: string;
  videoDemoUrl?: string;
  images?: string[];

  // Pricing
  price: string | number;
  discountPrice?: string | number;
  currency?: string;
  isPaid?: boolean;
  durationHours?: number | undefined;

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
