import "../components/Header.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white p-12 dark:bg-black lg:p-24">
      <div className="space-y-8 lg:w-2/3">
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
    </main>
  );
}
