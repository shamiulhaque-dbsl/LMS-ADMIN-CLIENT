type CourseTabStatus = "active" | "inactive";

export const COURSE_FORM_TABS: {
  id: string;
  label: string;
  showInEdit?: boolean;
  status: CourseTabStatus;
}[] = [
  { id: "basic", label: "Basic", status: "active" },
  { id: "info", label: "Info", status: "active" },
  { id: "pricing", label: "Pricing", status: "active" },
  { id: "media", label: "Media", status: "active" },
  { id: "seo", label: "SEO", status: "inactive" }, // hidden
  { id: "curriculum", label: "Curriculum", showInEdit: true, status: "active" },
  { id: "finish", label: "Finish & Submit", status: "active" },
];

export const COURSE_METRIC_TITLE = {
  ACTIVE_COURSES: "Active Courses",
  UPCOMING_COURSES: "Upcoming Courses",
  PENDING_COURSES: "Pending Courses",
  FREE_COURSES: "Free Courses",
  PAID_COURSES: "Paid Courses",
} as const;
