
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  ArrowRight, 
  Clock, 
  ThumbsUp, 
  Share2, 
  MessageSquare, 
  Bookmark 
} from "lucide-react";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const trendingCategories = ["All", "Politics", "Business", "Technology", "Entertainment"];

interface TrendingArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
}

const mockTrendingArticles: TrendingArticle[] = [
  {
    id: "1",
    title: "Finance Minister Announces New Economic Stimulus Package",
    excerpt: "The government has unveiled a comprehensive economic package aiming to boost post-pandemic recovery...",
    category: "Politics",
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3D",
    author: {
      name: "Rajiv Sharma",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    date: "2 hours ago",
    readTime: "6 min read",
    engagement: {
      likes: 452,
      comments: 89,
      shares: 112
    }
  },
  {
    id: "2",
    title: "Tech Giant Launches Revolutionary AI-Powered Smartphone",
    excerpt: "The new flagship device features cutting-edge artificial intelligence capabilities that could reshape the mobile industry...",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D",
    author: {
      name: "Priya Patel",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    date: "4 hours ago",
    readTime: "5 min read",
    engagement: {
      likes: 827,
      comments: 214,
      shares: 345
    }
  },
  {
    id: "3",
    title: "IPL 2023: Mumbai Indians Clinch Last-Ball Thriller Against Chennai",
    excerpt: "In a nail-biting finish at Wankhede Stadium, Mumbai secured victory with a six off the final delivery...",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y3JpY2tldHxlbnwwfHwwfHx8MA%3D%3D",
    author: {
      name: "Arjun Reddy",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    date: "6 hours ago",
    readTime: "4 min read",
    engagement: {
      likes: 1245,
      comments: 563,
      shares: 412
    }
  },
  {
    id: "4",
    title: "Global Climate Summit Concludes with Ambitious Carbon Reduction Targets",
    excerpt: "World leaders have agreed to accelerate emission cuts and increase funding for climate adaptation initiatives...",
    category: "World",
    image: "https://images.unsplash.com/photo-1621451537984-a5aa446d3355?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNsaW1hdGUlMjBjaGFuZ2V8ZW58MHx8MHx8fDA%3D",
    author: {
      name: "Meera Joshi",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
    date: "8 hours ago",
    readTime: "7 min read",
    engagement: {
      likes: 892,
      comments: 207,
      shares: 304
    }
  },
  {
    id: "5",
    title: "Bollywood Blockbuster Breaks Opening Weekend Box Office Records",
    excerpt: "The much-anticipated action drama has shattered previous records, grossing over ₹150 crore in its first three days...",
    category: "Entertainment",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW92aWV8ZW58MHx8MHx8fDA%3D",
    author: {
      name: "Deepak Verma",
      avatar: "https://i.pravatar.cc/150?img=7",
    },
    date: "12 hours ago",
    readTime: "3 min read",
    engagement: {
      likes: 1876,
      comments: 451,
      shares: 738
    }
  },
  {
    id: "6",
    title: "Reserve Bank Keeps Interest Rates Unchanged Amid Inflation Concerns",
    excerpt: "The central bank has maintained its cautious stance despite growing pressure to ease monetary policy...",
    category: "Business",
    image: "https://images.unsplash.com/photo-1565514020179-026b92b2d7c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmFua3xlbnwwfHwwfHx8MA%3D%3D",
    author: {
      name: "Amit Singh",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    date: "14 hours ago",
    readTime: "5 min read",
    engagement: {
      likes: 542,
      comments: 127,
      shares: 98
    }
  }
];

const TrendingSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const filteredArticles = selectedCategory === "All" 
    ? mockTrendingArticles 
    : mockTrendingArticles.filter(article => article.category === selectedCategory);

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center">
            <TrendingUp className="h-6 w-6 text-primary mr-2" />
            <h2 className="text-3xl font-bold tracking-tight">Trending Now</h2>
          </div>
          
          <div className="w-full md:w-auto">
            <SegmentedControl 
              segments={trendingCategories}
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="max-w-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <Link to={`/article/${article.id}`}>
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                  <Badge 
                    className="absolute top-3 left-3 bg-primary hover:bg-primary/90"
                  >
                    {article.category}
                  </Badge>
                </div>
                
                <div className="p-5 space-y-4">
                  <Link to={`/article/${article.id}`} className="hover:text-primary transition-colors">
                    <h3 className="font-bold text-lg line-clamp-2">{article.title}</h3>
                  </Link>
                  
                  <p className="text-muted-foreground line-clamp-2 text-sm">{article.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={article.author.avatar} alt={article.author.name} />
                        <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{article.author.name}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>{article.date} · {article.readTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Bookmark className="h-4 w-4" />
                      <span className="sr-only">Bookmark</span>
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span className="text-xs">{article.engagement.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span className="text-xs">{article.engagement.comments}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Share2 className="h-4 w-4 mr-1" />
                        <span className="text-xs">{article.engagement.shares}</span>
                      </Button>
                    </div>
                    
                    <Button variant="ghost" size="sm" asChild className="h-8">
                      <Link to={`/article/${article.id}`}>
                        Read <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button asChild variant="outline" className="group">
            <Link to="/trending">
              View All Trending Stories <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
