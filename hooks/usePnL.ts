'use client';

import useSWR from 'swr';
import { ROUTES } from '@/constants/routes';
import { apiGet } from '@/lib/utils/fetcher';
import type { PnLHistory } from '@/types/pnl';

export function usePnL(timeframe: string = '1M') {
  const key = `${ROUTES.API.PNL}?timeframe=${encodeURIComponent(timeframe)}`;

  const { data, error, isLoading, mutate } = useSWR(key, () =>
    apiGet<PnLHistory>(key)
  );

  return {
    pnl: data ?? null,
    isLoading,
    error: error instanceof Error ? error.message : error ? String(error) : null,
    refresh: mutate,
  };
}
