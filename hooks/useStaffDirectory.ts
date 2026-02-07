import { useEffect, useMemo, useRef, useState } from "react";
import { api } from "../lib/apiHelper";
import type { StaffMember } from "./useStaff";

type CacheState = {
  all: StaffMember[] | null;
  allFetched: boolean;
};

let cache: CacheState = {
  all: null,
  allFetched: false,
};

export function useStaffDirectory() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<number | null>(null);

  const normalize = (value: string) => value.trim().toLowerCase();

  const localSearch = (all: StaffMember[], q: string) => {
    const term = normalize(q);
    if (term.length < 2) return [];
    return all
      .filter((s) => {
        const haystack = `${s.first_name} ${s.last_name} ${s.email} ${s.staff_no ?? ""}`.toLowerCase();
        return haystack.includes(term);
      })
      .slice(0, 50);
  };

  const prefetchAll = async () => {
    if (cache.allFetched) return;
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/staff");
      cache = { all: Array.isArray(response.data) ? response.data : [], allFetched: true };
    } catch (err) {
      console.error("Failed to prefetch staff directory:", err);
      setError("Failed to load staff directory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(async () => {
      const term = normalize(query);
      if (term.length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await api.get(
          `/staff?search=${encodeURIComponent(term)}&limit=50`
        );
        const data = Array.isArray(response.data) ? response.data : [];
        setResults(data.slice(0, 50));
      } catch (err: any) {
        // Fallback to local search if server doesn't support search query
        if (!cache.allFetched) {
          await prefetchAll();
        }
        if (cache.all) {
          setResults(localSearch(cache.all, term));
        } else {
          setError("Failed to search staff");
        }
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  return {
    results,
    loading,
    error,
    query,
    setQuery,
    prefetchAll,
  };
}
