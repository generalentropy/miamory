import { Copyright } from "lucide-react";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://visualartisan.fr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Copyright size={18} />
          VisualArtisan
        </a>
      </footer>
    </div>
  );
}
