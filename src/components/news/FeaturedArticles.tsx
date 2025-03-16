
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../ui/card";
import { cn } from "@/lib/utils";

// Sample featured articles data
const featuredArticlesData = [
  {
    id: 1,
    title: "Digital India: The Next Frontier of Technology Innovation",
    excerpt: "How India is becoming a global tech powerhouse with innovative startups and digital infrastructure.",
    category: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=800&auto=format&fit=crop",
    gradient: "from-blue-400 to-indigo-500"
  },
  {
    id: 2,
    title: "Parliamentary Sessions: Key Bills Being Discussed",
    excerpt: "An overview of the important legislation currently being debated in the ongoing parliament session.",
    category: "Politics",
    imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&auto=format&fit=crop",
    gradient: "from-orange-400 to-red-500"
  },
  {
    id: 3,
    title: "Cricket World Cup Preparations in Full Swing",
    excerpt: "Team India's strategy and training regime ahead of the upcoming world championship.",
    category: "Sports",
    imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop",
    gradient: "from-green-400 to-emerald-500"
  },
  {
    id: 4,
    title: "Bollywood's New Wave: Independent Cinema Rising",
    excerpt: "How independent filmmakers are reshaping the landscape of Indian cinema with fresh narratives.",
    category: "Entertainment",
    imageUrl: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&auto=format&fit=crop",
    gradient: "from-purple-400 to-pink-500"
  }
];

const FeaturedArticles = () => {
  const [visibleArticles, setVisibleArticles] = useState<number[]>([]);

  useEffect(() => {
    // Staggered animation for articles appearing
    const timer = setTimeout(() => {
      featuredArticlesData.forEach((_, index) => {
        setTimeout(() => {
          setVisibleArticles(prev => [...prev, index]);
        }, index * 200);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Featured Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredArticlesData.map((article, index) => (
          <Card 
            key={article.id}
            className={cn(
              "overflow-hidden transition-all duration-500 hover:shadow-lg relative group",
              visibleArticles.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {/* Hover glow effect */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${article.gradient} blur-xl -z-10 transition-opacity duration-500`}></div>
            
            <div className="relative h-48 overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${article.gradient} opacity-50`}></div>
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
              <h3 className="font-bold text-lg mb-2 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-3">
                {article.excerpt}
              </p>
            </CardContent>
            
            <CardFooter>
              <Link 
                to={`/article/${article.id}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                Read Full Story
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedArticles;
