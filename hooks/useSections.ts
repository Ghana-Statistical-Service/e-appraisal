import { useEffect, useState } from "react";
import { api } from "../lib/apiHelper"; // adjust path if needed

export interface Section {
  section_id: string;
  directorate_id: string;
  name: string;
  created_at: string;
  directorate_name?: string;
}

const isAdmin = () => {
  if (typeof window === "undefined") return false;
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  return ["ADMIN", "HR"].includes(user.level_code);
};

export function useSections() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdminUser, setIsAdminUser] = useState(false);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const response = await api.get("/sections");
      setSections(response.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch sections:", err);
      setError("Failed to load sections");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  useEffect(() => {
    setIsAdminUser(isAdmin());
  }, []);

  const createSection = async (payload: { name: string; directorate_id: string }) => {
    if (!isAdmin()) {
      throw new Error("Unauthorized");
    }
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/sections", payload);
      setSections((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      console.error("Failed to create section:", err);
      setError("Failed to create section");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateSection = async (id: string, payload: { name: string; directorate_id: string }) => {
    if (!isAdmin()) {
      throw new Error("Unauthorized");
    }
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/sections/${id}`, payload);
      setSections((prev) =>
        prev.map((item) => (item.section_id === id ? response.data : item))
      );
      return response.data;
    } catch (err) {
      console.error("Failed to update section:", err);
      setError("Failed to update section");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteSection = async (id: string) => {
    if (!isAdmin()) {
      throw new Error("Unauthorized");
    }
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/sections/${id}`);
      setSections((prev) => prev.filter((item) => item.section_id !== id));
    } catch (err) {
      console.error("Failed to delete section:", err);
      setError("Failed to delete section");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    sections,
    loading,
    error,
    refetch: fetchSections,
    createSection,
    updateSection,
    deleteSection,
    isAdmin: isAdminUser,
  };
}
