"use client";
import { SyntheticEvent } from "react";
import { twMerge } from "tailwind-merge";

const Shades = ({
  shades,
  className,
}: {
  shades: string[];
  className?: string;
}) => {
  return (
    <div>
      {shades.map((shade, index) => {
        return (
          <div
            key={shade}
            className={twMerge(
              "flex h-20 flex-row items-center justify-center",
              shade,
              index === shades.length - 1 && className,
            )}
          />
        );
      })}
    </div>
  );
};

const Palette = () => {
  const copyHexHandler = (e: SyntheticEvent) => {
    const hex = e.currentTarget.getAttribute("data-hex");
    if (hex) {
      navigator.clipboard.writeText(hex);
      alert(`${hex} copied to clipboard!`);
    }
  };

  return (
    <div className="bg-gray-200 dark:bg-gray-400 flex h-full ">
      <div className="flex w-full flex-col items-center justify-center space-y-8 py-8">
        <h1 className="text-black text-4xl">Color Palette</h1>
        <div className="flex w-full flex-row items-center justify-center">
          {Object.values(colors).map((color, index) => (
            <div key={color.className} className="w-1/6">
              <div
                data-hex={color.hex}
                onClick={copyHexHandler}
                className={twMerge(
                  "flex h-72 flex-row items-center justify-center",
                  color.className,
                  color.className === "bg-black" && "text-white",
                  color.className === "bg-everglade" && "text-white",
                  color.className === "bg-white" && "text-black",
                  index === 0 && "rounded-tl-lg",
                  index === Object.keys(colors).length - 1 && "rounded-tr-lg",
                )}
              >
                <div>
                  {color.className.slice(3).charAt(0).toUpperCase() +
                    color.className.slice(4)}
                </div>
              </div>
              <Shades
                shades={color.shades}
                className={twMerge(
                  index === 0 && "rounded-bl-lg",
                  index === Object.keys(colors).length - 1 && "rounded-br-lg",
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Palette;

type Color = {
  [key: string]: {
    className: string;
    hex: string;
    shades: string[];
  };
};

const colors: Color = {
  black: {
    className: "bg-black",
    hex: "#191919",
    shades: [
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
