import React from 'react';
import { useFallingStars } from '../../hooks/useFallingStars';
import '../../styles/animations.css';

interface FallingStarsProps {
  starCount?: number;
  className?: string;
}

export const FallingStars: React.FC<FallingStarsProps> = ({ 
  starCount = 20, 
  className = "" 
}) => {
  const stars = useFallingStars(starCount);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full falling-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.4)',
            zIndex: 1
          }}
        />
      ))}
    </div>
  );
};
