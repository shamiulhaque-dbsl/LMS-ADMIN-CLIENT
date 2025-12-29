export type QuizStatus = "draft" | "published" | "archived";

export interface CourseRef {
  uuid: string;
  title: string;
}

export interface Quizz {
  quizId: number;
  title: string;
  questionsCount: number;
  duration: number;
  totalPoint: number;
  passingPoint: number;
  studentsCount?: number;
  createdAt: string;
  status: QuizStatus;
  course: CourseRef;
}

export type QuizList = Quizz[];

export interface QuizCreateFormValues {
  title: string;
  courseId: number;
  moduleId: number;
  timeLimitMinutes?: number;
  totalPoint?: number;
  passingPoint?: number;
  maxAttempts?: number;
  description?: string;
  status: QuizStatus;
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
}
