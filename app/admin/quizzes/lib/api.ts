export interface QuizzFilters {
  dateFrom?: string;
  dateTo?: string;
  quizz?: string;
  course?: string;
  instructor?: string;
  status?: string;
  page: number;
  limit?: number;
}

export interface Quizz {
  id: number;
  title: string;
  course: string;
  lessons: number;
  sections: number;
  price: string;
  sales: number;
  students: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  instructor: string;
  quizz: string;
}

export interface ApiResponse<T> {
  data: T;
  totalPages: number;
  totalRecords: number;
  currentPage: number;
}

// Generate mock course data
const generateMockQuizzes = (count: number): Quizz[] => {
  const courses = [
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
    title: `Course ${i + 1}: ${courses[Math.floor(Math.random() * courses.length)]} Fundamentals`,
    course: courses[Math.floor(Math.random() * courses.length)],
    lessons: Math.floor(Math.random() * 20) + 5,
    sections: Math.floor(Math.random() * 8) + 2,
    price: `$${Math.floor(Math.random() * 150) + 50}`,
    sales: Math.floor(Math.random() * 1000),
    students: Math.floor(Math.random() * 500),
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    updatedAt: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    instructor: instructors[Math.floor(Math.random() * instructors.length)],
    quizz: "example value",
  }));
};

export const fetchQuizzes = async (filters: QuizzFilters): Promise<ApiResponse<Quizz[]>> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Generate total dataset
  const allQuizzes = generateMockQuizzes(5);

  // Apply filters
  let filteredQuizzes = allQuizzes;

  if (filters.course) {
    filteredQuizzes = filteredQuizzes.filter((quizz) =>
      quizz.quizz.toLowerCase().includes(filters.quizz!.toLowerCase())
    );
  }

  if (filters.instructor) {
    filteredQuizzes = filteredQuizzes.filter((quizz) =>
      quizz.instructor.toLowerCase().includes(filters.instructor!.toLowerCase())
    );
  }

  if (filters.status) {
    filteredQuizzes = filteredQuizzes.filter((quizz) => quizz.status === filters.status);
  }

  if (filters.dateFrom) {
    filteredQuizzes = filteredQuizzes.filter(
      (quizz) => new Date(quizz.createdAt) >= new Date(filters.dateFrom!)
    );
  }

  if (filters.dateTo) {
    filteredQuizzes = filteredQuizzes.filter(
      (quizz) => new Date(quizz.createdAt) <= new Date(filters.dateTo!)
    );
  }

  // Calculate pagination
  const limit = filters.limit || 10;
  const totalRecords = filteredQuizzes.length;
  const totalPages = Math.ceil(totalRecords / limit);
  const currentPage = filters.page;
  const start = (currentPage - 1) * limit;
  const end = start + limit;

  // Get page slice
  const paginatedQuizzes = filteredQuizzes.slice(start, end);

  return {
    data: paginatedQuizzes,
    totalPages,
    totalRecords,
    currentPage,
  };
};
