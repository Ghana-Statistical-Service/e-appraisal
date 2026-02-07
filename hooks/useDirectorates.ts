import { useEffect, useState } from "react";
import { api } from "../lib/apiHelper"; // adjust path if needed

export interface Directorate {
  directorate_id: string;
  name: string;
  created_at: string;
}

const isAdmin = () => {
  if (typeof window === "undefined") return false;
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  return ["ADMIN", "HR"].includes(user.level_code);
};

export function useDirectorates() {
  const [directorates, setDirectorates] = useState<Directorate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdminUser, setIsAdminUser] = useState(false);

  const fetchDirectorates = async () => {

    setLoading(true);
    setError(null);
    
    try {
      
      const response = await api.get("/directorates");
      setDirectorates(response.data);
    } catch (err) {
      console.error("Failed to fetch directorates:", err);
      setError("Failed to load directorates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectorates();
  }, []);

  useEffect(() => {
    setIsAdminUser(isAdmin());
  }, []);
  const createDirectorate = async (payload: { name: string }) => {
    if (!isAdmin()) {
      throw new Error("Unauthorized");
    }
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/directorates", payload);
      setDirectorates((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      console.error("Failed to create directorate:", err);
      setError("Failed to create directorate");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateDirectorate = async (id: string, payload: { name: string }) => {
    if (!isAdmin()) {
      throw new Error("Unauthorized");
    }
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/directorates/${id}`, payload);
      setDirectorates((prev) =>
        prev.map((item) => (item.directorate_id === id ? response.data : item))
      );
      return response.data;
    } catch (err) {
      console.error("Failed to update directorate:", err);
      setError("Failed to update directorate");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteDirectorate = async (id: string) => {
    if (!isAdmin()) {
      throw new Error("Unauthorized");
    }
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/directorates/${id}`);
      setDirectorates((prev) => prev.filter((item) => item.directorate_id !== id));
    } catch (err) {
      console.error("Failed to delete directorate:", err);
      setError("Failed to delete directorate");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    directorates,
    loading,
    error,
    refetch: fetchDirectorates,
    createDirectorate,
    updateDirectorate,
    deleteDirectorate,
    isAdmin: isAdminUser,
  };
}
