import { ConnectWithGitHub } from "@/components/ConnectWithGitHub";

export default function Home() {
  return (
    <main className="relative flex flex-col justify-between items-center gap-20 min-h-screen mx-auto md:px-24 md:py-10">
      <div className="flex justify-center pt-10 md:pt-0 z-10 max-w-5xl w-full lg:items-center lg:justify-between font-mono text-sm lg:flex">
        <div className="absolute bottom-0 left-0 flex w-full items-end justify-center lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="font-sans font-bold uppercase text-xl pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="#"
            rel="noopener noreferrer"
          >
            Contributors Hub
          </a>
        </div>
        <ConnectWithGitHub />
      </div>
    </main>
  );
}
