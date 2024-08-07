"use client";
import { twMerge } from "tailwind-merge";
import { colorVariants } from "./grid-background/backgrounds";

const CSSPlayground = () => {
  return (
    <main className="flex min-h-[calc(100vh-theme(space.16))] flex-col bg-white p-4 dark:bg-black">
      <div className="my-12 flex flex-row justify-center">
        <h1 className="text-2xl text-celtic-200 dark:text-mint-400">
          🚧 Under Construction 🚧
        </h1>
      </div>
      <h1 className="text-2xl text-celtic-200 dark:text-mint-400">
        CSS Playground
      </h1>
      <div className={"relative mt-4 rounded border border-white p-8"}>
        <div
          className={twMerge(
            "absolute inset-0 z-0 h-full w-full bg-[size:40px_40px] opacity-55",
            colorVariants.celtic,
          )}
        />

        <div>
          <h2 className="z-10 text-xl">Grid Background</h2>
          <div className="flex flex-row space-x-4">
            <button className="btn-primary">Open</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CSSPlayground;
