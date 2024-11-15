import { twMerge } from "tailwind-merge";

export const Pill = ({ text, styles }: { text: string; styles?: string }) => {
  return (
    <div
      className={twMerge(
        "flex h-fit w-fit flex-row justify-center rounded-full bg-everglade-50 bg-opacity-25 px-2 py-1 dark:bg-everglade-300 dark:bg-opacity-25",
        styles,
      )}
    >
      <p className="text-nowrap text-sm text-celtic-300 text-opacity-100 dark:text-everglade-50">
        {text}
      </p>
    </div>
  );
};
