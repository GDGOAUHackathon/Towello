"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { DashboardNavbar } from "@/components/dashboard/Navbar";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { ROUTES } from "@/constants/routes";
import type { ReactNode } from "react";

const PAGE_TITLES: Record<string, string> = {
  [ROUTES.DASHBOARD]: "Dashboard",
  [ROUTES.ANALYTICS]: "Analytics",
  [ROUTES.PNLS]: "PnLs",
  [ROUTES.POSITIONS]: "Positions",
};

function resolveTitle(pathname: string) {
  if (pathname.startsWith(ROUTES.ANALYTICS))
    return PAGE_TITLES[ROUTES.ANALYTICS];
  if (pathname.startsWith(ROUTES.PNLS)) return PAGE_TITLES[ROUTES.PNLS];
  if (pathname.startsWith(ROUTES.POSITIONS))
    return PAGE_TITLES[ROUTES.POSITIONS];
  return PAGE_TITLES[ROUTES.DASHBOARD];
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(() => new Date());

  const title = useMemo(() => resolveTitle(pathname), [pathname]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.06),_transparent_30%),linear-gradient(180deg,#030712_0%,#0a0a0a_100%)] text-zinc-50">
      <DashboardSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((value) => !value)}
      />

      <div
        className={`min-h-screen transition-[padding] duration-200 ${collapsed ? "pl-[96px]" : "pl-[288px]"}`}
      >
        <DashboardNavbar
          title={title}
          updatedAt={updatedAt}
          collapsed={collapsed}
          onToggleSidebar={() => setCollapsed((value) => !value)}
          onRefreshDone={setUpdatedAt}
        />

        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
