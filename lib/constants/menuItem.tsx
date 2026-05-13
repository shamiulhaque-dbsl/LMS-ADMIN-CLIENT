import { MenuItem } from "@/lib/types/menu";
import { Icons } from "@/components/Icons";
import { Role } from "./role";
import { ROUTES } from "./routes";

export const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: ROUTES.DASHBOARD,
    icon: <Icons.dashboard size={20} />,
    roles: [Role.ADMIN, Role.INSTRUCTOR],
  },

  // ========= Education =========
  {
    id: "courses",
    label: "Courses",
    icon: <Icons.bookOpen size={20} />,
    group: "Education",
    roles: [Role.ADMIN, Role.INSTRUCTOR],
    children: [
      {
        id: "new-courses",
        label: "New Courses",
        href: ROUTES.COURSES.CREATE,
        roles: [Role.ADMIN, Role.INSTRUCTOR],
      },
      {
        id: "manage-courses",
        label: "Manage Courses",
        href: ROUTES.COURSES.LIST,
        roles: [Role.ADMIN, Role.INSTRUCTOR],
      },
      {
        id: "course-category",
        label: "Course Category",
        href: ROUTES.COURSES.CATEGORIES,
        roles: [Role.ADMIN],
      },
      {
        id: "live-classes",
        label: "Live Classes",
        href: ROUTES.COURSES.LIVE_CLASSES,
        roles: [Role.ADMIN, Role.INSTRUCTOR],
      },
      {
        id: "live-session-history",
        label: "Live Classes History",
        href: ROUTES.COURSES.LIVE_HISTORY,
        roles: [Role.INSTRUCTOR],
      },
    ],
  },
  {
    id: "quizzes",
    label: "Quizzes",
    href: ROUTES.QUIZZES.LIST,
    group: "Education",
    icon: <Icons.clipboard size={20} />,
    roles: [Role.ADMIN, Role.INSTRUCTOR],
  },
  {
    id: "certificates",
    label: "Certificates",
    icon: <Icons.award size={20} />,
    group: "Education",
    roles: [Role.ADMIN],
    children: [
      {
        id: "quiz-certificates",
        label: "Quiz Certificates",
        href: ROUTES.CERTIFICATES.QUIZ,
        roles: [Role.ADMIN],
      },
      {
        id: "completion-certificates",
        label: "Completion Certificates",
        href: ROUTES.CERTIFICATES.COMPLETION,
        roles: [Role.ADMIN],
      },
    ],
  },
  {
    id: "assignments",
    label: "Assignments",
    href: ROUTES.ASSIGNMENTS.LIST,
    group: "Education",
    icon: <Icons.fileText size={20} />,
    roles: [Role.ADMIN, Role.INSTRUCTOR],
  },
  {
    id: "courses-notices",
    label: "Courses Notices",
    icon: <Icons.bell size={20} />,
    group: "Education",
    roles: [Role.ADMIN, Role.INSTRUCTOR],
    children: [
      {
        id: "new",
        label: "New",
        href: ROUTES.COURSE_NOTICES.NEW,
        roles: [Role.ADMIN, Role.INSTRUCTOR],
      },
      {
        id: "list",
        label: "List",
        href: ROUTES.COURSE_NOTICES.LIST,
        roles: [Role.ADMIN, Role.INSTRUCTOR],
      },
    ],
  },
  {
    id: "enrollments",
    label: "Enrollment",
    icon: <Icons.users2 size={20} />,
    group: "Education",
    roles: [Role.ADMIN, Role.INSTRUCTOR],
    children: [
      {
        id: "add-student-to-course",
        label: "Add Student to Course",
        href: ROUTES.ENROLLMENTS.ADD,
        roles: [Role.ADMIN],
      },
      {
        id: "history",
        label: "History",
        href: ROUTES.ENROLLMENTS.HISTORY,
        roles: [Role.ADMIN, Role.INSTRUCTOR],
      },
    ],
  },
  {
    id: "reviews",
    label: "Reviews",
    href: ROUTES.REVIEWS,
    group: "Education",
    icon: <Icons.star size={20} />,
    roles: [Role.ADMIN, Role.INSTRUCTOR],
  },

  // ========= Users =========
  {
    id: "users",
    label: "Users",
    icon: <Icons.user size={20} />,
    group: "Users",
    roles: [Role.ADMIN],
    children: [
      { id: "new-user", label: "New User", href: ROUTES.USERS.CREATE, roles: [Role.ADMIN] },
      { id: "all-users", label: "All Users", href: ROUTES.USERS.LIST, roles: [Role.ADMIN] },
      // {
      //   id: "manage-admin",
      //   label: "Manage Admins",
      //   href: ROUTES.USERS.DASHBOARDS,
      //   roles: [Role.ADMIN],
      // },
      // {
      //   id: "instructors",
      //   label: "Manage Instructors",
      //   href: ROUTES.USERS.INSTRUCTORS,
      //   roles: [Role.ADMIN],
      // },
      {
        id: "students",
        label: "Manage Students",
        href: ROUTES.USERS.STUDENTS,
        roles: [Role.ADMIN],
      },
    ],
  },
  // {
  //   id: "ip-management",
  //   label: "IP Management",
  //   icon: <Icons.shield size={20} />,
  //   group: "Users",
  //   roles: [Role.ADMIN],
  //   children: [
  //     {
  //       id: "logins-history",
  //       label: "Logins History",
  //       href: ROUTES.LOGIN_HISTORY,
  //       roles: [Role.ADMIN],
  //     },
  //     {
  //       id: "ip-restriction",
  //       label: "IP Restriction",
  //       href: ROUTES.IP_RESTRICTION,
  //       roles: [Role.ADMIN],
  //     },
  //   ],
  // },

  // ========= CRM =========
  // {
  //   id: "contact-messages",
  //   label: "Contact Messages",
  //   href: ROUTES.CONTACTS,
  //   group: "CRM",
  //   icon: <Icons.mail size={20} />,
  //   roles: [Role.ADMIN],
  // },
  {
    id: "notice-board",
    label: "Notice Board",
    icon: <Icons.clipboard size={20} />,
    group: "CRM",
    roles: [Role.ADMIN],
    children: [
      { id: "list", label: "List", href: ROUTES.NOTICES.LIST, roles: [Role.ADMIN] },
      { id: "new", label: "New", href: ROUTES.NOTICES.CREATE, roles: [Role.ADMIN] },
    ],
  },

  // ========= Content =========
  // {
  //   id: "testimonials",
  //   label: "Testimonials",
  //   href: ROUTES.TESTIMONIALS,
  //   group: "Content",
  //   icon: <Icons.messageSquare size={20} />,
  //   roles: [Role.ADMIN],
  // },

  // ========= Marketing =========
  // {
  //   id: "emails-newsletters",
  //   label: "Newsletters",
  //   icon: <Icons.send size={20} />,
  //   group: "Marketing",
  //   roles: [Role.ADMIN],
  //   children: [
  //     { id: "list", label: "List", href: ROUTES.NEWSLETTERS.LIST, roles: [Role.ADMIN] },
  //     { id: "send", label: "Send", href: ROUTES.NEWSLETTERS.SEND, roles: [Role.ADMIN] },
  //     { id: "history", label: "History", href: ROUTES.NEWSLETTERS.HISTORY, roles: [Role.ADMIN] },
  //   ],
  // },

  // ========= Settings =========
  {
    id: "settings",
    label: "Settings",
    href: ROUTES.SETTINGS,
    group: "Settings",
    icon: <Icons.settings size={20} />,
    roles: [Role.ADMIN],
  },
];
