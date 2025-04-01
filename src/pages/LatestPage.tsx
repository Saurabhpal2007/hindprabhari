
import { useEffect, useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

const LatestPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Mock data for latest articles
  const latestArticles: Article[] = [
    {
      id: "1",
      title: "Supreme Court Issues New Directive on Environmental Policy",
      excerpt: "The Supreme Court has issued new guidelines for environmental protection that will impact industries nationwide.",
      category: "Politics",
      date: "2023-06-15",
      readTime: "5 min",
      image: "/placeholder.svg"
    },
    {
      id: "2",
      title: "Tech Giants Announce Collaboration on AI Ethics",
      excerpt: "Major technology companies have formed a coalition to establish ethical standards for artificial intelligence development.",
      category: "Technology",
      date: "2023-06-14",
      readTime: "4 min",
      image: "/placeholder.svg"
    },
    {
      id: "3",
      title: "National Cricket Team Prepares for World Cup",
      excerpt: "The cricket team has begun intensive training sessions ahead of the upcoming World Cup tournament.",
      category: "Sports",
      date: "2023-06-14",
      readTime: "3 min",
      image: "/placeholder.svg"
    },
    {
      id: "4",
      title: "Economic Growth Surpasses Expectations in Q2",
      excerpt: "The latest economic indicators show better than expected growth for the second quarter of the fiscal year.",
      category: "Business",
      date: "2023-06-13",
      readTime: "6 min",
      image: "/placeholder.svg"
    },
    {
      id: "5",
      title: "New Health Policy Aims to Improve Rural Healthcare Access",
      excerpt: "The government has announced a new health policy focused on bringing quality healthcare to rural areas.",
      category: "Health",
      date: "2023-06-12",
      readTime: "4 min",
      image: "/placeholder.svg"
    },
    {
      id: "6",
      title: "Educational Reforms to Focus on Skill Development",
      excerpt: "The Ministry of Education has outlined new reforms that emphasize practical skills and vocational training.",
      category: "Education",
      date: "2023-06-11",
      readTime: "5 min",
      image: "/placeholder.svg"
    },
    {
      id: "7",
      title: "International Summit on Climate Change Begins",
      excerpt: "Leaders from around the world gather to discuss urgent measures to combat climate change.",
      category: "World",
      date: "2023-06-10",
      readTime: "7 min",
      image: "/placeholder.svg"
    },
    {
      id: "8",
      title: "Cultural Festival Celebrates Regional Diversity",
      excerpt: "A weeklong festival showcasing the rich cultural heritage of different regions begins today.",
      category: "Entertainment",
      date: "2023-06-09",
      readTime: "3 min",
      image: "/placeholder.svg"
    }
  ];

  // Format date function - this was causing the TS error
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", { 
      day: "numeric", 
      month: "short", 
      year: "numeric" 
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Latest News</h1>
            <p className="text-muted-foreground">
              Stay updated with the most recent news and developments from across Bharat and the world.
            </p>
          </div>
          
          <Separator className="my-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Skeleton loading state
              Array(6).fill(0).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardHeader>
                    <Skeleton className="h-4 w-1/3 mb-2" />
                    <Skeleton className="h-6 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))
            ) : (
              // Actual content
              latestArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                    <Badge className="absolute top-2 right-2 bg-primary">{article.category}</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{formatDate(article.date)} • {article.readTime} read</span>
                    </div>
                    <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                      <Link to={`/article/${article.id}`}>{article.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/article/${article.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
          
          <div className="mt-12 flex justify-center">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LatestPage;
