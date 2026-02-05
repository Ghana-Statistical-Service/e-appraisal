// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_BASE_URL = "https://appraisalbackend.onrender.com";

function getToken() {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("token");
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    },
  });

  let data: any = null;

  try {
    data = await response.json();
  } catch {
    // handle empty responses
  }

  // // 🔐 GLOBAL AUTH HANDLING
  // if (response.status === 401 || response.status === 403) {
  //   if (typeof window !== "undefined") {
  //     sessionStorage.removeItem("token");
  //     sessionStorage.removeItem("user");
  //     window.location.href = "/";
  //   }
  //   throw new Error("Unauthorized");
  // }

  if (!response.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
}

export const api = {
  get: (path: string) => request(path),

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