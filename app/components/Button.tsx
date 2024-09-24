import Link from "next/link";
import { ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

type buttonVariants = "base" | "danger" | "inverse";

const getButtonStyles = (variant: buttonVariants) => {
  const baseStyles =
    "w-fit flex flex-row items-center justify-center space-x-2 p-2 rounded-lg border-2 disabled:opacity-50 disabled:cursor-not-allowed";
  switch (variant) {
    case "base": {
      return twMerge(
        "border-everglade text-everglade dark:text-mint hover:bg-everglade hover:text-white dark:border-mint dark:hover:bg-mint dark:hover:text-black",
        baseStyles,
      );
    }
    case "danger": {
      return twMerge(
        "border-red-400 text-red-400 hover:bg-red-400 hover:text-white",
        baseStyles,
      );
    }
    case "inverse": {
      return twMerge(
        "bg-everglade border-everglade text-white hover:bg-white hover:text-everglade dark:border-mint dark:bg-mint dark:text-black dark:hover:bg-black dark:hover:text-mint",
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
