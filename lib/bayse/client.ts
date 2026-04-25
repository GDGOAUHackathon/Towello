import { requireBaysePublicKey, bayseApiBase } from '@/lib/config/server';
import { BayseApiError } from '@/lib/bayse/errors';
import type { BaysePnLResponse, BaysePortfolioResponse } from '@/lib/bayse/types';

const JSON_HEADERS = { Accept: 'application/json' } as const;

async function readBayseJson<T>(
  res: Response
): Promise<T> {
  const text = await res.text();
  if (!res.ok) {
    throw new BayseApiError(
      `Bayse API error (${res.status})`,
      res.status,
      text
    );
  }
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new BayseApiError('Invalid JSON from Bayse API', res.status, text);
  }
}

export class BayseClient {
  private readonly publicKey: string;
  private readonly baseUrl: string;

  constructor(publicKey?: string, baseUrl?: string) {
    this.publicKey = publicKey ?? requireBaysePublicKey();
    this.baseUrl = baseUrl ?? bayseApiBase();
  }

  private readHeaders(): HeadersInit {
    return {
      ...JSON_HEADERS,
      'X-Public-Key': this.publicKey,
    };
  }

  async getPortfolio(params?: { currency?: 'USD' | 'NGN' }): Promise<BaysePortfolioResponse> {
    const search = new URLSearchParams();
    if (params?.currency) {
      search.set('currency', params.currency);
    }
    const qs = search.toString();
    const url = `${this.baseUrl}/v1/pm/portfolio${qs ? `?${qs}` : ''}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: this.readHeaders(),
      cache: 'no-store',
    });
    return readBayseJson<BaysePortfolioResponse>(res);
  }

  async getPnL(params: {
    timePeriod?: string;
    breakdown?: boolean;
    currency?: 'USD' | 'NGN';
  }): Promise<BaysePnLResponse> {
    const search = new URLSearchParams();
    if (params.timePeriod) {
      search.set('timePeriod', params.timePeriod);
    }
    if (params.breakdown !== undefined) {
      search.set('breakdown', params.breakdown ? 'true' : 'false');
    }
    if (params.currency) {
      search.set('currency', params.currency);
    }

    const qs = search.toString();
    const url = `${this.baseUrl}/v1/pm/pnl${qs ? `?${qs}` : ''}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: this.readHeaders(),
      cache: 'no-store',
    });
    return readBayseJson<BaysePnLResponse>(res);
  }
}

let singleton: BayseClient | undefined;

/** Lazy singleton so missing env fails on first use, not at module load. */
export function getBayseClient(): BayseClient {
  if (!singleton) {
    singleton = new BayseClient();
  }
  return singleton;
}
