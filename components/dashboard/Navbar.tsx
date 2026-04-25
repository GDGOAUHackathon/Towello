"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  CircleUserRound,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  RefreshCw,
} from "lucide-react";
import { mutate as globalMutate } from "swr";
import { useAuth } from "@/components/providers/AuthProvider";

type NavbarProps = {
  title: string;
  updatedAt: Date;
  collapsed: boolean;
  onToggleSidebar: () => void;
  onRefreshDone: (time: Date) => void;
};

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function DashboardNavbar({
  title,
  updatedAt,
  collapsed,
  onToggleSidebar,
  onRefreshDone,
}: NavbarProps) {
  const { user, signOutUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const avatarLabel =
    user?.displayName ?? user?.email?.split("@")[0] ?? "Trader";

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const handleRefresh = async () => {
    await globalMutate(() => true);
    onRefreshDone(new Date());
  };

  const timeLabel = new Intl.DateTimeFormat("en-NG", {
    hour: "numeric",
    minute: "2-digit",
  }).format(updatedAt);

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-zinc-950/60 backdrop-blur-2xl">
      <div className="flex items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/8 bg-white/4 text-zinc-50 transition hover:border-emerald-500/35 hover:bg-emerald-500/10 hover:text-emerald-400 lg:hidden"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4.5 w-4.5" />
          ) : (
            <PanelLeftClose className="h-4.5 w-4.5" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <p className="text-[0.65rem] uppercase tracking-[0.34em] text-zinc-500">
            Premium trading workspace
          </p>
          <h1 className="mt-1 truncate text-2xl font-semibold text-zinc-50 sm:text-3xl">
            {title}
          </h1>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="rounded-2xl border border-white/8 bg-white/4 px-4 py-2 text-right">
            <p className="text-[0.62rem] uppercase tracking-[0.28em] text-zinc-500">
              Last updated
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-50">{timeLabel}</p>
          </div>

          <button
            type="button"
            onClick={() => void handleRefresh()}
            className="inline-flex h-11 items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 text-sm font-medium text-zinc-50 transition hover:border-emerald-500/40 hover:text-emerald-400"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="flex h-11 items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-3 transition hover:border-emerald-500/25 hover:bg-white/6"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-xs font-semibold text-emerald-400">
                {getInitials(avatarLabel || "T") || "T"}
              </span>
              <span className="hidden max-w-[160px] truncate text-sm font-medium text-zinc-50 lg:block">
                {avatarLabel}
              </span>
              <ChevronDown className="h-4 w-4 text-zinc-500" />
            </button>

            {menuOpen ? (
              <div className="absolute right-0 top-[calc(100%+0.75rem)] w-64 overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/95 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                <div className="rounded-2xl border border-white/8 bg-white/4 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-sm font-semibold text-emerald-400">
                      {getInitials(avatarLabel || "T") || "T"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-zinc-50">
                        {avatarLabel}
                      </p>
                      <p className="truncate text-xs text-zinc-500">
                        {user?.email ?? "Signed in workspace"}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm text-zinc-50 transition hover:bg-white/5 hover:text-emerald-400"
                >
                  <CircleUserRound className="h-4.5 w-4.5" />
                  Account settings
                </button>

                <button
                  type="button"
                  onClick={() => void signOutUser()}
                  className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm text-red-400 transition hover:bg-red-500/8"
                >
                  <LogOut className="h-4.5 w-4.5" />
                  Sign out
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
