
import { Home, TrendingUp, Clock, Grid, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";

interface CategoryItem {
  name: string;
  path: string;
  id: string;
}

interface DesktopNavigationProps {
  categories: CategoryItem[];
  scrollToSection: (sectionId: string) => void;
}

const DesktopNavigation = ({ categories, scrollToSection }: DesktopNavigationProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Handle navigation - scroll on homepage, redirect on other pages
  const handleNavigation = (sectionId: string, path: string) => {
    if (isHomePage) {
      scrollToSection(sectionId);
    } else {
      // Redirect to homepage with hash for scrolling after page load
      window.location.href = `/${path ? path : ''}${sectionId ? '#' + sectionId : ''}`;
    }
  };

  return (
    <nav className="hidden md:flex items-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            {isHomePage ? (
              <Button 
                variant="ghost"
                className="px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-full"
                onClick={() => scrollToSection("home")}
              >
                <Home className="mr-1.5 h-6 w-6" />
                Home
              </Button>
            ) : (
              <Link to="/">
                <Button 
                  variant="ghost"
                  className="px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-full"
                >
                  <Home className="mr-1.5 h-6 w-6" />
                  Home
                </Button>
              </Link>
            )}
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            {isHomePage ? (
              <Button 
                variant="ghost"
                className="px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-full"
                onClick={() => scrollToSection("trending")}
              >
                <TrendingUp className="mr-1.5 h-6 w-6" />
                Trending
              </Button>
            ) : (
              <Link to="/trending">
                <Button 
                  variant="ghost"
                  className="px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-full"
                >
                  <TrendingUp className="mr-1.5 h-6 w-6" />
                  Trending
                </Button>
              </Link>
            )}
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            {isHomePage ? (
              <Button 
                variant="ghost"
                className="px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-full"
                onClick={() => scrollToSection("latest")}
              >
                <Clock className="mr-1.5 h-6 w-6" />
                Latest
              </Button>
            ) : (
              <Link to="/articles">
                <Button 
                  variant="ghost"
                  className="px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-full"
                >
                  <Clock className="mr-1.5 h-6 w-6" />
                  Latest
                </Button>
              </Link>
            )}
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-sm font-medium rounded-full">
              <Grid className="mr-1.5 h-6 w-6" />
              Categories
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-background/95 backdrop-blur-sm border p-2 rounded-xl">
              <div className="grid grid-cols-2 gap-2 w-[400px] p-2">
                {categories.map((category) => (
                  <Link to={category.path} key={category.path}>
                    <Button
                      variant="ghost" 
                      className="justify-start rounded-lg hover:bg-accent w-full"
                    >
                      <span>{category.name}</span>
                    </Button>
                  </Link>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            {isHomePage ? (
              <Button 
                variant="ghost"
                className="px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-full"
                onClick={() => scrollToSection("contact")}
              >
                <Mail className="mr-1.5 h-6 w-6" />
                Contact
              </Button>
            ) : (
              <Link to="/#contact">
                <Button 
                  variant="ghost"
                  className="px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-full"
                >
                  <Mail className="mr-1.5 h-6 w-6" />
                  Contact
                </Button>
              </Link>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default DesktopNavigation;
