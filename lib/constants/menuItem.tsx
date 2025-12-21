import { MenuItem } from "@/lib/types/menu";
import { Icons } from "@/components/Icons";
import { Role } from "./role";

export const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard/dashboard",
    icon: <Icons.dashboard size={20} />,
    roles: [Role.ADMIN, Role.INSTRUCTOR],
  },

  // ========= Education =========
  {
    id: "courses",
    label: "Courses",
    icon: <Icons.bookOpen size={20} />,
    group: "Education",
    roles: ["admin", "instructor"],
    children: [
      {
        id: "new-courses",
        label: "New Courses",
        href: "/dashboard/courses/create",
        roles: [Role.ADMIN, Role.INSTRUCTOR],
      },
      {
        id: "manage-courses",
        label: "Manage Courses",
        href: "/dashboard/courses",
        roles: [Role.ADMIN, Role.INSTRUCTOR],
      },
      {
        id: "course-category",
        label: "Course Category",
        href: "/dashboard/courses/categories",
        roles: [Role.ADMIN],
      },
      {
        id: "live-classes",
        label: "Live Classes",
        href: "/dashboard/courses/live-classes",
        roles: [Role.ADMIN, Role.INSTRUCTOR],
      },
      {
        id: "live-session-history",
        label: "Live Session History",
        href: "/dashboard/courses/live-session-history",
        roles: ["admin", "instructor"],
      },
    ],
  },
  {
    id: "quizzes",
    label: "Quizzes",
    href: "/dashboard/quizzes",
    group: "Education",
    icon: <Icons.clipboard size={20} />,
    roles: ["admin", "instructor"],
  },
  {
    id: "certificates",
    label: "Certificates",
    icon: <Icons.award size={20} />,
    group: "Education",
    roles: ["admin", "instructor"],
    children: [
      {
        id: "quiz-certificates",
        label: "Quiz Certificates",
        href: "/dashboard/certificates",
        roles: ["admin", "instructor"],
      },
      {
        id: "completion-certificates",
        label: "Completion Certificates",
        href: "/dashboard/certificates",
        roles: ["admin", "instructor"],
      },
    ],
  },
  {
    id: "assignments",
    label: "Assignments",
    href: "/dashboard/assignments",
    group: "Education",
    icon: <Icons.fileText size={20} />,
    roles: ["admin", "instructor"],
  },
  {
    id: "courses-notices",
    label: "Courses Notices",
    icon: <Icons.bell size={20} />,
    group: "Education",
    children: [
      {
        id: "new",
        label: "New",
        href: "/dashboard/course-notice/create",
        roles: ["admin", "instructor"],
      },
      {
        id: "list",
        label: "List",
        href: "/dashboard/course-notice",
        roles: ["admin", "instructor"],
      },
    ],
    roles: ["admin", "instructor"],
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
        roles: ["admin"],
      },
      {
        id: "history",
        label: "History",
        href: "/dashboard/enrollments",
        roles: ["admin", "instructor"],
      },
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
    roles: ["admin", "instructor"],
  },

  // ========= Users =========
  {
    id: "users",
    label: "Users",
    icon: <Icons.user size={20} />,
    group: "Users",
    roles: ["admin"],
    children: [
      { id: "new-user", label: "New User", href: "/dashboard/users/create", roles: ["admin"] },
      { id: "all-users", label: "All Users", href: "/dashboard/users", roles: ["admin"] },
      {
        id: "manage-admin",
        label: "Manage Admins",
        href: "/dashboard/users/dashboards",
        roles: ["admin"],
      },
      {
        id: "instructors",
        label: "Manage Instructors",
        href: "/dashboard/users/instructors",
        roles: ["admin"],
      },
      {
        id: "students",
        label: "Manage Students",
        href: "/dashboard/users/students",
        roles: ["admin"],
      },
    ],
  },
  {
    id: "ip-management",
    label: "IP Management",
    icon: <Icons.shield size={20} />,
    group: "Users",
    roles: ["admin"],
    children: [
      {
        id: "logins-history",
        label: "Logins History",
        href: "/dashboard/users/login-history",
        roles: ["admin"],
      },
      {
        id: "ip-restriction",
        label: "IP Restriction",
        href: "/dashboard/users/ip-restriction",
        roles: ["admin"],
      },
    ],
  },

  // ========= CRM =========
  {
    id: "contact-messages",
    label: "Contact Messages",
    href: "/dashboard/contacts",
    group: "CRM",
    icon: <Icons.mail size={20} />,
    roles: ["admin"],
  },
  {
    id: "notice-board",
    label: "Notice Board",
    icon: <Icons.clipboard size={20} />,
    group: "CRM",
    roles: ["admin"],
    children: [
      { id: "list", label: "List", href: "/dashboard/notices", roles: ["admin"] },
      { id: "new", label: "New", href: "/dashboard/notices/create", roles: ["admin"] },
    ],
  },

  // ========= Content =========
  {
    id: "testimonials",
    label: "Testimonials",
    href: "/dashboard/testimonials",
    group: "Content",
    icon: <Icons.messageSquare size={20} />,
    roles: ["admin"],
  },

  // ========= Marketing =========
  {
    id: "emails-newsletters",
    label: "Newsletters",
    icon: <Icons.send size={20} />,
    group: "Marketing",
    roles: ["admin"],
    children: [
      { id: "list", label: "List", href: "/dashboard/newsletters", roles: ["admin"] },
      { id: "send", label: "Send", href: "/dashboard/newsletters/send", roles: ["admin"] },
      { id: "history", label: "History", href: "/dashboard/newsletters/history", roles: ["admin"] },
    ],
  },

  // ========= Settings =========
  {
    id: "settings",
    label: "Settings",
    href: "/dashboard/settings",
    group: "Settings",
    icon: <Icons.settings size={20} />,
    roles: ["admin"],
  },
];
