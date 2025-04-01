
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/use-theme";
import { useToast } from "@/components/ui/use-toast";

interface ThemeToggleProps {
  variant?: "default" | "filled" | "tonal" | "outlined" | "text" | "elevated" | "destructive" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  showIcon?: boolean;
  showText?: boolean;
}

const ThemeToggle = ({ 
  variant = "ghost", 
  size = "default",
  showIcon = true, 
  showText = false 
}: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  const handleToggleTheme = () => {
    toggleTheme();
    
    toast({
      title: `${theme === "light" ? "Dark" : "Light"} Mode Activated`,
      description: `Switched to ${theme === "light" ? "dark" : "light"} mode.`,
    });
  };

  return (
    <Button 
      variant={variant} 
      size={size}
      onClick={handleToggleTheme}
      className="w-full"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {showIcon && (
        theme === "light" ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )
      )}
      {showText && (
        <span className={showIcon ? "ml-2" : ""}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </span>
      )}
    </Button>
  );
};

export default ThemeToggle;
