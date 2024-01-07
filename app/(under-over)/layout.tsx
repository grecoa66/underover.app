import { Sometype_Mono } from "next/font/google";
import { AppProvider } from "../components/providers";
import { UONavBar } from "../components/NavBar";
import "../globals.css";

const sometype = Sometype_Mono({ subsets: ["latin"] });

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={sometype.className}>
        <AppProvider attribute="class">
          <UONavBar />
          <div className="h-[calc(100vh-theme(space.16))] p-4">{children}</div>
        </AppProvider>
      </body>
    </html>
  );
};

export default Layout;
