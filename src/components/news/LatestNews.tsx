
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CalendarIcon, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample latest news data
const latestNewsData = [
  {
    id: 101,
    title: "New High-Speed Rail Project Connecting Delhi to Mumbai Announced",
    summary: "The government has unveiled plans for a new bullet train corridor that will reduce travel time to just 4 hours.",
    timestamp: "2023-06-15T10:30:00",
    category: "Infrastructure"
  },
  {
    id: 102,
    title: "India's Space Mission Successfully Launched from Sriharikota",
    summary: "ISRO's latest satellite will improve communication capabilities across the subcontinent.",
    timestamp: "2023-06-14T15:45:00",
    category: "Science"
  },
  {
    id: 103,
    title: "Finance Minister Presents Annual Budget with Focus on Digital Economy",
    summary: "New incentives for startups and digital payment infrastructure were among the key announcements.",
    timestamp: "2023-06-13T12:00:00",
    category: "Economy"
  },
  {
    id: 104,
    title: "National Cricket Team Announces Squad for Upcoming Tournament",
    summary: "Several young players have been included, signaling a shift towards building for the future.",
    timestamp: "2023-06-12T09:15:00",
    category: "Sports"
  },
  {
    id: 105,
    title: "Major Cultural Festival to Celebrate India's Diverse Heritage",
    summary: "The month-long event will showcase traditional arts, crafts, and performances from all states.",
    timestamp: "2023-06-11T14:20:00",
    category: "Culture"
  }
];

const LatestNews = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          if (!visibleItems.includes(index)) {
            setVisibleItems(prev => [...prev, index]);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    itemRefs.current.forEach(item => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, [visibleItems]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    }).format(date);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {latestNewsData.map((item, index) => (
        <div
          key={item.id}
          ref={el => itemRefs.current[index] = el}
          data-index={index}
          className={cn(
            "border-b border-muted pb-6 transition-all duration-700 transform",
            visibleItems.includes(index) 
              ? "opacity-100 translate-x-0" 
              : "opacity-0 translate-x-8"
          )}
        >
          <Link to={`/article/${item.id}`} className="block group">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <span className="bg-muted text-xs font-medium px-2 py-1 rounded ml-2 shrink-0">
                {item.category}
              </span>
            </div>
            
            <p className="text-muted-foreground mb-2">
              {item.summary}
            </p>
            
            <div className="flex items-center text-sm text-muted-foreground mt-3">
              <div className="flex items-center mr-4">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>{formatDate(item.timestamp)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{formatTime(item.timestamp)}</span>
              </div>
              <div className="ml-auto">
                <span className="text-primary font-medium inline-flex items-center group-hover:underline">
                  Read More <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default LatestNews;
