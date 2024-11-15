import { ReactNode } from "react";

export const ExperiencePanel = ({
  date,
  title,
  description,
  tech,
}: {
  date: string;
  title: string;
  description: string;
  tech: ReactNode;
}) => {
  return (
    <div className="z-0 my-8 h-fit max-w-screen-sm">
      <div className="hidden grid-cols-4 rounded-md p-4 transition-colors duration-500 ease-in-out hover:bg-mint-500 hover:bg-opacity-20 hover:drop-shadow-sm dark:hover:bg-black-200 dark:hover:bg-opacity-20 md:grid">
        <div className="col-span-1 pt-1 text-sm text-celtic dark:text-mint-400">
          {date}
        </div>
        <div className="col-span-3">
          <h3 className="mb-2 text-lg text-celtic dark:text-mint-400">
            {title}
          </h3>
          <p className="text-sm text-celtic dark:text-mint-400">
            {description ? description : null}
          </p>
          <div className="mt-4 flex flex-row flex-wrap gap-2">{tech}</div>
        </div>
      </div>
      <div className="md:hidden">
        <div className="col-span-3">
          <h3 className="mb-2 text-lg text-celtic dark:text-mint-400">
            {title}
          </h3>
          <div className="col-span-1 py-2 text-sm text-celtic dark:text-mint-400">
            {date}
          </div>
          <p className="text-sm text-celtic dark:text-mint-400">
            {description ? description : null}
          </p>
          <div className="mt-4 flex flex-row flex-wrap gap-2">{tech}</div>
        </div>
      </div>
    </div>
  );
};
