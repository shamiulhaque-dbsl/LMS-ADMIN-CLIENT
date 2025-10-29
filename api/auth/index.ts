const API_URL = "http://localhost:5000/api/v1";

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok || data.status === "error") {
    const error = new Error(data.message || "Login failed");
    (error as any).response = data;
    throw error;
  }

  return data;
}

export async function logoutUser() {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  return res.json();
}

export async function getCurrentUser(options: any = {}) {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
    ...options,
  });

  if (res.status === 401) {
    return null;
  }

  return await res.json();
}
