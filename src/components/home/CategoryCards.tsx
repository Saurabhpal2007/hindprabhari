
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Briefcase, 
  Cpu, 
  Trophy, 
  Film, 
  GraduationCap, 
  Heart, 
  Globe, 
  TrendingUp 
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: "politics",
    name: "Politics",
    icon: <Briefcase className="h-6 w-6" />,
    gradient: "from-orange-400 to-red-500",
    description: "Latest political developments and policy updates"
  },
  {
    id: "technology",
    name: "Technology",
    icon: <Cpu className="h-6 w-6" />,
    gradient: "from-blue-400 to-indigo-500",
    description: "Innovation, startups, and digital transformation"
  },
  {
    id: "sports",
    name: "Sports",
    icon: <Trophy className="h-6 w-6" />,
    gradient: "from-green-400 to-emerald-500",
    description: "Cricket, football, and all sporting events"
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: <Film className="h-6 w-6" />,
    gradient: "from-purple-400 to-pink-500",
    description: "Bollywood, OTT, and celebrity news"
  },
  {
    id: "education",
    name: "Education",
    icon: <GraduationCap className="h-6 w-6" />,
    gradient: "from-yellow-400 to-amber-500",
    description: "Educational policies and academic updates"
  },
  {
    id: "health",
    name: "Health",
    icon: <Heart className="h-6 w-6" />,
    gradient: "from-rose-400 to-red-500",
    description: "Healthcare innovations and wellness tips"
  },
  {
    id: "world",
    name: "World",
    icon: <Globe className="h-6 w-6" />,
    gradient: "from-sky-400 to-blue-500",
    description: "International news and global affairs"
  },
  {
    id: "business",
    name: "Business",
    icon: <TrendingUp className="h-6 w-6" />,
    gradient: "from-teal-400 to-emerald-500",
    description: "Economy, markets, and business news"
  }
];

const CategoryCards = () => {
  const [visibleCategories, setVisibleCategories] = useState<number[]>([]);

  useEffect(() => {
    // Staggered animation for categories appearing
    categories.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCategories(prev => [...prev, index]);
      }, index * 100);
    });
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {categories.map((category, index) => (
        <Link 
          key={category.id} 
          to={`/${category.id}`}
          className={cn(
            "relative rounded-xl p-6 overflow-hidden transition-all duration-500 transform hover:scale-105 bg-card hover:shadow-lg group",
            visibleCategories.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          {/* Gradient background that appears on hover */}
          <div 
            className={cn(
              `absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${category.gradient} transition-opacity duration-300`
            )}
          ></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className={cn(
              "p-3 rounded-full mb-4 bg-background/10 backdrop-blur-sm transition-colors group-hover:text-white"
            )}>
              {category.icon}
            </div>
            <h3 className="font-bold mb-1 transition-colors group-hover:text-white">
              {category.name}
            </h3>
            <p className="text-xs text-muted-foreground transition-colors group-hover:text-white/80">
              {category.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryCards;
