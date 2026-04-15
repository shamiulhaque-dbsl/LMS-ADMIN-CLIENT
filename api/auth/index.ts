const API_URL = "http://localhost:5000/api/v1";

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role: "admin" }),
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

export async function forgetUser(email: string) {
  const res = await fetch(`${API_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, role: "admin" }),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok || data.status === "error") {
    const error = new Error(data.message || "Failed to send reset link");
    (error as any).response = data;
    throw error;
  }

  return data;
}

export async function resetUser(password: string, token: string) {
  const res = await fetch(`${API_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newPassword: password, token, role: "admin" }),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok || data.status === "error") {
    const error = new Error(data.message || "Failed to reset password");
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
  const res = await fetch(`${API_URL}/me`, {
    method: "GET",
    credentials: "include",
    ...options,
  });

  if (res.status === 401) {
    return null;
  }

  return await res.json();
}
