const GAME_CONFIG = {
  SPAWN_INTERVAL: 1000,
  ENEMY_SPEED: 2,
  BULLET_SPEED: 10,
  MAX_ENEMIES: 1,
  POINTS_PER_KILL: 10
};

export const updateGameEntities = (state) => {
  const updatedEntities = state.entities
    .map(updateEntityPosition)
    .filter(isEntityInBounds);

  return {
    ...state,
    entities: updatedEntities
  };
};

export const spawnEnemy = (state) => ({
  id: Math.random().toString(36).substr(2, 9),
  type: 'enemy',
  x: Math.random() * 800,
  y: 0,
  velocity: {
    x: (Math.random() - 0.5) * GAME_CONFIG.ENEMY_SPEED,
    y: GAME_CONFIG.ENEMY_SPEED
  }
});

export const createBullet = (playerX, playerY) => ({
  id: Math.random().toString(36).substr(2, 9),
  type: 'bullet',
  x: playerX,
  y: playerY,
  velocity: {
    x: 0,
    y: -GAME_CONFIG.BULLET_SPEED
  }
});

const updateEntityPosition = (entity) => ({
  ...entity,
  x: entity.x + entity.velocity.x,
  y: entity.y + entity.velocity.y
});

const isEntityInBounds = (entity) => {
  return entity.x >= 0 && entity.x <= 800 && entity.y >= 0 && entity.y <= 400;
};