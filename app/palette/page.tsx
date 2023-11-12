"use client";
import { SyntheticEvent } from "react";
import { twMerge } from "tailwind-merge";

const Palette = () => {
  const copyHexHandler = (e: SyntheticEvent) => {
    const hex = e.currentTarget.getAttribute("data-hex");
    if (hex) {
      navigator.clipboard.writeText(hex);
      alert(`${hex} copied to clipboard!`);
    }
  };

  return (
    <div className="bg-gray-100 flex h-full flex-col items-center justify-center space-y-8">
      <h1 className="text-black text-4xl">Color Palette</h1>
      <div className="flex w-full flex-row items-center justify-center">
        {Object.values(colors).map((color, index) => (
          <div key={color.className} className="w-1/6">
            <div
              data-hex={color.hex}
              onClick={copyHexHandler}
              className={twMerge(
                "flex h-96 flex-row items-center justify-center",
                color.className,
                color.className === "bg-black" && "text-white",
                index === 0 && "rounded-l-lg",
                index === Object.keys(colors).length - 1 && "rounded-r-lg",
              )}
            >
              <div>
                {color.className.slice(3).charAt(0).toUpperCase() +
                  color.className.slice(4)}
              </div>
            </div>
            <div>
              {color.shades.map((shade) => {
                return (
                  <div
                    key={shade}
                    className={twMerge(
                      "flex h-20 flex-row items-center justify-center",
                      shade,
                    )}
                  >
                    {shade}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Palette;

const colors = {
  black: {
    className: "bg-black",
    hex: "#191919",
    shades: [
      "bg-black-50",
      "bg-black-100",
      "bg-black-200",
      "bg-black-300",
      "bg-black-400",
      "bg-black-500",
      "bg-black-600",
      "bg-black-700",
      "bg-black-800",
      "bg-black-900",
    ],
  },
  white: {
    className: "bg-white",
    hex: "#FFFFFF",
    shades: [
      "bg-white-50",
      "bg-white-100",
      "bg-white-200",
      "bg-white-300",
      "bg-white-400",
      "bg-white-500",
      "bg-white-600",
      "bg-white-700",
      "bg-white-800",
      "bg-white-900",
    ],
  },
  everglad: {
    className: "bg-everglade",
    hex: "#1E4D2B",
    shades: [
      "bg-everglade-50",
      "bg-everglade-100",
      "bg-everglade-200",
      "bg-everglade-300",
      "bg-everglade-400",
      "bg-everglade-500",
      "bg-everglade-600",
      "bg-everglade-700",
      "bg-everglade-800",
      "bg-everglade-900",
    ],
  },
  gold: {
    className: "bg-gold",
    hex: "#C8C372",
    shades: [
      "bg-gold-50",
      "bg-gold-100",
      "bg-gold-200",
      "bg-gold-300",
      "bg-gold-400",
      "bg-gold-500",
      "bg-gold-600",
      "bg-gold-700",
      "bg-gold-800",
      "bg-gold-900",
    ],
  },
  brandy: {
    className: "bg-brandy",
    hex: "#D9782D",
    shades: [
      "bg-brandy-50",
      "bg-brandy-100",
      "bg-brandy-200",
      "bg-brandy-300",
      "bg-brandy-400",
      "bg-brandy-500",
      "bg-brandy-600",
      "bg-brandy-700",
      "bg-brandy-800",
      "bg-brandy-900",
    ],
  },
};
