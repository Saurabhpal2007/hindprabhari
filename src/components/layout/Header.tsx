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
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import SmartSearch from "@/components/ai/SmartSearch";
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
  
  const headerBgOpacity = useTransform(scrollY, [0, 100], [0, 1]);

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
    if ('vibrate' in navigator && !isOpen) {
      try {
        navigator.vibrate(20);
      } catch (e) {
        console.log('Vibration not supported');
      }
    }
    
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

  const headerVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.2, 0, 0, 1],
        staggerChildren: 0.05
      }
    },
    hidden: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const childVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.2, 0, 0, 1] }
    },
    hidden: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <motion.header 
      className="sticky top-0 z-40 w-full md-elevation-transition"
      style={{
        boxShadow: isScrolled ? "var(--md-elevation-level1)" : "none"
      }}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <motion.div 
        className="absolute inset-0"
        style={{ 
          opacity: headerBgOpacity,
          backgroundColor: "hsl(var(--background))",
          backdropFilter: "blur(8px)"
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="h-16 flex items-center justify-between">
          <motion.div 
            className="flex items-center"
            variants={childVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 15 
            }}
          >
            <Logo />
          </motion.div>
          
          <motion.div variants={childVariants}>
            <DesktopNavigation 
              categories={categories}
              mainNavigation={mainNavigation}
              scrollToSection={scrollToSection} 
            />
          </motion.div>

          <motion.div 
            className="hidden md:flex items-center mx-4 flex-1 max-w-xs"
            variants={childVariants}
          >
            <SmartSearch />
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-2"
            variants={childVariants}
          >
            <ProfileDropdown />
            <motion.div 
              className="md:hidden"
              initial={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                variant="ghost" 
                size="icon" 
                className="md-ripple" 
                onClick={(e) => {
                  createRipple(e);
                  toggleMobileMenu();
                }}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <div className={`hamburger-icon ${isOpen ? 'open' : ''}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
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
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
