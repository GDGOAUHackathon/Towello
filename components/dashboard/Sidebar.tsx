"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Briefcase,
  ChevronRight,
  LayoutDashboard,
  LineChart,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/components/providers/AuthProvider";

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

const EXPANDED_WIDTH = "w-[288px]";
const COLLAPSED_WIDTH = "w-[96px]";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const NAV_ITEMS: NavItem[] = [
  { href: ROUTES.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
  { href: ROUTES.ANALYTICS, label: "Analytics", icon: Sparkles },
  { href: ROUTES.PNLS, label: "PnLs", icon: LineChart },
  { href: ROUTES.POSITIONS, label: "Positions", icon: Briefcase },
];

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardSidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  const userName =
    user?.displayName ?? user?.email?.split("@")[0] ?? "Active trader";

  const userEmail = user?.email ?? "Connected workspace";

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex h-screen flex-col border-r border-white/10 bg-zinc-950/95 backdrop-blur-xl transition-[width] duration-200 ${
        collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH
      }`}
    >
      <div className="relative border-b border-white/5 px-4 py-5">
        <Link
          href={ROUTES.DASHBOARD}
          className={`flex items-center overflow-hidden text-left ${collapsed ? "justify-center" : "gap-3"}`}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.12)]">
            <Wallet className="h-5 w-5" />
          </span>
          {!collapsed ? (
            <span className="min-w-0">
              <span className="block text-sm font-semibold uppercase tracking-[0.2em] text-zinc-50">
                Towello
              </span>
              <span className="block text-xs text-zinc-500">
                Portfolio intelligence
              </span>
            </span>
          ) : null}
        </Link>

        <button
          type="button"
          onClick={onToggle}
          className={`absolute top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/8 bg-black/40 text-zinc-50 shadow-[0_12px_24px_rgba(0,0,0,0.35)] transition hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-400 ${
            collapsed ? "-right-5" : "-right-5"
          }`}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4.5 w-4.5" />
          ) : (
            <PanelLeftClose className="h-4.5 w-4.5" />
          )}
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-2 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-2xl border px-3 py-3 text-sm font-medium transition-all duration-200 ${
                active
                  ? "border-emerald-500/35 bg-emerald-500/10 text-zinc-50 shadow-[0_0_0_1px_rgba(16,185,129,0.1),0_10px_30px_rgba(16,185,129,0.08)]"
                  : "border-transparent text-zinc-500 hover:border-white/8 hover:bg-white/4 hover:text-zinc-50"
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition ${
                  active
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    : "border-white/8 bg-black/40 text-zinc-500 group-hover:border-emerald-500/20 group-hover:text-emerald-400"
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
              </span>
              {!collapsed ? (
                <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
                  <span className="truncate">{item.label}</span>
                  <ChevronRight
                    className={`h-4 w-4 transition ${active ? "text-emerald-400" : "text-zinc-700"}`}
                  />
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/5 p-3">
        <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-3 shadow-[0_12px_30px_rgba(0,0,0,0.28)]">
          <div
            className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-sm font-semibold text-emerald-400">
              {getInitials(userName || "T") || "T"}
            </div>
            {!collapsed ? (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-zinc-50">
                  {userName}
                </p>
                <p className="truncate text-xs text-zinc-500">{userEmail}</p>
              </div>
            ) : null}
          </div>

          {!collapsed ? (
            <div className="mt-3 flex items-center gap-2 rounded-2xl border border-emerald-500/12 bg-black/20 px-3 py-2 text-xs text-zinc-500">
              <ArrowUpRight className="h-4 w-4 text-emerald-400" />
              <span>Built for fast decisions and cleaner signal.</span>
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
