import { useState, useEffect } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

export const useFallingStars = (starCount: number = 20) => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: starCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 3 + Math.random() * 4
      }));
      setStars(newStars);
    };

    generateStars();
    const interval = setInterval(generateStars, 8000); // Regenerate stars every 8 seconds

    return () => clearInterval(interval);
  }, [starCount]);

  return stars;
}; 