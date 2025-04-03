
import React, { useState, useEffect, useCallback } from "react";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./header/Logo";
import ProfileDropdown from "./header/ProfileDropdown";
import DesktopNavigation from "./header/DesktopNavigation";
import MobileNavigation from "./header/MobileNavigation";
import { useToast } from "@/components/ui/use-toast";
import { motion, useScroll } from "framer-motion";
import { createRipple } from "@/hooks/use-animations";

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
  const { scrollY } = useScroll();
  
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
      const scrollThreshold = 20;
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

  const toggleMobileMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search Results",
        description: `Showing results for: "${searchQuery}"`,
      });
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const scrollToSection = useCallback((sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }
    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ 
        behavior: "smooth",
        block: "start" 
      });
    }
  }, [location.pathname, navigate]);

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm border-b">
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
            <form onSubmit={handleSearch} className="w-full relative">
              <Input
                type="search"
                placeholder="Search..."
                className="pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
          
          <div className="flex items-center space-x-2">
            <ProfileDropdown />
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleMobileMenu}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <div className={`hamburger-icon ${isOpen ? 'open' : ''}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <MobileNavigation 
          categories={categories}
          mainNavigation={mainNavigation}
          scrollToSection={scrollToSection}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          isOpen={isOpen}
        />
      )}
    </header>
  );
};

export default Header;
