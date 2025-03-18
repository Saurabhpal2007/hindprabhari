
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../ui/card";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample trending articles data
const trendingArticlesData = {
  technology: [
    {
      id: 1,
      title: "Digital India: The Next Frontier of Technology Innovation",
      excerpt: "How India is becoming a global tech powerhouse with innovative startups and digital infrastructure.",
      category: "Technology",
      imageUrl: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=800&auto=format&fit=crop",
      gradient: "from-blue-400 to-indigo-500"
    },
    {
      id: 5,
      title: "AI Revolution in Indian Healthcare Sector",
      excerpt: "Artificial Intelligence is transforming healthcare accessibility across rural India.",
      category: "Technology",
      imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop",
      gradient: "from-blue-400 to-indigo-500"
    },
    {
      id: 9,
      title: "India's Semiconductor Push: Building a Tech Ecosystem",
      excerpt: "Government initiatives are aiming to establish India as a global semiconductor hub.",
      category: "Technology",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
      gradient: "from-blue-400 to-indigo-500"
    },
    {
      id: 13,
      title: "The Growing Digital Payments Revolution",
      excerpt: "How UPI and other payment innovations are transforming India's economy.",
      category: "Technology",
      imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop",
      gradient: "from-blue-400 to-indigo-500"
    }
  ],
  politics: [
    {
      id: 2,
      title: "Parliamentary Sessions: Key Bills Being Discussed",
      excerpt: "An overview of the important legislation currently being debated in the ongoing parliament session.",
      category: "Politics",
      imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&auto=format&fit=crop",
      gradient: "from-orange-400 to-red-500"
    },
    {
      id: 6,
      title: "Electoral Reforms Committee Submits Report",
      excerpt: "The committee has proposed significant changes to the electoral process.",
      category: "Politics",
      imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop",
      gradient: "from-orange-400 to-red-500"
    },
    {
      id: 10,
      title: "Foreign Policy Shifts: India's New Global Positioning",
      excerpt: "Analysis of India's changing approach to international diplomacy and strategic partnerships.",
      category: "Politics",
      imageUrl: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&auto=format&fit=crop",
      gradient: "from-orange-400 to-red-500"
    },
    {
      id: 14,
      title: "State Elections: Key Battlegrounds to Watch",
      excerpt: "A look at the upcoming state elections and their national implications.",
      category: "Politics",
      imageUrl: "https://images.unsplash.com/photo-1565945887714-d5139f4eb0ce?w=800&auto=format&fit=crop",
      gradient: "from-orange-400 to-red-500"
    }
  ],
  sports: [
    {
      id: 3,
      title: "Cricket World Cup Preparations in Full Swing",
      excerpt: "Team India's strategy and training regime ahead of the upcoming world championship.",
      category: "Sports",
      imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      id: 7,
      title: "Indian Athletes Set New Records in Commonwealth Games",
      excerpt: "Historic performance by Indian contingent with record medal haul.",
      category: "Sports",
      imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      id: 11,
      title: "Badminton Stars: The Rise of Indian Champions",
      excerpt: "How India became a global powerhouse in badminton through systematic training.",
      category: "Sports",
      imageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      id: 15,
      title: "Football Development Programs Gain Momentum",
      excerpt: "Initiatives to develop grassroots football talent across India.",
      category: "Sports",
      imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?w=800&auto=format&fit=crop",
      gradient: "from-green-400 to-emerald-500"
    }
  ],
  entertainment: [
    {
      id: 4,
      title: "Bollywood's New Wave: Independent Cinema Rising",
      excerpt: "How independent filmmakers are reshaping the landscape of Indian cinema with fresh narratives.",
      category: "Entertainment",
      imageUrl: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&auto=format&fit=crop",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      id: 8,
      title: "OTT Platforms Revolutionizing Indian Entertainment",
      excerpt: "Digital streaming services are creating unprecedented opportunities for content creators.",
      category: "Entertainment",
      imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      id: 12,
      title: "Indian Music Scene: Fusion Genres Making Waves",
      excerpt: "How traditional Indian music is blending with global genres to create new sounds.",
      category: "Entertainment",
      imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&auto=format&fit=crop",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      id: 16,
      title: "Regional Cinema: The New Global Ambassador",
      excerpt: "How films from South India and other regions are gaining international recognition.",
      category: "Entertainment",
      imageUrl: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=800&auto=format&fit=crop",
      gradient: "from-purple-400 to-pink-500"
    }
  ]
};

const FeaturedArticles = () => {
  const [visibleArticles, setVisibleArticles] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<string>("technology");
  const categories = Object.keys(trendingArticlesData);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Reset visible articles when tab changes
    setVisibleArticles([]);
    
    // Staggered animation for articles appearing
    const timer = setTimeout(() => {
      const currentArticles = trendingArticlesData[activeTab as keyof typeof trendingArticlesData];
      currentArticles.forEach((_, index) => {
        setTimeout(() => {
          setVisibleArticles(prev => [...prev, index]);
        }, index * 200);
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [activeTab]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div id="trending" className="py-4">
      <Tabs defaultValue="technology" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <ScrollArea className="max-w-[70%]">
            <TabsList className="inline-flex">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="text-sm capitalize"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          
          {!isMobile && (
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={scrollLeft}
                className="rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={scrollRight}
                className="rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-2">
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto pb-6 gap-4 scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {trendingArticlesData[category as keyof typeof trendingArticlesData].map((article, index) => (
                <Card 
                  key={article.id}
                  className={cn(
                    "min-w-[280px] max-w-[280px] md:min-w-[320px] md:max-w-[320px] flex-shrink-0 snap-start",
                    "overflow-hidden transition-all duration-500 hover:shadow-lg relative group",
                    visibleArticles.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:opacity-20"></div>
                    <div className="absolute top-2 right-2 bg-primary/80 text-white text-xs font-bold px-2 py-1 rounded">
                      {article.category}
                    </div>
                  </div>
                  
                  <CardContent className="pt-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {article.excerpt}
                    </p>
                  </CardContent>
                  
                  <CardFooter>
                    <Link 
                      to={`/article/${article.id}`}
                      className="text-sm font-medium text-primary hover:underline flex items-center"
                    >
                      Read Full Story
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default FeaturedArticles;
