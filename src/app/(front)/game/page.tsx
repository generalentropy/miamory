"use client";

import { useUserStore } from "@/app/store/user";
import Board from "@/app/components/Board";
import { useLocalStorage } from "usehooks-ts";

export default function Home() {
  const score = useUserStore((state) => state.score);
  // https://github.com/uidotdev/usehooks/issues/254
  const [highScore, savehighScore] = useLocalStorage("highscore", 0);

  return (
    <div className="flex w-full items-center justify-center">
      <div className="absolute top-2 flex w-full max-w-[560px] flex-col">
        <p className="flex w-full justify-center text-center text-3xl font-bold">
          Score : {score}
        </p>
        <p className="flex w-full justify-center italic">
          High score : {highScore}
        </p>
      </div>
      <div className="flex max-w-[560px] flex-wrap justify-center gap-4">
        <Board highScore={highScore} saveHighScore={savehighScore} />
      </div>
    </div>
  );
}
