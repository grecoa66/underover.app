"use client";

import { useRef, useState } from "react";
import useOnClickOutside from "../hooks/useClickOutside";
import { FaBars, FaCoins, FaPaintBrush } from "react-icons/fa";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import { DarkModeButton } from "./DarkMode";
import { AKGIcon } from "./AKGIcon";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsOpen(false));

  const buttonStyle =
    "flex flex-row items-center gap-2 p-4 text-celtic-200 dark:text-mint-400 hover:text-everglade dark:hover:text-everglade hover:bg-mint dark:hover:bg-mint";

  return (
    <div className="sticky top-0 z-50 h-16" id="header-menu">
      <div className="flex h-full flex-row items-center justify-between bg-white p-4 dark:bg-black">
        <Link href="/">
          <AKGIcon />
        </Link>
        <div className="relative flex flex-row" ref={ref}>
          <DarkModeButton />
          <button
            className="text-everglade duration-300 hover:scale-110 hover:text-everglade dark:text-everglade-400 dark:hover:text-everglade-200"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaBars className="h-5 text-lg " />
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
          className={
            "flex w-full flex-row gap-4 border-2 border-everglade bg-white transition-all duration-300 dark:bg-black"
          }
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
