import "../components/Header.css";
import { Pill } from "../components/Pill";
import { SocialLinks } from "../components/SocialLinks";
import { AKGIcon } from "../components/AKGIcon";
import { ExperiencePanel } from "../components/ExperiencePanel";

const PopText = ({ text }: { text: string }) => (
  <span className="font-semibold text-celtic-200 dark:text-mint-400">
    {text}
  </span>
);

export default function Home() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-theme(space.16))] max-w-[840px] flex-col content-center bg-white p-6 dark:bg-black md:p-10 lg:p-8 lg:px-16 lg:py-12">
      <div className="space-y-8 lg:w-full">
        <p className="text-lg text-celtic-200 dark:text-mint-400">
          Hi, my name is
        </p>
        <h1 className="name-gradient text-8xl">Alex Greco</h1>
        <h3 className="text-6xl text-celtic-400 dark:text-everglade-300">
          I build things for the web.
        </h3>
        <p className="text-lg text-celtic-400 dark:text-everglade-300">
          I&apos;m a software engineer specializing in fullstack{" "}
          <PopText text="Javascript" /> development. My favorite tools are{" "}
          <PopText text="React," /> <PopText text="Typescript" /> and{" "}
          <PopText text="Remix" />
        </p>
      </div>
      <SocialLinks />
      <div className="mt-10 md:mt-24">
        <h3 className="text-xl text-celtic-200 dark:text-mint-400">
          Experience
        </h3>
        <ExperiencePanel
          date="Jan 2024 - Present"
          title={"Senior Frontend Engineer - Dust Identity"}
          description={
            "Rewrote a legacy React Admin application by leveraging Remix, React, Typescript, and Material UI, resulting in enhanced performance and a more intuitive user interface. Replaced a native iOS app with React Native, Typescript, and Expo, delivering a seamless cross-platform experience, modernized app functionality, and increased team velocity by enabling more team members to contribute."
          }
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
        <ExperiencePanel
          date="Jan 2022 - Oct 2023"
          title="Senior Fullstack Engineer - UDisc"
          description={
            "Contributed to the entire software development life cycle in a full-stack JavaScript environment using Remix, TypeScript, React, Node, and Tailwind. Played a pivotal role in migrating the main web application from Meteor.js to Remix. Implemented server side rendering and optimistic UI to enhance performance and user experience. Worked on diverse projects, including building a comprehensive design system with many reusable components, crafting live interactive scoreboards, writing API endpoints for mobile applications, and implementing robust logging, tracing, and analytics solutions."
          }
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
        <ExperiencePanel
          date="Jun 2021 - Dec 2021"
          title="Senior Fullstack Engineer - NorthOne"
          description={
            "Built core banking features including debit card activation, wire payments, and calculated properties for analytics. Worked in a Serverless environment hosted on AWS. Built and deployed microservices using Typescript Node Lambdas and DynamoDB."
          }
          tech={
            <>
              <Pill text="React" />
              <Pill text="Typescript" />
              <Pill text="AWS" />
              <Pill text="Serverless" />
            </>
          }
        />
        <ExperiencePanel
          date="Jul 2018 - Jun 2021"
          title="Senior Software Engineer - Harry's, Inc."
          description={
            "Built a globally distributed e-commerce application that delivers blazing fast speeds by taking advantage of server-side rendering and extensive edge caching. Developed a scalable event streaming pipeline, using Terraform and AWS services, to consume and transform purchase data before shipping it off to 3rd party platforms. Helped the Digital Design team create a design system that is shared across all of Harry’s brands. We systematized a shared CSS grid, tokenized spacing and font sizes, and developed accessible color palettes. Migrated the Flamingo web app from Redux state management and Restful APIs to Apollo-Client and Graphql."
          }
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
        <ExperiencePanel
          date="Jan 2016 - Jun 2018"
          title="Specialist Application Developer - AT&T"
          description={
            "Joined the Technology Development Program as a fresh college graduate. Worked as a full stack developer on the Sales Express application leveraging Vanilla JS, React, Java Spring, and OracleDB. Interviewed and mentored interns and new college graduates."
          }
          tech={
            <>
              <Pill text="React" />
              <Pill text="Javascript" />
              <Pill text="Java Spring" />
              <Pill text="OracleDB" />
            </>
          }
        />
      </div>
      <AKGIcon className="my-8" />
    </main>
  );
}
