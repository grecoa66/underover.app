import { twMerge } from "tailwind-merge";

const ManageWrapper = ({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <div className={twMerge("space-y-4", className)}>{children}</div>;
};

export default ManageWrapper;
