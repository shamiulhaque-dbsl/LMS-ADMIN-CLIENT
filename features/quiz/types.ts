export type QuizStatus = "draft" | "published" | "archived";

export interface CourseRef {
  uuid: string;
  title: string;
}

export interface Quizz {
  quizId: number;
  courseId: number;
  moduleId: number;
  title: string;
  questionsCount: number;
  timeLimitMinutes: number;
  totalPoint: number;
  passingPoint: number;
  studentsCount?: number;
  createdAt: string;
  status: QuizStatus;
  course: CourseRef;
  results?: string[];
}

export type QuizList = Quizz[];
export type QuizSubmission = {
  quiz: Quizz;
  results: QuizResult[];
  totalAttempts: number;
};

export type QuizResult = {
  id: number;
  status: string;
  submittedAt: string;
  score: string;
  answers: {
    questions: string[];
  };
  student: Student;
};

export type Student = {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  userName: string | null;
  email: string | null;
  phone: string | null;
  image: string | null;
  bio: string | null;
  birthDate: string | null;
  address: string | null;
  gender: string | null;
  status: string;
};

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

// Quiz Question
export type QuestionType = "single_choice" | "multiple_choice" | "true_false";
export type QuestionStatus = "draft" | "published";

export interface QuestionOption {
  id: number;
  question_id: number;
  option: string;
  is_correct: boolean;
  sort_order: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  questionType: QuestionType;
  point: number;
  explanation?: string;
  status: QuestionStatus;
  sortOrder: number;
  options: QuestionOption[];
}

export interface QuestionFormData {
  question: string;
  explanation?: string;
  questionType: QuestionType;
  point: number;
  options: {
    option: string;
    isCorrect: boolean;
  }[];
}

export interface Option {
  option: string;
  isCorrect: boolean;
}
