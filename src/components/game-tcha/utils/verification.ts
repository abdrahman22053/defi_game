const HUMAN_PATTERNS = {
  MIN_SPEED_VARIANCE: 0.2,
  MAX_SPEED_VARIANCE: 2.0,
  MIN_DIRECTION_CHANGES: 5,
  MIN_RESPONSE_TIME: 150, // milliseconds
  MAX_RESPONSE_TIME: 800  // milliseconds
};

export const analyzePlayerBehavior = async (actions: PlayerAction[]): Promise<boolean> => {
  if (actions.length < 10) return false;

  // Calculate movement patterns
  const moveActions = actions.filter((a): a is Extract<PlayerAction, { type: 'MOVE' }> => 
    a.type === 'MOVE'
  );

  // Analyze speed variance
  const speeds: number[] = [];
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

  // Analyze direction changes
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

  // Analyze response times
  const shootActions = actions.filter(a => a.type === 'SHOOT');
  const responseTimes = shootActions.map((_, i) => 
    i > 0 ? shootActions[i].timestamp - shootActions[i-1].timestamp : 0
  ).slice(1);

  const avgResponseTime = responseTimes.length > 0
    ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
    : 0;

  // Combine all factors for final verification
  const isHuman = 
    speedVariance >= HUMAN_PATTERNS.MIN_SPEED_VARIANCE &&
    speedVariance <= HUMAN_PATTERNS.MAX_SPEED_VARIANCE &&
    directionChanges >= HUMAN_PATTERNS.MIN_DIRECTION_CHANGES &&
    (avgResponseTime >= HUMAN_PATTERNS.MIN_RESPONSE_TIME &&
     avgResponseTime <= HUMAN_PATTERNS.MAX_RESPONSE_TIME);

  return isHuman;
};