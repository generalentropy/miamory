"use client";

import { useUserStore } from "@/app/store/user";
import Board from "@/app/components/Board";
import { useLocalStorage } from "usehooks-ts";

export default function Home() {
  const score = useUserStore((state) => state.score);
  const username = useUserStore((state) => state.username);
  // https://github.com/uidotdev/usehooks/issues/254
  const [highScore, savehighScore] = useLocalStorage("highscore", {
    score: 0,
    name: "",
  });

  return (
    <div className="flex w-full items-center justify-center">
      <div className="absolute top-2 flex w-full max-w-[560px] flex-col">
        <p className="text-center font-semibold text-pink-300">
          {" "}
          Joueur : {username || "Anonyme"}{" "}
        </p>
        <p className="flex w-full justify-center text-center text-3xl font-bold">
          Votre score : {score}
        </p>
        <p className="flex w-full justify-center italic">
          🎉 High score : {highScore.score}{" "}
          {highScore.name ? (
            <span className="px-2"> - {highScore.name}</span>
          ) : null}
        </p>
      </div>
      <div className="flex max-w-[560px] flex-wrap justify-center gap-4">
        <Board highScore={highScore.score} saveHighScore={savehighScore} />
      </div>
    </div>
  );
}
