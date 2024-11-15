import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProvider } from "../components/providers";
import { Header } from "../components/Header";

import "../globals.css";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alex Greco",
  description: "Portfolio Site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={twMerge(inter.className, "relative bg-white  dark:bg-black")}
      >
        <AppProvider attribute="class">
          <Header />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
