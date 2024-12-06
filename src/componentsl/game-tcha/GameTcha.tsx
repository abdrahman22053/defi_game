import React from 'react';
import { useGameState } from './hooks/useGameState';
import { GameCanvas } from './components/GameCanvas';
import { GameUI } from './components/GameUI';
import { VerificationOverlay } from './components/VerificationOverlay';

export const GameTcha: React.FC = () => {
  const { 
    gameState,
    playerActions,
    verificationStatus,
    startGame,
    resetGame 
  } = useGameState();

  return (
    // <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    //   <div className="w-full max-w-2xl">
    //     <GameTcha />
    //   </div>
    // </div>

<div className="min-h-screen flex items-center justify-center bg-gray-900">
<div className="p-6 bg-gray-800 rounded-lg shadow-xl w-96">
    <div className="relative h-[400px] bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center">
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
  </div>
</div>




  );
};