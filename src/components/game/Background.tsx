import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated background with rays of light */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-900">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 left-1/4 w-20 h-full bg-yellow-100/10 rotate-45 animate-pulse"
            style={{
              left: `${20 + i * 20}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>
      
      {/* Seaweed */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute bottom-0 w-8 h-32 origin-bottom"
          style={{
            left: `${i * 15}%`,
            animation: `sway 3s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`,
          }}
        >
          <div className="w-full h-full bg-green-600 rounded-t-full" />
        </div>
      ))}

      {/* Bubbles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/20 animate-float"
          style={{
            width: `${Math.random() * 20 + 10}px`,
            height: `${Math.random() * 20 + 10}px`,
            left: `${Math.random() * 100}%`,
            bottom: `-20px`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Background;