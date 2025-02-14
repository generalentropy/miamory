import { create } from "zustand";

interface UserState {
  score: number;
  updateScore: () => void;
  resetScore: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  score: 0,
  updateScore: () => set((state) => ({ score: state.score + 5 })),
  updateScoreWrong: () =>
    set((state) => ({
      score: state.score > 0 ? state.score - 1 : state.score,
    })),
  resetScore: () => set({ score: 0 }),
}));
