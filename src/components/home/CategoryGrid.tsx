
import React from "react";
import { Link } from "react-router-dom";
import { 
  NewspaperIcon, 
  ChipIcon, 
  HeartIcon, 
  CurrencyRupeeIcon, 
  FilmIcon, 
  DotsHorizontalIcon 
} from "@heroicons/react/outline";
import { ChevronRight } from "lucide-react";

interface CategoryCard {
  title: string;
  icon: React.ElementType;
  description: string;
  path: string;
  gradient: string;
}

const categories: CategoryCard[] = [
  {
    title: "Politics",
    icon: NewspaperIcon,
    description: "Latest political updates and analysis",
    path: "/india/politics",
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    title: "Technology",
    icon: ChipIcon,
    description: "Innovation and digital transformation",
    path: "/technology",
    gradient: "from-green-400 to-emerald-500"
  },
  {
    title: "Health",
    icon: HeartIcon,
    description: "Wellness and healthcare news",
    path: "/health",
    gradient: "from-red-400 to-rose-500"
  },
  {
    title: "Economy",
    icon: CurrencyRupeeIcon,
    description: "Business and finance updates",
    path: "/business",
    gradient: "from-amber-400 to-yellow-500"
  },
  {
    title: "Entertainment",
    icon: FilmIcon,
    description: "Movies, music, and celebrity news",
    path: "/entertainment",
    gradient: "from-purple-400 to-pink-500"
  },
  {
    title: "More Categories",
    icon: DotsHorizontalIcon,
    description: "Explore all our news sections",
    path: "/categories",
    gradient: "from-gray-400 to-gray-600"
  }
];

const CategoryGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {categories.map((category) => (
        <Link 
          to={category.path} 
          key={category.title}
          className="group relative overflow-hidden rounded-xl shadow-md transition-all hover:shadow-lg"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
          
          <div className="relative p-6 text-white flex flex-col h-full min-h-[150px]">
            <category.icon className="w-8 h-8 mb-3" />
            
            <h3 className="text-lg font-bold mb-1">{category.title}</h3>
            <p className="text-sm opacity-90 mb-4">{category.description}</p>
            
            <div className="mt-auto flex items-center text-xs font-medium">
              <span>Explore</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;
