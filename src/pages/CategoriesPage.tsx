
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CategoriesPage = () => {
  const categories = [
    {
      id: "politics",
      name: "Politics",
      description: "Latest political news, policy updates, and government affairs.",
      articles: 342,
      trending: "Election Commission Announces New Guidelines",
      image: "/placeholder.svg",
      color: "bg-red-100 dark:bg-red-900",
      textColor: "text-red-600 dark:text-red-400",
      borderColor: "border-red-200 dark:border-red-800"
    },
    {
      id: "technology",
      name: "Technology",
      description: "Innovations, digital trends, and tech industry developments.",
      articles: 256,
      trending: "New AI Chipset Breaks Performance Records",
      image: "/placeholder.svg",
      color: "bg-blue-100 dark:bg-blue-900",
      textColor: "text-blue-600 dark:text-blue-400",
      borderColor: "border-blue-200 dark:border-blue-800"
    },
    {
      id: "sports",
      name: "Sports",
      description: "Sports news, match results, player updates, and analysis.",
      articles: 189,
      trending: "Cricket: India Wins Test Series Against Australia",
      image: "/placeholder.svg",
      color: "bg-green-100 dark:bg-green-900",
      textColor: "text-green-600 dark:text-green-400",
      borderColor: "border-green-200 dark:border-green-800"
    },
    {
      id: "entertainment",
      name: "Entertainment",
      description: "Film, music, celebrity news, and culture updates.",
      articles: 275,
      trending: "National Film Awards Announced: Complete List",
      image: "/placeholder.svg",
      color: "bg-purple-100 dark:bg-purple-900",
      textColor: "text-purple-600 dark:text-purple-400",
      borderColor: "border-purple-200 dark:border-purple-800"
    },
    {
      id: "education",
      name: "Education",
      description: "Educational policies, academic developments, and learning resources.",
      articles: 148,
      trending: "New National Education Framework Released",
      image: "/placeholder.svg",
      color: "bg-yellow-100 dark:bg-yellow-900",
      textColor: "text-yellow-600 dark:text-yellow-400",
      borderColor: "border-yellow-200 dark:border-yellow-800"
    },
    {
      id: "health",
      name: "Health",
      description: "Health news, medical breakthroughs, and wellness advice.",
      articles: 182,
      trending: "Health Ministry Issues New Dietary Guidelines",
      image: "/placeholder.svg",
      color: "bg-teal-100 dark:bg-teal-900",
      textColor: "text-teal-600 dark:text-teal-400",
      borderColor: "border-teal-200 dark:border-teal-800"
    },
    {
      id: "world",
      name: "World",
      description: "International news, global affairs, and foreign policies.",
      articles: 213,
      trending: "UN Climate Summit: Nations Pledge Carbon Reduction",
      image: "/placeholder.svg",
      color: "bg-indigo-100 dark:bg-indigo-900",
      textColor: "text-indigo-600 dark:text-indigo-400",
      borderColor: "border-indigo-200 dark:border-indigo-800"
    },
    {
      id: "business",
      name: "Business",
      description: "Business news, economic updates, and market trends.",
      articles: 231,
      trending: "Stock Market Hits All-Time High Amid Economic Growth",
      image: "/placeholder.svg",
      color: "bg-orange-100 dark:bg-orange-900",
      textColor: "text-orange-600 dark:text-orange-400",
      borderColor: "border-orange-200 dark:border-orange-800"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8 text-center">News Categories</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link to={`/${category.id}`} key={category.id}>
                <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg border-2 ${category.borderColor} hover:-translate-y-1`}>
                  <div className="h-36 relative">
                    <div className={`absolute inset-0 ${category.color} opacity-30`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h2 className={`text-3xl font-bold ${category.textColor}`}>{category.name}</h2>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">{category.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="h-4 w-4 mr-1" />
                        <span>{category.articles} articles</span>
                      </div>
                      <Badge className="bg-primary/10 text-primary border-none">Active</Badge>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex items-start">
                        <TrendingUp className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Trending Now</div>
                          <p className="font-medium line-clamp-2">{category.trending}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="mt-16 bg-muted rounded-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Explore More Categories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Beyond our main categories, we also cover specialized topics to provide comprehensive news coverage across various domains
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Opinion", "Science", "Environment", "Culture", 
                "Travel", "Food", "Real Estate", "Automobiles"
              ].map((specialty, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  className="justify-start h-auto py-4"
                  asChild
                >
                  <Link to={`/${specialty.toLowerCase()}`}>
                    <span className="flex-1 text-left">{specialty}</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoriesPage;
