const API_URL = process.env.API_URL || "http://localhost:5000/api/v1";

/*
  #Todo: Make this code strongly typed
*/
export async function getCategories(options: any = {}) {
  const res = await fetch(`${API_URL}/admin/categories`, {
    method: "GET",
    credentials: "include",
    ...options,
  });

  return await res.json();
}

export async function getCategory(id: number | string, options: any = {}) {
  const res = await fetch(`${API_URL}/admin/categories/${id}`, {
    method: "GET",
    credentials: "include",
    ...options,
  });

  return await res.json();
}

export async function createCategory(options: any = {}) {
  const res = await fetch(`${API_URL}/admin/categories/create`, {
    method: "POST",
    credentials: "include",
    ...options,
  });
  const data = await res.json();

  if (!res.ok || data.status === "error") {
    const error = new Error(data.message || "Create failed");
    (error as any).response = data;
    throw error;
  }

  return data;
}

export async function updateCategory(options: any = {}) {
  const res = await fetch(`${API_URL}/admin/category`, {
    method: "PUT",
    credentials: "include",
    ...options,
  });

  return await res.json();
}

export async function deleteCategory(options: any = {}) {
  const res = await fetch(`${API_URL}/admin/category`, {
    method: "DELETE",
    credentials: "include",
    ...options,
  });

  return await res.json();
}
