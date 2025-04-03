"use client";

import Link from "next/link";
import { useUserStore } from "./store/user";
import { ChangeEvent, KeyboardEvent, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<string>("");
  const username = useUserStore((state) => state.username);
  const setUsername = useUserStore((state) => state.setUsername);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setUsername(user);
      setUser("");
    }
  };

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <div className="text-5xl font-bold">Miam&apos;ory 🍕</div>

      <div className="flex flex-col gap-4">
        {username && <p className="text-center">Hello {username} 🎉</p>}
        <input
          type="text"
          value={user ?? ""}
          onChange={handleNameChange}
          onKeyDown={handleKeyDown}
          placeholder="Nom ou pseudo"
          className="rounded bg-gray-500 px-6 py-2 placeholder:text-sm placeholder:italic"
        />
        <Link
          className="rounded border-b-4 border-blue-700 bg-blue-500 px-4 py-2 text-center font-bold text-white hover:border-blue-500 hover:bg-blue-400"
          href="/game"
        >
          Commencer la partie
        </Link>
      </div>
    </div>
  );
}
