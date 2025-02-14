"use client";

import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { shuffleCards } from "@/app/utils/game";
import { cardsData } from "@/app/data/cardsData";

interface CardType {
  id: number;
  imageName: string;
  type: string;
  color: string;
}

export default function Home() {
  const [lastChecked, setLastChecked] = useState<number | null>(null);
  const [shuffled, setShuffle] = useState<CardType[]>([]);

  useEffect(() => {
    setShuffle(shuffleCards(cardsData));
  }, []);

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex max-w-[560px] flex-wrap justify-center gap-4">
        {shuffled.map((el, i) => (
          <Card setLastChecked={setLastChecked} key={i} image={el.imageName} />
        ))}
      </div>
    </div>
  );
}
