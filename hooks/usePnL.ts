'use client';

import useSWR from 'swr';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/components/providers/AuthProvider';
import { apiGet } from '@/lib/utils/fetcher';
import type { PnLHistory } from '@/types/pnl';

export function usePnL(timeframe: string = '1M') {
  const { user, loading: authLoading, getIdToken } = useAuth();
  const keyPath = `${ROUTES.API.PNL}?timeframe=${encodeURIComponent(timeframe)}`;

  const { data, error, isLoading, mutate } = useSWR(
    user && !authLoading ? [keyPath, user.uid] : null,
    () => apiGet<PnLHistory>(keyPath, getIdToken)
  );

  return {
    pnl: data ?? null,
    isLoading: authLoading || (!!user && isLoading),
    error: error instanceof Error ? error.message : error ? String(error) : null,
    refresh: mutate,
  };
}
