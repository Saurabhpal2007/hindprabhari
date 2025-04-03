
import { Home, Search, Video, Mail, Grid, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { createRipple } from "@/hooks/use-animations";
import SmartSearch from "@/components/ai/SmartSearch";

interface CategoryItem {
  name: string;
  path: string;
  id: string;
}

interface NavItem {
  name: string;
  path: string;
  id: string;
}

interface MobileNavigationProps {
  categories: CategoryItem[];
  mainNavigation: NavItem[];
  scrollToSection: (sectionId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  isOpen: boolean;
}

const MobileNavigation = ({ 
  categories, 
  mainNavigation,
  scrollToSection, 
  searchQuery, 
  setSearchQuery, 
  handleSearch, 
  isOpen 
}: MobileNavigationProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const getIcon = (id: string) => {
    switch (id) {
      case "home":
        return <Home className="mr-2 h-5 w-5" />;
      case "trending":
        return <TrendingUp className="mr-2 h-5 w-5" />;
      case "latest":
        return <Clock className="mr-2 h-5 w-5" />;
      case "categories":
        return <Grid className="mr-2 h-5 w-5" />;
      case "videos":
        return <Video className="mr-2 h-5 w-5" />;
      case "contact":
        return <Mail className="mr-2 h-5 w-5" />;
      default:
        return null;
    }
  };

  const handleNavClick = (item: NavItem) => {
    // Add haptic feedback if available
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(10); // Very subtle vibration
      } catch (e) {
        console.log('Vibration not supported');
      }
    }
    
    if (item.path === "/" && item.id !== "home") {
      if (location.pathname === "/") {
        scrollToSection(item.id);
      } else {
        navigate('/', { state: { scrollTo: item.id } });
      }
    } else {
      navigate(item.path);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        when: "afterChildren"
      }
    },
    visible: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: [0.2, 0, 0.2, 1],
        staggerChildren: 0.04,
        when: "beforeChildren"
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.03,
        staggerDirection: -1,
        when: "afterChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.2, 0, 0.2, 1]
      }
    },
    exit: { 
      opacity: 0, 
      y: 10,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <motion.div 
      className="md:hidden bg-background/95 backdrop-blur-md border-t z-40 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
      exit="exit"
    >
      <div className="container mx-auto px-4 py-4">
        <motion.div 
          variants={itemVariants}
          className="mb-4"
        >
          <SmartSearch />
        </motion.div>

        <nav className="flex flex-col space-y-2">
          {mainNavigation.map((item, index) => (
            item.id === "categories" ? (
              <motion.div 
                key={item.id} 
                variants={itemVariants}
                custom={index}
              >
                <Accordion type="single" collapsible className="w-full border-b pb-2">
                  <AccordionItem value="categories" className="border-none">
                    <AccordionTrigger className="p-0 hover:no-underline">
                      <Button
                        variant="text"
                        className="flex items-center py-2 px-3 rounded-lg w-full justify-start h-auto md-ripple md-state-layer"
                        onClick={(e) => createRipple(e)}
                      >
                        <Grid className="mr-2 h-5 w-5" />
                        <span className="text-sm font-medium">{item.name}</span>
                      </Button>
                    </AccordionTrigger>
                    <AccordionContent className="mt-1">
                      <div className="flex flex-col space-y-1 pl-9 pr-2 pb-2">
                        {categories.map((category, catIndex) => (
                          <motion.div
                            key={category.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ 
                              opacity: 1, 
                              x: 0, 
                              transition: { 
                                delay: catIndex * 0.05,
                                duration: 0.3,
                                ease: [0.2, 0, 0.2, 1]
                              } 
                            }}
                          >
                            <Button
                              variant="text"
                              className="justify-start px-3 py-1.5 text-sm font-medium hover:text-primary rounded-lg w-full h-auto md-ripple md-state-layer"
                              onClick={(e) => {
                                createRipple(e);
                                navigate(category.path);
                              }}
                            >
                              {category.name}
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>
            ) : (
              <motion.div 
                key={item.id}
                variants={itemVariants}
                custom={index}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="text"
                  className="justify-start px-3 py-2 text-sm font-medium hover:text-primary flex items-center rounded-lg w-full h-auto md-ripple md-state-layer" 
                  onClick={(e) => {
                    createRipple(e);
                    handleNavClick(item);
                  }}
                >
                  {getIcon(item.id)}
                  {item.name}
                </Button>
              </motion.div>
            )
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default MobileNavigation;
