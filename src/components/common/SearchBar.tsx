
import { useState, useEffect, useRef } from "react";
import { Search, Mic, Sparkles, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "@/hooks/use-debounce";
import { createRipple } from "@/hooks/use-animations";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    // Simulate AI search processing
    setTimeout(() => {
      setIsSearching(false);
      
      toast({
        title: "AI Search Results",
        description: `Showing results for: "${query}"`,
      });
      
      setQuery("");
    }, 1500);
  };

  const handleVoiceSearch = (e: React.MouseEvent) => {
    createRipple(e);
    setIsListening(true);
    
    // Check if browser supports speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      toast({
        title: "Voice Search",
        description: "Listening... Speak now.",
      });
      
      // Simulate voice recognition (in a real app, we'd use the Web Speech API)
      setTimeout(() => {
        const exampleSearchTerms = [
          "latest news on climate change",
          "cricket match results",
          "technology innovations in india",
          "budget updates"
        ];
        const randomTerm = exampleSearchTerms[Math.floor(Math.random() * exampleSearchTerms.length)];
        
        setQuery(randomTerm);
        setIsListening(false);
        
        toast({
          title: "Voice Recognized",
          description: `Searching for: "${randomTerm}"`,
        });
      }, 3000);
    } else {
      setIsListening(false);
      toast({
        title: "Voice Search Unavailable",
        description: "Your browser doesn't support voice search. Please type your query instead.",
      });
    }
  };

  // M3 animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.2, 0, 0, 1], // M3 standard easing
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)"
    },
    tap: { 
      scale: 0.95 
    },
    rest: { 
      scale: 1,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
    }
  };

  const micAnimation = {
    listening: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.7, 1],
      transition: {
        repeat: Infinity,
        duration: 1.5
      }
    }
  };

  return (
    <motion.div 
      className="w-full mx-auto search-container transform transition-all"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className={cn(
          "bg-card rounded-3xl p-5 md-elevation-1 border relative overflow-hidden transition-all duration-300",
          isFocused ? "md-elevation-2" : ""
        )}
        animate={isFocused ? { y: -5 } : { y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      >
        {/* Decorative background elements with Material You colors */}
        <motion.div 
          className="absolute -right-16 -top-16 w-48 h-48 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute -left-16 -bottom-16 w-48 h-48 bg-gradient-to-tr from-secondary/10 to-accent/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 12,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <form onSubmit={handleSearch} className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="relative flex-grow">
              <AnimatePresence mode="wait">
                <motion.div
                  key="search-icon"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </motion.div>
              </AnimatePresence>
              <Input
                type="text"
                placeholder="Search news, topics, or ask AI a question..."
                className={cn(
                  "pl-12 pr-24 h-14 rounded-full text-base border-2 transition-all duration-300 md-input-focus",
                  isFocused ? "border-primary" : "border-input"
                )}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                ref={inputRef}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <motion.div
                  animate={isListening ? "listening" : "idle"}
                  variants={micAnimation}
                >
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-muted-foreground rounded-full hover:bg-muted/80 md-ripple"
                    aria-label="Voice search"
                    onClick={handleVoiceSearch}
                    disabled={isListening}
                  >
                    <AnimatePresence mode="wait">
                      {isListening ? (
                        <motion.div
                          key="listening"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Mic className="h-4 w-4 text-red-500" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="mic"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Mic className="h-4 w-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
                <span className="h-5 w-px bg-border"></span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-primary rounded-full hover:bg-primary/10 md-ripple"
                  aria-label="AI search"
                  onClick={(e) => {
                    createRipple(e);
                    toast({
                      title: "AI Assistant",
                      description: "Ask me anything about current events or news topics!"
                    });
                    setTimeout(() => {
                      if (inputRef.current) {
                        inputRef.current.focus();
                      }
                    }, 300);
                  }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 5
                    }}
                  >
                    <Sparkles className="h-4 w-4" />
                  </motion.div>
                </Button>
              </div>
            </div>
            <motion.div
              whileHover="hover"
              whileTap="tap"
              initial="rest"
              variants={buttonVariants}
            >
              <Button 
                type="submit" 
                className={cn(
                  "md:ml-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary-foreground/10 hover:to-primary h-12 md:h-14 px-6 rounded-full text-base font-medium transition-all shadow-sm md-ripple", 
                  isSearching ? "opacity-90" : ""
                )}
                disabled={isSearching}
              >
                {isSearching ? (
                  <motion.span 
                    className="flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </motion.span>
                ) : "Search"}
              </Button>
            </motion.div>
          </div>
          <motion.div 
            className="mt-4 flex flex-wrap gap-2 text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="text-muted-foreground mr-1">Trending:</span>
            {["Union Budget", "Cricket World Cup", "Assembly Elections", "Startup India", "Climate Change"].map((term, i) => (
              <motion.button
                key={term}
                type="button"
                className="bg-secondary/50 hover:bg-secondary px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105 transform md-state-layer md-ripple"
                onClick={(e) => {
                  createRipple(e);
                  setQuery(term);
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  delay: 0.1 * i + 0.4,
                  duration: 0.3,
                  ease: [0.2, 0, 0, 1]
                }}
              >
                {term}
              </motion.button>
            ))}
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default SearchBar;
