"use client";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const Dropdown = ({
  options,
  defaultValue,
  onChange,
  className,
  optionsClassName,
}: {
  options: { value: string; label: React.ReactNode }[];
  defaultValue: string;
  onChange: (value: string) => void;
  className?: string;
  optionsClassName?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);

  return (
    <div className="relative">
      <div className={twMerge("bg-white dark:bg-black", className)}>
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          {options.find((option) => option.value === selected)?.label}
        </button>
        <div className="bg-white dark:bg-black absolute top-6 rounded-lg">
          {isOpen &&
            options.map((option) => (
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
      </div>
    </div>
  );
};

export default Dropdown;
