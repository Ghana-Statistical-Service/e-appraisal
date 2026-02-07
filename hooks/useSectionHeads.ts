import { useEffect, useState } from "react";
import { api } from "../lib/apiHelper";

export interface SectionHead {
  section_id: string;
  head_staff_id: number;
  assigned_at: string;
}

const isAdmin = () => {
  if (typeof window === "undefined") return false;
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  return ["ADMIN", "HR"].includes(user.level_code);
};

export function useSectionHeads() {
  const [sectionHeads, setSectionHeads] = useState<SectionHead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdminUser, setIsAdminUser] = useState(false);

  const fetchSectionHeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/section-heads");
      const data = Array.isArray(response.data) ? response.data : [];
      setSectionHeads(data);
    } catch (err) {
      console.error("Failed to fetch section heads:", err);
      setError("Failed to load section heads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSectionHeads();
  }, []);

  useEffect(() => {
    setIsAdminUser(isAdmin());
  }, []);

  const assignSectionHead = async (payload: {
    section_id: string;
    head_staff_id: number;
  }) => {
    if (!isAdmin()) throw new Error("Unauthorized");
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/section-heads", payload);
      setSectionHeads((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      console.error("Failed to assign section head:", err);
      setError("Failed to assign section head");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateSectionHead = async (
    section_id: string,
    payload: { section_id: string; head_staff_id: number }
  ) => {
    if (!isAdmin()) throw new Error("Unauthorized");
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/section-heads/${section_id}`, payload);
      setSectionHeads((prev) =>
        prev.map((h) => (h.section_id === section_id ? response.data : h))
      );
      return response.data;
    } catch (err) {
      console.error("Failed to update section head:", err);
      setError("Failed to update section head");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeSectionHead = async (section_id: string) => {
    if (!isAdmin()) throw new Error("Unauthorized");
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/section-heads/${section_id}`);
      setSectionHeads((prev) => prev.filter((h) => h.section_id !== section_id));
    } catch (err) {
      console.error("Failed to remove section head:", err);
      setError("Failed to remove section head");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    sectionHeads,
    loading,
    error,
    refetch: fetchSectionHeads,
    assignSectionHead,
    updateSectionHead,
    removeSectionHead,
    isAdmin: isAdminUser,
  };
}
