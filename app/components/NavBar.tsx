"use client";
import DarkModeButton from "./DarkMode";

const NavBar = () => {
  return (
    <div className="flex flex-row justify-between p-4">
      <h2>Alex Greco</h2>
      <DarkModeButton />
    </div>
  );
};

export default NavBar;
