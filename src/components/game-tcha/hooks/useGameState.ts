import { useState, useCallback, useRef, useEffect } from 'react';
import { GameState, PlayerAction, VerificationStatus } from '../types';
import { analyzePlayerBehavior } from '../utils/verification';
import { updateGameEntities, spawnEnemy, createBullet } from '../utils/gameLogic';
import { checkCollisions } from '../utils/collisionDetection';

const INITIAL_STATE: GameState = {
  score: 0,
  timeLeft: 30,
  lives: 3,
  entities: [],
  playerPosition: { x: 400, y: 200 },
  isActive: false
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('idle');
  const playerActionsRef = useRef<PlayerAction[]>([]);
  const gameLoopRef = useRef<NodeJS.Timeout>();
  const spawnLoopRef = useRef<NodeJS.Timeout>();

  // Game loop
  useEffect(() => {
    if (!gameState.isActive) return;

    const updateGame = () => {
      setGameState(prevState => {
        // Update entities positions
        const updatedState = updateGameEntities(prevState);
        
        // Check collisions
        const collisionResult = checkCollisions(updatedState);
        
        // Update time
        const newTimeLeft = Math.max(0, prevState.timeLeft - 0.1);
        
        // Check game over conditions
        if (collisionResult.lives <= 0 || newTimeLeft <= 0) {
          endGame();
          return prevState;
        }

        return {
          ...updatedState,
          entities: collisionResult.updatedEntities,
          score: collisionResult.score,
          lives: collisionResult.lives,
          timeLeft: newTimeLeft
        };
      });
    };

    gameLoopRef.current = setInterval(updateGame, 100);
    spawnLoopRef.current = setInterval(() => {
      setGameState(prevState => ({
        ...prevState,
        entities: [...prevState.entities, spawnEnemy(prevState)]
      }));
    }, 2000);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      if (spawnLoopRef.current) clearInterval(spawnLoopRef.current);
    };
  }, [gameState.isActive]);

  const handlePlayerAction = useCallback((action: PlayerAction) => {
    playerActionsRef.current.push(action);
    
    setGameState(prevState => {
      if (action.type === 'MOVE') {
        return {
          ...prevState,
          playerPosition: { x: action.x, y: action.y }
        };
      } else if (action.type === 'SHOOT' && prevState.isActive) {
        return {
          ...prevState,
          entities: [
            ...prevState.entities,
            createBullet(prevState.playerPosition.x, prevState.playerPosition.y)
          ]
        };
      }
      return prevState;
    });
  }, []);

  const startGame = useCallback(() => {
    setGameState({ ...INITIAL_STATE, isActive: true });
    setVerificationStatus('playing');
    playerActionsRef.current = [];
  }, []);

  const endGame = useCallback(async () => {
    setGameState(prev => ({ ...prev, isActive: false }));
    setVerificationStatus('verifying');
    
    // Add a small delay for better UX
    setTimeout(async () => {
      const isHuman = await analyzePlayerBehavior(playerActionsRef.current);
      setVerificationStatus(isHuman ? 'success' : 'failure');
    }, 1000);
  }, []);

  const resetGame = useCallback(() => {
    setGameState(INITIAL_STATE);
    setVerificationStatus('idle');
    playerActionsRef.current = [];
  }, []);

  return {
    gameState,
    verificationStatus,
    playerActions: {
      handlePlayerAction
    },
    startGame,
    endGame,
    resetGame
  };
};