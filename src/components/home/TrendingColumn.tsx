
import { TrendingUp, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for trending articles
const trendingArticles = [
  {
    id: 1,
    title: "Stock Market Hits All-Time High as Tech Stocks Surge",
    timeAgo: "2 hours ago",
    thumbnail: "https://source.unsplash.com/random/100x100?stock,market",
    url: "/article/101"
  },
  {
    id: 2,
    title: "New Government Policy on Renewable Energy Announced",
    timeAgo: "3 hours ago",
    thumbnail: "https://source.unsplash.com/random/100x100?solar,energy",
    url: "/article/102"
  },
  {
    id: 3,
    title: "Cricket: India Defeats Australia in Thrilling Final Match",
    timeAgo: "5 hours ago",
    thumbnail: "https://source.unsplash.com/random/100x100?cricket",
    url: "/article/103"
  },
  {
    id: 4,
    title: "Tech Giant Announces New Smartphone with Revolutionary Features",
    timeAgo: "7 hours ago",
    thumbnail: "https://source.unsplash.com/random/100x100?smartphone",
    url: "/article/104"
  },
  {
    id: 5,
    title: "Health Study Reveals Benefits of Traditional Indian Diet",
    timeAgo: "9 hours ago",
    thumbnail: "https://source.unsplash.com/random/100x100?indian,food",
    url: "/article/105"
  },
  {
    id: 6,
    title: "Famous Bollywood Actor Signs International Film Project",
    timeAgo: "12 hours ago",
    thumbnail: "https://source.unsplash.com/random/100x100?bollywood",
    url: "/article/106"
  }
];

const TrendingColumn = () => {
  return (
    <div className="h-full rounded-xl border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-primary" />
          <span>Trending Now</span>
        </h2>
        <Link 
          to="/trending" 
          className="text-sm font-medium text-primary flex items-center hover:underline"
        >
          <span>View All</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      <div className="space-y-4 overflow-y-auto max-h-[600px] pr-1">
        {trendingArticles.map((article) => (
          <Link key={article.id} to={article.url} className="flex items-start space-x-3 group">
            <div className="relative flex-shrink-0">
              <img 
                src={article.thumbnail} 
                alt="" 
                className="w-16 h-16 object-cover rounded-md"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>{article.timeAgo}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingColumn;
