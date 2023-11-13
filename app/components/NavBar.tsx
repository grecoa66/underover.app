"use client";
import Link from "next/link";
import DarkModeButton from "./DarkMode";

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
