import { useEffect, useRef, RefObject } from 'react';
import { GameState } from '../types';

export const useGameLoop = (
  canvasRef: RefObject<HTMLCanvasElement>,
  gameState: GameState,
  drawCallback: (ctx: CanvasRenderingContext2D, state: GameState) => void
) => {
  const frameIdRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawCallback(ctx, gameState);
      frameIdRef.current = requestAnimationFrame(animate);
    };

    if (gameState.isActive) {
      frameIdRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, [canvasRef, gameState, drawCallback]);
};