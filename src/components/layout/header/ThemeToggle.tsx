
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { toast } = useToast();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
    
    toast({
      title: `${newTheme === "dark" ? "Dark" : "Light"} Mode Activated`,
      description: `Switched to ${newTheme} mode.`,
    });
  };

  return (
    <Button 
      variant="ghost" 
      size="icon"
      onClick={toggleTheme}
      className="rounded-full"
    >
      {theme === "light" ? (
        <Moon className="h-7 w-7" />
      ) : (
        <Sun className="h-7 w-7" />
      )}
    </Button>
  );
};

export default ThemeToggle;
