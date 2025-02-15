// import { Copyright } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <div className="text-5xl font-bold">Miam&apos;ory 🍕</div>
      <Link
        className="rounded border-b-4 border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:border-blue-500 hover:bg-blue-400"
        href="/game"
      >
        Commencer la partie
      </Link>
      {/* <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://visualartisan.fr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Copyright size={18} />
          VisualArtisan
        </a>
      </footer> */}
    </div>
  );
}
