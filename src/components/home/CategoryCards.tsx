
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
    description: "Latest political developments and policy updates",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&auto=format&fit=crop"
  },
  {
    id: "technology",
    name: "Technology",
    icon: <Cpu className="h-8 w-8" />,
    gradient: "from-blue-400 to-indigo-500",
    description: "Innovation, startups, and digital transformation",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop"
  },
  {
    id: "sports",
    name: "Sports",
    icon: <Trophy className="h-8 w-8" />,
    gradient: "from-green-400 to-emerald-500",
    description: "Cricket, football, and all sporting events",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop"
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: <Film className="h-8 w-8" />,
    gradient: "from-purple-400 to-pink-500",
    description: "Bollywood, OTT, and celebrity news",
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&auto=format&fit=crop"
  },
  {
    id: "education",
    name: "Education",
    icon: <GraduationCap className="h-8 w-8" />,
    gradient: "from-yellow-400 to-amber-500",
    description: "Educational policies and academic updates",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop"
  },
  {
    id: "health",
    name: "Health",
    icon: <Heart className="h-8 w-8" />,
    gradient: "from-rose-400 to-red-500",
    description: "Healthcare innovations and wellness tips",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop"
  },
  {
    id: "world",
    name: "World",
    icon: <Globe className="h-8 w-8" />,
    gradient: "from-sky-400 to-blue-500",
    description: "International news and global affairs",
    image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800&auto=format&fit=crop"
  },
  {
    id: "business",
    name: "Business",
    icon: <TrendingUp className="h-8 w-8" />,
    gradient: "from-teal-400 to-emerald-500",
    description: "Economy, markets, and business news",
    image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=800&auto=format&fit=crop"
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {categories.map((category, index) => (
        <div id={category.id} key={category.id}>
          <Link 
            to={`/${category.id}`}
            className={cn(
              "relative rounded-xl overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-lg group block h-64",
              visibleCategories.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              activeCategory === category.id ? "ring-2 ring-primary ring-offset-2" : ""
            )}
          >
            {/* Background image */}
            <img 
              src={category.image} 
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay gradient */}
            <div 
              className={cn(
                `absolute inset-0 opacity-70 bg-gradient-to-b ${category.gradient} transition-opacity duration-300`
              )}
            ></div>
            
            <div className="relative z-10 flex flex-col items-center text-center h-full justify-center p-6">
              <div className="p-3 rounded-full mb-3 bg-white/20 backdrop-blur-sm">
                {category.icon}
              </div>
              <h3 className="font-bold mb-2 text-xl text-white">
                {category.name}
              </h3>
              <p className="text-sm text-white/90 max-w-[200px]">
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
