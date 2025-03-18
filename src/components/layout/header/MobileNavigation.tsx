
import { Home, TrendingUp, Clock, Mail } from "lucide-react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "react-router-dom";

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
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  if (!isOpen) return null;

  // Handle navigation - scroll on homepage, redirect on other pages
  const handleNavigation = (sectionId: string) => {
    if (isHomePage) {
      scrollToSection(sectionId);
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <div className="md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-md pt-16 overflow-y-auto">
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
        <nav className="flex flex-col space-y-3">
          {isHomePage ? (
            <Button 
              variant="ghost"
              className="justify-start px-3 py-3 text-base font-medium hover:text-primary flex items-center rounded-lg w-full" 
              onClick={() => handleNavigation("home")}
            >
              <Home className="mr-3 h-5 w-5" />
              Home
            </Button>
          ) : (
            <Link to="/" className="w-full">
              <Button 
                variant="ghost"
                className="justify-start px-3 py-3 text-base font-medium hover:text-primary flex items-center rounded-lg w-full" 
              >
                <Home className="mr-3 h-5 w-5" />
                Home
              </Button>
            </Link>
          )}
          
          {isHomePage ? (
            <Button 
              variant="ghost"
              className="justify-start px-3 py-3 text-base font-medium hover:text-primary flex items-center rounded-lg w-full" 
              onClick={() => handleNavigation("trending")}
            >
              <TrendingUp className="mr-3 h-5 w-5" />
              Trending
            </Button>
          ) : (
            <Link to="/trending" className="w-full">
              <Button 
                variant="ghost"
                className="justify-start px-3 py-3 text-base font-medium hover:text-primary flex items-center rounded-lg w-full" 
              >
                <TrendingUp className="mr-3 h-5 w-5" />
                Trending
              </Button>
            </Link>
          )}
          
          {isHomePage ? (
            <Button 
              variant="ghost"
              className="justify-start px-3 py-3 text-base font-medium hover:text-primary flex items-center rounded-lg w-full" 
              onClick={() => handleNavigation("latest")}
            >
              <Clock className="mr-3 h-5 w-5" />
              Latest
            </Button>
          ) : (
            <Link to="/articles" className="w-full">
              <Button 
                variant="ghost"
                className="justify-start px-3 py-3 text-base font-medium hover:text-primary flex items-center rounded-lg w-full" 
              >
                <Clock className="mr-3 h-5 w-5" />
                Latest
              </Button>
            </Link>
          )}
          
          <div className="px-3 py-2 text-base font-medium border-b">Categories</div>
          
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <Link to={category.path} key={category.path} className="w-full">
                <Button
                  variant="ghost"
                  className="justify-start px-3 py-2 text-sm font-medium hover:text-primary rounded-lg w-full h-auto" 
                >
                  {category.name}
                </Button>
              </Link>
            ))}
          </div>
          
          {isHomePage ? (
            <Button 
              variant="ghost"
              className="justify-start px-3 py-3 text-base font-medium hover:text-primary flex items-center rounded-lg w-full" 
              onClick={() => handleNavigation("contact")}
            >
              <Mail className="mr-3 h-5 w-5" />
              Contact
            </Button>
          ) : (
            <Link to="/#contact" className="w-full">
              <Button 
                variant="ghost"
                className="justify-start px-3 py-3 text-base font-medium hover:text-primary flex items-center rounded-lg w-full" 
              >
                <Mail className="mr-3 h-5 w-5" />
                Contact
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};

export default MobileNavigation;
