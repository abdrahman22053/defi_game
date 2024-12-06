import { useEffect, useRef } from 'react';

export const useGameLoop = (canvasRef, gameState, drawCallback) => {
  const frameIdRef = useRef();

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