import React from 'react';
import { useGameState } from './GameState';

const GameOverlay: React.FC = () => {
  const { score, isGameOver, resetGame } = useGameState();

  return (
    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10">
      <div className="bg-white/80 rounded-lg p-3 shadow-lg">
        <p className="text-xl font-bold">Score: {score}</p>
      </div>
      
      {isGameOver && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
            <p className="text-xl mb-4">Final Score: {score}</p>
            <button
              onClick={resetGame}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameOverlay;