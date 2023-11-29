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
        "flex flex-col rounded-md border-2 border-everglade p-4 dark:border-mint",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ManagePanel;
