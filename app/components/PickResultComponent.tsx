import { PickResult } from "@/app/types/picks";
import { FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import { FaCircleXmark, FaCircleArrowRight } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

export const PickResultComponent = ({
  result,
  text,
  className,
}: {
  result?: PickResult;
  text: string | number;
  className?: string;
}) => (
  <div
    className={twMerge(
      "flex flex-row items-center justify-center space-x-2",
      className,
    )}
  >
    {result === PickResult.Win && (
      <>
        <FaCheckCircle className="text-everglade-300" /> <p>{text}</p>
      </>
    )}
    {result === PickResult.Lose && (
      <>
        <FaCircleXmark className="text-red-400" /> <p>{text}</p>
      </>
    )}
    {result === PickResult.Push && (
      <>
        <FaCircleArrowRight className="text-gray-400" /> <p>{text}</p>
      </>
    )}
    {!result && (
      <>
        <FaHourglassHalf className="text-gray-400" /> <p>{text}</p>
      </>
    )}
  </div>
);
