"use client";

import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useUserStore } from "../store/user";
import { shuffleCards } from "../utils/game";
import { cardsData } from "../data/cardsData";
import useSound from "use-sound";

interface CardType {
  id: number;
  imageName: string;
  color: string;
}

const flipSound = "/sounds/flip.wav";
// const invalidSound = "/sounds/wrong.mp3";
const success = "/sounds/success.mp3";

export default function Board() {
  // IDs des cartes temporairement retournées (non appariées)
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  // IDs des cartes déjà appariées
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  // Première carte cliquée pour comparaison
  const [firstCard, setFirstCard] = useState<{
    id: number;
    imageName: string;
  } | null>(null);
  // Lock pour empêcher de cliquer pendant le délai de retournement
  const [isBoardLocked, setBoardLocked] = useState(false);
  const [shuffledCards, setShuffledCards] = useState<CardType[]>([]);
  const updateScore = useUserStore((state) => state.updateScore);

  useEffect(() => {
    // On passe directement cardsData à shuffleCards (qui duplique et mélange déjà)
    const shuffled = shuffleCards(cardsData);
    const cardsWithId: CardType[] = shuffled.map((card, index) => ({
      id: index + 1,
      imageName: card.imageName,
      color: card.color,
    }));
    setShuffledCards(cardsWithId);
  }, []);

  const [playFlipSound] = useSound(flipSound);
  const [playSuccess] = useSound(success);
  // const [playInvalid] = useSound(invalidSound);

  const handleCardClick = (card: CardType) => {
    // On ignore le clic si le plateau est verrouillé
    if (isBoardLocked) return;
    // On ignore le clic si la carte est déjà appariée ou déjà retournée temporairement
    if (matchedCards.includes(card.id) || flippedCards.includes(card.id))
      return;

    // Retourner la carte
    playFlipSound();
    setFlippedCards((prev) => [...prev, card.id]);

    if (!firstCard) {
      // Première carte cliquée
      setFirstCard({ id: card.id, imageName: card.imageName });
    } else {
      // Deuxième carte cliquée, comparer via imageName
      if (firstCard.imageName === card.imageName) {
        // Paires correspondantes trouvées
        updateScore();
        playSuccess();
        // Ajouter les cartes appariées dans matchedCards
        setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
        // Réinitialiser la sélection temporaire
        setFirstCard(null);
        // On peut aussi retirer ces cartes de flippedCards si désiré :
        setFlippedCards((prev) =>
          prev.filter((id) => id !== firstCard.id && id !== card.id),
        );
      } else {
        // Pas de correspondance, verrouiller le plateau et retourner les cartes après 1 seconde
        setBoardLocked(true);

        setTimeout(() => {
          setFlippedCards((prev) =>
            prev.filter((id) => id !== firstCard.id && id !== card.id),
          );
          setFirstCard(null);
          setBoardLocked(false);
        }, 700);
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      {shuffledCards.map((card) => (
        <Card
          key={card.id}
          image={card.imageName}
          isFlipped={
            matchedCards.includes(card.id) || flippedCards.includes(card.id)
          }
          onClick={() => handleCardClick(card)}
        />
      ))}
    </div>
  );
}
