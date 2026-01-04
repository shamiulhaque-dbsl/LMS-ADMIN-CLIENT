const API_URL = process.env.API_URL ?? "http://localhost:5000/api/v1";

type ApiMethod = "GET" | "POST" | "PUT" | "DELETE";

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
  const { body, headers: customHeaders, ...rest } = options;

  const headers = new Headers(customHeaders);

  let requestBody: BodyInit | undefined;

  if (body instanceof FormData) {
    requestBody = body;
  } else if (body !== undefined) {
    headers.set("Content-Type", "application/json");
    requestBody = JSON.stringify(body);
  }

  let response: Response;
  response = await fetch(`${API_URL}${endpoint}`, {
    method,
    credentials: "include",
    headers,
    body: requestBody,
    ...rest,
  });

  const data: ApiResponse<T> = await response.json().catch(() => ({}));

  if (!response.ok || data.status === "error") {
    throw new ApiError(data.message || "Something went wrong", data.errors);
  }


  return data as T;
}
