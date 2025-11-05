export interface CourseFilters {
  dateFrom?: string;
  dateTo?: string;
  category?: string;
  instructor?: string;
  status?: string;
  page: number;
  limit?: number;
}

export interface Course {
  id: number;
  title: string;
  category: string;
  lessons: number;
  sections: number;
  price: string;
  sales: number;
  students: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  instructor: string;
}

export interface ApiResponse<T> {
  data: T;
  totalPages: number;
  totalRecords: number;
  currentPage: number;
}

// Generate mock course data
const generateMockCourses = (count: number): Course[] => {
  const categories = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "UI/UX Design",
    "DevOps",
  ];
  const statuses = ["active", "upcoming", "pending", "free", "paid"];
  const instructors = ["John Doe", "Jane Smith", "Robert Johnson", "Emily Brown"];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Course ${i + 1}: ${categories[Math.floor(Math.random() * categories.length)]} Fundamentals`,
    category: categories[Math.floor(Math.random() * categories.length)],
    lessons: Math.floor(Math.random() * 20) + 5,
    sections: Math.floor(Math.random() * 8) + 2,
    price: `$${Math.floor(Math.random() * 150) + 50}`,
    sales: Math.floor(Math.random() * 1000),
    students: Math.floor(Math.random() * 500),
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    updatedAt: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    instructor: instructors[Math.floor(Math.random() * instructors.length)],
  }));
};

export const fetchCourses = async (filters: CourseFilters): Promise<ApiResponse<Course[]>> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Generate total dataset
  const allCourses = generateMockCourses(5);

  // Apply filters
  let filteredCourses = allCourses;

  if (filters.category) {
    filteredCourses = filteredCourses.filter((course) =>
      course.category.toLowerCase().includes(filters.category!.toLowerCase())
    );
  }

  if (filters.instructor) {
    filteredCourses = filteredCourses.filter((course) =>
      course.instructor.toLowerCase().includes(filters.instructor!.toLowerCase())
    );
  }

  if (filters.status) {
    filteredCourses = filteredCourses.filter((course) => course.status === filters.status);
  }

  if (filters.dateFrom) {
    filteredCourses = filteredCourses.filter(
      (course) => new Date(course.createdAt) >= new Date(filters.dateFrom!)
    );
  }

  if (filters.dateTo) {
    filteredCourses = filteredCourses.filter(
      (course) => new Date(course.createdAt) <= new Date(filters.dateTo!)
    );
  }

  // Calculate pagination
  const limit = filters.limit || 10;
  const totalRecords = filteredCourses.length;
  const totalPages = Math.ceil(totalRecords / limit);
  const currentPage = filters.page;
  const start = (currentPage - 1) * limit;
  const end = start + limit;

  // Get page slice
  const paginatedCourses = filteredCourses.slice(start, end);

  return {
    data: paginatedCourses,
    totalPages,
    totalRecords,
    currentPage,
  };
};
