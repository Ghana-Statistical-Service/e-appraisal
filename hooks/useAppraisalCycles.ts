// import { useEffect, useState } from "react";
// import { api } from "../lib/apiHelper"; // adjust path if needed

// export interface AppraisalCycle {
//   cycle_id: string;
//   cycle_year: string;
//   start_date: string;
//   end_date: string;
//   status: string;
//   // add other fields as needed
// }

// export interface CreateAppraisalCyclePayload {
//   cycle_year: string;
//   start_date: string;
//   end_date: string;
//   status: string;
// }

// export function useAppraisalCycles() {
//   const [appraisalCycles, setAppraisalCycles] = useState<AppraisalCycle[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchAppraisalCycles = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await api.get("/appraisal-cycles");
//       setAppraisalCycles(response.data);
//       } catch (err) {
//         console.error("Failed to fetch appraisal cycles:", err);
//         setError("Failed to load appraisal cycles");
//       } finally {
//         setLoading(false);
//       }
//     };

//   /* create new cycle (POST) */
//   const createAppraisalCycle = async (
//     payload: CreateAppraisalCyclePayload
//   ) => {

//     setLoading(true);
//     setError(null);

//     try {

//       const response = await api.post("/appraisal-cycles", payload);

//       // Optimistic update: add new cycle to state
//       setAppraisalCycles((prev) => [...prev, response.data]);
//       return response.data;
//       } catch (err) {
//         console.error("Failed to create appraisal cycle:", err);
//         setError("Failed to create appraisal cycle");
//         throw err;
//       } finally {
//         setLoading(false);
//       }
//     };

//   useEffect(() => {
//     fetchAppraisalCycles();
//   }, []);

//   return {
//     appraisalCycles,
//     loading,
//     error,
//     refetch: fetchAppraisalCycles,
//     createAppraisalCycle, 
//   };
// }


import { useEffect, useState } from "react";
import { api } from "../lib/apiHelper";

export interface AppraisalCycle {
  cycle_id: string;
  cycle_year: string;
  start_date: string;
  end_date: string;
  status: string;
}

export interface CreateAppraisalCyclePayload {
  cycle_year: string;
  start_date: string;
  end_date: string;
  status: string;
}

export interface UpdateAppraisalCyclePayload
  extends CreateAppraisalCyclePayload {}

export function useAppraisalCycles() {
  const [appraisalCycles, setAppraisalCycles] = useState<AppraisalCycle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ==============================
     FETCH ALL CYCLES
  ============================== */
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

  /* ==============================
     CREATE (POST)
  ============================== */
  const createAppraisalCycle = async (
    payload: CreateAppraisalCyclePayload
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/appraisal-cycles", payload);

      // Optimistic update
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

  /* ==============================
     UPDATE (PUT)
  ============================== */
  const updateAppraisalCycle = async (
    cycleId: string,
    payload: UpdateAppraisalCyclePayload
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.put(
        `/appraisal-cycles/${cycleId}`,
        payload
      );

      // Optimistic update
      setAppraisalCycles((prev) =>
        prev.map((cycle) =>
          cycle.cycle_id === cycleId ? response.data : cycle
        )
      );

      return response.data;
    } catch (err) {
      console.error("Failed to update appraisal cycle:", err);
      setError("Failed to update appraisal cycle");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /* ==============================
     DELETE (DELETE)
  ============================== */
  const deleteAppraisalCycle = async (cycleId: string) => {
    setLoading(true);
    setError(null);

    try {
      await api.delete(`/appraisal-cycles/${cycleId}`);

      // Optimistic update
      setAppraisalCycles((prev) =>
        prev.filter((cycle) => cycle.cycle_id !== cycleId)
      );
    } catch (err) {
      console.error("Failed to delete appraisal cycle:", err);
      setError("Failed to delete appraisal cycle");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /* ==============================
     INITIAL LOAD
  ============================== */
  useEffect(() => {
    fetchAppraisalCycles();
  }, []);

  return {
    appraisalCycles,
    loading,
    error,
    refetch: fetchAppraisalCycles,
    createAppraisalCycle,
    updateAppraisalCycle,
    deleteAppraisalCycle,
  };
}