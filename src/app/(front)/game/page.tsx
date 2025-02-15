"use client";

import { useUserStore } from "@/app/store/user";
import Board from "@/app/components/Board";

export default function Home() {
  const score = useUserStore((state) => state.score);
  const bestscore = useUserStore((state) => state.bestScore);
  // const updateScore = useUserStore((state) => state.updateScore);

  return (
    <div className="flex w-full items-center justify-center">
      <div className="absolute top-2 flex w-full max-w-[560px] flex-col">
        <p className="flex w-full justify-center text-center text-3xl font-bold">
          Score : {score}
        </p>
        <p className="flex w-full justify-center italic">
          High score : {bestscore}
        </p>
      </div>
      <div className="flex max-w-[560px] flex-wrap justify-center gap-4">
        <Board />
      </div>
    </div>
  );
}
