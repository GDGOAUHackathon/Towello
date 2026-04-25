'use client';

import React from 'react';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { CurrencyProvider } from '@/components/providers/CurrencyProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CurrencyProvider>
      <AuthProvider>{children}</AuthProvider>
    </CurrencyProvider>
  );
}
