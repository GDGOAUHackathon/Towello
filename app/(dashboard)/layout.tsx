import React from 'react';
import { DashboardAuthGate } from '@/components/auth/DashboardAuthGate';
import { Navbar } from '@/components/shared/Navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardAuthGate>
      <Navbar />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</main>
    </DashboardAuthGate>
  );
}
