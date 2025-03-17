
import { useEffect, useState, useRef } from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

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
      "bg-red-600 text-white py-3 transition-all duration-500",
      isVisible ? "opacity-100" : "opacity-0"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 flex items-center mr-4 font-bold">
            <AlertTriangle className="mr-2 h-5 w-5 animate-pulse" />
            <span className="hidden sm:inline">BREAKING:</span>
            <span className="sm:hidden">LIVE:</span>
          </div>
          
          <div 
            className="relative overflow-hidden flex-grow h-6" 
            ref={tickerRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {breakingNewsItems.map((item, index) => (
              <div 
                key={index}
                className={cn(
                  "absolute top-0 left-0 right-0 transition-opacity duration-500 whitespace-nowrap text-ellipsis overflow-hidden",
                  currentIndex === index ? "opacity-100" : "opacity-0"
                )}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
