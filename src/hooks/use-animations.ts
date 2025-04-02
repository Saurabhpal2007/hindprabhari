
import { useState, useEffect } from 'react';

// Custom hook for scroll-based animations
export function useScrollAnimation(threshold: number = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref);

    return () => {
      if (ref) observer.disconnect();
    };
  }, [ref, threshold]);

  return [setRef, isVisible] as const;
}

// Hook for staggered animations
export function useStaggeredAnimation(items: any[], delay: number = 0.1) {
  const [staggeredItems, setStaggeredItems] = useState<{ item: any; delay: number }[]>([]);
  
  useEffect(() => {
    const withDelay = items.map((item, index) => ({
      item,
      delay: index * delay
    }));
    
    setStaggeredItems(withDelay);
  }, [items, delay]);
  
  return staggeredItems;
}

// Hook for managing motion preferences
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
  return prefersReducedMotion;
}

// Ripple effect handler function
export function createRipple(event: React.MouseEvent<HTMLElement>) {
  const button = event.currentTarget;

  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  const rect = button.getBoundingClientRect();
  
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - rect.left - radius}px`;
  circle.style.top = `${event.clientY - rect.top - radius}px`;
  circle.classList.add("ripple-effect");
  
  // Remove existing ripple
  const ripple = button.querySelector(".ripple-effect");
  if (ripple) {
    ripple.remove();
  }
  
  button.appendChild(circle);
  
  // Auto-remove after animation completes
  setTimeout(() => {
    if (circle && circle.parentNode === button) {
      button.removeChild(circle);
    }
  }, 600);
}
