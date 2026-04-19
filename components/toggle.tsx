"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Toggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative inline-flex h-7 w-12 items-center rounded-full border border-zinc-300 bg-zinc-200 p-0.5 transition-colors duration-300 hover:border-[#F0C040]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0C040] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:focus-visible:ring-offset-[#0A0A0A]"
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={`absolute left-0.5 inline-flex size-5 items-center justify-center rounded-full bg-white text-zinc-700 shadow-sm transition-all duration-300 dark:bg-zinc-950 dark:text-zinc-200 ${
          isDark ? "translate-x-5" : "translate-x-0"
        }`}
      >
        {isDark ? <Moon className="size-3" /> : <Sun className="size-3" />}
      </span>
    </button>
  );
}
