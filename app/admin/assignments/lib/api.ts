export interface AssignmentFilters {
  dateFrom?: string;
  dateTo?: string;
  course?: string;
  status?: string;
  page: number;
  limit?: number;
}

export interface Assignment {
  id: number;
  title: string;
  students: number;
  total_marks: number;
  due_date: string;
  status: string;
  course?: string;
  createdAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  totalPages: number;
  totalRecords: number;
  currentPage: number;
}

// Generate mock course data
const generateMockAssignments = (count: number): Assignment[] => {
  const categories = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "UI/UX Design",
    "DevOps",
  ];
  const statuses = ["active", "inactive"];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Assignment ${i + 1}: ${categories[Math.floor(Math.random() * categories.length)]} Fundamentals`,
    students: Math.floor(Math.random() * 20) + 5,
    total_marks: Math.floor(Math.random() * 50),
    due_date: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
};

export const fetchAssignments = async (
  filters: AssignmentFilters
): Promise<ApiResponse<Assignment[]>> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Generate total dataset
  const allAssignments = generateMockAssignments(5);

  // Apply filters
  let filteredAssignments = allAssignments;

  if (filters.course) {
    filteredAssignments = filteredAssignments.filter((assignment) =>
      assignment.course!.toLowerCase().includes(filters.course!.toLowerCase())
    );
  }

  if (filters.status) {
    filteredAssignments = filteredAssignments.filter(
      (assignment) => assignment.status === filters.status
    );
  }

  if (filters.dateFrom) {
    filteredAssignments = filteredAssignments.filter(
      (assignment) => new Date(assignment.createdAt!) >= new Date(filters.dateFrom!)
    );
  }

  if (filters.dateTo) {
    filteredAssignments = filteredAssignments.filter(
      (assignment) => new Date(assignment.createdAt!) <= new Date(filters.dateTo!)
    );
  }

  // Calculate pagination
  const limit = filters.limit || 10;
  const totalRecords = filteredAssignments.length;
  const totalPages = Math.ceil(totalRecords / limit);
  const currentPage = filters.page;
  const start = (currentPage - 1) * limit;
  const end = start + limit;

  // Get page slice
  const paginatedAssignments = filteredAssignments.slice(start, end);

  return {
    data: paginatedAssignments,
    totalPages,
    totalRecords,
    currentPage,
  };
};
