import { useEffect, useState } from "react";
import { api } from "../lib/apiHelper";

export interface StaffLevel {
  level_id: number;
  level_code: string;
  level_rank: number;
  level_name: string;
}

const isAdmin = () => {
  if (typeof window === "undefined") return false;
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  return ["ADMIN", "HR"].includes(user.level_code);
};

export function useStaffLevels() {
  const [staffLevels, setStaffLevels] = useState<StaffLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdminUser, setIsAdminUser] = useState(false);

  const fetchStaffLevels = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/staff-levels");
      const data = Array.isArray(response.data) ? response.data : [];
      const sorted = [...data].sort(
        (a, b) => Number(a.level_rank) - Number(b.level_rank)
      );
      setStaffLevels(sorted);
    } catch (err) {
      console.error("Failed to fetch staff levels:", err);
      setError("Failed to load staff levels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffLevels();
  }, []);

  useEffect(() => {
    setIsAdminUser(isAdmin());
  }, []);

  const createStaffLevel = async (payload: {
    level_code: string;
    level_rank: number;
    level_name: string;
  }) => {
    if (!isAdmin()) {
      throw new Error("Unauthorized");
    }
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/staff-levels", payload);
      setStaffLevels((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      console.error("Failed to create staff level:", err);
      setError("Failed to create staff level");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateStaffLevel = async (
    id: number,
    payload: { level_code: string; level_rank: number; level_name: string }
  ) => {
    if (!isAdmin()) {
      throw new Error("Unauthorized");
    }
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/staff-levels/${id}`, payload);
      setStaffLevels((prev) =>
        prev.map((item) => (item.level_id === id ? response.data : item))
      );
      return response.data;
    } catch (err) {
      console.error("Failed to update staff level:", err);
      setError("Failed to update staff level");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteStaffLevel = async (id: number) => {
    if (!isAdmin()) {
      throw new Error("Unauthorized");
    }
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/staff-levels/${id}`);
      setStaffLevels((prev) => prev.filter((item) => item.level_id !== id));
    } catch (err) {
      console.error("Failed to delete staff level:", err);
      setError("Failed to delete staff level");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    staffLevels,
    loading,
    error,
    refetch: fetchStaffLevels,
    createStaffLevel,
    updateStaffLevel,
    deleteStaffLevel,
    isAdmin: isAdminUser,
  };
}
