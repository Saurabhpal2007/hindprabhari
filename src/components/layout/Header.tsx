
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

// Import our new component files
import Logo from "./header/Logo";
import SearchBar from "./header/SearchBar";
import ProfileDropdown from "./header/ProfileDropdown";
import DesktopNavigation from "./header/DesktopNavigation";
import MobileNavigation from "./header/MobileNavigation";

const Header = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      if (!desktop) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    // Initial call to set correct state
    handleResize();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    toast({
      title: "Search",
      description: `Searching for: "${searchQuery}"`,
    });
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  // List of categories for the dropdown
  const categories = [
    { name: "Politics", path: "/politics", id: "politics" },
    { name: "Technology", path: "/technology", id: "technology" },
    { name: "Sports", path: "/sports", id: "sports" },
    { name: "Entertainment", path: "/entertainment", id: "entertainment" },
    { name: "Education", path: "/education", id: "education" },
    { name: "Health", path: "/health", id: "health" },
    { name: "World", path: "/world", id: "world" },
    { name: "Business", path: "/business", id: "business" }
  ];

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-background/85 backdrop-blur-lg border-b shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left section: Logo + Hamburger menu (mobile) */}
          <div className="flex items-center">
            {/* Hamburger menu (mobile) */}
            <div className="md:hidden mr-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
                className="rounded-full"
              >
                {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </Button>
            </div>
            
            {/* Logo */}
            <Logo />
          </div>
          
          {/* Center section: Navigation (desktop) */}
          <DesktopNavigation 
            categories={categories} 
            scrollToSection={scrollToSection} 
          />

          {/* Right section: Search and Profile */}
          <div className="flex items-center">
            {/* Adaptive Search */}
            <SearchBar isDesktop={isDesktop} />

            {/* ProfileDropdown - removing theme and toggleTheme props */}
            <ProfileDropdown />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileNavigation 
        categories={categories}
        scrollToSection={scrollToSection}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        isOpen={isMobileMenuOpen}
      />
    </header>
  );
};

export default Header;
