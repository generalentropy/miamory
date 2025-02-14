"use client";

import clsx from "clsx";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface CardProps {
  twColor?: string;
  setLastChecked: (index: number | null) => void;
  image?: string;
}

export default function Card({
  twColor = "red",
  setLastChecked,
  image,
}: CardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    // Le conteneur définit la perspective pour un effet 3D
    <div
      onClick={() => setFlipped((prev) => !prev)}
      className={clsx(
        "flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg text-2xl font-bold",
      )}
      style={{ perspective: "1000px" }}
    >
      {/* Le conteneur animé qui va tourner */}
      <motion.div
        className={clsx("relative h-full w-full")}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Face avant de la carte */}
        <div
          className={clsx(
            "absolute flex h-full w-full items-center justify-center rounded-lg border-2 border-green-200",
            {
              "bg-red-400": twColor === "red",
              "bg-blue-400": twColor === "blue",
              "bg-yellow-400": twColor === "yellow",
              "bg-green-500": twColor === "green",
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
            src={`/images/${image || "nopicture"}.jpg`}
            alt={`${image || "no image"}`}
            className="h-full w-full"
            width={200}
            height={200}
          />
        </div>
      </motion.div>
    </div>
  );
}

// <motion.div
//   onClick={() => setFlip((prevState) => !prevState)}
//   transition={{ duration: 0.5 }}
//   animate={{ rotateY: flip ? 0 : 180 }}
//   className={clsx(
//     "flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg text-2xl font-bold",
//     {
//       "bg-red-400": twColor === "red",
//       "bg-blue-400": twColor === "blue",
//       "bg-yellow-400": twColor === "yellow",
//       "bg-green-400": twColor === "green",
//     },
//   )}
// >
//   ?
// </motion.div>
