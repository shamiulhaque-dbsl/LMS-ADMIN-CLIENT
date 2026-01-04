import { ApiResponse, apiRequest } from "@/api";

const UPLOAD_API_PREFIX = "/files/upload";

// Single or multiple file support
export async function uploadFile(
  files: File | File[]
): Promise<ApiResponse<{ url: string; key: string }[]>> {
  const formData = new FormData();

  if (Array.isArray(files)) {
    files.forEach((file) => formData.append("files", file));
  } else {
    formData.append("files", files);
  }
  return apiRequest<ApiResponse<{ url: string; key: string }[]>>(`${UPLOAD_API_PREFIX}`, "POST", {
    body: formData,
  });
}
