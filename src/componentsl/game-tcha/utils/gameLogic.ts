import { Entity, GameState } from '../types';

const GAME_CONFIG = {
  SPAWN_INTERVAL: 1000,
  ENEMY_SPEED: 2,
  BULLET_SPEED: 5,
  MAX_ENEMIES: 5,
  POINTS_PER_KILL: 10
};

export const updateGameEntities = (state: GameState): GameState => {
  const updatedEntities = state.entities
    .map(updateEntityPosition)
    .filter(isEntityInBounds);

  return {
    ...state,
    entities: updatedEntities
  };
};

export const spawnEnemy = (state: GameState): Entity => ({
  id: Math.random().toString(36).substr(2, 9),
  type: 'enemy',
  x: Math.random() * 800,
  y: 0,
  velocity: {
    x: (Math.random() - 0.5) * GAME_CONFIG.ENEMY_SPEED,
    y: GAME_CONFIG.ENEMY_SPEED
  }
});

export const createBullet = (playerX: number, playerY: number): Entity => ({
  id: Math.random().toString(36).substr(2, 9),
  type: 'bullet',
  x: playerX,
  y: playerY,
  velocity: {
    x: 0,
    y: -GAME_CONFIG.BULLET_SPEED
  }
});

const updateEntityPosition = (entity: Entity): Entity => ({
  ...entity,
  x: entity.x + entity.velocity.x,
  y: entity.y + entity.velocity.y
});

const isEntityInBounds = (entity: Entity): boolean => {
  return entity.x >= 0 && entity.x <= 800 && entity.y >= 0 && entity.y <= 400;
};