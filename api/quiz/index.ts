"use server";

import type { QuizCreateFormValues, Quizz, QuizList } from "@/features/quiz/types";
import { ApiError, ApiResponse, apiRequest } from "@/api";
import { cache } from "react";
import { revalidateTag, revalidatePath } from "next/cache";
import { getAuthToken } from "@/lib/cookie";

const QUIZ_API_PREFIX = "/quizzes";

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; message: string; errors?: Record<string, string[]> };

export async function createQuizz(
  body: Partial<QuizCreateFormValues>
): Promise<ActionResult<Quizz>> {
  try {
    const token = await getAuthToken();

    const response = await apiRequest<{ data: Quizz }>("/quizzes", "POST", {
      body,
      headers: { Authorization: `Bearer ${token}` },
    });

    revalidateTag("quizzes");
    revalidateTag("quizzes-list");
    revalidatePath("/dashboard/quizzes");

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message || "Failed to create quiz",
        errors: error.errors as Record<string, string[]>,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

export const getQuizzes = cache(
  async (params?: {
    dateFrom?: string;
    dateTo?: string;
    category?: string;
    instructor?: string;
    status?: string;
    page?: number;
  }): Promise<ApiResponse<QuizList>> => {
    const token = await getAuthToken();

    const queryParams = new URLSearchParams();
    if (params?.dateFrom) queryParams.set("dateFrom", params.dateFrom);
    if (params?.dateTo) queryParams.set("dateTo", params.dateTo);
    if (params?.category) queryParams.set("category", params.category);
    if (params?.instructor) queryParams.set("instructor", params.instructor);
    if (params?.status) queryParams.set("status", params.status);
    if (params?.page) queryParams.set("page", params.page.toString());

    const queryString = queryParams.toString();
    const endpoint = `${QUIZ_API_PREFIX}${queryString ? `?${queryString}` : ""}`;

    return apiRequest<ApiResponse<QuizList>>(endpoint, "GET", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 60, // Cache for 60 seconds
        tags: ["quizzes", "quizzes-list"], // Multiple tags for flexibility
      },
    });
  }
);

export const getAllQuizSubmission = cache(async (id: string): Promise<ApiResponse<Quizz>> => {
  const token = await getAuthToken();
  const endpoint = `${QUIZ_API_PREFIX}/${id}/all-results`;

  return apiRequest<ApiResponse<Quizz>>(endpoint, "GET", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 60,
      tags: ["quizzes", `quizzes/${id}/result`],
    },
  });
});

export async function getQuizz(id: string | number): Promise<ApiResponse<Quizz>> {
  const token = await getAuthToken();

  return apiRequest<ApiResponse<Quizz>>(`${QUIZ_API_PREFIX}/${id}`, "GET", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getQuizzByAttemptId(id: string | number): Promise<ApiResponse<Quizz>> {
  const token = await getAuthToken();

  return apiRequest<ApiResponse<Quizz>>(`/quizz/attempt/${id}/result`, "GET", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 * Update Quiz - Returns standardized result
 */
export async function updateQuizz(
  id: string | number,
  body: Partial<Quizz>
): Promise<ActionResult<Quizz>> {
  try {
    const token = await getAuthToken();

    const response = await apiRequest<{ data: Quizz }>(`/quizzes/${id}`, "PUT", {
      body,
      headers: { Authorization: `Bearer ${token}` },
    });

    // Invalidate specific caches
    revalidateTag("quizzes");
    revalidateTag("quizzes-list");
    revalidateTag(`quiz-${id}`);
    revalidatePath("/dashboard/quizzes");
    revalidatePath(`/dashboard/quizzes/${id}`);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Update quiz error:", error);

    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message || "Failed to update quiz",
        errors: error.errors as Record<string, string[]>,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

/**
 * Delete Quiz - Returns standardized result
 */
export async function deleteQuizz(id: string | number): Promise<ActionResult<null>> {
  try {
    const token = await getAuthToken();

    await apiRequest<void>(`/quizzes/${id}`, "DELETE", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Invalidate caches
    revalidateTag("quizzes");
    revalidateTag("quizzes-list");
    revalidateTag(`quiz-${id}`);
    revalidatePath("/dashboard/quizzes");

    return {
      success: true,
      data: null,
    };
  } catch (error) {
    console.error("Delete quiz error:", error);

    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message || "Failed to delete quiz",
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
