import { MenuItem } from "@/lib/types/menu";
import { Icons } from "@/components/Icons";

export const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <Icons.dashboard size={20} />,
  },

  // ========= Education =========
  {
    id: "courses",
    label: "Courses",
    icon: <Icons.bookOpen size={20} />,
    group: "Education",
    children: [
      { id: "new-courses", label: "New Courses", href: "/admin/courses/create" },
      { id: "manage-courses", label: "Manage Courses", href: "/admin/courses" },
      { id: "course-category", label: "Course Category", href: "/admin/courses/categories" },
      { id: "live-classes", label: "Live Classes", href: "/admin/courses/live-classes" },
      {
        id: "live-session-history",
        label: "Live Session History",
        href: "/admin/courses/live-session-history",
      },
    ],
  },
  {
    id: "quizzes",
    label: "Quizzes",
    href: "/admin/quizzes",
    group: "Education",
    icon: <Icons.clipboard size={20} />,
  },
  {
    id: "certificates",
    label: "Certificates",
    icon: <Icons.award size={20} />,
    group: "Education",
    children: [
      { id: "quiz-certificates", label: "Quiz Certificates", href: "/admin/certificates" },
      {
        id: "completion-certificates",
        label: "Completion Certificates",
        href: "/admin/certificates",
      },
    ],
  },
  {
    id: "assignments",
    label: "Assignments",
    href: "/admin/assignments",
    group: "Education",
    icon: <Icons.fileText size={20} />,
  },
  {
    id: "courses-notices",
    label: "Courses Notices",
    icon: <Icons.bell size={20} />,
    group: "Education",
    children: [
      { id: "new", label: "New", href: "/admin/course-notice/create" },
      { id: "list", label: "List", href: "/admin/course-notice" },
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
        href: "/admin/enrollments/add-student-to-course",
      },
      { id: "history", label: "History", href: "/admin/enrollments" },
    ],
  },
  // {
  //   id: "categories",
  //   label: "Categories",
  //   icon: <Icons.folder size={20} />,
  //   group: "Education",
  //   children: [
  //     { id: "new", label: "New", href: "/admin/categories/create" },
  //     { id: "list", label: "List", href: "/admin/categories" },
  //   ],
  // },
  {
    id: "reviews",
    label: "Reviews",
    href: "/admin/reviews",
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
      { id: "new-user", label: "New User", href: "/admin/users/create" },
      { id: "all-users", label: "All Users", href: "/admin/users" },
      { id: "manage-admin", label: "Manage Admins", href: "/admin/users/admins" },
      { id: "instructors", label: "Manage Instructors", href: "/admin/users/instructors" },
      { id: "students", label: "Manage Students", href: "/admin/users/students" },
    ],
  },
  {
    id: "ip-management",
    label: "IP Management",
    icon: <Icons.shield size={20} />,
    group: "Users",
    children: [
      { id: "logins-history", label: "Logins History", href: "/admin/users/login-history" },
      { id: "ip-restriction", label: "IP Restriction", href: "/admin/users/ip-restriction" },
    ],
  },

  // ========= CRM =========
  {
    id: "contact-messages",
    label: "Contact Messages",
    href: "/admin/contacts",
    group: "CRM",
    icon: <Icons.mail size={20} />,
  },
  {
    id: "notice-board",
    label: "Notice Board",
    icon: <Icons.clipboard size={20} />,
    group: "CRM",
    children: [
      { id: "list", label: "List", href: "/admin/notices" },
      { id: "new", label: "New", href: "/admin/notices/create" },
    ],
  },

  // ========= Content =========
  {
    id: "testimonials",
    label: "Testimonials",
    href: "/admin/testimonials",
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
      { id: "list", label: "List", href: "/admin/newsletters" },
      { id: "send", label: "Send", href: "/admin/newsletters/send" },
      { id: "history", label: "History", href: "/admin/newsletters/history" },
    ],
  },

  // ========= Settings =========
  {
    id: "settings",
    label: "Settings",
    href: "/admin/settings",
    group: "Settings",
    icon: <Icons.settings size={20} />,
  },
];
