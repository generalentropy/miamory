import { create } from "zustand";

interface UserState {
  username: string;
  score: number;
  bestScore: number;
  setUsername: (user: string) => void;
  setBestScore: () => void;
  updateScore: () => void;
  resetScore: () => void;
  updateScoreWrong: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  username: "",
  score: 0,
  bestScore: 0,
  setUsername: (user: string) => set(() => ({ username: user })),
  setBestScore: () =>
    set((state) => ({
      bestScore: state.score > state.bestScore ? state.score : state.bestScore,
    })),
  updateScore: () => set((state) => ({ score: state.score + 5 })),
  updateScoreWrong: () =>
    set((state) => ({
      score: state.score > 0 ? state.score - 1 : state.score,
    })),

  resetScore: () => set({ score: 0 }),
}));
