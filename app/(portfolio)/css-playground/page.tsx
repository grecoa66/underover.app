import Link from "next/link";

const CSSPlayground = () => {
  return (
    <main className="flex min-h-[calc(100vh-theme(space.16))] flex-col bg-white p-4 dark:bg-black">
      <div className="my-12 flex flex-row justify-center">
        <h1 className="text-2xl text-celtic-200 dark:text-mint-400">
          🚧 Under Construction 🚧
        </h1>
      </div>
      <h1 className="text-2xl text-celtic-200 dark:text-mint-400">
        CSS Playground
      </h1>

      <div className="my-10 flex flex-col">
        <Link href={"/css-playground/components"}>
          <button className="z-20 inline-block w-auto p-2 text-celtic-400 hover:translate-x-1 hover:rotate-3 hover:text-celtic-200 dark:text-mint-400 hover:dark:text-mint-700">
            Components
          </button>
        </Link>
        <Link href={"/css-playground/grid-background"}>
          <button className="z-20 inline-block w-auto p-2 text-celtic-400 hover:translate-x-1 hover:rotate-3 hover:text-celtic-200 dark:text-mint-400 hover:dark:text-mint-700">
            Grid Background
          </button>
        </Link>
      </div>
    </main>
  );
};

export default CSSPlayground;
