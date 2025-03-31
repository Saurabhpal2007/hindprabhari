
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
    icon: <Briefcase className="h-8 w-8" />,
    gradient: "from-orange-400 to-red-500",
    description: "Latest political developments and policy updates"
  },
  {
    id: "technology",
    name: "Technology",
    icon: <Cpu className="h-8 w-8" />,
    gradient: "from-blue-400 to-indigo-500",
    description: "Innovation, startups, and digital transformation"
  },
  {
    id: "sports",
    name: "Sports",
    icon: <Trophy className="h-8 w-8" />,
    gradient: "from-green-400 to-emerald-500",
    description: "Cricket, football, and all sporting events"
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: <Film className="h-8 w-8" />,
    gradient: "from-purple-400 to-pink-500",
    description: "Bollywood, OTT, and celebrity news"
  },
  {
    id: "education",
    name: "Education",
    icon: <GraduationCap className="h-8 w-8" />,
    gradient: "from-yellow-400 to-amber-500",
    description: "Educational policies and academic updates"
  },
  {
    id: "health",
    name: "Health",
    icon: <Heart className="h-8 w-8" />,
    gradient: "from-rose-400 to-red-500",
    description: "Healthcare innovations and wellness tips"
  },
  {
    id: "world",
    name: "World",
    icon: <Globe className="h-8 w-8" />,
    gradient: "from-sky-400 to-blue-500",
    description: "International news and global affairs"
  },
  {
    id: "business",
    name: "Business",
    icon: <TrendingUp className="h-8 w-8" />,
    gradient: "from-teal-400 to-emerald-500",
    description: "Economy, markets, and business news"
  }
];

const CategoryCards = () => {
  const [visibleCategories, setVisibleCategories] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    // Staggered animation for categories appearing
    categories.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCategories(prev => [...prev, index]);
      }, index * 100);
    });
    
    // Setup hash navigation to scroll to specific category
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.includes("category-")) {
        const categoryId = hash.replace("#category-", "");
        setActiveCategory(categoryId);
        const categoryElement = document.getElementById(categoryId);
        if (categoryElement) {
          setTimeout(() => {
            categoryElement.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    };
    
    window.addEventListener("hashchange", handleHashChange);
    
    // Check for hash on initial load
    if (window.location.hash && window.location.hash.includes("category-")) {
      handleHashChange();
    }
    
    // Listen for scroll events to highlight active category
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Find which category is currently most visible
      categories.forEach(category => {
        const element = document.getElementById(category.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            setActiveCategory(category.id);
          }
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category, index) => (
        <div id={category.id} key={category.id}>
          <Link 
            to={`/${category.id}`}
            className={cn(
              "block rounded-2xl overflow-hidden transition-all duration-500 transform hover:scale-102 bg-card border hover:shadow-lg relative h-full",
              visibleCategories.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              activeCategory === category.id ? "ring-2 ring-primary ring-offset-2" : ""
            )}
          >
            {/* Hidden gradient background that appears on hover */}
            <div 
              className={cn(
                `absolute inset-0 opacity-0 bg-gradient-to-br ${category.gradient} transition-opacity duration-300`,
                "group-hover:opacity-100"
              )}
            ></div>
            
            <div className="relative z-10 p-6 h-full group">
              <div className={cn(
                "mx-auto flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-colors",
                `bg-${category.gradient.split('-')[1]}-100/20 text-${category.gradient.split('-')[2].split(' ')[0]}-500`,
                "group-hover:bg-white/10 group-hover:text-white"
              )}>
                {category.icon}
              </div>
              
              <h3 className="font-bold mb-2 text-lg text-center transition-colors group-hover:text-white">
                {category.name}
              </h3>
              
              <p className="text-sm text-muted-foreground text-center transition-colors group-hover:text-white/80">
                {category.description}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CategoryCards;
