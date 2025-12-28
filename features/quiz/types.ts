export interface QuizCreateFormValues {
  title: string;
  courseId: number;
  moduleId: number;
  timeLimitMinutes?: number;
  totalPoint?: number;
  passingPoint?: number;
  maxAttempts?: number;
  description?: string;
  status: "draft" | "published" | "archived";
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
}
