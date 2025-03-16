
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  Sun, 
  Moon, 
  Search, 
  User,
  LogIn,
  UserPlus,
  X,
  Menu,
  Home,
  TrendingUp,
  Clock,
  Grid,
  ChevronDown,
  Info,
  Mail,
  Settings
} from "lucide-react";
import { Button } from "../ui/button";
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuTrigger
} from "../ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "../ui/use-toast";

const Header = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { toast } = useToast();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchExpanded(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
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

  const handleLogin = () => {
    toast({
      title: "Login",
      description: "Login functionality will be implemented soon.",
    });
  };

  const handleSignup = () => {
    toast({
      title: "Sign Up",
      description: "Sign up functionality will be implemented soon.",
    });
  };

  const handleAdminAccess = () => {
    toast({
      title: "Admin Access",
      description: "Admin functionality will be implemented soon.",
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
    { name: "Politics", path: "/politics" },
    { name: "Technology", path: "/technology" },
    { name: "Sports", path: "/sports" },
    { name: "Entertainment", path: "/entertainment" },
    { name: "Education", path: "/education" },
    { name: "Health", path: "/health" },
    { name: "World", path: "/world" },
    { name: "Business", path: "/business" }
  ];

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-background/80 backdrop-blur-lg border-b shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left section: Hamburger menu (mobile) */}
          <div className="flex md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              className="mr-2"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
          
          {/* Left section: Navigation (desktop) */}
          <nav className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Button 
                    variant="ghost"
                    className="px-3 py-2 text-sm font-medium hover:text-primary flex items-center"
                    onClick={() => scrollToSection("home")}
                  >
                    <Home className="mr-1.5 h-4 w-4" />
                    Home
                  </Button>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Button 
                    variant="ghost"
                    className="px-3 py-2 text-sm font-medium hover:text-primary flex items-center"
                    onClick={() => scrollToSection("trending")}
                  >
                    <TrendingUp className="mr-1.5 h-4 w-4" />
                    Trending
                  </Button>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Button 
                    variant="ghost"
                    className="px-3 py-2 text-sm font-medium hover:text-primary flex items-center"
                    onClick={() => scrollToSection("latest")}
                  >
                    <Clock className="mr-1.5 h-4 w-4" />
                    Latest
                  </Button>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    <Grid className="mr-1.5 h-4 w-4" />
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-background/95 backdrop-blur-sm border p-2 rounded-md">
                    <div className="grid grid-cols-2 gap-2 w-[400px] p-2">
                      {categories.map((category) => (
                        <Link 
                          key={category.path} 
                          to={category.path}
                          className="flex items-center p-2 rounded-md hover:bg-accent"
                        >
                          <span>{category.name}</span>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Button 
                    variant="ghost"
                    className="px-3 py-2 text-sm font-medium hover:text-primary flex items-center"
                    onClick={() => scrollToSection("about")}
                  >
                    <Info className="mr-1.5 h-4 w-4" />
                    About Us
                  </Button>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Button 
                    variant="ghost"
                    className="px-3 py-2 text-sm font-medium hover:text-primary flex items-center"
                    onClick={() => scrollToSection("contact")}
                  >
                    <Mail className="mr-1.5 h-4 w-4" />
                    Contact
                  </Button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Center section: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
            <Link to="/" className="flex items-center">
              <div className="relative h-10 w-40 overflow-hidden rounded-md">
                {/* Banner image */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                <div className="relative z-10 flex h-full items-center justify-center">
                  <span className="text-xl font-bold text-white">HindPrabhari</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Right section: Search and Profile */}
          <div className="flex items-center">
            {/* Adaptive Search */}
            <div ref={searchRef} className={cn(
              "relative transition-all duration-300 mr-2",
              isSearchExpanded ? "w-64" : "w-10"
            )}>
              {isSearchExpanded ? (
                <form onSubmit={handleSearch} className="w-full">
                  <Input
                    type="text"
                    placeholder="Search news..."
                    className="pr-8 pl-9 h-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-0 top-0 h-9 w-9" 
                    onClick={() => setIsSearchExpanded(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10"
                  onClick={() => setIsSearchExpanded(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="rounded-full bg-muted/50 hover:bg-muted"
                  aria-label="Profile options"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Profile</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogin}>
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleAdminAccess}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Admin</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={toggleTheme}>
                  {theme === "light" ? (
                    <>
                      <Moon className="mr-2 h-4 w-4" />
                      <span>Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <Sun className="mr-2 h-4 w-4" />
                      <span>Light Mode</span>
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t">
          <div className="container mx-auto px-4 py-4">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search news..."
                className="w-full pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <nav className="flex flex-col space-y-4">
              <Button 
                variant="ghost"
                className="justify-start px-3 py-2 text-sm font-medium hover:text-primary flex items-center" 
                onClick={() => scrollToSection("home")}
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
              <Button 
                variant="ghost"
                className="justify-start px-3 py-2 text-sm font-medium hover:text-primary flex items-center" 
                onClick={() => scrollToSection("trending")}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Trending
              </Button>
              <Button 
                variant="ghost"
                className="justify-start px-3 py-2 text-sm font-medium hover:text-primary flex items-center" 
                onClick={() => scrollToSection("latest")}
              >
                <Clock className="mr-2 h-4 w-4" />
                Latest
              </Button>
              
              <div className="px-3 py-2 text-sm font-medium border-b">Categories</div>
              
              {categories.map((category) => (
                <Link 
                  key={category.path}
                  to={category.path} 
                  className="px-6 py-1.5 text-sm font-medium hover:text-primary" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              
              <Button 
                variant="ghost"
                className="justify-start px-3 py-2 text-sm font-medium hover:text-primary flex items-center" 
                onClick={() => scrollToSection("about")}
              >
                <Info className="mr-2 h-4 w-4" />
                About Us
              </Button>
              <Button 
                variant="ghost"
                className="justify-start px-3 py-2 text-sm font-medium hover:text-primary flex items-center" 
                onClick={() => scrollToSection("contact")}
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
