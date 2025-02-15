"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";

interface CardProps {
  color?: string;
  image: string;
  isFlipped: boolean;
  onClick: () => void;
}

export default function Card({ color, image, isFlipped, onClick }: CardProps) {
  return (
    // Conteneur avec perspective pour l'effet 3D
    <div
      onClick={onClick}
      className={clsx(
        "flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg text-2xl font-bold",
      )}
      style={{ perspective: "1000px" }}
    >
      {/* Conteneur animé pour le retournement */}
      <motion.div
        className="relative h-full w-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Face avant de la carte */}
        <div
          className={clsx(
            "absolute flex h-full w-full items-center justify-center rounded-lg border-2 border-green-200 bg-green-600 text-3xl",
            {
              "bg-red-400": color === "red",
              "bg-blue-400": color === "blue",
              "bg-yellow-400": color === "yellow",
              "bg-green-500": color === "green",
            },
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          ?
        </div>
        {/* Face arrière de la carte */}
        <div
          className="absolute flex h-full w-full items-center justify-center overflow-hidden rounded-lg border-2 border-gray-200"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Image
            src={`/images/${image}.jpg`}
            alt={image}
            className="h-full w-full"
            width={200}
            height={200}
          />
        </div>
      </motion.div>
    </div>
  );
}
