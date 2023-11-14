"use client";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import useOnClickOutside from "../hooks/useClickOutside";

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

  return (
    <div className="border-1 border-mint relative">
      <div className={twMerge("bg-white dark:bg-black", containerClassName)}>
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          {options.find((option) => option.value === selected)?.label}
        </button>
        {isOpen && (
          <div
            ref={ref}
            className={twMerge(
              "bg-white dark:bg-black absolute top-6 rounded-lg",
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
        )}
      </div>
    </div>
  );
};

export default Dropdown;
