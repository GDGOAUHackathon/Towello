/**
 * Application configuration (env-backed).
 */

export const CONFIG = {
  FIREBASE: {
    API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  },
  BAYSE: {
    PUBLIC_KEY: process.env.BAYSE_PUBLIC_KEY,
    SECRET_KEY: process.env.BAYSE_SECRET_KEY,
  },
  GEMINI: {
    API_KEY: process.env.GEMINI_API_KEY,
    MODEL: process.env.GEMINI_MODEL ?? 'gemini-2.5-flash',
  },
  APP: {
    NAME: 'Towello',
    VERSION: '1.0.0',
  },
} as const;

export function isFirebaseWebConfigured(): boolean {
  return Boolean(
    CONFIG.FIREBASE.API_KEY &&
      CONFIG.FIREBASE.AUTH_DOMAIN &&
      CONFIG.FIREBASE.PROJECT_ID
  );
}
