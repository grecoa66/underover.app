"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FaCog, FaMoon, FaSun } from "react-icons/fa";
import Dropdown from "./Dropdown";

export const DarkModeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const iconClass = "hover:fill-everglade hover:dark:fill-mint h-6 w-6";

  return (
    <Dropdown
      options={[
        {
          value: "system",
          label: <FaCog className={iconClass} />,
        },
        {
          value: "light",
          label: <FaSun className={iconClass} />,
        },
        {
          value: "dark",
          label: <FaMoon className={iconClass} />,
        },
      ]}
      onChange={setTheme}
      defaultValue={theme || "system"}
      containerClassName="flex h-full w-6 flex-row items-center justify-center mr-4"
      menuClassName="border-mint border-2 mt-2"
      optionsClassName="p-4"
    />
  );
};
