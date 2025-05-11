
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/use-theme";
import { useToast } from "@/components/ui/use-toast";

interface ThemeToggleProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "filled" | "tonal" | "elevated" | "text";
  size?: "default" | "sm" | "lg" | "icon";
  showIcon?: boolean;
  showText?: boolean;
}

const ThemeToggle = ({ 
  variant = "tonal", 
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

  const isDark = theme === "dark";

  return (
    <Button 
      variant={variant} 
      size={size}
      onClick={handleToggleTheme}
      className="md-state-layer rounded-full transition-all duration-300 hover:shadow-sm"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {showIcon && (
        isDark ? (
          <Sun className="h-5 w-5 text-primary" />
        ) : (
          <Moon className="h-5 w-5 text-primary" />
        )
      )}
      {showText && (
        <span className={showIcon ? "ml-2" : ""}>
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </Button>
  );
};

export default ThemeToggle;
