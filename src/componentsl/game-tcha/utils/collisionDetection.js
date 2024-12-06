const COLLISION_THRESHOLDS = {
  BULLET_ENEMY: 15,
  PLAYER_ENEMY: 20
};

export const checkCollisions = (state) => {
  const bullets = state.entities.filter(e => e.type === 'bullet');
  const enemies = state.entities.filter(e => e.type === 'enemy');
  let score = state.score;
  let lives = state.lives;

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

const getDistance = (a, b) => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
};