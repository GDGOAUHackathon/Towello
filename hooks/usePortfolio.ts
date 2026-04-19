'use client';

import useSWR from 'swr';
import { ROUTES } from '@/constants/routes';
import { apiGet } from '@/lib/utils/fetcher';
import type { PortfolioPosition, PortfolioSummary } from '@/types/portfolio';

type PortfolioPayload = {
  positions: PortfolioPosition[];
  summary: PortfolioSummary;
};

export function usePortfolio() {
  const { data, error, isLoading, mutate } = useSWR(
    ROUTES.API.PORTFOLIO,
    () => apiGet<PortfolioPayload>(ROUTES.API.PORTFOLIO)
  );

  return {
    portfolio: data?.positions ?? null,
    summary: data?.summary ?? null,
    isLoading,
    error: error instanceof Error ? error.message : error ? String(error) : null,
    refresh: mutate,
  };
}
