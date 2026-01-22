export type AssignmentMetric = {
  title: string;
  value: string | number;
};

export interface Assignment {
  id?: number | undefined;
  assignmentId?: number | undefined;
  students?: number;
  totalMarks: number;
  course?: string;
  createdAt?: string;
  courseId?: number;
  moduleId?: number;
  title: string;
  description?: string;
  start_date?: string;
  startDate?: string;
  due_date?: string;
  dueDate?: string;
  total_marks: number;
  assignment_type?: string;
  notes?: string;
  resources?: string;
  status?: number;
}

export interface AssignmentSubmission {
  id?: number | undefined;
  assignmentId?: number | undefined;
  student?: {
    fullName: string;
    studentId: number;
  };
  submittedAt?: string;
  marksObtained?: number;
  feedback?: string;
  status?: string;
}

export type AssignmentList = Assignment[];

export interface AssignmentCreateFormValues {
  title: string;
  courseId: number;
  moduleId: number;
  timeLimitMinutes?: number;
  totalMarks?: number;
  description?: string;
  startDate?: string;
  dueDate?: string;
  notes: string;
  resources: string;
  document?: FileList;
  status?: number;
}

export interface AssignmentFilters {
  dateFrom?: string;
  dateTo?: string;
  course?: string;
  status?: string;
  page: number;
  limit?: number;
}
