export const COURSE_FORM_TABS = [
  { id: "basic", label: "Basic", showInEdit: false },
  { id: "info", label: "Info", showInEdit: false },
  { id: "pricing", label: "Pricing", showInEdit: false },
  { id: "media", label: "Media", showInEdit: false },
  { id: "seo", label: "SEO", showInEdit: false },
  { id: "curriculum", label: "Curriculum", showInEdit: true },
  { id: "finish", label: "Finish & Submit" },
];

export const COURSE_METRIC_TITLE = {
  ACTIVE_COURSES: "Active Courses",
  UPCOMING_COURSES: "Upcoming Courses",
  PENDING_COURSES: "Pending Courses",
  FREE_COURSES: "Free Courses",
  PAID_COURSES: "Paid Courses",
} as const;
