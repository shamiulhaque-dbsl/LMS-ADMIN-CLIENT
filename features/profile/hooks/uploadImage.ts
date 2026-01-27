"use server";

import { cookies } from "next/headers";
const APIURL = process.env.API_URL;

export async function uploadImage(file: File) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) return null;
  try {
    const formData = new FormData();
    formData.append("files", file);
    formData.append("publicOverride", String(true));

    const res = await fetch(`${APIURL}/files/upload`, {
      method: "POST",
      body: formData,
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const result = await res.json();
    if (result.status === "success") {
      return result.data[0].url;
    }
    return null;
  } catch (err) {
    console.error("Upload error:", err);
    return null;
  }
}
