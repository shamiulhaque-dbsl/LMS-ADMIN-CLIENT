export type EnrollmentMetric = {
  title: string;
  value: string | number;
};

export interface Enrollment {
  id: number;
  enrolled_type: "free" | "paid";
  status: "active" | "inactive" | "completed";
  enrolled_at: string; // ISO date string
  completed_at: string | null;
  progress_percentage: string; // backend sends as string
  course: {
    id: number;
    title: string;
  };
  student: {
    id: number;
    name: string;
    email: string;
    avatar_url: string;
  };
}

export interface EnrollmentResponse {
  data: {
    data: Enrollment[] | [];
    pagination?: {
      totalRecords: number;
      totalPages: number;
    };
  };
}
