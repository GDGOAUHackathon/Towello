import React from "react";
import { DashboardAuthGate } from "@/components/auth/DashboardAuthGate";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardAuthGate>
      <DashboardShell>{children}</DashboardShell>
    </DashboardAuthGate>
  );
}
