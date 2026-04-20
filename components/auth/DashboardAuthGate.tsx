'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import { ROUTES } from '@/constants/routes';

export function DashboardAuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading, configError } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading || configError) return;
    if (!user) {
      const next = `${ROUTES.LOGIN}?redirect=${encodeURIComponent(pathname || ROUTES.DASHBOARD)}`;
      router.replace(next);
    }
  }, [user, loading, configError, router, pathname]);

  if (configError) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-sm font-medium text-red-600 dark:text-red-400">
          Firebase client is not configured.
        </p>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          {configError}
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center px-4">
        <p className="text-sm text-neutral-500">Signing you in…</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
