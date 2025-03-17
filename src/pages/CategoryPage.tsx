
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookmark, Calendar, Clock, Eye, MessageSquare, Share2 } from "lucide-react";
import { useToast } from "../components/ui/use-toast";

// Sample article data
const articles = {
  politics: [
    {
      id: "pol-1",
      title: "New Policy Reform Announced by Government",
      excerpt: "Government launches comprehensive policy reform addressing various sectors including education, healthcare, and infrastructure.",
      date: "2023-05-15",
      readTime: "5 min",
      author: "Rahul Sharma",
      views: 1245,
      image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?ixlib=rb-4.0.3"
    },
    {
      id: "pol-2",
      title: "Parliament Debates New Economic Measures",
      excerpt: "Members of Parliament engage in heated debate over proposed economic measures aimed at boosting growth.",
      date: "2023-05-10",
      readTime: "4 min",
      author: "Priya Singh",
      views: 890,
      image: "https://images.unsplash.com/photo-1575320181282-9afab399332c?ixlib=rb-4.0.3"
    },
    {
      id: "pol-3",
      title: "Election Commission Announces Poll Dates",
      excerpt: "The Election Commission has released the schedule for upcoming state assembly elections in five states.",
      date: "2023-05-05",
      readTime: "3 min",
      author: "Anand Kumar",
      views: 1560,
      image: "https://images.unsplash.com/photo-1581025026888-77f223d2e352?ixlib=rb-4.0.3"
    },
    {
      id: "pol-4",
      title: "International Relations: PM's Foreign Visit",
      excerpt: "Prime Minister concludes successful diplomatic visit to neighboring countries, signs multiple agreements.",
      date: "2023-04-28",
      readTime: "6 min",
      author: "Meera Desai",
      views: 1125,
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3"
    }
  ],
  technology: [
    {
      id: "tech-1",
      title: "New AI Model Breaks Performance Records",
      excerpt: "Researchers unveil groundbreaking AI model that sets new benchmarks in natural language processing and computer vision tasks.",
      date: "2023-05-17",
      readTime: "4 min",
      author: "Vikram Iyer",
      views: 2150,
      image: "https://images.unsplash.com/photo-1675271591211-da39259b686a?ixlib=rb-4.0.3"
    },
    {
      id: "tech-2",
      title: "Indian Startup Launches Revolutionary EV Battery",
      excerpt: "Bangalore-based startup develops battery technology promising 50% more range and faster charging for electric vehicles.",
      date: "2023-05-12",
      readTime: "5 min",
      author: "Kavita Reddy",
      views: 1850,
      image: "https://images.unsplash.com/photo-1554744512-d6c603f27c54?ixlib=rb-4.0.3"
    },
    {
      id: "tech-3",
      title: "Digital India Program Reaches New Milestone",
      excerpt: "Government's Digital India initiative achieves significant milestone with 1 billion digital transactions in a month.",
      date: "2023-05-08",
      readTime: "3 min",
      author: "Rajiv Mehta",
      views: 1320,
      image: "https://images.unsplash.com/photo-1661956601349-f2c9b3c47d16?ixlib=rb-4.0.3"
    }
  ],
  sports: [
    {
      id: "sport-1",
      title: "Indian Cricket Team Announces Squad for World Cup",
      excerpt: "Selectors reveal 15-member squad for upcoming Cricket World Cup with some surprise inclusions and exclusions.",
      date: "2023-05-18",
      readTime: "4 min",
      author: "Suresh Menon",
      views: 3500,
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3"
    },
    {
      id: "sport-2",
      title: "National Badminton Championships Conclude",
      excerpt: "Young talents shine at National Badminton Championships, showcasing promising future for Indian badminton.",
      date: "2023-05-14",
      readTime: "3 min",
      author: "Deepa Sharma",
      views: 1250,
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3"
    }
  ],
  entertainment: [
    {
      id: "ent-1",
      title: "Bollywood Blockbuster Breaks Box Office Records",
      excerpt: "Latest release from top director-actor duo shatters all previous box office records in opening weekend.",
      date: "2023-05-16",
      readTime: "4 min",
      author: "Neha Kapoor",
      views: 4200,
      image: "https://images.unsplash.com/photo-1616469829941-c7200edec809?ixlib=rb-4.0.3"
    },
    {
      id: "ent-2",
      title: "Music Festival Announces Star-Studded Lineup",
      excerpt: "Annual music festival returns with impressive roster of national and international artists set to perform.",
      date: "2023-05-11",
      readTime: "3 min",
      author: "Arjun Mathur",
      views: 1890,
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3"
    }
  ],
  education: [
    {
      id: "edu-1",
      title: "NEP 2020: Implementation Progress Report",
      excerpt: "Ministry releases comprehensive report on implementation status of National Education Policy across states.",
      date: "2023-05-17",
      readTime: "6 min",
      author: "Anita Desai",
      views: 1780,
      image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3"
    },
    {
      id: "edu-2",
      title: "IITs Announce Joint Research Initiative",
      excerpt: "Premier technical institutes collaborate on multi-disciplinary research projects with industry partners.",
      date: "2023-05-13",
      readTime: "4 min",
      author: "Sanjay Gupta",
      views: 1560,
      image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3"
    }
  ],
  health: [
    {
      id: "health-1",
      title: "New Medical Research Breakthrough in Cancer Treatment",
      excerpt: "Indian scientists develop promising new approach to targeted cancer therapy with reduced side effects.",
      date: "2023-05-18",
      readTime: "5 min",
      author: "Dr. Rajan Patel",
      views: 2340,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3"
    },
    {
      id: "health-2",
      title: "Nationwide Health Campaign Launched",
      excerpt: "Government initiates comprehensive health awareness program focusing on preventive care and early detection.",
      date: "2023-05-12",
      readTime: "4 min",
      author: "Dr. Sunita Rao",
      views: 1890,
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3"
    }
  ],
  world: [
    {
      id: "world-1",
      title: "Global Summit on Climate Change Concludes",
      excerpt: "World leaders agree on ambitious targets to reduce carbon emissions and increase renewable energy adoption.",
      date: "2023-05-16",
      readTime: "6 min",
      author: "Michael Chang",
      views: 2150,
      image: "https://images.unsplash.com/photo-1564594985645-4427056e22e2?ixlib=rb-4.0.3"
    },
    {
      id: "world-2",
      title: "International Trade Agreement Signed",
      excerpt: "Major economies finalize comprehensive trade deal promising boost to global commerce and supply chains.",
      date: "2023-05-10",
      readTime: "5 min",
      author: "Sarah Johnson",
      views: 1760,
      image: "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?ixlib=rb-4.0.3"
    }
  ],
  business: [
    {
      id: "biz-1",
      title: "Stock Market Hits All-Time High",
      excerpt: "Sensex and Nifty reach historic levels driven by strong corporate earnings and positive economic indicators.",
      date: "2023-05-17",
      readTime: "4 min",
      author: "Rahul Nair",
      views: 3120,
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3"
    },
    {
      id: "biz-2",
      title: "Major Merger Creates Industry Giant",
      excerpt: "Two leading companies complete merger creating new powerhouse in technology services sector.",
      date: "2023-05-14",
      readTime: "5 min",
      author: "Priya Mehta",
      views: 2450,
      image: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?ixlib=rb-4.0.3"
    }
  ],
};

// Map for category display names
const categoryDisplayNames = {
  politics: "Politics",
  technology: "Technology",
  sports: "Sports",
  entertainment: "Entertainment",
  education: "Education",
  health: "Health",
  world: "World",
  business: "Business",
};

const CategoryPage = () => {
  const { category } = useParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("latest");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [category]);

  // Determine which articles to show based on category
  const categoryArticles = category && articles[category as keyof typeof articles] 
    ? articles[category as keyof typeof articles] 
    : [];

  const displayName = category && categoryDisplayNames[category as keyof typeof categoryDisplayNames] 
    ? categoryDisplayNames[category as keyof typeof categoryDisplayNames]
    : category;

  const handleBookmark = (articleId: string) => {
    toast({
      title: "Article Bookmarked",
      description: "This article has been saved to your bookmarks.",
    });
  };

  const handleShare = (articleId: string) => {
    toast({
      title: "Share Article",
      description: "Sharing options will be available soon.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{displayName}</h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Latest news, in-depth analysis, and comprehensive coverage from the world of {displayName?.toLowerCase()}.
              </p>
            </div>
          </div>

          <div className="container mx-auto py-8 px-4">
            <Tabs defaultValue="latest" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full md:w-auto mb-8">
                <TabsTrigger value="latest" className="text-sm md:text-base">Latest</TabsTrigger>
                <TabsTrigger value="popular" className="text-sm md:text-base">Most Read</TabsTrigger>
                <TabsTrigger value="trending" className="text-sm md:text-base">Trending</TabsTrigger>
                <TabsTrigger value="editor" className="text-sm md:text-base">Editor's Pick</TabsTrigger>
              </TabsList>
              
              <TabsContent value="latest" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                  {categoryArticles.length > 0 ? (
                    categoryArticles.map((article) => (
                      <Card key={article.id} className="hover-scale overflow-hidden h-full">
                        <div className="relative aspect-video overflow-hidden">
                          <img 
                            src={article.image} 
                            alt={article.title} 
                            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xl line-clamp-2">
                            <Link to={`/article/${article.id}`} className="hover:text-primary transition-colors">
                              {article.title}
                            </Link>
                          </CardTitle>
                          <div className="flex items-center text-sm text-muted-foreground space-x-2 mt-2">
                            <div className="flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              <span>{article.date}</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-muted-foreground/70"></div>
                            <div className="flex items-center">
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              <span>{article.readTime}</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-muted-foreground/70"></div>
                            <div className="flex items-center">
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              <span>{article.views}</span>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pb-2">
                          <CardDescription className="line-clamp-3">
                            {article.excerpt}
                          </CardDescription>
                        </CardContent>
                        
                        <CardFooter className="flex justify-between pt-0">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-muted-foreground hover:text-primary"
                            onClick={() => handleBookmark(article.id)}
                          >
                            <Bookmark className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-muted-foreground hover:text-primary"
                            onClick={() => handleShare(article.id)}
                          >
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-muted-foreground hover:text-primary"
                            asChild
                          >
                            <Link to={`/article/${article.id}#comments`}>
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Comment
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full py-12 text-center">
                      <h3 className="text-xl font-medium mb-2">No articles found</h3>
                      <p className="text-muted-foreground">
                        There are currently no articles in this category.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="popular" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                  {categoryArticles.length > 0 ? 
                    categoryArticles
                      .sort((a, b) => b.views - a.views)
                      .map((article) => (
                        <Card key={article.id} className="hover-scale overflow-hidden h-full">
                          <div className="relative aspect-video overflow-hidden">
                            <img 
                              src={article.image} 
                              alt={article.title} 
                              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                            />
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-xl line-clamp-2">
                              <Link to={`/article/${article.id}`} className="hover:text-primary transition-colors">
                                {article.title}
                              </Link>
                            </CardTitle>
                            <div className="flex items-center text-sm text-muted-foreground space-x-2 mt-2">
                              <div className="flex items-center">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                <span>{article.date}</span>
                              </div>
                              <div className="w-1 h-1 rounded-full bg-muted-foreground/70"></div>
                              <div className="flex items-center">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                <span>{article.readTime}</span>
                              </div>
                              <div className="w-1 h-1 rounded-full bg-muted-foreground/70"></div>
                              <div className="flex items-center">
                                <Eye className="h-3.5 w-3.5 mr-1" />
                                <span>{article.views}</span>
                              </div>
                            </div>
                          </CardHeader>
                          
                          <CardContent className="pb-2">
                            <CardDescription className="line-clamp-3">
                              {article.excerpt}
                            </CardDescription>
                          </CardContent>
                          
                          <CardFooter className="flex justify-between pt-0">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-muted-foreground hover:text-primary"
                              onClick={() => handleBookmark(article.id)}
                            >
                              <Bookmark className="h-4 w-4 mr-1" />
                              Save
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-muted-foreground hover:text-primary"
                              onClick={() => handleShare(article.id)}
                            >
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-muted-foreground hover:text-primary"
                              asChild
                            >
                              <Link to={`/article/${article.id}#comments`}>
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Comment
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))
                    : (
                      <div className="col-span-full py-12 text-center">
                        <h3 className="text-xl font-medium mb-2">No articles found</h3>
                        <p className="text-muted-foreground">
                          There are currently no articles in this category.
                        </p>
                      </div>
                    )}
                </div>
              </TabsContent>
              
              <TabsContent value="trending" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                  {categoryArticles.length > 0 ? 
                    categoryArticles
                      .slice()
                      .reverse()
                      .map((article) => (
                        <Card key={article.id} className="hover-scale overflow-hidden h-full">
                          <div className="relative aspect-video overflow-hidden">
                            <img 
                              src={article.image} 
                              alt={article.title} 
                              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                            />
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-xl line-clamp-2">
                              <Link to={`/article/${article.id}`} className="hover:text-primary transition-colors">
                                {article.title}
                              </Link>
                            </CardTitle>
                            <div className="flex items-center text-sm text-muted-foreground space-x-2 mt-2">
                              <div className="flex items-center">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                <span>{article.date}</span>
                              </div>
                              <div className="w-1 h-1 rounded-full bg-muted-foreground/70"></div>
                              <div className="flex items-center">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                <span>{article.readTime}</span>
                              </div>
                              <div className="w-1 h-1 rounded-full bg-muted-foreground/70"></div>
                              <div className="flex items-center">
                                <Eye className="h-3.5 w-3.5 mr-1" />
                                <span>{article.views}</span>
                              </div>
                            </div>
                          </CardHeader>
                          
                          <CardContent className="pb-2">
                            <CardDescription className="line-clamp-3">
                              {article.excerpt}
                            </CardDescription>
                          </CardContent>
                          
                          <CardFooter className="flex justify-between pt-0">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-muted-foreground hover:text-primary"
                              onClick={() => handleBookmark(article.id)}
                            >
                              <Bookmark className="h-4 w-4 mr-1" />
                              Save
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-muted-foreground hover:text-primary"
                              onClick={() => handleShare(article.id)}
                            >
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-muted-foreground hover:text-primary"
                              asChild
                            >
                              <Link to={`/article/${article.id}#comments`}>
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Comment
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))
                    : (
                      <div className="col-span-full py-12 text-center">
                        <h3 className="text-xl font-medium mb-2">No articles found</h3>
                        <p className="text-muted-foreground">
                          There are currently no articles in this category.
                        </p>
                      </div>
                    )}
                </div>
              </TabsContent>
              
              <TabsContent value="editor" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                  {categoryArticles.length > 0 ? 
                    categoryArticles
                      .filter((_, i) => i % 2 === 0) // Simulate editor's picks
                      .map((article) => (
                        <Card key={article.id} className="hover-scale overflow-hidden h-full">
                          <div className="relative aspect-video overflow-hidden">
                            <img 
                              src={article.image} 
                              alt={article.title} 
                              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                            />
                            <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 text-xs rounded-md font-medium">
                              Editor's Pick
                            </div>
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-xl line-clamp-2">
                              <Link to={`/article/${article.id}`} className="hover:text-primary transition-colors">
                                {article.title}
                              </Link>
                            </CardTitle>
                            <div className="flex items-center text-sm text-muted-foreground space-x-2 mt-2">
                              <div className="flex items-center">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                <span>{article.date}</span>
                              </div>
                              <div className="w-1 h-1 rounded-full bg-muted-foreground/70"></div>
                              <div className="flex items-center">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                <span>{article.readTime}</span>
                              </div>
                              <div className="w-1 h-1 rounded-full bg-muted-foreground/70"></div>
                              <div className="flex items-center">
                                <Eye className="h-3.5 w-3.5 mr-1" />
                                <span>{article.views}</span>
                              </div>
                            </div>
                          </CardHeader>
                          
                          <CardContent className="pb-2">
                            <CardDescription className="line-clamp-3">
                              {article.excerpt}
                            </CardDescription>
                          </CardContent>
                          
                          <CardFooter className="flex justify-between pt-0">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-muted-foreground hover:text-primary"
                              onClick={() => handleBookmark(article.id)}
                            >
                              <Bookmark className="h-4 w-4 mr-1" />
                              Save
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-muted-foreground hover:text-primary"
                              onClick={() => handleShare(article.id)}
                            >
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-muted-foreground hover:text-primary"
                              asChild
                            >
                              <Link to={`/article/${article.id}#comments`}>
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Comment
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))
                    : (
                      <div className="col-span-full py-12 text-center">
                        <h3 className="text-xl font-medium mb-2">No articles found</h3>
                        <p className="text-muted-foreground">
                          There are currently no articles in this category.
                        </p>
                      </div>
                    )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
