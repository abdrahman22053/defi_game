import React from 'react';
import { Shield, Clock, Heart } from 'lucide-react';

interface GameUIProps {
  score: number;
  timeLeft: number;
  lives: number;
}

export const GameUI: React.FC<GameUIProps> = ({ score, timeLeft, lives }) => {
  return (
    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
          <Shield className="w-4 h-4 text-blue-400" />
          <span className="text-white font-medium">{score}</span>
        </div>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
          <Clock className="w-4 h-4 text-yellow-400" />
          <span className="text-white font-medium">{timeLeft}s</span>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
        <Heart className="w-4 h-4 text-red-400" />
        <span className="text-white font-medium">×{lives}</span>
      </div>
    </div>
  );
};