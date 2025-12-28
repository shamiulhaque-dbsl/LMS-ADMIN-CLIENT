import type { QuizCreateFormValues } from "@/features/quiz/types";
import { ApiResponse, apiRequest } from "@/api";

const QUIZ_API_PREFIX = "/quizzes";

export async function createQuiz(body: Partial<QuizCreateFormValues>): Promise<ApiResponse<any>> {
  return apiRequest<ApiResponse<any>>(`${QUIZ_API_PREFIX}`, "POST", { body });
}
