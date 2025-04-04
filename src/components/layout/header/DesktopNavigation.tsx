
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

  return (
    <nav className="hidden md:flex items-center space-x-1">
      {mainNavigation.map((item) => {
        if (item.id === "categories") {
          return (
            <div key={item.id} className="group relative">
              <Button
                asChild
                variant="text"
                className="h-10 px-3 py-2 text-sm font-medium md-transition-standard md-state-layer rounded-none"
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
                  <svg
                    className="ml-1 h-3 w-3 text-muted-foreground transition-transform group-hover:rotate-180 md-transition-standard"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </NavLink>
              </Button>
              
              <div className="absolute left-0 top-full z-50 mt-1 hidden w-56 overflow-hidden rounded-md border bg-popover p-1 shadow-md-elevation-1 group-hover:block md-transition-standard">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant="text"
                    asChild
                    className="block w-full justify-start px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md h-12 md-state-layer"
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
                ))}
              </div>
            </div>
          );
        } else {
          return (
            <Button
              key={item.id}
              variant="text"
              className="h-10 px-4 py-2 md-state-layer rounded-none"
              asChild
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
                    "text-sm font-medium md-transition-standard hover:text-primary relative",
                    isActive ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary" : ""
                  )
                }
              >
                {item.name}
              </NavLink>
            </Button>
          );
        }
      })}
    </nav>
  );
};

export default DesktopNavigation;
