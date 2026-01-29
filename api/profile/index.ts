import { Course } from "@/features/course/types";
import { ApiResponse, apiRequest } from "@/api";

const API_URL = process.env.API_URL ?? "http://localhost:5000/api/v1";

export async function getMyCourskes(): Promise<ApiResponse<Course>> {
  return apiRequest<ApiResponse<Course>>(`${API_URL}/my-courses`, "GET");
}

export async function getMyCourses(options: any = {}) {
  const res = await fetch(`${API_URL}/my-courses`, {
    method: "GET",
    credentials: "include",
    ...options,
  });

  if (res.status === 401) {
    return null;
  }

  return await res.json();
}

export async function getOrders(options: any = {}) {
  const res = await fetch(`${API_URL}/payments`, {
    method: "GET",
    credentials: "include",
    ...options,
  });

  if (res.status === 401) {
    return null;
  }

  return await res.json();
}

export async function updateUserProfile(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  about: string,
  bio: string,
  professional_experience: string,
  professional_experience_details: string,
  avatar_url: string,
  social_links: any
) {
  const res = await fetch(`${API_URL}/me`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      phone,
      email,
      about,
      bio,
      professional_experience,
      professional_experience_details,
      ...(avatar_url && { avatar_url: avatar_url }),
      social_links,
    }),
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

// export async function updatePassword(oldPassword: string, newPassword: string) {
//   const res = await fetch(`${API_URL}/me/password`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       oldPassword,
//       newPassword,
//     }),
//     credentials: "include",
//   });

//   const data = await res.json();

//   if (!res.ok || data.status === "error") {
//     const error = new Error(data.message || "Login failed");
//     (error as any).response = data;
//     throw error;
//   }

//   return data;
// }

export async function updatePassword(oldPassword: string, newPassword: string) {
  const tranfer = apiRequest<ApiResponse<any>>(`/me/password`, "PUT", {
    body: {
      oldPassword,
      newPassword,
    },
  });
  return tranfer;
}
