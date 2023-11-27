import { twMerge } from "tailwind-merge";

const ManagePanel = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={twMerge(
        "flex flex-col rounded-md border-2 border-mint p-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export { ManagePanel };
