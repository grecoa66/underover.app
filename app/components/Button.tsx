import Link from "next/link";
import { ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

type buttonVariants = "base" | "danger" | "inverse";

/**
 * The classes being merged in the switch state are order as follows:
 * - Light mode base colors
 * - Light mode hover
 * - Light mode disabled hover
 * - Dark mode base colors
 * - Dark mode hover
 * - Dark mode disabled hover
 */
const getButtonStyles = (variant: buttonVariants) => {
  const baseStyles =
    "w-fit flex flex-row items-center justify-center space-x-2 p-2 rounded-lg border-2 disabled:opacity-50 disabled:cursor-not-allowed";
  switch (variant) {
    case "base": {
      return twMerge(
        "border-everglade text-everglade",
        "hover:bg-everglade hover:text-white",
        "disabled:hover:bg-transparent disabled:hover:text-everglade",
        "dark:border-mint dark:text-mint",
        "dark:hover:bg-mint dark:hover:text-black",
        "disabled:dark:hover:bg-transparent disabled:dark:hover:text-mint",
        baseStyles,
      );
    }
    case "danger": {
      return twMerge(
        "border-red-500 text-red-500",
        "hover:bg-red-500 hover:text-white",
        "disabled:hover:bg-transparent disabled:hover:text-red-500",
        "dark:hover:text-black",
        "disabled:dark:hover:text-red-500",
        baseStyles,
      );
    }
    case "inverse": {
      return twMerge(
        "bg-everglade border-everglade text-white",
        "hover:bg-transparent hover:text-everglade",
        "disabled:hover:bg-everglade disabled:hover:text-white",
        "dark:border-mint dark:bg-mint dark:text-black",
        "dark:hover:bg-transparent dark:hover:text-mint ",
        "disabled:dark:hover:bg-mint disabled:dark:hover:text-black",
        baseStyles,
      );
    }
    default: {
      const exhaustiveCheck: never = variant;
      return exhaustiveCheck;
    }
  }
};

export const Button = ({
  text,
  variant = "base",
  className,
  StartIcon,
  EndIcon,
  ...props
}: {
  text: string;
  variant?: buttonVariants;
  className?: string;
  StartIcon?: IconType;
  EndIcon?: IconType;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...props} className={twMerge(getButtonStyles(variant), className)}>
      {StartIcon && <StartIcon />}
      <span>{text}</span>
      {EndIcon && <EndIcon />}
    </button>
  );
};

export const LinkButton = ({
  href,
  text,
  variant = "base",
  className,
  StartIcon,
  EndIcon,
  ...props
}: {
  href: string;
  text: string;
  variant?: buttonVariants;
  className?: string;
  StartIcon?: IconType;
  EndIcon?: IconType;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Link href={href} className={twMerge(getButtonStyles(variant), className)}>
      {StartIcon && <StartIcon />}
      <span>{text}</span>
      {EndIcon && <EndIcon />}
    </Link>
  );
};
