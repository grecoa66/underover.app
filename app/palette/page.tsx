"use client";
import { SyntheticEvent } from "react";
import { twMerge } from "tailwind-merge";

const Palette = () => {
  const paletteColors = [
    { className: "bg-black", hex: "#000000" },
    { className: "bg-white", hex: "#FFFFFF" },
    { className: "bg-emerald", hex: "#00803A" },
    { className: "bg-khaki", hex: "#BFBA84" },
  ];

  const copyHexHandler = (e: SyntheticEvent) => {
    const hex = e.currentTarget.getAttribute("data-hex");
    if (hex) {
      navigator.clipboard.writeText(hex);
      alert(`${hex} copied to clipboard!`);
    }
  };

  return (
    <div className="bg-gray-100 flex h-screen flex-col items-center justify-center space-y-8">
      <h1 className="text-black text-4xl">Color Palette</h1>
      <div className="flex flex-row items-center justify-center">
        {paletteColors.map((color, index) => (
          <div
            key={color.className}
            data-hex={color.hex}
            onClick={copyHexHandler}
            className={twMerge(
              "flex h-96 w-48 flex-row items-center justify-center",
              color.className,
              color.className === "bg-black" && "text-white",
              index === 0 && "rounded-l-lg",
              index === paletteColors.length - 1 && "rounded-r-lg",
            )}
          >
            <div>
              {color.className.slice(3).charAt(0).toUpperCase() +
                color.className.slice(4)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Palette;
