"use client";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

export const Accordion = ({
  children,
  closedText,
  openedText,
}: {
  children: React.ReactNode;
  closedText?: string;
  openedText?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="my-2 flex flex-row items-center border-2 border-transparent p-2 hover:rounded-lg hover:border-everglade dark:hover:border-mint"
      >
        {isOpen ? openedText : closedText}
        <FaAngleDown
          className={
            isOpen
              ? "rotate-180 transition duration-150"
              : "rotate-0 transition duration-150"
          }
        />
      </button>
      {isOpen && <div className="w-full">{children}</div>}
    </div>
  );
};
