/**
 * Application Configuration
 * 
 * Responsibility: Centralize configuration variables and environment parameters.
 * Owner: Integration Engineer
 * Implementation: Add validation for required environment variables.
 */

export const CONFIG = {
  FIREBASE: {
    API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  },
  BAYSE: {
    PUBLIC_KEY: process.env.BAYSE_PUBLIC_KEY,
    // Secret key should only be used server-side
    SECRET_KEY: process.env.BAYSE_SECRET_KEY,
  },
  GEMINI: {
    API_KEY: process.env.GEMINI_API_KEY,
    MODEL: process.env.GEMINI_MODEL ?? 'gemini-2.0-flash',
  },
  APP: {
    NAME: 'Towello',
    VERSION: '1.0.0',
  },
} as const;
