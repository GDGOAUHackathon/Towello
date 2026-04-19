"use client";
import { ThemeProvider } from "next-themes";
import React from "react";

export default function ThemesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
