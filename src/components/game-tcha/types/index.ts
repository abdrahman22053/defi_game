export type PlayerAction = {
  timestamp: number;
} & (
  | { type: 'MOVE'; x: number; y: number }
  | { type: 'SHOOT' }
);

export type Entity = {
  id: string;
  type: 'enemy' | 'bullet';
  x: number;
  y: number;
  velocity: { x: number; y: number };
};

export type GameState = {
  score: number;
  timeLeft: number;
  lives: number;
  entities: Entity[];
  playerPosition: { x: number; y: number };
  isActive: boolean;
};

export type VerificationStatus = 'idle' | 'playing' | 'verifying' | 'success' | 'failure';