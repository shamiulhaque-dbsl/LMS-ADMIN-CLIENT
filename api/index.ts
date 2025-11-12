const API_URL = process.env.API_URL ?? "http://localhost:5000/api/v1";

type ApiMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiOptions extends RequestInit {
  body?: any;
}

export interface ApiResponse<T> {
  status: "error" | "success";
  message?: string;
  data?: T;
  errors?: Record<string, string[] | string>;
}

export class ApiError extends Error {
  public errors?: Record<string, string[] | string>;
  constructor(message: string, errors?: Record<string, string[] | string>) {
    super(message);
    this.name = "ApiError";
    this.errors = errors;
  }
}

export async function apiRequest<T>(
  endpoint: string,
  method: ApiMethod,
  options: ApiOptions = {}
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data: ApiResponse<T> = await res.json().catch(() => ({}));
  if (!res.ok || data.status === "error") {
    throw new ApiError(data.message || "Something went wrong", data.errors);
  }

  return data as T;
}
