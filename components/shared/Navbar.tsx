'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/providers/AuthProvider';
import { ROUTES } from '@/constants/routes';
import { CONFIG } from '@/constants/config';

const linkClass =
  'text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100';

export const Navbar: React.FC = () => {
  const { user, loading, signOutUser } = useAuth();

  return (
    <header className="border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href={ROUTES.HOME}
          className="text-sm font-semibold text-neutral-900 dark:text-neutral-100"
        >
          {CONFIG.APP.NAME}
        </Link>
        <nav className="flex flex-wrap items-center justify-center gap-4">
          <Link href={ROUTES.DASHBOARD} className={linkClass}>
            Dashboard
          </Link>
          <Link href={ROUTES.POSITIONS} className={linkClass}>
            Positions
          </Link>
          <Link href={ROUTES.PNL} className={linkClass}>
            PnL
          </Link>
          <Link href={ROUTES.ANALYSIS} className={linkClass}>
            Analysis
          </Link>
          {!loading && user ? (
            <>
              <span className="hidden max-w-[140px] truncate text-xs text-neutral-500 sm:inline">
                {user.email}
              </span>
              <button
                type="button"
                onClick={() => void signOutUser()}
                className={`${linkClass} border-0 bg-transparent p-0`}
              >
                Sign out
              </button>
            </>
          ) : (
            <Link href={ROUTES.LOGIN} className={linkClass}>
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
