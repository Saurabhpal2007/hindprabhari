
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut, Settings, Bell } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ProfileDropdown = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Sample notification count
  const notificationCount = 3;

  const handleLogin = () => {
    setIsLoggedIn(true);
    toast({
      title: "Logged in",
      description: "You have been logged in successfully",
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const handleNotificationsClick = () => {
    toast({
      title: "Notifications",
      description: "You have " + notificationCount + " unread notifications",
    });
  };

  return (
    <div className="flex items-center space-x-1">
      {isLoggedIn ? (
        <div className="flex items-center">
          <Button 
            onClick={handleNotificationsClick}
            variant="ghost" 
            size="icon" 
            className="relative"
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/assets/avatar.png" alt="User" />
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleLogin}>
            Sign In
          </Button>
          <Button size="sm">Sign Up</Button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
