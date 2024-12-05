import React from 'react';
import { useGameState } from './hooks/useGameState';
import { GameCanvas } from './components/GameCanvas';
import { GameUI } from './components/GameUI';
import { VerificationOverlay } from './components/VerificationOverlay';

export const GameTcha = () => {
  const { 
    gameState,
    playerActions,
    verificationStatus,
    startGame,
    resetGame 
  } = useGameState();

  return (
    <div className="relative w-full h-[400px] bg-slate-900 rounded-lg overflow-hidden">
      <GameCanvas 
        gameState={gameState}
        onPlayerAction={playerActions.handlePlayerAction}
      />
      <GameUI 
        score={gameState.score}
        timeLeft={gameState.timeLeft}
        lives={gameState.lives}
      />
      <VerificationOverlay
        status={verificationStatus}
        onRetry={resetGame}
        onStart={startGame}
      />
    </div>
  );
};