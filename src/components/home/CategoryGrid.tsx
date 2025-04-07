
import { Link } from "react-router-dom";
import { ChevronRight, Newspaper, BriefcaseBusiness, Cpu, Gamepad2, FileVideo2, Globe, SlidersHorizontal } from "lucide-react";

const categories = [
  {
    id: "politics",
    name: "Politics",
    description: "Latest political news and updates",
    icon: <Newspaper className="h-6 w-6" />,
    url: "/categories/politics",
    color: "from-blue-500 to-blue-700"
  },
  {
    id: "business",
    name: "Business",
    description: "Business news and market updates",
    icon: <BriefcaseBusiness className="h-6 w-6" />,
    url: "/categories/business",
    color: "from-green-500 to-green-700"
  },
  {
    id: "technology",
    name: "Technology",
    description: "Tech news and innovations",
    icon: <Cpu className="h-6 w-6" />,
    url: "/categories/technology",
    color: "from-purple-500 to-purple-700"
  },
  {
    id: "sports",
    name: "Sports",
    description: "Sports news and results",
    icon: <Gamepad2 className="h-6 w-6" />,
    url: "/categories/sports",
    color: "from-red-500 to-red-700"
  },
  {
    id: "entertainment",
    name: "Entertainment",
    description: "Movies, music, and more",
    icon: <FileVideo2 className="h-6 w-6" />,
    url: "/categories/entertainment",
    color: "from-yellow-500 to-yellow-700"
  },
  {
    id: "world",
    name: "World",
    description: "International news and events",
    icon: <Globe className="h-6 w-6" />,
    url: "/world",
    color: "from-indigo-500 to-indigo-700"
  },
  {
    id: "more",
    name: "More Categories",
    description: "Explore all news categories",
    icon: <SlidersHorizontal className="h-6 w-6" />,
    url: "/categories",
    color: "from-gray-600 to-gray-800"
  }
];

const CategoryGrid = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">News Categories</h2>
        <Link 
          to="/categories" 
          className="text-sm font-medium text-primary flex items-center hover:underline"
        >
          <span>View All Categories</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link 
            key={category.id} 
            to={category.url}
            className="group"
          >
            <div className={`h-full rounded-xl bg-gradient-to-br ${category.color} text-white p-6 hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-h-[160px]`}>
              <div className="mb-4">
                {category.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                <p className="text-sm text-white/80">{category.description}</p>
              </div>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center text-sm font-medium">
                  <span>Explore</span>
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
