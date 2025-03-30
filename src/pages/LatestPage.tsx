
import { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, ArrowRight, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LatestPage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Mock articles data
  const mockArticles = [
    {
      id: "1",
      title: "Government Launches New Digital India Initiative",
      excerpt: "The program aims to bridge the digital divide and bring connectivity to remote areas...",
      category: "Politics",
      author: "Rajiv Kumar",
      authorImage: "/placeholder.svg",
      date: "2023-08-14T10:30:00",
      image: "/placeholder.svg"
    },
    {
      id: "2",
      title: "India's Startup Ecosystem Sees Record Growth in Q2",
      excerpt: "Investments in Indian startups have surged to unprecedented levels according to recent reports...",
      category: "Business",
      author: "Priya Gupta",
      authorImage: "/placeholder.svg",
      date: "2023-08-14T09:15:00",
      image: "/placeholder.svg"
    },
    {
      id: "3",
      title: "Scientists Discover Breakthrough in Renewable Energy",
      excerpt: "A team of researchers from IIT Delhi has developed a new technology that could revolutionize solar power...",
      category: "Technology",
      author: "Amit Singh",
      authorImage: "/placeholder.svg",
      date: "2023-08-14T08:45:00",
      image: "/placeholder.svg"
    },
    {
      id: "4",
      title: "National Cricket Team Prepares for Upcoming Series",
      excerpt: "The team has started intensive training sessions ahead of the important tour next month...",
      category: "Sports",
      author: "Vijay Sharma",
      authorImage: "/placeholder.svg",
      date: "2023-08-13T18:20:00",
      image: "/placeholder.svg"
    },
    {
      id: "5",
      title: "New Health Advisory Issued for Monsoon Season",
      excerpt: "Health ministry provides guidelines to prevent seasonal diseases during the rainy season...",
      category: "Health",
      author: "Dr. Meera Joshi",
      authorImage: "/placeholder.svg",
      date: "2023-08-13T16:10:00",
      image: "/placeholder.svg"
    },
    {
      id: "6",
      title: "Major Film Festival Announces Lineup for 2023",
      excerpt: "The prestigious event will showcase works from emerging directors alongside established filmmakers...",
      category: "Entertainment",
      author: "Neha Kapoor",
      authorImage: "/placeholder.svg",
      date: "2023-08-13T14:30:00",
      image: "/placeholder.svg"
    },
    {
      id: "7",
      title: "Education Reform Bill Passes in Parliament",
      excerpt: "The landmark legislation aims to transform the country's education system with modern approaches...",
      category: "Education",
      author: "Suresh Patel",
      authorImage: "/placeholder.svg",
      date: "2023-08-13T11:45:00",
      image: "/placeholder.svg"
    },
    {
      id: "8",
      title: "Global Climate Summit to be Hosted in New Delhi",
      excerpt: "India will welcome delegates from over 100 countries to discuss climate action strategies...",
      category: "World",
      author: "Ananya Reddy",
      authorImage: "/placeholder.svg",
      date: "2023-08-13T10:15:00",
      image: "/placeholder.svg"
    }
  ];
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setArticles(mockArticles);
      setIsLoading(false);
    }, 500);
  }, []);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    }
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    }
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  };
  
  const filteredArticles = categoryFilter === "all" 
    ? articles 
    : articles.filter(article => article.category.toLowerCase() === categoryFilter.toLowerCase());

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Latest News</h1>
              <p className="text-muted-foreground">
                Stay updated with the most recent developments across all categories
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="politics">Politics</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="world">World</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-muted rounded w-full mb-2"></div>
                    <div className="h-4 bg-muted rounded w-full mb-2"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-3 h-full">
                    <div className="md:col-span-1">
                      <div className="h-full w-full">
                        <img 
                          src={article.image} 
                          alt={article.title} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2 flex flex-col">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start mb-2">
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                            {article.category}
                          </Badge>
                          <div className="flex items-center text-muted-foreground text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{getTimeAgo(article.date)}</span>
                          </div>
                        </div>
                        <CardTitle className="text-2xl hover:text-primary transition-colors">
                          <Link to={`/article/${article.id}`}>
                            {article.title}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2 flex-grow">
                        <p className="text-muted-foreground line-clamp-3 mb-4">{article.excerpt}</p>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={article.authorImage} />
                              <AvatarFallback>{article.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <div className="font-medium">{article.author}</div>
                              <div className="text-xs text-muted-foreground flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {formatDate(article.date)}
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-primary" asChild>
                            <Link to={`/article/${article.id}`}>
                              Read More <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
              
              <div className="mt-12 flex justify-center">
                <Button variant="outline" size="lg">
                  Load More News
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LatestPage;
