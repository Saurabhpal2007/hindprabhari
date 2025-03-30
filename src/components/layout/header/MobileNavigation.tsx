
import { Home, Search, Video, Mail, Grid, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, NavLink } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface CategoryItem {
  name: string;
  path: string;
  id: string;
}

interface NavItem {
  name: string;
  path: string;
  id: string;
}

interface MobileNavigationProps {
  categories: CategoryItem[];
  mainNavigation: NavItem[];
  scrollToSection: (sectionId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  isOpen: boolean;
}

const MobileNavigation = ({ 
  categories, 
  mainNavigation,
  scrollToSection, 
  searchQuery, 
  setSearchQuery, 
  handleSearch, 
  isOpen 
}: MobileNavigationProps) => {
  if (!isOpen) return null;
  
  const getIcon = (id: string) => {
    switch (id) {
      case "home":
        return <Home className="mr-2 h-5 w-5" />;
      case "trending":
        return <TrendingUp className="mr-2 h-5 w-5" />;
      case "latest":
        return <Clock className="mr-2 h-5 w-5" />;
      case "categories":
        return <Grid className="mr-2 h-5 w-5" />;
      case "videos":
        return <Video className="mr-2 h-5 w-5" />;
      case "contact":
        return <Mail className="mr-2 h-5 w-5" />;
      default:
        return null;
    }
  };

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
        <nav className="flex flex-col space-y-2">
          {mainNavigation.map((item) => (
            item.id === "categories" ? (
              <Accordion type="single" collapsible key={item.id} className="w-full border-b pb-2">
                <AccordionItem value="categories" className="border-none">
                  <AccordionTrigger className="p-0 hover:no-underline">
                    <div className="flex items-center py-2 px-3 rounded-lg w-full">
                      <Grid className="mr-2 h-5 w-5" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-1 pl-9 pr-2 pb-2">
                      {categories.map((category) => (
                        <Link to={category.path} key={category.path} className="w-full">
                          <Button
                            variant="ghost"
                            className="justify-start px-3 py-1.5 text-sm font-medium hover:text-primary rounded-lg w-full" 
                          >
                            {category.name}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <Link to={item.path} key={item.path} className="w-full">
                <Button 
                  variant="ghost"
                  className="justify-start px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-lg w-full" 
                >
                  {getIcon(item.id)}
                  {item.name}
                </Button>
              </Link>
            )
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileNavigation;
