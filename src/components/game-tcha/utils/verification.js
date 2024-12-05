const HUMAN_PATTERNS = {
  MIN_SPEED_VARIANCE: 0.2,
  MAX_SPEED_VARIANCE: 2.0,
  MIN_DIRECTION_CHANGES: 3, // Reduced for shorter game
  MIN_RESPONSE_TIME: 150,
  MAX_RESPONSE_TIME: 800,
  MIN_SCORE: 3// Added minimum score requirement
};

export const analyzePlayerBehavior = async (actions) => {
  if (actions.length < 5) return false; // Reduced minimum actions for shorter game

  const moveActions = actions.filter(a => a.type === 'MOVE');

  const speeds = [];
  for (let i = 1; i < moveActions.length; i++) {
    const dx = moveActions[i].x - moveActions[i-1].x;
    const dy = moveActions[i].y - moveActions[i-1].y;
    const dt = moveActions[i].timestamp - moveActions[i-1].timestamp;
    const speed = Math.sqrt(dx*dx + dy*dy) / dt;
    speeds.push(speed);
  }

  const avgSpeed = speeds.reduce((a, b) => a + b, 0) / speeds.length;
  const speedVariance = speeds.reduce((acc, speed) => 
    acc + Math.pow(speed - avgSpeed, 2), 0
  ) / speeds.length;

  let directionChanges = 0;
  for (let i = 2; i < moveActions.length; i++) {
    const prev = {
      x: moveActions[i-1].x - moveActions[i-2].x,
      y: moveActions[i-1].y - moveActions[i-2].y
    };
    const curr = {
      x: moveActions[i].x - moveActions[i-1].x,
      y: moveActions[i].y - moveActions[i-1].y
    };
    
    const dot = prev.x * curr.x + prev.y * curr.y;
    const prevMag = Math.sqrt(prev.x * prev.x + prev.y * prev.y);
    const currMag = Math.sqrt(curr.x * curr.x + curr.y * curr.y);
    
    if (prevMag > 0 && currMag > 0) {
      const angle = Math.acos(dot / (prevMag * currMag));
      if (angle > Math.PI / 4) directionChanges++;
    }
  }

  const shootActions = actions.filter(a => a.type === 'SHOOT');
  const responseTimes = shootActions.map((_, i) => 
    i > 0 ? shootActions[i].timestamp - shootActions[i-1].timestamp : 0
  ).slice(1);

  const avgResponseTime = responseTimes.length > 0
    ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
    : 0;

  // Get the final score from the last action's state
  const finalScore = actions[actions.length - 1]?.score || 0;

  return (
    speedVariance >= HUMAN_PATTERNS.MIN_SPEED_VARIANCE &&
    speedVariance <= HUMAN_PATTERNS.MAX_SPEED_VARIANCE &&
    directionChanges >= HUMAN_PATTERNS.MIN_DIRECTION_CHANGES &&
    avgResponseTime >= HUMAN_PATTERNS.MIN_RESPONSE_TIME &&
    avgResponseTime <= HUMAN_PATTERNS.MAX_RESPONSE_TIME &&
    finalScore >= HUMAN_PATTERNS.MIN_SCORE
  );
};





// const HUMAN_PATTERNS = {
//   MIN_SPEED: 0.1, // Vitesse minimale raisonnable
//   MAX_SPEED: 2.0, // Vitesse maximale raisonnable
//   MIN_ACTIONS: 5  // Nombre minimal d'actions
// };

// export const analyzePlayerBehavior = async (actions) => {
//   // Vérifier si le joueur a effectué suffisamment d'actions
//   if (actions.length < HUMAN_PATTERNS.MIN_ACTIONS) return false;

//   // Filtrer les actions de type MOVE
//   const moveActions = actions.filter(a => a.type === 'MOVE');

//   if (moveActions.length < 2) return false; // Nécessaire pour calculer une vitesse

//   // Calcul des vitesses
//   const speeds = [];
//   for (let i = 1; i < moveActions.length; i++) {
//     const dx = moveActions[i].x - moveActions[i-1].x;
//     const dy = moveActions[i].y - moveActions[i-1].y;
//     const dt = moveActions[i].timestamp - moveActions[i-1].timestamp;
//     const speed = Math.sqrt(dx * dx + dy * dy) / dt;
//     speeds.push(speed);
//   }

//   // Calcul de la vitesse moyenne
//   const avgSpeed = speeds.reduce((a, b) => a + b, 0) / speeds.length;

//   // Valider si la vitesse moyenne est dans une plage raisonnable
//   return avgSpeed >= HUMAN_PATTERNS.MIN_SPEED && avgSpeed <= HUMAN_PATTERNS.MAX_SPEED;
// };
