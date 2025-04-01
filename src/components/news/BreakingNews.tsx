
import { useEffect, useState, useRef } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Breaking news data
const breakingNewsItems = [
  "PM announces new infrastructure projects worth ₹10,000 crore",
  "Sensex hits all-time high, crosses 70,000 mark",
  "Indian Cricket Team wins series against Australia",
  "New AI policy framework released by government",
  "Monsoon arrives early in Kerala, says IMD"
];

const BreakingNews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show the component with animation
    setIsVisible(true);

    // Rotate through breaking news items
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % breakingNewsItems.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className={cn(
      "bg-tertiary text-tertiary-foreground py-2.5 relative z-20 shadow-elevation-2 md-surface-tint transition-all duration-500 md-container-shape-xs",
      isVisible ? "opacity-100" : "opacity-0"
    )}>
      <motion.div 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }} // Material Design 3 standard easing
        className="container mx-auto px-4"
      >
        <div className="flex items-center">
          <div className="flex-shrink-0 flex items-center mr-4 font-medium">
            <div className="bg-tertiary-foreground text-tertiary p-1 rounded-full mr-2">
              <AlertCircle className="h-5 w-5" />
            </div>
            <span className="hidden sm:inline text-base tracking-wide">BREAKING</span>
            <span className="sm:hidden text-base">LIVE</span>
          </div>
          
          <div 
            className="relative overflow-hidden flex-grow h-7" 
            ref={tickerRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {breakingNewsItems.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: currentIndex === index ? 1 : 0,
                  y: currentIndex === index ? 0 : 20
                }}
                transition={{ 
                  duration: 0.3, 
                  ease: [0.4, 0.0, 0.2, 1] // Material Design 3 standard easing
                }}
                className={cn(
                  "absolute top-0 left-0 right-0 transition-all whitespace-nowrap text-ellipsis overflow-hidden text-base",
                  currentIndex === index ? "opacity-100" : "opacity-0"
                )}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BreakingNews;
