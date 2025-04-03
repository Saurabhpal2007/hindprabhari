
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/theme-provider";
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
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const handleToggleTheme = (e: React.MouseEvent) => {
    createRipple(e);
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    
    // Try to use haptic feedback if available
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(20);
      } catch (e) {
        console.log('Vibration not supported');
      }
    }
    
    toast({
      title: `${newTheme === "dark" ? "Dark" : "Light"} Mode Activated`,
      description: `Switched to ${newTheme} mode.`,
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
    },
    hover: {
      rotate: [0, 15, 0, -15, 0],
      scale: 1.2,
      transition: { duration: 0.5 }
    }
  };

  const buttonVariants = {
    rest: {
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, #2c3e50 0%, #1a2639 100%)' 
        : 'linear-gradient(135deg, #f5f7fa 0%, #e5e9f0 100%)',
      boxShadow: theme === 'dark'
        ? '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)'
        : '0 2px 8px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,0.7)'
    },
    hover: {
      background: theme === 'dark'
        ? 'linear-gradient(135deg, #34495e 0%, #283747 100%)' 
        : 'linear-gradient(135deg, #ffffff 0%, #f0f2f5 100%)',
      boxShadow: theme === 'dark'
        ? '0 4px 12px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.2)'
        : '0 4px 12px rgba(0,0,0,0.15), inset 0 1px 2px rgba(255,255,255,1)'
    }
  };

  const isDark = theme === "dark";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        variants={buttonVariants}
        initial="rest"
        whileHover="hover"
        transition={{ duration: 0.3 }}
      >
        <Button 
          variant={variant} 
          size={size}
          onClick={handleToggleTheme}
          className="w-full md-ripple relative overflow-hidden"
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
          {showIcon && (
            <AnimatePresence mode="wait">
              {!isDark ? (
                <motion.div
                  key="moon-icon"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  whileHover="hover"
                  variants={iconVariants}
                  transition={{ duration: 0.3, ease: [0.2, 0, 0.2, 1] }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ 
                      duration: 240,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{ display: 'inline-block', willChange: 'transform' }}
                  >
                    <Moon className="h-5 w-5" />
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="sun-icon"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  whileHover="hover"
                  variants={iconVariants}
                  transition={{ duration: 0.3, ease: [0.2, 0, 0.2, 1] }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      },
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }
                    }}
                    style={{ display: 'inline-block', willChange: 'transform' }}
                  >
                    <Sun className="h-5 w-5" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
          {showText && (
            <AnimatePresence mode="wait">
              {!isDark ? (
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
          
          {/* Add subtle glow effect */}
          <motion.div
            className={`absolute inset-0 rounded-full ${isDark ? 'bg-blue-400' : 'bg-yellow-400'}`}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.1, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3, 
              repeat: Infinity,
              repeatType: "loop"
            }}
            style={{ filter: 'blur(8px)' }}
          />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ThemeToggle;
