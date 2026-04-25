'use client';

import useSWR from 'swr';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/components/providers/AuthProvider';
import { apiGet } from '@/lib/utils/fetcher';
import type { PortfolioPosition, PortfolioSummary } from '@/types/portfolio';

import { useCurrency } from '@/components/providers/CurrencyProvider';

type PortfolioPayload = {
  positions: PortfolioPosition[];
  summary: PortfolioSummary;
};

export function usePortfolio() {
  const { user, loading: authLoading, getIdToken } = useAuth();
  const { currency } = useCurrency();

  const keyPath = `${ROUTES.API.PORTFOLIO}?currency=${currency}`;

  const { data, error, isLoading, mutate } = useSWR(
    user && !authLoading
      ? [keyPath, user.uid]
      : null,
    () => apiGet<PortfolioPayload>(keyPath, getIdToken)
  );

  return {
    portfolio: data?.positions ?? null,
    summary: data?.summary ?? null,
    isLoading: authLoading || (!!user && isLoading),
    error: error instanceof Error ? error.message : error ? String(error) : null,
    refresh: mutate,
  };
}
