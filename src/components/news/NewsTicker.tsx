
import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface NewsTickerProps {
  className?: string;
}

// Sample news items for the ticker
const newsItems = [
  { id: 1, text: "PM inaugurates new infrastructure projects worth ₹15,000 crores", url: "/article/1" },
  { id: 2, text: "India's GDP growth predicted to reach 7.2% in FY 2023-24", url: "/article/2" },
  { id: 3, text: "New education policy implementation begins across all states", url: "/article/3" },
  { id: 4, text: "Stock markets hit all-time high as foreign investments surge", url: "/article/4" },
  { id: 5, text: "National cricket team announces squad for upcoming world cup", url: "/article/5" },
  { id: 6, text: "Tech industry creates 200,000 new jobs in the last quarter", url: "/article/6" },
];

const NewsTicker = ({ className = "" }: NewsTickerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    let animationId: number;
    let scrollPosition = 0;
    const speed = 1; // pixels per frame
    
    const scroll = () => {
      if (isHovered || !scrollContainer) {
        animationId = requestAnimationFrame(scroll);
        return;
      }
      
      scrollPosition += speed;
      
      // Reset when end is reached
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };
    
    scroll();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isHovered]);

  return (
    <div className={`bg-background border-y py-2 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium mr-4 whitespace-nowrap">
            Breaking News
          </div>
          
          <div 
            className="overflow-hidden flex-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative overflow-hidden w-full">
              <div 
                ref={scrollRef}
                className="flex whitespace-nowrap items-center overflow-x-auto scrollbar-none"
                style={{ scrollBehavior: 'smooth' }}
              >
                {/* Double the news items to create seamless loop */}
                {[...newsItems, ...newsItems].map((item, index) => (
                  <Link
                    key={`${item.id}-${index}`}
                    to={item.url}
                    className="inline-flex items-center text-sm px-4 hover:text-primary transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 mr-1 flex-shrink-0 text-primary" />
                    <span>{item.text}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
