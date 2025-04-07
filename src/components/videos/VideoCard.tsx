
import { useState } from "react";
import { Play, Clock, Eye, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface VideoCardProps {
  id: number;
  title: string;
  category: string;
  duration: string;
  views: number;
  date: string;
  thumbnail: string;
  type?: "regular" | "short";
  onClick?: () => void;
}

const VideoCard = ({ 
  id, 
  title, 
  category, 
  duration, 
  views, 
  date, 
  thumbnail, 
  type = "regular", 
  onClick 
}: VideoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatViews = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return dateString;
    }
  };

  if (type === "short") {
    return (
      <div 
        className="relative group cursor-pointer"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-[9/16] rounded-lg overflow-hidden bg-card">
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Play className="h-12 w-12 text-white" fill="white" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
          <h3 className="text-white text-sm font-medium line-clamp-2">{title}</h3>
          <div className="flex items-center justify-between mt-2 text-xs text-white/80">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center">
              <Eye className="h-3 w-3 mr-1" />
              <span>{formatViews(views)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-card border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img 
          src={thumbnail} 
          alt={title}
          className={`w-full aspect-video object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-80 group-hover:opacity-100 transition-opacity">
          <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center">
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-primary border-b-[10px] border-b-transparent ml-1"></div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>
        <div className="absolute top-2 left-2">
          <Badge className="bg-primary text-primary-foreground">
            {category}
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-3">
          <div className="flex items-center">
            <Eye className="h-3 w-3 mr-1" />
            <span>{formatViews(views)} views</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{formatDate(date)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
