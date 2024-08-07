"use client";
import { useRef, useState } from "react";
import useOnClickOutside from "../hooks/useClickOutside";
import { twMerge } from "tailwind-merge";
import { FaBars, FaCoins, FaPaintBrush } from "react-icons/fa";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import { DarkModeButton } from "./DarkMode";

export const HeaderMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsOpen(false));

  const buttonStyle =
    "right-0 top-6 flex flex-row items-center space-x-2 p-2 my-2 text-celtic dark:text-everglade-400 hover:text-everglade dark:hover:text-everglade-200";

  return (
    <div className="sticky top-0 h-16" id="header-menu">
      <div className="flex h-full flex-row items-center justify-between bg-white p-4 dark:bg-black">
        <Link href="/">
          <h2 className="text-xl text-everglade">A</h2>
        </Link>
        <div className="relative flex flex-row" ref={ref}>
          <DarkModeButton />
          <button
            className="text-celtic duration-300 hover:scale-110 hover:text-everglade dark:text-everglade-400 dark:hover:text-everglade-200"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaBars className="text-lg" />
          </button>
        </div>
      </div>
      <Transition
        show={isOpen}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={twMerge(
            "flex w-full flex-row border-2 border-everglade bg-white transition-all duration-300 dark:bg-black",
            isOpen ? "opacity-100" : "opacity-0",
          )}
        >
          <Link className={buttonStyle} href="/over-under">
            <FaCoins />
            <p>Over Under</p>
          </Link>
          <Link className={buttonStyle} href="/css-playground">
            <FaPaintBrush />
            <p>CSS Playground</p>
          </Link>
        </div>
      </Transition>
    </div>
  );
};
