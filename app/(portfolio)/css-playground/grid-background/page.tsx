"use client";

import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { colorBgClasses, colorVariants } from "./backgrounds";

const GridBackground = () => {
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
        <div className="mb-8 flex flex-row gap-2">
          {Object.keys(colorVariants).map((color) => (
            <button
              key={color}
              className={`rounded-xl border border-black bg-white p-4 hover:text-black dark:border-white dark:bg-black  ${colorBgClasses[color as keyof typeof colorBgClasses]}`}
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
        <div className="h-fit w-4/5 rounded-xl border border-celtic-50 bg-white p-4 dark:bg-black-500 dark:text-white">
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
