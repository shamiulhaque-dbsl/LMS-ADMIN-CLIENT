import type { QuizCreateFormValues, Quizz, QuizList } from "@/features/quiz/types";
import { ApiResponse, apiRequest } from "@/api";

const QUIZ_API_PREFIX = "/quizzes";

export async function createQuiz(body: Partial<QuizCreateFormValues>): Promise<ApiResponse<Quizz>> {
  return apiRequest<ApiResponse<Quizz>>(`${QUIZ_API_PREFIX}`, "POST", { body });
}

export async function getQuizzes(): Promise<ApiResponse<QuizList>> {
  return apiRequest<ApiResponse<QuizList>>(`${QUIZ_API_PREFIX}`, "GET");
}
