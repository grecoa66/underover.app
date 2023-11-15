"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
type ThemeProviderProps = Parameters<typeof NextThemesProvider>[0];

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props} enableSystem>
      <SessionProvider>{children}</SessionProvider>
    </NextThemesProvider>
  );
}
