import React, { useRef, useEffect } from 'react';
import { GameState, PlayerAction } from '../types';
import { drawGame } from '../utils/renderer';
import { useGameLoop } from '../hooks/useGameLoop';

interface GameCanvasProps {
  gameState: GameState;
  onPlayerAction: (action: PlayerAction) => void;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({ gameState, onPlayerAction }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useGameLoop(canvasRef, gameState, drawGame);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      onPlayerAction({
        type: 'MOVE',
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        timestamp: Date.now()
      });
    };

    const handleClick = (e: MouseEvent) => {
      onPlayerAction({
        type: 'SHOOT',
        timestamp: Date.now()
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, [onPlayerAction]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      width={800}
      height={400}
    />
  );
};