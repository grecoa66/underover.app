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
              "flex h-16 flex-row items-center justify-center",
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
    <div className="flex h-full">
      <div className="flex w-full flex-col items-center justify-center space-y-8 py-8">
        <h1 className="text-4xl text-black">Color Palette</h1>
        <div className="flex w-full flex-row items-center justify-center px-8">
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
                  color.className === "bg-celtic" && "text-white",
                  color.className === "bg-white" && "text-black",
                  color.className === "bg-mint" && "text-black",
                  color.className === "bg-aero" && "text-black",
                  index === 0 && "rounded-tl-lg",
                  index === Object.keys(colors).length - 1 && "rounded-tr-lg",
                )}
              >
                <div className="rotate-[70deg] md:transform-none">
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
  celtic: {
    className: "bg-celtic",
    hex: "#153626",
    shades: [
      "bg-celtic-100",
      "bg-celtic-200",
      "bg-celtic-300",
      "bg-celtic-400",
      "bg-celtic-500",
      "bg-celtic-600",
      "bg-celtic-700",
      "bg-celtic-800",
      "bg-celtic-900",
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
  mint: {
    className: "bg-mint",
    hex: "#B1FFDA",
    shades: [
      "bg-mint-100",
      "bg-mint-200",
      "bg-mint-300",
      "bg-mint-400",
      "bg-mint-500",
      "bg-mint-600",
      "bg-mint-700",
      "bg-mint-800",
      "bg-mint-900",
    ],
  },
  aero: {
    className: "bg-aero",
    hex: "#D8FFED",
    shades: [
      "bg-aero-100",
      "bg-aero-200",
      "bg-aero-300",
      "bg-aero-400",
      "bg-aero-500",
      "bg-aero-600",
      "bg-aero-700",
      "bg-aero-800",
      "bg-aero-900",
    ],
  },
};
