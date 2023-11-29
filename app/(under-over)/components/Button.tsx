import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

export const LinkButton = ({
  href,
  text,
  className,
  StartIcon,
  EndIcon,
}: {
  href: string;
  text: string;
  className?: string;
  StartIcon?: IconType;
  EndIcon?: IconType;
}) => {
  const defaultStyles =
    "flex flex-row items-center justify-center space-x-2 rounded-lg border-2 border-everglade p-2 hover:bg-everglade hover:text-white dark:border-mint dark:hover:bg-mint dark:hover:text-black";
  return (
    <Link href={href} className={twMerge(defaultStyles, className)}>
      {StartIcon && <StartIcon />}
      <button type="button">{text}</button>
      {EndIcon && <EndIcon />}
    </Link>
  );
};
