"use client";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import useOnClickOutside from "../hooks/useClickOutside";
import { MenuTransition } from "./MenuTransition";

const Dropdown = ({
  options,
  defaultValue,
  onChange,
  containerClassName,
  menuClassName,
  optionsClassName,
}: {
  options: { value: string; label: React.ReactNode }[];
  defaultValue: string;
  onChange: (value: string) => void;
  containerClassName?: string;
  menuClassName?: string;
  optionsClassName?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsOpen(false));

  useEffect(() => {
    console.log("isOpen", isOpen);
  }, [isOpen]);

  return (
    <div className="border-1 relative border-mint" ref={ref}>
      <div className={containerClassName}>
        <button
          id="open-light-mode-button"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {options.find((option) => option.value === selected)?.label}
        </button>
        <MenuTransition isOpen={isOpen}>
          <div
            className={twMerge(
              "absolute top-6 rounded-lg bg-white dark:bg-black",
              menuClassName,
            )}
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={optionsClassName}
                onClick={() => {
                  setSelected(option.value);
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        </MenuTransition>
        {/* )} */}
      </div>
    </div>
  );
};

export default Dropdown;
