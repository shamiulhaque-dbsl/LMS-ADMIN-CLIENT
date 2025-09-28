export const VARIANT_CLASSES = {
  default: {
    base: "relative whitespace-nowrap transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
    active: "text-blue-600 bg-blue-50",
    inactive: "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
  },
  pills: {
    base: "relative whitespace-nowrap transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-full",
    active: "bg-blue-600 text-white shadow-sm",
    inactive: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
  },
  underline: {
    base: "relative whitespace-nowrap transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed border-b-2 border-transparent",
    active: "border-blue-600 text-blue-600",
    inactive: "text-gray-600 hover:text-gray-900 hover:border-gray-300",
  },
  bordered: {
    base: "relative whitespace-nowrap transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 -mb-px",
    active: "border-blue-600 bg-white text-blue-600 border-b-white",
    inactive: "text-gray-600 hover:text-gray-900 hover:border-gray-300",
  },
} as const;

export const SIZE_CLASSES = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
} as const;
