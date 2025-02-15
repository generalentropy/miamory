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
const success = "/sounds/success.mp3";
const endSound = "/sounds/tada.mp3";

export default function Board() {
  // États locaux pour la logique du jeu
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [firstCard, setFirstCard] = useState<{
    id: number;
    imageName: string;
  } | null>(null);
  const [isBoardLocked, setBoardLocked] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [shuffledCards, setShuffledCards] = useState<CardType[]>([]);

  // Fonctions du store
  const updateScore = useUserStore((state) => state.updateScore);
  const updateScoreWrong = useUserStore((state) => state.updateScoreWrong);
  const updateBestScore = useUserStore((state) => state.setBestScore);
  const resetScore = useUserStore((state) => state.resetScore);

  // Sons
  const [playEndSound] = useSound(endSound);
  const [playFlipSound] = useSound(flipSound);
  const [playSuccess] = useSound(success, { volume: 0.5 });

  // Fonction pour initialiser ou réinitialiser le plateau
  const initBoard = () => {
    const shuffled = shuffleCards(cardsData);
    const cardsWithId: CardType[] = shuffled.map((card, index) => ({
      id: index + 1,
      imageName: card.imageName,
      color: card.color,
    }));
    setShuffledCards(cardsWithId);
  };

  // Initialisation du plateau au premier rendu
  useEffect(() => {
    initBoard();
  }, []);

  // Gestion du clic sur une carte
  const handleCardClick = (card: CardType) => {
    if (isBoardLocked) return;
    if (matchedCards.includes(card.id) || flippedCards.includes(card.id))
      return;

    playFlipSound();
    setFlippedCards((prev) => [...prev, card.id]);

    if (!firstCard) {
      setFirstCard({ id: card.id, imageName: card.imageName });
    } else {
      if (firstCard.imageName === card.imageName) {
        updateScore();
        playSuccess();
        setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
        setFirstCard(null);
        setFlippedCards((prev) =>
          prev.filter((id) => id !== firstCard.id && id !== card.id),
        );
      } else {
        setBoardLocked(true);
        updateScoreWrong();

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

  // Effet pour détecter la fin du jeu
  useEffect(() => {
    if (
      shuffledCards.length > 0 &&
      matchedCards.length === shuffledCards.length &&
      !hasFinished
    ) {
      playEndSound();
      updateBestScore();
      setHasFinished(true);
    }
  }, [matchedCards, shuffledCards, hasFinished, playEndSound, updateBestScore]);

  // Fonction de reset du jeu
  const resetGame = () => {
    // Réinitialisation des états locaux
    setFlippedCards([]);
    setMatchedCards([]);
    setFirstCard(null);
    setBoardLocked(false);
    setHasFinished(false);
    // Réinitialisation du score si nécessaire
    resetScore();
    // Remélange du plateau
    initBoard();
  };

  return (
    <>
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
      {hasFinished && (
        <div className="mt-4">
          <button
            onClick={resetGame}
            className="rounded-lg bg-green-600 px-4 py-1 text-white"
          >
            Reset game
          </button>
        </div>
      )}
    </>
  );
}
