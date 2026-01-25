"use server";

import type { QuestionFormData, QuizQuestion } from "@/features/quiz/types";
import { ApiError, ApiResponse, apiRequest } from "@/api";
import { cache } from "react";
import { revalidatePath } from "next/cache";
import { getAuthToken } from "@/lib/cookie";

const QUIZ_API_PREFIX = "/quizzes";

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; message: string; errors?: Record<string, string[]> };

export const getQuestions = cache(
  async (quizId: number | string): Promise<ApiResponse<QuizQuestion[]>> => {
    const token = await getAuthToken();

    return apiRequest<ApiResponse<QuizQuestion[]>>(
      `${QUIZ_API_PREFIX}/${quizId}/questions`,
      "GET",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          revalidate: 60, // Cache for 60 seconds
          tags: [`quiz-${quizId}-questions`],
        },
      }
    );
  }
);

export async function createQuestion(
  quizId: number,
  body: Partial<QuestionFormData>
): Promise<ActionResult<QuizQuestion>> {
  try {
    const token = await getAuthToken();

    const response = await apiRequest<{ data: QuizQuestion }>(
      `${QUIZ_API_PREFIX}/${quizId}/questions`,
      "POST",
      {
        body,
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    revalidatePath(`/dashboard/quizzes/${quizId}/edit`);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message || "Failed to create question",
        errors: error.errors as Record<string, string[]>,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

export async function updateQuestion(
  quizId: number,
  questonId: number | string,
  body: Partial<QuestionFormData>
) {
  try {
    const token = await getAuthToken();

    const response = await apiRequest<{ data: QuizQuestion }>(
      `${QUIZ_API_PREFIX}/questions/${questonId}`,
      "PUT",
      {
        body,
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    revalidatePath(`/dashboard/quizzes/${quizId}/edit`);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message || "Failed to create question",
        errors: error.errors as Record<string, string[]>,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

export async function deleteQuestion(quizId: number, questonId: number | string) {
  try {
    const token = await getAuthToken();

    await apiRequest<void>(`${QUIZ_API_PREFIX}/questions/${questonId}`, "DELETE", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Invalidate caches
    revalidatePath(`/dashboard/quizzes/${quizId}/edit`);

    return {
      success: true,
      data: null,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message || "Failed to delete question",
        errors: error.errors as Record<string, string[]>,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
