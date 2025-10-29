interface FetchOptions extends RequestInit {
  retry?: boolean; // internal flag to prevent infinite loops
  cacheKey?: string;
  timeout?: number;
}

const API_URL = process.env.API_URL || "http://localhost:5000/api/v1";

export async function apiClient(endpoint: string, options: FetchOptions = {}) {
  const defaultOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // cookies are sent automatically
  };

  const finalOptions: RequestInit = { ...defaultOptions, ...options };

  // Timeout support
  const controller = new AbortController();
  if (options.timeout) {
    setTimeout(() => controller.abort(), options.timeout);
  }
  finalOptions.signal = controller.signal;

  try {
    let res = await fetch(`${API_URL}${endpoint}`, finalOptions);
    // If 401 and not retried yet => try refresh token
    if (res.status === 401 && !options.retry) {
      const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (refreshRes.ok) {
        return apiClient(endpoint, { ...options, retry: true });
      } else {
        throw new Error("Unauthorized. Please login again.");
      }
    }

    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data.message || "API Error");
      (error as any).response = data;
      throw error;
    }

    return data;
  } catch (err) {
    if ((err as any).name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw err;
  }
}
