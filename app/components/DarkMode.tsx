"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FaCog, FaMoon, FaSun } from "react-icons/fa";
import Dropdown from "./Dropdown";

const DarkModeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Dropdown
      options={[
        {
          value: "system",
          label: <FaCog className="hover:dark:fill-mint-600" />,
        },
        { value: "light", label: <FaSun className="hover:fill-aero" /> },
        { value: "dark", label: <FaMoon className="hover:fill-brandy" /> },
      ]}
      onChange={setTheme}
      defaultValue={theme || "system"}
      className="flex h-full w-8 flex-row items-center justify-center"
      optionsClassName="p-4"
    />
  );
};

export default DarkModeButton;
