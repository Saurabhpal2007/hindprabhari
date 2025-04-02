
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/use-theme";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { createRipple } from "@/hooks/use-animations";

interface ThemeToggleProps {
  variant?: "default" | "destructive" | "outlined" | "filled" | "tonal" | "text" | "elevated" | "secondary" | "ghost" | "link";
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

  const handleToggleTheme = (e: React.MouseEvent) => {
    createRipple(e);
    toggleTheme();
    
    toast({
      title: `${theme === "light" ? "Dark" : "Light"} Mode Activated`,
      description: `Switched to ${theme === "light" ? "dark" : "light"} mode.`,
    });
  };

  const iconVariants = {
    initial: { 
      rotate: -30,
      opacity: 0,
      scale: 0.5
    },
    animate: { 
      rotate: 0,
      opacity: 1,
      scale: 1
    },
    exit: { 
      rotate: 30,
      opacity: 0,
      scale: 0.5
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button 
        variant={variant} 
        size={size}
        onClick={handleToggleTheme}
        className="w-full md-ripple relative overflow-hidden"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {showIcon && (
          <AnimatePresence mode="wait">
            {theme === "light" ? (
              <motion.div
                key="moon-icon"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={iconVariants}
                transition={{ duration: 0.3, ease: [0.2, 0, 0.2, 1] }}
              >
                <Moon className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="sun-icon"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={iconVariants}
                transition={{ duration: 0.3, ease: [0.2, 0, 0.2, 1] }}
              >
                <Sun className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        )}
        {showText && (
          <AnimatePresence mode="wait">
            {theme === "light" ? (
              <motion.span 
                key="dark-text"
                className={showIcon ? "ml-2" : ""}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                Dark Mode
              </motion.span>
            ) : (
              <motion.span 
                key="light-text"
                className={showIcon ? "ml-2" : ""}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                Light Mode
              </motion.span>
            )}
          </AnimatePresence>
        )}
      </Button>
    </motion.div>
  );
};

export default ThemeToggle;
