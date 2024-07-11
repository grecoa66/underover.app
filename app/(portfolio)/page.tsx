import "../components/Header.css";
import { Pill } from "../(over-under)/components/Pill";

const ExperienceGrid = ({
  date,
  title,
  description,
  tech,
}: {
  date: string;
  title: string;
  description: string;
  tech: React.ReactNode;
}) => {
  return (
    <div className="my-8 h-fit">
      <div className="grid grid-cols-4">
        <div className="col-span-1 pt-1 text-xs text-celtic dark:text-mint-400">
          {date}
        </div>
        <div className="col-span-3">
          <h3 className="text-celtic dark:text-mint-400">{title}</h3>
          {/* Icon pills for tech I used */}
          <p>{description}</p>
          <div className="mt-4 flex flex-row gap-2">{tech}</div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-theme(space.16))] flex-col content-center bg-white p-12 dark:bg-black lg:p-24">
      <div className="space-y-8 lg:w-full">
        <p className="text-everglade-200 dark:text-mint">Hi, my name is</p>
        <h1 className="name-gradient text-8xl">Alex Greco</h1>
        <h3 className="text-6xl text-celtic dark:text-everglade-400">
          I build things for the web.
        </h3>
        <p className="text-celtic dark:text-everglade-400">
          I&apos;m a software engineer specializing in fullstack{" "}
          <span className="text-everglade-200 dark:text-mint">Javscript</span>{" "}
          development. My favorite tools are{" "}
          <span className="text-everglade-200 dark:text-mint">React</span> and{" "}
          <span className="text-everglade-200 dark:text-mint">Typescript</span>.
        </p>
      </div>
      <ExperienceGrid
        date="Jan 2024 - Present"
        title={"Senior Frontend Engineer - Dust Identity"}
        description=""
        tech={
          <>
            <Pill text="Remix" />
            <Pill text="React" />
            <Pill text="Typescript" />
            <Pill text="React Native" />
            <Pill text="Expo" />
          </>
        }
      />
      <ExperienceGrid
        date="Jan 2022 - Oct 2023"
        title="Senior Fullstack Engineer - UDisc"
        description=""
        tech={
          <>
            <Pill text="Remix" />
            <Pill text="React" />
            <Pill text="Typescript" />
            <Pill text="Tailwind" />
            <Pill text="Mongo" />
          </>
        }
      />
      <ExperienceGrid
        date="Jun 2021 - Dec 2021"
        title="Senior Fullstack Engineer - NorthOne"
        description=""
        tech={
          <>
            <Pill text="React" />
            <Pill text="Typescript" />
            <Pill text="AWS" />
          </>
        }
      />
      <ExperienceGrid
        date="Jul 2018 - Jun 2021"
        title="Senior Software Engineer - Harry's, Inc."
        description=""
        tech={
          <>
            <Pill text="React" />
            <Pill text="Typescript" />
            <Pill text="GatsbyJS" />
            <Pill text="Styled Components" />
            <Pill text="AWS" />
          </>
        }
      />
    </main>
  );
}
