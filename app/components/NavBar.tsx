"use client";
import Link from "next/link";
import DarkModeButton from "./DarkMode";

// Slightly modified nav bar for the under/overs app
export const UONavBar = () => {
  return (
    <div className="sticky top-0">
      <div className="bg-white dark:bg-black flex flex-row justify-between p-4">
        <h2 className="text-everglade text-xl font-bold">Under Overs</h2>
        <DarkModeButton />
      </div>
    </div>
  );
};

const NavBar = () => {
  return (
    <div className="sticky top-0">
      <div className="bg-white dark:bg-black flex flex-row justify-between p-4">
        <Link href="/">
          <h2 className="text-everglade text-xl">A</h2>
        </Link>
        <DarkModeButton />
      </div>
    </div>
  );
};

export default NavBar;
