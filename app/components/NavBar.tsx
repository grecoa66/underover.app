"use client";
import Link from "next/link";
import DarkModeButton from "./DarkMode";

const NavBar = () => {
  return (
    <div className="bg-white dark:bg-black flex flex-row justify-between p-4">
      <Link href="/">
        <h2>Alex Greco</h2>
      </Link>
      <DarkModeButton />
    </div>
  );
};

export default NavBar;
