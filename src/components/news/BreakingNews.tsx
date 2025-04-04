
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
      "bg-gradient-to-r from-red-600 to-red-500 text-white py-2.5 relative z-20 shadow-md border-b border-red-700",
      isVisible ? "opacity-100" : "opacity-0"
    )}>
      <div 
        className="container mx-auto px-4"
      >
        <div className="flex items-center">
          <div className="flex-shrink-0 flex items-center mr-2 md:mr-4 font-medium">
            <div className="bg-white text-red-600 p-1 rounded-full mr-1 md:mr-2">
              <AlertCircle className="h-4 w-4 md:h-5 md:w-5" />
            </div>
            <span className="hidden sm:inline text-base tracking-wide">BREAKING</span>
            <span className="sm:hidden text-xs md:text-base">LIVE</span>
          </div>
          
          <div 
            className="relative overflow-hidden flex-grow h-5 md:h-7" 
            ref={tickerRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {breakingNewsItems.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: currentIndex === index ? 1 : 0,
                  y: currentIndex === index ? 0 : 10
                }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "absolute top-0 left-0 right-0 transition-all whitespace-nowrap text-ellipsis overflow-hidden text-sm md:text-base",
                  currentIndex === index ? "opacity-100" : "opacity-0"
                )}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
