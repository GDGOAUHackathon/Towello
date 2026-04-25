'use client';

import { useCallback, useState } from 'react';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/components/providers/AuthProvider';

export function useAnalysis() {
  const { getIdToken } = useAuth();
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const runAnalysis = useCallback(async (portfolio?: any, pnl?: any) => {
    setLoading(true);
    setError(null);
    try {
      const token = await getIdToken();
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch(ROUTES.API.ANALYZE, { 
        method: 'POST', 
        headers,
        body: JSON.stringify({ portfolio, pnl })
      });
      const json = await res.json();
      
      console.log("AI response:", json);
      
      if (!res.ok || json.error) {
        throw new Error(json.error ?? `Request failed (${res.status})`);
      }
      
      setData(json.analysis || json.text);
    } catch (e) {
      console.error("Analysis failed", e);
      setData(null);
      setError(e instanceof Error ? e.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  }, [getIdToken]);

  return {
    analysis: data,
    error,
    isLoading,
    runAnalysis,
  };
}
