import { Entity, GameState } from '../types';

const COLLISION_THRESHOLDS = {
  BULLET_ENEMY: 15,
  PLAYER_ENEMY: 20
};

export const checkCollisions = (state: GameState): {
  updatedEntities: Entity[];
  score: number;
  lives: number;
} => {
  const bullets = state.entities.filter(e => e.type === 'bullet');
  const enemies = state.entities.filter(e => e.type === 'enemy');
  let score = state.score;
  let lives = state.lives;

  // Check bullet-enemy collisions
  const survivingEntities = state.entities.filter(entity => {
    if (entity.type === 'enemy') {
      const hitByBullet = bullets.some(bullet => 
        getDistance(bullet, entity) < COLLISION_THRESHOLDS.BULLET_ENEMY
      );
      if (hitByBullet) {
        score += 10;
        return false;
      }
    }
    return true;
  });

  // Check player-enemy collisions
  const playerHit = enemies.some(enemy =>
    getDistance(
      { x: state.playerPosition.x, y: state.playerPosition.y },
      enemy
    ) < COLLISION_THRESHOLDS.PLAYER_ENEMY
  );

  if (playerHit) {
    lives--;
  }

  return {
    updatedEntities: survivingEntities,
    score,
    lives
  };
};

const getDistance = (a: { x: number; y: number }, b: { x: number; y: number }): number => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
};