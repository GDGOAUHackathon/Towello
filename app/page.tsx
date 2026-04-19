import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Towello</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Prediction market portfolio intelligence (Bayse + Gemini).
        </p>
      </div>
      <Link
        href={ROUTES.DASHBOARD}
        className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
      >
        Open dashboard
      </Link>
    </div>
  );
}
