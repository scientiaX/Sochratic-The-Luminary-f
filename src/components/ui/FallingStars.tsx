import React from 'react';
import { useFallingStars } from '../../hooks/useFallingStars';

interface FallingStarsProps {
  starCount?: number;
  className?: string;
  starColor?: string;
}

export const FallingStars: React.FC<FallingStarsProps> = ({ 
  starCount = 20, 
  className = "",
  starColor = "white"
}) => {
  const stars = useFallingStars(starCount);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-[5] ${className}`}>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute w-1 h-1 rounded-full falling-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            backgroundColor: starColor,
            boxShadow: `0 0 6px ${starColor}80, 0 0 12px ${starColor}40`,
            zIndex: 5
          }}
        />
      ))}
    </div>
  );
};
