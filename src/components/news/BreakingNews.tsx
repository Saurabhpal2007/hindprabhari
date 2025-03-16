
import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

// Placeholder breaking news data
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

  useEffect(() => {
    // Show the component with animation
    setIsVisible(true);

    // Rotate through breaking news items
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % breakingNewsItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn(
      "bg-red-600 text-white py-2 transition-all duration-500",
      isVisible ? "opacity-100" : "opacity-0"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center overflow-hidden">
          <div className="flex items-center mr-4 font-bold">
            <AlertTriangle className="mr-2 h-4 w-4" />
            <span>BREAKING:</span>
          </div>
          
          <div className="overflow-hidden flex-1">
            <div className="whitespace-nowrap animate-[slide_25s_linear_infinite]">
              {breakingNewsItems.map((item, index) => (
                <span 
                  key={index}
                  className={cn(
                    "inline-block px-4 transition-opacity duration-500",
                    currentIndex === index ? "opacity-100" : "opacity-0"
                  )}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
