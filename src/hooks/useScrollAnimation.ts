import { useEffect, useState } from 'react';

export const useScrollAnimation = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      
      setScrollDirection(direction);
      setLastScrollY(currentScrollY);

      // Get all elements with data-scroll attribute
      const elements = document.querySelectorAll('[data-scroll]');
      
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          const scrollType = element.getAttribute('data-scroll');
          
          if (scrollType === 'fade-up' && direction === 'down') {
            element.classList.add('opacity-100', 'translate-y-0');
            element.classList.remove('opacity-0', 'translate-y-8');
          } else if (scrollType === 'fade-down' && direction === 'up') {
            element.classList.add('opacity-100', 'translate-y-0');
            element.classList.remove('opacity-0', 'translate-y-8');
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check for elements in viewport
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return { scrollDirection };
}; 