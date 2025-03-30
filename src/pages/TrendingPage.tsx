
import { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Heart, MessageSquare, Share2, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const TrendingPage = () => {
  const [activeTab, setActiveTab] = useState("today");
  
  const trendingArticles = {
    today: [
      {
        id: "1",
        title: "Government Announces Major Economic Reforms Package",
        excerpt: "New policies aimed at boosting growth and creating jobs across multiple sectors...",
        category: "Politics",
        author: "Rajiv Kumar",
        authorImage: "/placeholder.svg",
        date: "3 hours ago",
        image: "/placeholder.svg",
        likes: 342,
        comments: 56,
        shares: 78
      },
      {
        id: "2",
        title: "New AI Research Breakthrough by Indian Scientists",
        excerpt: "Team develops advanced algorithm that could revolutionize healthcare diagnostics...",
        category: "Technology",
        author: "Priya Singh",
        authorImage: "/placeholder.svg",
        date: "5 hours ago",
        image: "/placeholder.svg",
        likes: 289,
        comments: 43,
        shares: 112
      },
      {
        id: "3",
        title: "National Cricket Team Announces Squad for World Cup",
        excerpt: "Several surprise selections as selectors focus on youth for upcoming tournament...",
        category: "Sports",
        author: "Amit Patel",
        authorImage: "/placeholder.svg",
        date: "7 hours ago",
        image: "/placeholder.svg",
        likes: 567,
        comments: 98,
        shares: 145
      }
    ],
    week: [
      {
        id: "4",
        title: "Historic Trade Agreement Signed Between India and European Union",
        excerpt: "Deal expected to boost exports and create thousands of new job opportunities...",
        category: "Business",
        author: "Sneha Gupta",
        authorImage: "/placeholder.svg",
        date: "2 days ago",
        image: "/placeholder.svg",
        likes: 824,
        comments: 156,
        shares: 289
      },
      {
        id: "5",
        title: "Breakthrough in Renewable Energy Storage Technology",
        excerpt: "Scientists develop new battery technology that could make solar power more viable...",
        category: "Technology",
        author: "Vikram Sharma",
        authorImage: "/placeholder.svg",
        date: "3 days ago",
        image: "/placeholder.svg",
        likes: 731,
        comments: 122,
        shares: 245
      }
    ],
    month: [
      {
        id: "6",
        title: "New Education Policy Implementation Shows Promising Results",
        excerpt: "Early adoption states report improved learning outcomes and student engagement...",
        category: "Education",
        author: "Meera Joshi",
        authorImage: "/placeholder.svg",
        date: "2 weeks ago",
        image: "/placeholder.svg",
        likes: 1243,
        comments: 345,
        shares: 567
      },
      {
        id: "7",
        title: "Major Healthcare Initiative Launched to Address Rural Medical Needs",
        excerpt: "Government partners with private sector to bring advanced healthcare to villages...",
        category: "Health",
        author: "Dr. Suresh Kumar",
        authorImage: "/placeholder.svg",
        date: "3 weeks ago",
        image: "/placeholder.svg",
        likes: 1567,
        comments: 432,
        shares: 678
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center space-x-2 mb-8">
            <TrendingUp className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Trending News</h1>
          </div>
          
          <Tabs defaultValue="today" value={activeTab} onValueChange={setActiveTab} className="mb-12">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
            </TabsList>
            
            {Object.entries(trendingArticles).map(([period, articles]) => (
              <TabsContent key={period} value={period} className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {articles.map((article) => (
                    <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-all">
                      <div className="aspect-video w-full overflow-hidden">
                        <img 
                          src={article.image} 
                          alt={article.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center mb-2">
                          <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">
                            {article.category}
                          </Badge>
                          <div className="flex items-center text-muted-foreground text-sm">
                            <Clock className="h-3 w-3 mr-1" />
                            {article.date}
                          </div>
                        </div>
                        <CardTitle className="text-xl mb-1 hover:text-primary transition-colors">
                          <Link to={`/article/${article.id}`}>
                            {article.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={article.authorImage} />
                            <AvatarFallback>{article.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{article.author}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-4">
                        <div className="flex space-x-4">
                          <div className="flex items-center text-muted-foreground">
                            <Heart className="h-4 w-4 mr-1" />
                            <span className="text-xs">{article.likes}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span className="text-xs">{article.comments}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Share2 className="h-4 w-4 mr-1" />
                            <span className="text-xs">{article.shares}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/article/${article.id}`}>Read More</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          {/* Analytics section */}
          <div className="bg-muted p-8 rounded-xl mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Trending Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-lg text-center">
                <h3 className="text-lg font-medium mb-4">Most Discussed Topics</h3>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center justify-between">
                    <span>Economic Reforms</span>
                    <Badge>+245%</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Cricket World Cup</span>
                    <Badge>+178%</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>AI Advancements</span>
                    <Badge>+132%</Badge>
                  </li>
                </ul>
              </div>
              
              <div className="bg-card p-6 rounded-lg text-center">
                <h3 className="text-lg font-medium mb-4">Trending Regions</h3>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center justify-between">
                    <span>Delhi NCR</span>
                    <Badge variant="outline">32%</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Mumbai</span>
                    <Badge variant="outline">27%</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Bangalore</span>
                    <Badge variant="outline">18%</Badge>
                  </li>
                </ul>
              </div>
              
              <div className="bg-card p-6 rounded-lg text-center">
                <h3 className="text-lg font-medium mb-4">Reading Time</h3>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-4xl font-bold text-primary mb-2">6.4</div>
                  <div className="text-muted-foreground">Minutes average</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrendingPage;
