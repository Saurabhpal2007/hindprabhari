
import { Home, TrendingUp, Clock, Grid, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
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
            <Button 
              variant="ghost"
              className="px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-full"
              onClick={() => scrollToSection("home")}
            >
              <Home className="mr-1.5 h-6 w-6" />
              Home
            </Button>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Button 
              variant="ghost"
              className="px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-full"
              onClick={() => scrollToSection("trending")}
            >
              <TrendingUp className="mr-1.5 h-6 w-6" />
              Trending
            </Button>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Button 
              variant="ghost"
              className="px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-full"
              onClick={() => scrollToSection("latest")}
            >
              <Clock className="mr-1.5 h-6 w-6" />
              Latest
            </Button>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-sm font-medium rounded-full">
              <Grid className="mr-1.5 h-6 w-6" />
              Categories
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-background/95 backdrop-blur-sm border p-2 rounded-xl">
              <div className="grid grid-cols-2 gap-2 w-[400px] p-2">
                {categories.map((category) => (
                  <Button
                    key={category.path}
                    variant="ghost" 
                    className="justify-start rounded-lg hover:bg-accent"
                    onClick={() => scrollToSection(category.id)}
                  >
                    <span>{category.name}</span>
                  </Button>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Button 
              variant="ghost"
              className="px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-full"
              onClick={() => scrollToSection("contact")}
            >
              <Mail className="mr-1.5 h-6 w-6" />
              Contact
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default DesktopNavigation;
