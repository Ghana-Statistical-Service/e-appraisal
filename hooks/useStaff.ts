import { useEffect, useState } from "react";
import { api } from "../lib/apiHelper";

export interface StaffMember {
  staff_id: number;
  staff_no?: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  directorate_id: string;
  section_id: string;
  level_id: number;
  is_active: boolean;
  created_at: string;
}

const isAdmin = () => {
  if (typeof window === "undefined") return false;
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  return ["ADMIN", "HR"].includes(user.level_code);
};

export function useStaff() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdminUser, setIsAdminUser] = useState(false);

  const fetchStaff = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/staff");
      const data = Array.isArray(response.data) ? response.data : [];
      setStaff(data);
    } catch (err) {
      console.error("Failed to fetch staff:", err);
      setError("Failed to load staff");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  useEffect(() => {
    setIsAdminUser(isAdmin());
  }, []);

  const createStaff = async (payload: {
    staff_no?: string | null;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string | null;
    directorate_id: string;
    section_id: string;
    level_id: number;
    password: string;
  }) => {
    if (!isAdmin()) throw new Error("Unauthorized");
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/staff", payload);
      setStaff((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      console.error("Failed to create staff:", err);
      setError("Failed to create staff");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateStaff = async (
    id: number,
    payload: {
      staff_no?: string | null;
      first_name: string;
      last_name: string;
      email: string;
      phone?: string | null;
      directorate_id: string;
      section_id: string;
      level_id: number;
      password?: string;
    }
  ) => {
    if (!isAdmin()) throw new Error("Unauthorized");
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/staff/${id}`, payload);
      setStaff((prev) => prev.map((s) => (s.staff_id === id ? response.data : s)));
      return response.data;
    } catch (err) {
      console.error("Failed to update staff:", err);
      setError("Failed to update staff");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deactivateStaff = async (id: number) => {
    if (!isAdmin()) throw new Error("Unauthorized");
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/staff/${id}`);
      setStaff((prev) =>
        prev.map((s) => (s.staff_id === id ? { ...s, is_active: false } : s))
      );
    } catch (err) {
      console.error("Failed to deactivate staff:", err);
      setError("Failed to deactivate staff");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    staff,
    loading,
    error,
    refetch: fetchStaff,
    createStaff,
    updateStaff,
    deactivateStaff,
    isAdmin: isAdminUser,
  };
}
