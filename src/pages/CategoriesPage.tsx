
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ChevronRight, Newspaper, BriefcaseBusiness, Cpu, Gamepad2, FileVideo2, Globe, BookOpen, Mountains, MapPin, Heart, Landmark, GraduationCap, Bike, ShoppingBag, Building, Music, PanelTop } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

// Define category structure with subcategories
const categories = [
  {
    id: "politics",
    name: "Politics",
    description: "Government, elections, and political developments",
    icon: <Landmark className="h-6 w-6" />,
    color: "from-blue-500 to-blue-700",
    subcategories: ["National", "Regional", "International", "Elections", "Policy"]
  },
  {
    id: "business",
    name: "Business",
    description: "Economy, markets, and corporate news",
    icon: <BriefcaseBusiness className="h-6 w-6" />,
    color: "from-green-500 to-green-700",
    subcategories: ["Economy", "Markets", "Companies", "Startups", "Finance"]
  },
  {
    id: "technology",
    name: "Technology",
    description: "Latest in tech, gadgets, and digital trends",
    icon: <Cpu className="h-6 w-6" />,
    color: "from-purple-500 to-purple-700",
    subcategories: ["Mobile", "Internet", "Gadgets", "AI", "Cybersecurity"]
  },
  {
    id: "sports",
    name: "Sports",
    description: "Cricket, football, and all sporting events",
    icon: <Gamepad2 className="h-6 w-6" />,
    color: "from-red-500 to-red-700",
    subcategories: ["Cricket", "Football", "Tennis", "Athletics", "Other Sports"]
  },
  {
    id: "entertainment",
    name: "Entertainment",
    description: "Bollywood, Hollywood, TV, and streaming",
    icon: <FileVideo2 className="h-6 w-6" />,
    color: "from-yellow-500 to-yellow-700",
    subcategories: ["Bollywood", "Hollywood", "Television", "Music", "Streaming"]
  },
  {
    id: "health",
    name: "Health",
    description: "Medical news, wellness, and healthcare",
    icon: <Heart className="h-6 w-6" />,
    color: "from-pink-500 to-pink-700",
    subcategories: ["Medicine", "Wellness", "Fitness", "Mental Health", "Nutrition"]
  },
  {
    id: "education",
    name: "Education",
    description: "Schools, universities, and learning trends",
    icon: <GraduationCap className="h-6 w-6" />,
    color: "from-indigo-500 to-indigo-700",
    subcategories: ["Schools", "Higher Education", "Exams", "Study Abroad", "E-learning"]
  },
  {
    id: "science",
    name: "Science",
    description: "Scientific discoveries and research news",
    icon: <PanelTop className="h-6 w-6" />,
    color: "from-teal-500 to-teal-700",
    subcategories: ["Physics", "Space", "Biology", "Environment", "Research"]
  },
  {
    id: "travel",
    name: "Travel",
    description: "Destinations, tourism, and travel guides",
    icon: <MapPin className="h-6 w-6" />,
    color: "from-orange-500 to-orange-700",
    subcategories: ["Destinations", "Tourism", "Adventure", "Budget Travel", "Hotels"]
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    description: "Fashion, food, and modern living",
    icon: <ShoppingBag className="h-6 w-6" />,
    color: "from-emerald-500 to-emerald-700",
    subcategories: ["Fashion", "Food", "Relationships", "Home", "Luxury"]
  },
  {
    id: "culture",
    name: "Culture",
    description: "Arts, literature, and cultural events",
    icon: <BookOpen className="h-6 w-6" />,
    color: "from-amber-500 to-amber-700",
    subcategories: ["Arts", "Literature", "Heritage", "Festivals", "Religion"]
  },
  {
    id: "automotive",
    name: "Automotive",
    description: "Cars, bikes, and transportation news",
    icon: <Bike className="h-6 w-6" />,
    color: "from-slate-500 to-slate-700",
    subcategories: ["Cars", "Bikes", "Reviews", "Electric Vehicles", "Industry"]
  },
  {
    id: "real-estate",
    name: "Real Estate",
    description: "Property market and housing trends",
    icon: <Building className="h-6 w-6" />,
    color: "from-cyan-500 to-cyan-700",
    subcategories: ["Residential", "Commercial", "Market Trends", "Investments", "Architecture"]
  },
  {
    id: "world",
    name: "World",
    description: "International news from around the globe",
    icon: <Globe className="h-6 w-6" />,
    color: "from-blue-400 to-blue-600",
    subcategories: ["Asia", "Europe", "Americas", "Middle East", "Africa", "Oceania"]
  }
];

const CategoriesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.subcategories.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <Helmet>
        <title>Categories - HindPrabhari</title>
        <meta 
          name="description" 
          content="Browse all news categories on HindPrabhari. Find the latest news in politics, business, technology, sports, entertainment, and more."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Categories</h1>
          <p className="text-muted-foreground max-w-3xl">
            Explore our comprehensive collection of news categories. From politics and business to entertainment and lifestyle, find the topics that interest you most.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search categories..."
              className="pl-10 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div key={category.id} className="rounded-xl border bg-card overflow-hidden hover:shadow-md transition-shadow">
              <div className={`h-20 bg-gradient-to-r ${category.color} flex items-center px-6`}>
                <div className="bg-white/20 p-3 rounded-full">
                  {category.icon}
                </div>
                <h2 className="text-xl font-bold ml-4 text-white">{category.name}</h2>
              </div>
              
              <div className="p-6">
                <p className="text-muted-foreground mb-4">{category.description}</p>
                
                {/* Subcategories */}
                <div className="space-y-2">
                  {category.subcategories.map((subcategory) => (
                    <Link 
                      key={`${category.id}-${subcategory}`}
                      to={`/categories/${category.id.toLowerCase()}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex items-center text-sm hover:text-primary transition-colors"
                    >
                      <ChevronRight className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span>{subcategory}</span>
                    </Link>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/categories/${category.id.toLowerCase()}`}>
                      Browse All {category.name}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No categories found</h3>
            <p className="text-muted-foreground mb-4">Try a different search term</p>
            <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoriesPage;
