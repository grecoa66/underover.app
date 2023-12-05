import Link from "next/link";
import { ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

type buttonVariants = "base" | "danger" | "inverse";

const getbuttonStyles = (variant: buttonVariants) => {
  const baseStyles =
    "flex flex-row items-center justify-center space-x-2 p-2 rounded-lg border-2 disabled:opacity-50 disabled:cursor-not-allowed";
  switch (variant) {
    case "base": {
      return twMerge(
        "border-everglade text-everglade dark:text-mint enabled:hover:bg-everglade enabled:hover:text-white dark:border-mint dark:enabled:hover:bg-mint dark:enabled:hover:text-black",
        baseStyles,
      );
    }
    case "danger": {
      return twMerge(
        "border-red-400 text-red-400 enabled:hover:bg-red-400 enabled:hover:text-white",
        baseStyles,
      );
    }
    case "inverse": {
      return twMerge(
        "bg-everglade border-everglade text-white enabled:hover:bg-white enabled:hover:text-everglade dark:border-mint dark:bg-mint dark:text-black dark:enabled:hover:bg-black dark:enabled:hover:text-mint",
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
    <button {...props} className={twMerge(getbuttonStyles(variant), className)}>
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
}: {
  href: string;
  text: string;
  variant?: buttonVariants;
  className?: string;
  StartIcon?: IconType;
  EndIcon?: IconType;
}) => {
  return (
    <Link href={href} className={twMerge(getbuttonStyles(variant), className)}>
      {StartIcon && <StartIcon />}
      <button type="button">{text}</button>
      {EndIcon && <EndIcon />}
    </Link>
  );
};
