import React from 'react';
import { motion } from 'framer-motion';

interface FishProps {
  x: number;
  y: number;
  isPlayer?: boolean;
  size?: number;
  color?: string;
  direction?: 'left' | 'right';
}

export const Fish: React.FC<FishProps> = ({ x, y, isPlayer = false, size = 40, color = '#FF7F50', direction = 'right' }) => {
  return (
    <motion.div
      className="absolute"
      style={{
        x, y,
        width: size,
        height: size,
        transform: direction === 'left' ? 'scaleX(-1)' : undefined
      }}
      animate={{
        y: y + Math.random() * 20 - 10,
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <svg viewBox="0 0 100 100" className={`w-full h-full ${isPlayer ? 'cursor-pointer' : ''}`}>
        <path
          d="M75 50c0 15-25 30-50 30C10 80 0 65 0 50s10-30 25-30c25 0 50 15 50 30z"
          fill={color}
        />
        <circle cx="65" cy="45" r="5" fill="white" />
        <circle cx="67" cy="45" r="2" fill="black" />
        <path
          d="M75 50l25-15v30L75 50z"
          fill={color}
        />
      </svg>
    </motion.div>
  );
};

export default Fish;