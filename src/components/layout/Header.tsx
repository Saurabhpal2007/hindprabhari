
import React, { useState, useEffect } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Logo from "./header/Logo";
import ProfileDropdown from "./header/ProfileDropdown";
import ThemeToggle from "./header/ThemeToggle";
import AIAccessButton from "./header/AIAccessButton";
import { useToast } from "@/hooks/use-toast";

interface NavItem {
  name: string;
  path: string;
  children?: NavItem[];
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Define main navigation structure
  const mainNavigation: NavItem[] = [
    { 
      name: "News", 
      path: "#",
      children: [
        { name: "World", path: "/world" },
        { name: "Politics", path: "/india/politics" },
        { name: "Business", path: "/business" },
        { name: "Technology", path: "/technology" },
        { name: "Science", path: "/science" },
        { name: "Health", path: "/health" },
        { name: "Sports", path: "/sports" },
        { name: "Entertainment", path: "/entertainment" },
        { name: "Culture", path: "/culture" },
      ]
    },
    { name: "Latest", path: "/latest" },
    { name: "Trending", path: "/trending" },
    {
      name: "Formats",
      path: "#",
      children: [
        { name: "Videos", path: "/video" },
        { name: "Photos", path: "/photos" },
        { name: "Audio", path: "/audio" },
        { name: "Data & Graphics", path: "/data" },
        { name: "Investigations", path: "/investigations" },
        { name: "Opinion", path: "/opinion" },
        { name: "Live Updates", path: "/live" },
      ]
    },
    { name: "Fact Check", path: "/fact-check" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 50;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleMouseEnter = (name: string) => {
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Logo />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {mainNavigation.map((item) => (
              item.children ? (
                <div 
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Button
                    variant="ghost"
                    className="h-10 px-3 py-2 text-sm font-medium flex items-center gap-1"
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  
                  {activeDropdown === item.name && (
                    <div className="absolute left-0 top-full min-w-[200px] bg-card border rounded-md shadow-md p-2 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.path}
                          className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className="h-10 px-3 py-2 text-sm font-medium transition-colors hover:text-primary inline-flex items-center"
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* Search and Actions */}
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
            <AIAccessButton />
            <ThemeToggle />
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
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background border-t z-40">
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
            <nav className="flex flex-col space-y-1">
              {mainNavigation.map((item) => (
                item.children ? (
                  <Collapsible key={item.name} className="w-full">
                    <CollapsibleTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-between px-3 py-2"
                      >
                        {item.name}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-6 space-y-1 mt-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.path}
                          className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="px-3 py-2 text-sm font-medium transition-colors hover:text-primary block"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
