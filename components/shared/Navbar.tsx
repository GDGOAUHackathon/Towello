"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Toggle from "@/components/toggle";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "AI Analysis", href: "#ai-analysis" },
  { label: "How It Works", href: "#how-it-works" },
];

function buttonClass(variant: "ghost" | "gold") {
  if (variant === "gold") {
    return "inline-flex items-center justify-center rounded-xl border border-[#F0C040]/80 bg-[#F0C040] px-4 py-2 text-sm font-semibold text-zinc-950 shadow-[0_16px_36px_-22px_rgba(240,192,64,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110";
  }

  return "inline-flex items-center justify-center rounded-xl border border-zinc-700/70 bg-zinc-900/40 px-4 py-2 text-sm font-medium text-zinc-200 transition-all duration-300 hover:border-[#F0C040]/65 hover:text-[#F0C040]";
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-4 md:px-8">
        <nav className="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 px-4 py-3 backdrop-blur-xl shadow-[0_18px_38px_-28px_rgba(0,0,0,0.9)]">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="#home"
              className="text-sm font-semibold tracking-[0.16em] text-zinc-100 transition-colors duration-300 hover:text-[#F0C040]"
            >
              Bayse AI
            </Link>

            <ul className="hidden items-center gap-6 lg:flex">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-300 transition-colors duration-300 hover:text-[#F0C040]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden items-center gap-2 lg:flex">
              <Toggle />
              <button type="button" className={buttonClass("ghost")}>
                Login
              </button>
              <button type="button" className={buttonClass("gold")}>
                Get Started
              </button>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <Toggle />
              <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="inline-flex size-10 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900/50 text-zinc-200 transition-all duration-300 hover:border-[#F0C040]/70 hover:text-[#F0C040]"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </button>
            </div>
          </div>

          {isOpen ? (
            <div className="mt-4 space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 lg:hidden">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-zinc-300 transition-colors duration-300 hover:bg-zinc-800 hover:text-[#F0C040]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2 flex justify-center pb-1">
                  <Toggle />
                </div>
                <button type="button" className={buttonClass("ghost")}>
                  Login
                </button>
                <button type="button" className={buttonClass("gold")}>
                  Get Started
                </button>
              </div>
            </div>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
