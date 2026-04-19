import React, { Suspense } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center px-4">
          <p className="text-sm text-neutral-500">Loading…</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
