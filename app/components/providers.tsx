"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
type ThemeProviderProps = Parameters<typeof ThemeProvider>[0];

export function AppProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <ThemeProvider {...props} enableSystem>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
}
