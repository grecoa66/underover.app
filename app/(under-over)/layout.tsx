import { Sometype_Mono } from "next/font/google";
import { AppProvider } from "../components/providers";
import { UONavBar } from "../components/NavBar";
import "../globals.css";

const sometype = Sometype_Mono({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={sometype.className}>
        <AppProvider attribute="class">
          <UONavBar />
          <div>{children}</div>
        </AppProvider>
      </body>
    </html>
  );
}
