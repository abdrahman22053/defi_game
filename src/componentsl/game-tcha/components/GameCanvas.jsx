import React, { useRef, useEffect } from 'react';
import { useGameLoop } from '../hooks/useGameLoop';
import { drawGame } from '../utils/renderer';

const PLAYER_SPEED = 5;

export const GameCanvas = ({ gameState, onPlayerAction }) => {
  const canvasRef = useRef(null);
  const keysPressed = useRef(new Set());
  
  useGameLoop(canvasRef, gameState, drawGame);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      onPlayerAction({
        type: 'MOVE',
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        timestamp: Date.now()
      });
    };

    const handleClick = () => {
      onPlayerAction({
        type: 'SHOOT',
        timestamp: Date.now()
      });
    };

    const handleKeyDown = (e) => {
      keysPressed.current.add(e.key.toLowerCase());
      
      if (e.key === 'Enter') {
        handleClick();
      }
    };

    const handleKeyUp = (e) => {
      keysPressed.current.delete(e.key.toLowerCase());
    };

    // Movement update interval
    const moveInterval = setInterval(() => {
      let newX = gameState.playerPosition.x;
      let newY = gameState.playerPosition.y;
      let moved = false;

      if (keysPressed.current.has('arrowleft') || keysPressed.current.has('a')) {
        newX -= PLAYER_SPEED;
        moved = true;
      }
      if (keysPressed.current.has('arrowright') || keysPressed.current.has('d')) {
        newX += PLAYER_SPEED;
        moved = true;
      }
      if (keysPressed.current.has('arrowup') || keysPressed.current.has('w')) {
        newY -= PLAYER_SPEED;
        moved = true;
      }
      if (keysPressed.current.has('arrowdown') || keysPressed.current.has('s')) {
        newY += PLAYER_SPEED;
        moved = true;
      }

      // Keep player within bounds
      newX = Math.max(10, Math.min(canvas.width - 10, newX));
      newY = Math.max(10, Math.min(canvas.height - 10, newY));

      if (moved) {
        onPlayerAction({
          type: 'MOVE',
          x: newX,
          y: newY,
          timestamp: Date.now()
        });
      }
    }, 16); // ~60fps

    // Add event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearInterval(moveInterval);
    };
  }, [onPlayerAction, gameState.playerPosition]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      width={800}
      height={400}
    />
  );
};