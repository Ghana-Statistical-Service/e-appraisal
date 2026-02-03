import { useEffect, useState } from "react";
import { api } from "../lib/apiHelper"; // adjust path if needed

export interface Section {
  section_id: string;
  code: string;
  name: string;
  directorate_id: string;
  directorateName: string;
  head: string;
  employeeCount: number;
  // add other fields as needed
}

export function useSections() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return {
    sections,
    loading,
    error,
    refetch: fetchSections,
  };
}