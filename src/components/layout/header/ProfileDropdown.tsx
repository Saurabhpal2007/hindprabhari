
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
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="relative md-ripple"
            onClick={(e) => createRipple(e)}
          >
            <User className="h-5 w-5" />
            {notificationCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount}
              </div>
            )}
          </Button>
        </DropdownMenuTrigger>
        
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
          
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link to="/profile" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="cursor-pointer" onClick={handleNotificationClick}>
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications</span>
            {notificationCount > 0 && (
              <div className="ml-auto bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount}
              </div>
            )}
          </DropdownMenuItem>
          
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link to="/settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <div className="p-2">
            <ThemeToggle variant="ghost" showIcon showText />
          </div>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem className="cursor-pointer text-red-500 hover:text-red-600 focus:bg-red-500/10">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="hidden sm:block">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default ProfileDropdown;
