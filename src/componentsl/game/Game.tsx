import React, { useEffect, useState, useRef } from 'react';
import Background from './Background';
import Fish from './Fish';
import Garbage from './Garbage';
import GameOverlay from './GameOverlay';
import { useGameState } from './GameState';

const Game: React.FC = () => {
  const { playerPosition, updatePlayerPosition, incrementScore, setGameOver } = useGameState();
  const [smallFish, setSmallFish] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [garbage, setGarbage] = useState<Array<{ id: number; x: number; y: number; type: 'bottle' | 'can' }>>([]);
  
  // Use refs to avoid unnecessary re-renders
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const collisionCheckRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gameAreaRef.current) return;
      
      const bounds = gameAreaRef.current.getBoundingClientRect();
      updatePlayerPosition(
        e.clientX - bounds.left - 25,
        e.clientY - bounds.top - 25
      );
    };

    const gameArea = gameAreaRef.current;
    if (gameArea) {
      gameArea.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (gameArea) {
        gameArea.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [updatePlayerPosition]);

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      setSmallFish(prev => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }
      ]);

      if (Math.random() > 0.7) {
        setGarbage(prev => [
          ...prev,
          {
            id: Date.now(),
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            type: Math.random() > 0.5 ? 'bottle' : 'can',
          }
        ]);
      }
    }, 2000);

    return () => clearInterval(spawnInterval);
  }, []);

  // Collision detection in useEffect
  useEffect(() => {
    const checkCollisions = () => {
      const playerRadius = 25;

      setSmallFish(prev => prev.filter(fish => {
        const dx = fish.x - playerPosition.x;
        const dy = fish.y - playerPosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < playerRadius + 15) {
          incrementScore();
          return false;
        }
        return true;
      }));

      garbage.some(item => {
        const dx = item.x - playerPosition.x;
        const dy = item.y - playerPosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < playerRadius + 20) {
          setGameOver(true);
          return true;
        }
        return false;
      });
    };

    // Clear previous interval before setting a new one
    if (collisionCheckRef.current) {
      clearInterval(collisionCheckRef.current);
    }

    collisionCheckRef.current = setInterval(checkCollisions, 100);

    return () => {
      if (collisionCheckRef.current) {
        clearInterval(collisionCheckRef.current);
      }
    };
  }, [playerPosition, garbage, incrementScore, setGameOver]);

  return (
    <div 
      ref={gameAreaRef}
      className="relative w-full h-screen overflow-hidden cursor-none"
    >
      <Background />
      
      {smallFish.map(fish => (
        <Fish
          key={fish.id}
          x={fish.x}
          y={fish.y}
          size={20}
          color="#FFD700"
        />
      ))}

      {garbage.map(item => (
        <Garbage
          key={item.id}
          x={item.x}
          y={item.y}
          type={item.type}
        />
      ))}

      <Fish
        x={playerPosition.x}
        y={playerPosition.y}
        isPlayer
        size={50}
        color="#FF6B6B"
      />

      <GameOverlay />
    </div>
  );
};

export default Game;