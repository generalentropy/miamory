"use client";

import clsx from "clsx";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Card({ twColor = "red" }: { twColor: string }) {
  const [flip, setFlip] = useState(true);

  return (
    <motion.div
      onClick={() => setFlip((prevState) => !prevState)}
      transition={{ duration: 0.5 }}
      animate={{ rotateY: flip ? 0 : 180 }}
      className={clsx("h-20 w-20 cursor-pointer rounded-lg", {
        "bg-red-400": twColor === "red",
        "bg-blue-400": twColor === "blue",
        "bg-yellow-400": twColor === "yellow",
        "bg-green-400": twColor === "green",
      })}
    ></motion.div>
  );
}
