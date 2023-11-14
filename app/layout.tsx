import type { Metadata } from "next";
import { Inter, Sometype_Mono } from "next/font/google";
import { ThemeProvider } from "./components/providers";
import NavBar from "./components/NavBar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
export const sometype = Sometype_Mono({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
