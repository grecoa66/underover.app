"use client";

import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

const GridBackground = () => {
  const colorVariants = {
    celtic: `bg-[linear-gradient(to_right,#2C714F_1px,transparent_1px),linear-gradient(to_bottom,#2C714F_1px,transparent_1px)]`,
    mint: "bg-[linear-gradient(to_right,#B1FFDA_1px,transparent_1px),linear-gradient(to_bottom,#B1FFDA_1px,transparent_1px)]",
    everglade:
      "bg-[linear-gradient(to_right,#1E4D2B_1px,transparent_1px),linear-gradient(to_bottom,#1E4D2B_1px,transparent_1px)]",
    aero: "bg-[linear-gradient(to_right,#D8FFED_1px,transparent_1px),linear-gradient(to_bottom,#D8FFED_1px,transparent_1px)]",
  };

  const [selectedColor, setSelectedColor] = useState<string>(
    colorVariants.celtic,
  );

  return (
    <div className={"h-screen w-screen"}>
      <div
        className={twMerge(
          `absolute inset-0 top-16 -z-10 h-full w-full bg-[size:40px_40px] opacity-55`,
          selectedColor,
        )}
      />
      <div className="z-0 flex h-full w-full flex-col items-center justify-center">
        <p>Grid Color</p>
        <div className="mb-8 flex flex-row gap-2">
          {Object.keys(colorVariants).map((color) => (
            <button
              className="rounded-xl border border-black bg-white p-4 hover:bg-mint hover:text-black dark:border-white dark:bg-black dark:hover:bg-mint"
              type="button"
              onClick={() => {
                setSelectedColor(
                  colorVariants[color as keyof typeof colorVariants],
                );
              }}
            >
              {color}
            </button>
          ))}
        </div>
        <div className="h-fit w-4/5 rounded-xl border border-celtic-50 bg-black-500 p-4 text-white">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          {/* more random text */}
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Sed ut perspiciatis
            unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GridBackground;
