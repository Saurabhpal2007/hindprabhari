
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { createRipple } from "@/hooks/use-animations";

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

interface DesktopNavigationProps {
  categories: CategoryItem[];
  mainNavigation: NavItem[];
  scrollToSection: (sectionId: string) => void;
}

const DesktopNavigation = ({
  categories,
  mainNavigation,
  scrollToSection
}: DesktopNavigationProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const navItemVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: [0.2, 0, 0.2, 1]
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <nav className="hidden md:flex items-center space-x-1">
      {mainNavigation.map((item) => {
        if (item.id === "categories") {
          return (
            <div key={item.id} className="group relative">
              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={navItemVariants}
              >
                <Button
                  asChild
                  variant="text"
                  className="h-9 px-3 py-1.5 text-sm font-medium transition-colors hover:text-primary flex items-center rounded-md md-ripple"
                  onClick={(e) => createRipple(e)}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center",
                        isActive ? "text-primary" : ""
                      )
                    }
                  >
                    {item.name}
                    <motion.svg
                      className="ml-1 h-3 w-3 text-muted-foreground"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      animate={{ rotate: 0 }}
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </motion.svg>
                  </NavLink>
                </Button>
              </motion.div>
              
              <motion.div 
                className="absolute left-0 top-full z-50 mt-1 hidden w-56 overflow-hidden rounded-md border bg-popover p-1 shadow-lg group-hover:block"
                initial={{ opacity: 0, y: -5, height: 0 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  height: 'auto', 
                  transition: { 
                    duration: 0.3,
                    ease: [0.2, 0, 0.2, 1]
                  }
                }}
              >
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ 
                      opacity: 1,
                      y: 0,
                      transition: { 
                        delay: index * 0.05,
                        duration: 0.3,
                        ease: [0.2, 0, 0.2, 1]
                      }
                    }}
                  >
                    <Button
                      variant="text"
                      asChild
                      className="block w-full justify-start px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md h-auto md-ripple"
                      onClick={(e) => createRipple(e)}
                    >
                      <NavLink
                        to={category.path}
                        className={({ isActive }) =>
                          cn(
                            isActive ? "bg-accent text-accent-foreground" : ""
                          )
                        }
                      >
                        {category.name}
                      </NavLink>
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          );
        } else {
          return (
            <motion.div
              key={item.id}
              whileHover="hover"
              whileTap="tap"
              variants={navItemVariants}
            >
              <Button
                variant="text"
                className="h-9 px-3 py-1.5 md-ripple"
                asChild
                onClick={(e) => createRipple(e)}
              >
                <NavLink
                  to={item.path}
                  onClick={(e) => {
                    if (isHomePage && ["home", "trending", "categories", "latest", "about", "contact"].includes(item.id)) {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }
                  }}
                  className={({ isActive }) =>
                    cn(
                      "text-sm font-medium transition-colors hover:text-primary rounded-md relative group",
                      isActive ? "text-primary" : ""
                    )
                  }
                >
                  {item.name}
                  <motion.span 
                    className="absolute bottom-0 left-0 h-0.5 bg-primary"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3, ease: [0.2, 0, 0.2, 1] }}
                  ></motion.span>
                </NavLink>
              </Button>
            </motion.div>
          );
        }
      })}
    </nav>
  );
};

export default DesktopNavigation;
