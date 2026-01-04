"use server";
import { cookies } from "next/headers";

export async function getAuthToken(): Promise<string> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    throw new Error("Unauthorized: No access token found");
  }

  return token;
}
