import { ClassNameValue, twMerge } from "tailwind-merge";

export const BrandIcon = ({ className }: { className?: ClassNameValue }) => {
  return (
    <div className={twMerge("flex flex-row justify-center", className)}>
      <div className="relative">
        <span className="absolute -top-0.5 left-2 h-8 w-6 border-b-2 border-t-2 border-everglade dark:border-mint" />
        <h2 className=" text-xl text-everglade ">AKG</h2>
      </div>
    </div>
  );
};
