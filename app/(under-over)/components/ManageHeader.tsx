import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { LinkButton } from "./Button";

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
          <LinkButton
            href={backLink}
            text={backText || "Back"}
            StartIcon={FaArrowLeft}
          />
        )}
        {addLink && (
          <LinkButton
            href={addLink}
            text={addText || "Add"}
            StartIcon={FaPlus}
          />
        )}
      </div>
    </div>
  );
};

export default ManageHeader;
