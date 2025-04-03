
import { useRef, useState, useEffect } from 'react';

// Hook for creating parallax effects
export function useParallax(sensitivity: number = 0.05, direction: 'normal' | 'reverse' = 'normal') {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * sensitivity;
      const deltaY = (e.clientY - centerY) * sensitivity;
      
      const x = direction === 'normal' ? deltaX : -deltaX;
      const y = direction === 'normal' ? deltaY : -deltaY;
      
      setPosition({ x, y });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [sensitivity, direction]);

  return { ref, position, setPosition };
}

// Hook for tracking element position in viewport
export function useViewportPosition() {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, progress: 0 });
  
  useEffect(() => {
    if (!ref.current) return;
    
    const updatePosition = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress: from -1 (element is below viewport) to 1 (element is above viewport)
      // 0 means the element is centered in viewport
      let progress = 1 - (rect.top + rect.height / 2) / (windowHeight / 2);
      progress = Math.max(-1, Math.min(1, progress)); // Clamp between -1 and 1
      
      setPosition({
        top: rect.top,
        left: rect.left,
        progress
      });
    };
    
    updatePosition(); // Initial position
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);
    
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, []);
  
  return { ref, position };
}

// Hook for element tracking with IntersectionObserver
export function useIntersectionObserver(
  options: IntersectionObserverInit = { threshold: 0.1 }
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    }, options);

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [options, hasIntersected]);

  return { targetRef, isIntersecting, hasIntersected };
}
