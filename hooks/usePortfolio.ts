'use client';

import useSWR from 'swr';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/components/providers/AuthProvider';
import { apiGet } from '@/lib/utils/fetcher';
import type { PortfolioPosition, PortfolioSummary } from '@/types/portfolio';

type PortfolioPayload = {
  positions: PortfolioPosition[];
  summary: PortfolioSummary;
};

export function usePortfolio() {
  const { user, loading: authLoading, getIdToken } = useAuth();

  const { data, error, isLoading, mutate } = useSWR(
    user && !authLoading
      ? [ROUTES.API.PORTFOLIO, user.uid]
      : null,
    () => apiGet<PortfolioPayload>(ROUTES.API.PORTFOLIO, getIdToken)
  );

  return {
    portfolio: data?.positions ?? null,
    summary: data?.summary ?? null,
    isLoading: authLoading || (!!user && isLoading),
    error: error instanceof Error ? error.message : error ? String(error) : null,
    refresh: mutate,
  };
}
