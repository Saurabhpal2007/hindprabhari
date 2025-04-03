
import { useState, useEffect } from "react";
import { Search, Mic, Sparkles, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/use-debounce";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const { toast } = useToast();

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

  // M3 animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.2, 0, 0, 1], // M3 standard easing
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
      <div className={cn(
        "bg-card rounded-3xl p-5 md-elevation-1 border relative overflow-hidden transition-all duration-300",
        isFocused ? "md-elevation-2" : ""
      )}>
        {/* Decorative background elements with Material You colors */}
        <div className="absolute -right-16 -top-16 w-48 h-48 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-gradient-to-tr from-secondary/10 to-accent/5 rounded-full blur-3xl"></div>
        
        <form onSubmit={handleSearch} className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search news, topics, or ask AI a question..."
                className={cn(
                  "pl-12 pr-24 h-14 rounded-full text-base border-2 transition-all duration-300 md-focus-ring",
                  isFocused ? "border-primary" : "border-input"
                )}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-muted-foreground rounded-full hover:bg-muted/80"
                  aria-label="Voice search"
                  onClick={() => toast({
                    title: "Voice Search",
                    description: "Voice search is being set up. Please try again later."
                  })}
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <span className="h-5 w-px bg-border"></span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-primary rounded-full hover:bg-primary/10"
                  aria-label="AI search"
                  onClick={() => toast({
                    title: "AI Assistant",
                    description: "Ask me anything about current events or news topics!"
                  })}
                >
                  <Sparkles className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button 
              type="submit" 
              className={cn(
                "md:ml-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary-foreground/10 hover:to-primary h-12 md:h-14 px-6 rounded-full text-base font-medium transition-all shadow-sm md-ripple", 
                isSearching ? "opacity-90" : ""
              )}
              disabled={isSearching}
            >
              {isSearching ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </span>
              ) : "Search"}
            </Button>
          </div>
          <motion.div 
            className="mt-4 flex flex-wrap gap-2 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="text-muted-foreground mr-1">Trending:</span>
            {["Union Budget", "Cricket World Cup", "Assembly Elections", "Startup India", "Climate Change"].map((term, i) => (
              <motion.button
                key={term}
                type="button"
                className="bg-secondary/50 hover:bg-secondary px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105 transform md-state-layer"
                onClick={() => setQuery(term)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
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
      </div>
    </motion.div>
  );
};

export default SearchBar;
