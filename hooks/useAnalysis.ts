'use client';

import { useCallback, useState } from 'react';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/components/providers/AuthProvider';
import type { ApiResponse } from '@/types/api';
import type { AIAnalysisResult } from '@/types/analysis';

export function useAnalysis() {
  const { getIdToken } = useAuth();
  const [data, setData] = useState<AIAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const runAnalysis = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getIdToken();
      const headers: HeadersInit = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch(ROUTES.API.ANALYZE, { method: 'POST', headers });
      const json = (await res.json()) as ApiResponse<AIAnalysisResult>;
      if (!res.ok || json.error || json.data === null) {
        throw new Error(json.error ?? `Request failed (${res.status})`);
      }
      setData(json.data);
    } catch (e) {
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
