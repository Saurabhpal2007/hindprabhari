
import { useState, useEffect, useRef, RefObject } from 'react';

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
export function useStaggeredAnimation<T>(items: T[], delay: number = 0.1) {
  const [staggeredItems, setStaggeredItems] = useState<{ item: T; delay: number }[]>([]);
  
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

// Custom hook for element measurements
export function useElementSize<T extends HTMLElement = HTMLDivElement>(): [RefObject<T>, { width: number; height: number }] {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry && entry.contentRect) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });

    observer.observe(ref.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return [ref, size];
}

// Hook for animated counting
export function useCountAnimation(
  end: number,
  start: number = 0,
  duration: number = 1000,
  delay: number = 0
) {
  const [count, setCount] = useState(start);
  
  useEffect(() => {
    // Don't animate if the value is too large
    if (end > 1000) {
      setCount(end);
      return;
    }
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    const timeout = setTimeout(() => {
      window.requestAnimationFrame(step);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [start, end, duration, delay]);
  
  return count;
}

// Ripple effect handler function - Updated to accept more generic Element type
export function createRipple(event: React.MouseEvent<Element>) {
  const button = event.currentTarget as HTMLElement; // Cast to HTMLElement

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

// Hook for cursor spotlight effect
export function useSpotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY
      });
      setOpacity(1);
    };
    
    const handleMouseLeave = () => {
      setOpacity(0);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return { position, opacity };
}

// Hook for sequential text animation
export function useTypewriter(text: string, speed: number = 50, delay: number = 0) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Reset when text changes
    setDisplayText('');
    setIsComplete(false);
    
    const startTyping = () => {
      let i = 0;
      const type = () => {
        if (i < text.length) {
          setDisplayText(prev => prev + text.charAt(i));
          i++;
          timeout = setTimeout(type, speed);
        } else {
          setIsComplete(true);
        }
      };
      
      timeout = setTimeout(type, speed);
    };
    
    const initialDelay = setTimeout(startTyping, delay);
    
    return () => {
      clearTimeout(initialDelay);
      clearTimeout(timeout);
    };
  }, [text, speed, delay]);
  
  return { displayText, isComplete };
}
