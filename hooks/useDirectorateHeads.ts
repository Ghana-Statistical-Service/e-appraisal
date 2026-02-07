import { useEffect, useState } from "react";
import { api } from "../lib/apiHelper";

export interface DirectorateHead {
  directorate_id: string;
  head_staff_id: number;
  assigned_at: string;
}

const isAdmin = () => {
  if (typeof window === "undefined") return false;
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  return ["ADMIN", "HR"].includes(user.level_code);
};

export function useDirectorateHeads() {
  const [directorateHeads, setDirectorateHeads] = useState<DirectorateHead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdminUser, setIsAdminUser] = useState(false);

  const fetchDirectorateHeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/directorate-heads");
      const data = Array.isArray(response.data) ? response.data : [];
      setDirectorateHeads(data);
    } catch (err) {
      console.error("Failed to fetch directorate heads:", err);
      setError("Failed to load directorate heads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectorateHeads();
  }, []);

  useEffect(() => {
    setIsAdminUser(isAdmin());
  }, []);

  const assignDirectorateHead = async (payload: {
    directorate_id: string;
    head_staff_id: number;
  }) => {
    if (!isAdmin()) throw new Error("Unauthorized");
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/directorate-heads", payload);
      setDirectorateHeads((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      console.error("Failed to assign directorate head:", err);
      setError("Failed to assign directorate head");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateDirectorateHead = async (
    directorate_id: string,
    payload: { directorate_id: string; head_staff_id: number }
  ) => {
    if (!isAdmin()) throw new Error("Unauthorized");
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/directorate-heads/${directorate_id}`, payload);
      setDirectorateHeads((prev) =>
        prev.map((h) => (h.directorate_id === directorate_id ? response.data : h))
      );
      return response.data;
    } catch (err) {
      console.error("Failed to update directorate head:", err);
      setError("Failed to update directorate head");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeDirectorateHead = async (directorate_id: string) => {
    if (!isAdmin()) throw new Error("Unauthorized");
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/directorate-heads/${directorate_id}`);
      setDirectorateHeads((prev) =>
        prev.filter((h) => h.directorate_id !== directorate_id)
      );
    } catch (err) {
      console.error("Failed to remove directorate head:", err);
      setError("Failed to remove directorate head");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    directorateHeads,
    loading,
    error,
    refetch: fetchDirectorateHeads,
    assignDirectorateHead,
    updateDirectorateHead,
    removeDirectorateHead,
    isAdmin: isAdminUser,
  };
}
