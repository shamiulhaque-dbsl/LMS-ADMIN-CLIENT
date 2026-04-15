"use server";

import { ApiResponse, apiRequest } from "@/api";
import { LiveClassFormData, LiveSession, Batch } from "@/features/liveClasses/types";
import { getAuthToken } from "@/lib/cookie";

const LIVE_SESSION_API_PREFIX = "/live-sessions";
const BATCH_API_PREFIX = "/admin/batches";

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; message: string; errors?: Record<string, string[]> };

export async function getLiveSessions(): Promise<ApiResponse<LiveSession[]>> {
  const token = await getAuthToken();
  return apiRequest<ApiResponse<LiveSession[]>>(`${LIVE_SESSION_API_PREFIX}`, "GET", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getLiveSessionById(id: string): Promise<ApiResponse<LiveSession[]>> {
  const token = await getAuthToken();
  return apiRequest<ApiResponse<LiveSession[]>>(`${LIVE_SESSION_API_PREFIX}/${id}`, "GET", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getBatchesByCourse(courseId: number): Promise<ApiResponse<Batch[]>> {
  const token = await getAuthToken();
  return apiRequest<ApiResponse<Batch[]>>(`${BATCH_API_PREFIX}/${courseId}`, "GET", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function createLiveSession(
  body: Partial<LiveClassFormData>
): Promise<ApiResponse<LiveClassFormData>> {
  const token = await getAuthToken();
  return apiRequest<ApiResponse<LiveClassFormData>>(`${LIVE_SESSION_API_PREFIX}`, "POST", {
    body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateLiveSession(
  id: string,
  body: Partial<LiveClassFormData>
): Promise<ApiResponse<LiveClassFormData>> {
  const token = await getAuthToken();
  return apiRequest<ApiResponse<LiveClassFormData>>(`${LIVE_SESSION_API_PREFIX}/${id}`, "PUT", {
    body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
