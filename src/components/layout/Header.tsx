import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Sun, 
  Moon, 
  Search, 
  User,
  LogIn,
  UserPlus,
  X,
  Menu
} from "lucide-react";
import { Button } from "../ui/button";
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
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
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
          <div className="flex items-center">
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

          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center max-w-md w-full mx-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search news..."
                className="w-full pl-9 pr-4 h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className="px-3 py-2 text-sm font-medium hover:text-primary">
                    Home
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/politics" className="px-3 py-2 text-sm font-medium hover:text-primary">
                    Politics
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/technology" className="px-3 py-2 text-sm font-medium hover:text-primary">
                    Technology
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/sports" className="px-3 py-2 text-sm font-medium hover:text-primary">
                    Sports
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

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
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogin}>
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Log In</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignup}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Sign Up</span>
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
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            {/* Mobile search button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="mr-2"
              aria-label="Search"
              onClick={() => toast({
                title: "Mobile Search",
                description: "Mobile search will be implemented soon."
              })}
            >
              <Search className="h-5 w-5" />
            </Button>
            
            {/* Mobile profile dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="mr-2 rounded-full bg-muted/50 hover:bg-muted"
                  aria-label="Profile options"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleLogin}>
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Log In</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignup}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Sign Up</span>
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
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
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
              <Link to="/" className="px-3 py-2 text-sm font-medium hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link to="/politics" className="px-3 py-2 text-sm font-medium hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                Politics
              </Link>
              <Link to="/technology" className="px-3 py-2 text-sm font-medium hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                Technology
              </Link>
              <Link to="/sports" className="px-3 py-2 text-sm font-medium hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                Sports
              </Link>
              <Link to="/entertainment" className="px-3 py-2 text-sm font-medium hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                Entertainment
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
