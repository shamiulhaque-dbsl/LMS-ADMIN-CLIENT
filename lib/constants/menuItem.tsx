import { MenuItem } from "@/lib/types/menu";
import { Icons } from "@/components/Icons";

export const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard/dashboard",
    icon: <Icons.dashboard size={20} />,
  },

  // ========= Education =========
  {
    id: "courses",
    label: "Courses",
    icon: <Icons.bookOpen size={20} />,
    group: "Education",
    children: [
      { id: "new-courses", label: "New Courses", href: "/dashboard/courses/create" },
      { id: "manage-courses", label: "Manage Courses", href: "/dashboard/courses" },
      { id: "course-category", label: "Course Category", href: "/dashboard/courses/categories" },
      { id: "live-classes", label: "Live Classes", href: "/dashboard/courses/live-classes" },
      {
        id: "live-session-history",
        label: "Live Session History",
        href: "/dashboard/courses/live-session-history",
      },
    ],
  },
  {
    id: "quizzes",
    label: "Quizzes",
    href: "/dashboard/quizzes",
    group: "Education",
    icon: <Icons.clipboard size={20} />,
  },
  {
    id: "certificates",
    label: "Certificates",
    icon: <Icons.award size={20} />,
    group: "Education",
    children: [
      { id: "quiz-certificates", label: "Quiz Certificates", href: "/dashboard/certificates" },
      {
        id: "completion-certificates",
        label: "Completion Certificates",
        href: "/dashboard/certificates",
      },
    ],
  },
  {
    id: "assignments",
    label: "Assignments",
    href: "/dashboard/assignments",
    group: "Education",
    icon: <Icons.fileText size={20} />,
  },
  {
    id: "courses-notices",
    label: "Courses Notices",
    icon: <Icons.bell size={20} />,
    group: "Education",
    children: [
      { id: "new", label: "New", href: "/dashboard/course-notice/create" },
      { id: "list", label: "List", href: "/dashboard/course-notice" },
    ],
  },
  {
    id: "enrollments",
    label: "Enrollment",
    icon: <Icons.users2 size={20} />,
    group: "Education",
    children: [
      {
        id: "add-student-to-course",
        label: "Add Student to Course",
        href: "/dashboard/enrollments/add-student-to-course",
      },
      { id: "history", label: "History", href: "/dashboard/enrollments" },
    ],
  },
  // {
  //   id: "categories",
  //   label: "Categories",
  //   icon: <Icons.folder size={20} />,
  //   group: "Education",
  //   children: [
  //     { id: "new", label: "New", href: "/dashboard/categories/create" },
  //     { id: "list", label: "List", href: "/dashboard/categories" },
  //   ],
  // },
  {
    id: "reviews",
    label: "Reviews",
    href: "/dashboard/reviews",
    group: "Education",
    icon: <Icons.star size={20} />,
  },

  // ========= Users =========
  {
    id: "users",
    label: "Users",
    icon: <Icons.user size={20} />,
    group: "Users",
    children: [
      { id: "new-user", label: "New User", href: "/dashboard/users/create" },
      { id: "all-users", label: "All Users", href: "/dashboard/users" },
      { id: "manage-admin", label: "Manage Admins", href: "/dashboard/users/dashboards" },
      { id: "instructors", label: "Manage Instructors", href: "/dashboard/users/instructors" },
      { id: "students", label: "Manage Students", href: "/dashboard/users/students" },
    ],
  },
  {
    id: "ip-management",
    label: "IP Management",
    icon: <Icons.shield size={20} />,
    group: "Users",
    children: [
      { id: "logins-history", label: "Logins History", href: "/dashboard/users/login-history" },
      { id: "ip-restriction", label: "IP Restriction", href: "/dashboard/users/ip-restriction" },
    ],
  },

  // ========= CRM =========
  {
    id: "contact-messages",
    label: "Contact Messages",
    href: "/dashboard/contacts",
    group: "CRM",
    icon: <Icons.mail size={20} />,
  },
  {
    id: "notice-board",
    label: "Notice Board",
    icon: <Icons.clipboard size={20} />,
    group: "CRM",
    children: [
      { id: "list", label: "List", href: "/dashboard/notices" },
      { id: "new", label: "New", href: "/dashboard/notices/create" },
    ],
  },

  // ========= Content =========
  {
    id: "testimonials",
    label: "Testimonials",
    href: "/dashboard/testimonials",
    group: "Content",
    icon: <Icons.messageSquare size={20} />,
  },

  // ========= Marketing =========
  {
    id: "emails-newsletters",
    label: "Newsletters",
    icon: <Icons.send size={20} />, // better semantic icon
    group: "Marketing",
    children: [
      { id: "list", label: "List", href: "/dashboard/newsletters" },
      { id: "send", label: "Send", href: "/dashboard/newsletters/send" },
      { id: "history", label: "History", href: "/dashboard/newsletters/history" },
    ],
  },

  // ========= Settings =========
  {
    id: "settings",
    label: "Settings",
    href: "/dashboard/settings",
    group: "Settings",
    icon: <Icons.settings size={20} />,
  },
];
