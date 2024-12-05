import React from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

interface GarbageProps {
  x: number;
  y: number;
  type: 'bottle' | 'can';
}

export const Garbage: React.FC<GarbageProps> = ({ x, y, type }) => {
  return (
    <motion.div
      className="absolute"
      style={{ x, y }}
      animate={{
        rotate: [0, 10, -10, 0],
        y: y + Math.random() * 10,
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <Trash2 
        className={`w-8 h-8 ${type === 'bottle' ? 'text-blue-300' : 'text-gray-400'}`}
      />
    </motion.div>
  );
};

export default Garbage;