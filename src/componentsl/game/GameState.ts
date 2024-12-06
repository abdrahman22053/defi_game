import { create } from 'zustand';

interface GameState {
  score: number;
  isGameOver: boolean;
  playerPosition: { x: number; y: number };
  incrementScore: () => void;
  setGameOver: (value: boolean) => void;
  updatePlayerPosition: (x: number, y: number) => void;
  resetGame: () => void;
}

export const useGameState = create<GameState>((set) => ({
  score: 0,
  isGameOver: false,
  playerPosition: { x: 200, y: 200 },
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  setGameOver: (value) => set({ isGameOver: value }),
  updatePlayerPosition: (x, y) => set({ playerPosition: { x, y } }),
  resetGame: () => set({ score: 0, isGameOver: false, playerPosition: { x: 200, y: 200 } }),
}));