
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../ui/card";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { ArrowRight } from "lucide-react";
import { SegmentedButton } from "@/components/ui/segmented-button";
import { EnhancedTooltip, EnhancedTooltipContent, EnhancedTooltipProvider, EnhancedTooltipTrigger } from "@/components/ui/enhanced-tooltip";

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
    }
  ]
};

const FeaturedArticles = () => {
  const [visibleArticles, setVisibleArticles] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<string>("technology");
  const categories = Object.keys(trendingArticlesData);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const categoryOptions = categories.map(category => ({
    value: category,
    label: category.charAt(0).toUpperCase() + category.slice(1)
  }));

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

  return (
    <div id="trending" className="py-8">
      <div className="flex justify-center mb-6">
        <SegmentedButton
          options={categoryOptions}
          value={activeTab}
          onChange={setActiveTab}
          className="shadow-sm"
          size="default"
        />
      </div>

      <EnhancedTooltipProvider>
        {categories.map((category) => (
          <div 
            key={category} 
            className={`${activeTab === category ? "block" : "hidden"} mt-6`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingArticlesData[category as keyof typeof trendingArticlesData].map((article, index) => (
                <Card 
                  key={article.id}
                  className={cn(
                    "overflow-hidden transition-all duration-500 hover:shadow-lg relative group",
                    visibleArticles.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                >
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${article.gradient} blur-xl -z-10 transition-opacity duration-500`}></div>
                  
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
                      {article.category}
                    </div>
                  </div>
                  
                  <CardContent className="pt-4">
                    <EnhancedTooltip>
                      <EnhancedTooltipTrigger asChild>
                        <h3 className="font-bold text-lg mb-2 line-clamp-2 cursor-help">
                          {article.title}
                        </h3>
                      </EnhancedTooltipTrigger>
                      <EnhancedTooltipContent variant="rich" title="Article Summary">
                        {article.excerpt}
                        <p className="mt-1 text-xs text-muted-foreground">Click to read the full story</p>
                      </EnhancedTooltipContent>
                    </EnhancedTooltip>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {article.excerpt}
                    </p>
                  </CardContent>
                  
                  <CardFooter>
                    <Link 
                      to={`/article/${article.id}`}
                      className="text-sm font-medium text-primary hover:underline flex items-center"
                    >
                      Read Full Story <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </EnhancedTooltipProvider>
    </div>
  );
};

export default FeaturedArticles;
