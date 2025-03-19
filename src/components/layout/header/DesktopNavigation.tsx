
import { Home, TrendingUp, Clock, Grid, Mail, FileText, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
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
  return (
    <nav className="hidden md:flex items-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/">
              <Button 
                variant="ghost"
                className="px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-full"
              >
                <Home className="mr-1.5 h-5 w-5" />
                Home
              </Button>
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/opinion">
              <Button 
                variant="ghost"
                className="px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-full"
              >
                <FileText className="mr-1.5 h-5 w-5" />
                Opinion
              </Button>
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/videos">
              <Button 
                variant="ghost"
                className="px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-full"
              >
                <Video className="mr-1.5 h-5 w-5" />
                Videos
              </Button>
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-sm font-medium rounded-full">
              <Grid className="mr-1.5 h-5 w-5" />
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
            <Link to="#contact" onClick={() => scrollToSection("contact")}>
              <Button 
                variant="ghost"
                className="px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-full"
              >
                <Mail className="mr-1.5 h-5 w-5" />
                Contact
              </Button>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default DesktopNavigation;
