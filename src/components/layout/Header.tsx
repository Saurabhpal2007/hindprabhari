
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from "../ui/navigation-menu";
import { cn } from "@/lib/utils";

const Header = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <Link 
              to="/" 
              className="flex items-center"
            >
              <div className="relative overflow-hidden">
                <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  HindPrabhari
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 blur-lg -z-10"></div>
              </div>
            </Link>
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
                <NavigationMenuItem>
                  <Link to="/entertainment" className="px-3 py-2 text-sm font-medium hover:text-primary">
                    Entertainment
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              className="mr-2"
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
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
