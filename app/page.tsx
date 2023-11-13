export default function Home() {
  return (
    <main className="bg-white dark:bg-black flex min-h-screen flex-col p-24">
      <div className="w-2/3 space-y-8">
        <p className="text-everglade-200 dark:text-mint">Hi, my name is</p>
        <h1 className="text-everglade-300 dark:text-everglade-200 text-8xl">
          Alex Greco
        </h1>
        <h3 className="text-celtic dark:text-everglade-400 text-6xl">
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
