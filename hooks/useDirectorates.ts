import { useEffect, useState } from "react";
import { api } from "../lib/apiHelper"; // adjust path if needed

export interface Directorate {
  directorate_id: string;
  code: string;
  name: string;
  director: string;
  employeeCount: number;
  // add other fields as needed
}

export function useDirectorates() {
  const [directorates, setDirectorates] = useState<Directorate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return {
    directorates,
    loading,
    error,
    refetch: fetchDirectorates,
  };
}