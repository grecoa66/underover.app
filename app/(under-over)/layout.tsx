import { Sometype_Mono } from "next/font/google";
import { AppProvider } from "../components/providers";
import { UONavBar } from "../components/NavBar";
import "../globals.css";
import { getSession } from "next-auth/react";

const sometype = Sometype_Mono({ subsets: ["latin"] });

const Layout = ({ children }: { children: React.ReactNode }) => {
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
};

export default Layout;
