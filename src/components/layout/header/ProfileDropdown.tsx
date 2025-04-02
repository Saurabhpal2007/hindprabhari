
import { useState } from "react";
import { User, Settings, LogOut, Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { createRipple } from "@/hooks/use-animations";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const { toast } = useToast();

  const handleNotificationClick = () => {
    toast({
      title: "Notifications Cleared",
      description: "You have cleared all notifications.",
    });
    setNotificationCount(0);
  };

  return (
    <div className="flex items-center gap-1">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          variant="ghost" 
          size="icon"
          className="relative md-ripple"
          onClick={handleNotificationClick}
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <AnimatePresence>
            {notificationCount > 0 && (
              <motion.div 
                className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: 1,
                  transition: { 
                    duration: 0.4,
                    ease: [0.2, 0, 0.2, 1]
                  }
                }}
                exit={{ 
                  scale: 0,
                  opacity: 0,
                  transition: {
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                  }
                }}
              >
                {notificationCount}
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="md-ripple"
              onClick={(e) => createRipple(e)}
            >
              <motion.span className="flex items-center" animate={{ rotate: isOpen ? 180 : 0 }}>
                <User className="h-5 w-5" />
              </motion.span>
            </Button>
          </DropdownMenuTrigger>
        </motion.div>
        
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Guest User</p>
              <p className="text-xs leading-none text-muted-foreground">
                guest@example.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
              opacity: 1,
              y: 0,
              transition: { 
                delay: 0.1,
                duration: 0.3
              }  
            }}
          >
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link to="/profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
              opacity: 1,
              y: 0,
              transition: { 
                delay: 0.2,
                duration: 0.3
              }  
            }}
          >
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link to="/settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
          </motion.div>
          
          <DropdownMenuSeparator />
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
              opacity: 1,
              y: 0,
              transition: { 
                delay: 0.3,
                duration: 0.3
              }  
            }}
          >
            <div className="p-2">
              <ThemeToggle variant="ghost" showIcon showText />
            </div>
          </motion.div>
          
          <DropdownMenuSeparator />
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
              opacity: 1,
              y: 0,
              transition: { 
                delay: 0.4,
                duration: 0.3
              }  
            }}
          >
            <DropdownMenuItem className="cursor-pointer text-red-500 hover:text-red-600 focus:bg-red-500/10">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="hidden sm:block">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default ProfileDropdown;
