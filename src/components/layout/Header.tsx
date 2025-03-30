
import React, { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./header/Logo";
import ProfileDropdown from "./header/ProfileDropdown";
import DesktopNavigation from "./header/DesktopNavigation";
import MobileNavigation from "./header/MobileNavigation";
import { useToast } from "@/components/ui/use-toast";

interface CategoryItem {
  name: string;
  path: string;
  id: string;
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const categories: CategoryItem[] = [
    { name: "Politics", path: "/politics", id: "politics" },
    { name: "Technology", path: "/technology", id: "technology" },
    { name: "Sports", path: "/sports", id: "sports" },
    { name: "Entertainment", path: "/entertainment", id: "entertainment" },
    { name: "Education", path: "/education", id: "education" },
    { name: "Health", path: "/health", id: "health" },
    { name: "World", path: "/world", id: "world" },
    { name: "Business", path: "/business", id: "business" },
  ];

  // Updated main navigation for the site
  const mainNavigation = [
    { name: "Home", path: "/", id: "home" },
    { name: "Trending", path: "/trending", id: "trending" },
    { name: "Latest", path: "/latest", id: "latest" },
    { name: "Categories", path: "/categories", id: "categories" },
    { name: "Videos", path: "/videos", id: "videos" },
    { name: "Contact", path: "/contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 50;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search Results",
        description: `Showing results for: "${searchQuery}"`,
      });
      // In a real app, we would navigate to search results page
      // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }
    
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <header className={`sticky top-0 z-40 w-full ${isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Logo />
          </div>
          
          <DesktopNavigation 
            categories={categories}
            mainNavigation={mainNavigation}
            scrollToSection={scrollToSection} 
          />

          <div className="hidden md:flex items-center mx-4 flex-1 max-w-xs">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-9 h-9 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
          
          <div className="flex items-center space-x-2">
            <ProfileDropdown />
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      <MobileNavigation 
        categories={categories}
        mainNavigation={mainNavigation}
        scrollToSection={scrollToSection}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        isOpen={isOpen}
      />
    </header>
  );
};

export default Header;
