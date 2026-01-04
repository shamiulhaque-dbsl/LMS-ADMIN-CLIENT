const API_URL = process.env.API_URL ?? "http://localhost:5000/api/v1";

type ApiMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface ApiOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

export interface ApiResponse<T> {
  status: "error" | "success";
  message?: string;
  data?: T;
  errors?: Record<string, string[] | string>;
}

export class ApiError extends Error {
  public status?: number;
  public errors?: Record<string, string[] | string>;

  constructor(message: string, status?: number, errors?: Record<string, string[] | string>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

/**
 * Core API request handler
 * - Handles authentication
 * - Manages request/response formatting
 * - Provides consistent error handling
 */
export async function apiRequest<T>(
  endpoint: string,
  method: ApiMethod,
  options: ApiOptions = {}
): Promise<T> {
  const { body, headers: customHeaders, ...rest } = options;

  const headers = new Headers(customHeaders);

  let requestBody: BodyInit | undefined;

  if (body instanceof FormData) {
    requestBody = body;
  } else if (body !== undefined) {
    headers.set("Content-Type", "application/json");
    requestBody = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      credentials: "include",
      headers,
      body: requestBody,
      ...rest,
    });

    // Parse response
    let data: ApiResponse<T>;
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      // Handle non-JSON responses
      const text = await response.text();
      data = {
        status: response.ok ? "success" : "error",
        message: text || response.statusText,
      } as ApiResponse<T>;
    }

    // Check for errors
    if (!response.ok || data.status === "error") {
      throw new ApiError(
        data.message || `Request failed with status ${response.status}`,
        response.status,
        data.errors
      );
    }

    return data as T;
  } catch (error) {
    // Handle network errors
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof TypeError) {
      throw new ApiError("Network error: Unable to connect to server");
    }

    throw new ApiError("An unexpected error occurred");
  }
}
