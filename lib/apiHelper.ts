const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

async function request(
  path: string,
  options: RequestInit = {}
) {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export const api = {
  get: (path: string) =>
    request(path),

  post: (path: string, body: any) =>
    request(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: (path: string, body: any) =>
    request(path, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: (path: string) =>
    request(path, {
      method: "DELETE",
    }),
};