import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <p className="mt-3 max-w-md text-center text-sm text-neutral-600 dark:text-neutral-400">
        This MVP uses your Bayse API key on the server (
        <code className="rounded bg-neutral-100 px-1 py-0.5 text-xs dark:bg-neutral-900">
          BAYSE_PUBLIC_KEY
        </code>
        ). Firebase sign-in is not wired yet.
      </p>
      <Link
        href={ROUTES.DASHBOARD}
        className="mt-6 text-sm font-medium text-neutral-900 underline dark:text-neutral-100"
      >
        Go to dashboard
      </Link>
    </div>
  );
}
