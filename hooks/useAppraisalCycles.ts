import { useEffect, useState } from "react";
import { api } from "../lib/apiHelper"; // adjust path if needed

export interface AppraisalCycle {
  cycle_id: string;
  cycle_year: string;
  start_date: string;
  end_date: string;
  status: string;
  // add other fields as needed
}

export interface CreateAppraisalCyclePayload {
  cycle_year: string;
  start_date: string;
  end_date: string;
  status: string;
}

export function useAppraisalCycles() {
  const [appraisalCycles, setAppraisalCycles] = useState<AppraisalCycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppraisalCycles = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/appraisal-cycles");
      setAppraisalCycles(response.data);
      } catch (err) {
        console.error("Failed to fetch appraisal cycles:", err);
        setError("Failed to load appraisal cycles");
      } finally {
        setLoading(false);
      }
    };

  /* create new cycle (POST) */
  const createAppraisalCycle = async (
    payload: CreateAppraisalCyclePayload
  ) => {

    setLoading(true);
    setError(null);

    try {

      const response = await api.post("/appraisal-cycles", payload);

      // Optimistic update: add new cycle to state
      setAppraisalCycles((prev) => [...prev, response.data]);
      return response.data;
      } catch (err) {
        console.error("Failed to create appraisal cycle:", err);
        setError("Failed to create appraisal cycle");
        throw err;
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchAppraisalCycles();
  }, []);

  return {
    appraisalCycles,
    loading,
    error,
    refetch: fetchAppraisalCycles,
    createAppraisalCycle, 
  };
}


