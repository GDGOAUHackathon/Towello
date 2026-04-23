import React from "react";
import { PortfolioSummary } from "@/components/dashboard/PortfolioSummary";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Live data from Bayse using{" "}
          <code className="rounded bg-neutral-100 px-1 py-0.5 text-xs dark:bg-neutral-900">
            BAYSE_PUBLIC_KEY
          </code>{" "}
          on the server.
        </p>
      </div>
      <PortfolioSummary />
    </div>
  );
}
