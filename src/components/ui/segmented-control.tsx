
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SegmentedControlProps extends React.HTMLAttributes<HTMLDivElement> {
  segments: string[];
  defaultIndex?: number;
  onSegmentChange?: (segment: string, index: number) => void;
  className?: string;
  controlClassName?: string;
  activeSegmentClassName?: string;
  inactiveSegmentClassName?: string;
}

export const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  ({ 
    segments = [], 
    defaultIndex = 0,
    onSegmentChange,
    className,
    controlClassName,
    activeSegmentClassName,
    inactiveSegmentClassName,
    ...props
  }, ref) => {
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const [sliderStyle, setSliderStyle] = useState({});
    const segmentRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const updateSliderStyle = (index: number) => {
      const currentSegment = segmentRefs.current[index];
      if (currentSegment) {
        setSliderStyle({
          width: `${currentSegment.offsetWidth}px`,
          transform: `translateX(${currentSegment.offsetLeft}px)`,
          height: `${currentSegment.offsetHeight}px`,
        });
      }
    };

    useEffect(() => {
      updateSliderStyle(activeIndex);
      // Add resize listener to handle responsive changes
      window.addEventListener('resize', () => updateSliderStyle(activeIndex));
      return () => window.removeEventListener('resize', () => updateSliderStyle(activeIndex));
    }, [activeIndex]);

    const handleSegmentClick = (index: number) => {
      setActiveIndex(index);
      if (onSegmentChange) {
        onSegmentChange(segments[index], index);
      }
    };

    return (
      <div 
        ref={ref} 
        className={cn(
          "relative w-full rounded-full overflow-hidden bg-muted",
          className
        )}
        {...props}
      >
        <div 
          className={cn(
            "flex relative z-10",
            controlClassName
          )}
        >
          {segments.map((segment, index) => (
            <button
              key={segment}
              ref={(el) => (segmentRefs.current[index] = el)}
              type="button"
              className={cn(
                "flex-1 text-sm font-medium text-center py-2 px-3 z-10 transition-colors",
                index === activeIndex 
                  ? cn("text-primary-foreground", activeSegmentClassName)
                  : cn("text-muted-foreground hover:text-foreground", inactiveSegmentClassName)
              )}
              onClick={() => handleSegmentClick(index)}
            >
              {segment}
            </button>
          ))}
        </div>
        <div 
          className="absolute rounded-full bg-primary transition-all duration-300 ease-in-out z-0"
          style={sliderStyle}
        />
      </div>
    );
  }
);

SegmentedControl.displayName = "SegmentedControl";
