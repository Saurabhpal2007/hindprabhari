
import { User, LogIn, Settings, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

interface ProfileDropdownProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ProfileDropdown = ({ theme, toggleTheme }: ProfileDropdownProps) => {
  const { toast } = useToast();

  const handleLogin = () => {
    toast({
      title: "Login",
      description: "Login functionality will be implemented soon.",
    });
  };

  const handleAdminAccess = () => {
    toast({
      title: "Admin Access",
      description: "Admin functionality will be implemented soon.",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full bg-muted/50 hover:bg-muted h-10 w-10"
          aria-label="Profile options"
        >
          <User className="h-7 w-7" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-xl">
        <DropdownMenuLabel>My Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogin} className="rounded-lg focus:bg-accent">
          <LogIn className="mr-2 h-5 w-5" />
          <span>Account</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleAdminAccess} className="rounded-lg focus:bg-accent">
          <Settings className="mr-2 h-5 w-5" />
          <span>Admin</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={toggleTheme} className="rounded-lg focus:bg-accent">
          {theme === "light" ? (
            <>
              <Moon className="mr-2 h-5 w-5" />
              <span>Dark Mode</span>
            </>
          ) : (
            <>
              <Sun className="mr-2 h-5 w-5" />
              <span>Light Mode</span>
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
