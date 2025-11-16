export type ID = string | number;
export type STATUS = "active" | "inactive" | "deleted";
type COURSE_TYPE = "blended" | "self-paced" | "live" | "recorded";

export type Course = {
  id: ID;
  title: string;
  description: string;
  slug: string;
  category_id: ID;
  thumbnail_url?: string;
  price: string;
  status: STATUS;
  course_type: COURSE_TYPE;
  uuid: string;
  enrollment_count?: number;
  created_at?: string;
};

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

export type ActionItem =
  | { id: string; label: string; type: "link"; href: string }
  | { id: string; label: string; type: "modal"; modalKey: string }
  | { id: string; label: string; type: "action"; actionKey: string };
