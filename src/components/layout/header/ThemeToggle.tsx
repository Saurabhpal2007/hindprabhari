
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/use-theme";
import { useToast } from "@/components/ui/use-toast";

const ThemeToggle = () => {
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
      variant="ghost" 
      size="icon"
      onClick={handleToggleTheme}
      className="rounded-full"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
};

export default ThemeToggle;
