import { cookies } from "next/headers";
import { getCurrentUser } from "@/api/auth";
export async function getServerUser() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) return null;

  const res = await getCurrentUser({ headers: { Authorization: `Bearer ${accessToken}` } });
  return res?.data?.user || null;
}
