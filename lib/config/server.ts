/**
 * Server-only env helpers. Do not import from client components.
 */

import { CONFIG } from '@/constants/config';

export function requireBaysePublicKey(): string {
  const key = CONFIG.BAYSE.PUBLIC_KEY?.trim();
  if (!key) {
    throw new Error(
      'Missing BAYSE_PUBLIC_KEY. Add it to .env.local (see README).'
    );
  }
  return key;
}

export function requireGeminiApiKey(): string {
  const key = CONFIG.GEMINI.API_KEY?.trim();
  if (!key) {
    throw new Error(
      'Missing GEMINI_API_KEY. Add it to .env.local for AI analysis.'
    );
  }
  return key;
}

export function bayseApiBase(): string {
  return (
    process.env.BAYSE_API_BASE?.replace(/\/$/, '') ||
    'https://relay.bayse.markets'
  );
}
