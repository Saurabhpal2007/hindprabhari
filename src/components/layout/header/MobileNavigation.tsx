
import { Home, TrendingUp, Clock, Mail } from "lucide-react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
          <Button 
            variant="ghost"
            className="justify-start px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-lg" 
            onClick={() => scrollToSection("home")}
          >
            <Home className="mr-2 h-6 w-6" />
            Home
          </Button>
          <Button 
            variant="ghost"
            className="justify-start px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-lg" 
            onClick={() => scrollToSection("trending")}
          >
            <TrendingUp className="mr-2 h-6 w-6" />
            Trending
          </Button>
          <Button 
            variant="ghost"
            className="justify-start px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-lg" 
            onClick={() => scrollToSection("latest")}
          >
            <Clock className="mr-2 h-6 w-6" />
            Latest
          </Button>
          
          <div className="px-3 py-2 text-sm font-medium border-b">Categories</div>
          
          {categories.map((category) => (
            <Button
              key={category.path}
              variant="ghost"
              className="justify-start px-6 py-1.5 text-sm font-medium hover:text-primary rounded-lg" 
              onClick={() => scrollToSection(category.id)}
            >
              {category.name}
            </Button>
          ))}
          
          <Button 
            variant="ghost"
            className="justify-start px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-lg" 
            onClick={() => scrollToSection("contact")}
          >
            <Mail className="mr-2 h-6 w-6" />
            Contact
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default MobileNavigation;
