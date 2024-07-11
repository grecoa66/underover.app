import { twMerge } from "tailwind-merge";

export const Pill = ({ text, styles }: { text: string; styles?: string }) => {
  return (
    <div
      className={twMerge(
        "flex h-fit w-fit flex-row justify-center rounded-full bg-everglade-50 bg-opacity-25 px-2 py-1  text-sm text-everglade-400 text-opacity-100 dark:bg-everglade-400 dark:bg-opacity-25 dark:text-everglade-50",
        styles,
      )}
    >
      <p>{text}</p>
    </div>
  );
};
