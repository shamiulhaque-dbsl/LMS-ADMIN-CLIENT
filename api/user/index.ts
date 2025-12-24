import { ApiResponse, apiRequest } from "@/api";

const USER_API_PREFIX = "/admin/users";

export async function getRoleWiseActiveUsers(role: string): Promise<ApiResponse<any[]>> {
  return apiRequest<ApiResponse<any[]>>(`${USER_API_PREFIX}/?role=${role}`, "GET");
}
