
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, Clock, Eye, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  views: number;
  comments: number;
  imageUrl: string;
  tags: string[];
  url: string;
}

interface NewsGridProps {
  category?: string;
  limit?: number;
  filter?: string;
  showFilters?: boolean;
}

// Mock data for news items
const mockNewsItems: NewsItem[] = [
  {
    id: 1,
    title: "Government Launches New Education Initiative Across the Country",
    summary: "The new education policy aims to transform the learning experience with focus on practical skills and digital literacy.",
    category: "Education",
    author: "Rahul Sharma",
    date: "2023-04-15",
    readTime: "4 min read",
    views: 1250,
    comments: 45,
    imageUrl: "https://source.unsplash.com/random/400x300?education",
    tags: ["Education", "Policy", "Digital"],
    url: "/article/1"
  },
  {
    id: 2,
    title: "Stock Markets Reach Record High on Positive Economic Outlook",
    summary: "Investors show confidence as economic indicators point towards sustained growth in the coming quarters.",
    category: "Business",
    author: "Priya Mehta",
    date: "2023-04-14",
    readTime: "3 min read",
    views: 980,
    comments: 32,
    imageUrl: "https://source.unsplash.com/random/400x300?finance",
    tags: ["Finance", "Economy", "Markets"],
    url: "/article/2"
  },
  {
    id: 3,
    title: "New Health Study Reveals Benefits of Traditional Indian Diet",
    summary: "Research indicates that traditional Indian food ingredients can help prevent various lifestyle diseases.",
    category: "Health",
    author: "Dr. Anand Kumar",
    date: "2023-04-13",
    readTime: "5 min read",
    views: 1540,
    comments: 67,
    imageUrl: "https://source.unsplash.com/random/400x300?food,indian",
    tags: ["Health", "Nutrition", "Research"],
    url: "/article/3"
  },
  {
    id: 4,
    title: "Tech Giant Opens New Research Center in Bangalore",
    summary: "The facility will focus on artificial intelligence and machine learning research with over 1000 new jobs created.",
    category: "Technology",
    author: "Vikram Singh",
    date: "2023-04-12",
    readTime: "4 min read",
    views: 1120,
    comments: 38,
    imageUrl: "https://source.unsplash.com/random/400x300?technology",
    tags: ["Technology", "AI", "Jobs"],
    url: "/article/4"
  },
  {
    id: 5,
    title: "India's Sports Budget Increased for Olympic Preparations",
    summary: "The government has allocated additional funds to support athletes training for the upcoming Olympics.",
    category: "Sports",
    author: "Neha Gupta",
    date: "2023-04-11",
    readTime: "3 min read",
    views: 890,
    comments: 29,
    imageUrl: "https://source.unsplash.com/random/400x300?olympics,sports",
    tags: ["Sports", "Olympics", "Budget"],
    url: "/article/5"
  },
  {
    id: 6,
    title: "Film Industry Bounces Back with Record Box Office Collections",
    summary: "After two years of pandemic-related struggles, the film industry sees a strong recovery with multiple blockbusters.",
    category: "Entertainment",
    author: "Arjun Kapoor",
    date: "2023-04-10",
    readTime: "4 min read",
    views: 1350,
    comments: 52,
    imageUrl: "https://source.unsplash.com/random/400x300?cinema,movie",
    tags: ["Entertainment", "Cinema", "Business"],
    url: "/article/6"
  },
  {
    id: 7,
    title: "New Agricultural Reforms to Benefit Small Farmers",
    summary: "The latest policy changes aim to increase income and provide better market access for small and marginal farmers.",
    category: "Agriculture",
    author: "Sunil Verma",
    date: "2023-04-09",
    readTime: "5 min read",
    views: 1080,
    comments: 41,
    imageUrl: "https://source.unsplash.com/random/400x300?farming,agriculture",
    tags: ["Agriculture", "Farmers", "Policy"],
    url: "/article/7"
  },
  {
    id: 8,
    title: "Renewable Energy Projects Get Major Funding Boost",
    summary: "Government and private sector join hands to accelerate the transition to clean energy with significant investments.",
    category: "Environment",
    author: "Anjali Desai",
    date: "2023-04-08",
    readTime: "4 min read",
    views: 950,
    comments: 33,
    imageUrl: "https://source.unsplash.com/random/400x300?renewable,solar",
    tags: ["Environment", "Energy", "Sustainability"],
    url: "/article/8"
  }
];

const NewsGrid = ({ category = "all", limit = 8, filter = "latest", showFilters = false }: NewsGridProps) => {
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(filter);
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Simulate API call delay
    setLoading(true);
    
    setTimeout(() => {
      let filteredNews = [...mockNewsItems];
      
      // Filter by category if needed
      if (category !== "all" && category !== "latest") {
        filteredNews = filteredNews.filter(item => 
          item.category.toLowerCase() === category.toLowerCase() || 
          item.tags.some(tag => tag.toLowerCase() === category.toLowerCase())
        );
      }
      
      // Apply sorting based on filter
      switch(activeFilter) {
        case "trending":
          filteredNews.sort((a, b) => b.views - a.views);
          break;
        case "most-commented":
          filteredNews.sort((a, b) => b.comments - a.comments);
          break;
        case "latest":
        default:
          // Already sorted by date in mock data
          break;
      }
      
      // Apply limit
      filteredNews = filteredNews.slice(0, limit);
      
      setNews(filteredNews);
      setLoading(false);
    }, 800);
  }, [category, limit, activeFilter]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div>
      {showFilters && (
        <div className="flex overflow-x-auto mb-6 gap-2">
          <Button 
            variant={activeFilter === "latest" ? "filled" : "outline"}
            onClick={() => setActiveFilter("latest")}
            size="sm"
          >
            Latest
          </Button>
          <Button 
            variant={activeFilter === "trending" ? "filled" : "outline"}
            onClick={() => setActiveFilter("trending")}
            size="sm"
          >
            Most Read
          </Button>
          <Button 
            variant={activeFilter === "most-commented" ? "filled" : "outline"}
            onClick={() => setActiveFilter("most-commented")}
            size="sm"
          >
            Most Discussed
          </Button>
        </div>
      )}
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: limit }).map((_, index) => (
            <Card key={index} className="overflow-hidden h-[380px]">
              <CardContent className="p-0">
                <Skeleton className="h-48 w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex items-center space-x-3 pt-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <Link to={item.url}>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-primary text-primary-foreground">
                      {item.category}
                    </Badge>
                  </div>
                </div>
              </Link>
              <CardContent className="p-4">
                <Link to={item.url}>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {item.summary}
                </p>
                <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-3">
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    <span>{item.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{formatDate(item.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{item.readTime}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-3 border-t">
                  <div className="flex items-center space-x-3 text-xs">
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      <span>{item.views}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      <span>{item.comments}</span>
                    </div>
                  </div>
                  <Button asChild variant="ghost" size="sm">
                    <Link to={item.url}>Read More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsGrid;
