import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/use-theme";
import { Link, useLocation } from "react-router-dom";
import Logo from "./header/Logo";
import SearchBar from "../common/SearchBar";
import ThemeToggle from "./header/ThemeToggle";
import AIButton from "./header/AIButton";
import ProfileDropdown from "./header/ProfileDropdown";
import DesktopNavigation from "./header/DesktopNavigation";
import MobileNavigation from "./header/MobileNavigation";
import AIAccessButton from "./header/AIAccessButton";

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
  const { theme, toggleTheme } = useTheme();

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
  }, [location.pathname, theme]);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
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
            scrollToSection={scrollToSection} 
          />

          <div className="flex items-center space-x-2">
            <div className="hidden md:flex">
              <SearchBar />
            </div>
            <AIAccessButton />
            <ThemeToggle />
            <AIButton />
            <ProfileDropdown theme={theme} toggleTheme={toggleTheme} />
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
