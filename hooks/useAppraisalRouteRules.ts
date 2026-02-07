import { useEffect, useState } from "react";
import { api } from "../lib/apiHelper";

export interface AppraisalRouteRule {
  rule_id: number;
  appraisee_level_id: number;
  appraiser_level_id: number;
  is_active: boolean;
  created_at: string;
}

const isAdmin = () => {
  if (typeof window === "undefined") return false;
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  return ["ADMIN", "HR"].includes(user.level_code);
};

export function useAppraisalRouteRules() {
  const [rules, setRules] = useState<AppraisalRouteRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdminUser, setIsAdminUser] = useState(false);

  const fetchRules = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/appraisal-route-rules");
      const data = Array.isArray(response.data) ? response.data : [];
      setRules(data);
    } catch (err) {
      console.error("Failed to fetch appraisal route rules:", err);
      setError("Failed to load appraisal route rules");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  useEffect(() => {
    setIsAdminUser(isAdmin());
  }, []);

  const createRule = async (payload: {
    appraisee_level_id: number;
    appraiser_level_id: number;
    is_active?: boolean;
  }) => {
    if (!isAdmin()) {
      throw new Error("Unauthorized");
    }
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/appraisal-route-rules", payload);
      setRules((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      console.error("Failed to create appraisal route rule:", err);
      setError("Failed to create appraisal route rule");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateRule = async (
    id: number,
    payload: { appraisee_level_id: number; appraiser_level_id: number; is_active: boolean }
  ) => {
    if (!isAdmin()) {
      throw new Error("Unauthorized");
    }
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/appraisal-route-rules/${id}`, payload);
      setRules((prev) => prev.map((r) => (r.rule_id === id ? response.data : r)));
      return response.data;
    } catch (err) {
      console.error("Failed to update appraisal route rule:", err);
      setError("Failed to update appraisal route rule");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteRule = async (id: number) => {
    if (!isAdmin()) {
      throw new Error("Unauthorized");
    }
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/appraisal-route-rules/${id}`);
      setRules((prev) => prev.filter((r) => r.rule_id !== id));
    } catch (err) {
      console.error("Failed to delete appraisal route rule:", err);
      setError("Failed to delete appraisal route rule");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    rules,
    loading,
    error,
    refetch: fetchRules,
    createRule,
    updateRule,
    deleteRule,
    isAdmin: isAdminUser,
  };
}
