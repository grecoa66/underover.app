import Link from "next/link";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

const ManageHeader = ({
  title,
  backLink,
  backText,
  addLink,
  addText,
  className,
}: {
  title: string;
  backLink?: string;
  backText?: string;
  addLink?: string;
  addText?: string;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "flex flex-row items-center justify-between",
        className,
      )}
    >
      <h2 className="text-xl">{title}</h2>
      {/* TODO: Abstract Button */}
      <div className="flex flex-row space-x-4">
        {backLink && (
          <Link
            href={backLink}
            className={
              "flex flex-row items-center justify-center space-x-2 rounded-lg border-2 border-mint p-2 hover:bg-mint hover:text-black"
            }
          >
            <FaArrowLeft />
            <button type="button">{backText || "Back"}</button>
          </Link>
        )}
        {addLink && (
          <Link
            href={addLink}
            className={
              "flex flex-row items-center justify-center space-x-2 rounded-lg border-2 border-mint p-2 hover:bg-mint hover:text-black"
            }
          >
            <FaPlus />
            <button type="button">{addText || "Add"}</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ManageHeader;
