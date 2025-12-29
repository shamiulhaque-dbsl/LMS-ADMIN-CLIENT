const ROUTE_PREFIX = "/dashboard";

export const ROUTES = {
  DASHBOARD: ROUTE_PREFIX,

  // Education
  COURSES: {
    CREATE: `${ROUTE_PREFIX}/courses/create`,
    LIST: `${ROUTE_PREFIX}/courses`,
    CATEGORIES: `${ROUTE_PREFIX}/courses/categories`,
    LIVE_CLASSES: `${ROUTE_PREFIX}/courses/live-classes`,
    LIVE_HISTORY: `${ROUTE_PREFIX}/courses/live-session-history`,
  },
  QUIZZES: {
    CREATE: `${ROUTE_PREFIX}/quizzes/create`,
    LIST: `${ROUTE_PREFIX}/quizzes`,

    // Dynamic routes
    EDIT: (quizId: number | string) => `${ROUTE_PREFIX}/quizzes/${quizId}/edit`,
    RESULT: (quizId: number | string) => `${ROUTE_PREFIX}/quizzes/${quizId}/result`,
    DETAIL: (quizId: number | string) => `${ROUTE_PREFIX}/quizzes/${quizId}`,
  },
  CERTIFICATES: {
    QUIZ: `${ROUTE_PREFIX}/certificates`,
    COMPLETION: `${ROUTE_PREFIX}/certificates`,
  },
  ASSIGNMENTS: `${ROUTE_PREFIX}/assignments`,
  COURSE_NOTICES: {
    NEW: `${ROUTE_PREFIX}/course-notice/create`,
    LIST: `${ROUTE_PREFIX}/course-notice`,
  },
  ENROLLMENTS: {
    ADD: `${ROUTE_PREFIX}/enrollments/add-student-to-course`,
    HISTORY: `${ROUTE_PREFIX}/enrollments`,
  },
  REVIEWS: `${ROUTE_PREFIX}/reviews`,

  // Users
  USERS: {
    CREATE: `${ROUTE_PREFIX}/users/create`,
    LIST: `${ROUTE_PREFIX}/users`,
    DASHBOARDS: `${ROUTE_PREFIX}/users/dashboards`,
    INSTRUCTORS: `${ROUTE_PREFIX}/users/instructors`,
    STUDENTS: `${ROUTE_PREFIX}/users/students`,
  },
  LOGIN_HISTORY: `${ROUTE_PREFIX}/users/login-history`,
  IP_RESTRICTION: `${ROUTE_PREFIX}/users/ip-restriction`,

  // CRM
  CONTACTS: `${ROUTE_PREFIX}/contacts`,
  NOTICES: {
    LIST: `${ROUTE_PREFIX}/notices`,
    CREATE: `${ROUTE_PREFIX}/notices/create`,
  },

  // Content
  TESTIMONIALS: `${ROUTE_PREFIX}/testimonials`,

  // Marketing
  NEWSLETTERS: {
    LIST: `${ROUTE_PREFIX}/newsletters`,
    SEND: `${ROUTE_PREFIX}/newsletters/send`,
    HISTORY: `${ROUTE_PREFIX}/newsletters/history`,
  },

  // Profile
  ADMIN: {
    USERS: {
      PROFILE: `${ROUTE_PREFIX}/users/profile`,
    },
  },

  // Settings
  SETTINGS: `${ROUTE_PREFIX}/settings`,

  // Login
  AUTH: {
    LOGIN: "/login",
  },
};
