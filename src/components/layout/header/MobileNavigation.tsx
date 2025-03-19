
import { Home, TrendingUp, Clock, Grid, Mail, Search, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

interface CategoryItem {
  name: string;
  path: string;
  id: string;
}

interface MobileNavigationProps {
  categories: CategoryItem[];
  scrollToSection: (sectionId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  isOpen: boolean;
}

const MobileNavigation = ({ 
  categories, 
  scrollToSection, 
  searchQuery, 
  setSearchQuery, 
  handleSearch, 
  isOpen 
}: MobileNavigationProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-background/95 backdrop-blur-md border-t">
      <div className="container mx-auto px-4 py-4">
        <form onSubmit={handleSearch} className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search news..."
            className="w-full pl-10 h-10 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <nav className="flex flex-col space-y-4">
          <Link to="/" className="w-full">
            <Button 
              variant="ghost"
              className="justify-start px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-lg w-full" 
            >
              <Home className="mr-2 h-5 w-5" />
              Home
            </Button>
          </Link>
          
          <Link to="/" className="w-full">
            <Button 
              variant="ghost"
              className="justify-start px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-lg w-full" 
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Trending
            </Button>
          </Link>
          
          <Link to="/" className="w-full">
            <Button 
              variant="ghost"
              className="justify-start px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-lg w-full" 
            >
              <Clock className="mr-2 h-5 w-5" />
              Latest
            </Button>
          </Link>
          
          <div className="px-3 py-2 text-sm font-medium border-b">Categories</div>
          
          {categories.map((category) => (
            <Link to={category.path} key={category.path} className="w-full">
              <Button
                variant="ghost"
                className="justify-start px-6 py-1.5 text-sm font-medium hover:text-primary rounded-lg w-full" 
              >
                {category.name}
              </Button>
            </Link>
          ))}
          
          <Link to="/videos" className="w-full">
            <Button 
              variant="ghost"
              className="justify-start px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-lg w-full" 
            >
              <Video className="mr-2 h-5 w-5" />
              Videos
            </Button>
          </Link>
          
          <Link to="/contact" className="w-full">
            <Button 
              variant="ghost"
              className="justify-start px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-lg w-full" 
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact
            </Button>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default MobileNavigation;
