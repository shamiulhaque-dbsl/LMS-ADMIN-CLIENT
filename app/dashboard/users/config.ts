export const USER_CONFIG = {
  admin: {
    title: "Admin List",
    createRoute: "/admin/users/create",
    addLabel: "Add Admin",
  },
  instructor: {
    title: "Instructor List",
    createRoute: "/admin/users/create",
    addLabel: "Add Instructor",
  },
  student: {
    title: "Student List",
    createRoute: "/dashboard/users/students/create",
    addLabel: "Add Student",
  },
} as const;

export type UserType = keyof typeof USER_CONFIG;
