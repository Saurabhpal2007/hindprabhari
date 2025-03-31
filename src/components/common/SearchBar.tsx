
import { useState } from "react";
import { Search, Mic, Sparkles, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { cn } from "@/lib/utils";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
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

  return (
    <div className="max-w-3xl mx-auto search-container">
      <div className="bg-card rounded-3xl p-5 shadow-md border relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full blur-2xl"></div>
        
        <form onSubmit={handleSearch} className="relative z-10">
          <div className="flex items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search news, topics, or ask AI a question..."
                className="pl-12 pr-28 h-16 rounded-full text-base shadow-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 text-muted-foreground rounded-full hover:bg-muted/80"
                  aria-label="Voice search"
                  onClick={() => toast({
                    title: "Voice Search",
                    description: "Voice search is being set up. Please try again later."
                  })}
                >
                  <Mic className="h-6 w-6" />
                </Button>
                <span className="h-6 w-px bg-border"></span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 text-primary rounded-full hover:bg-primary/10"
                  aria-label="AI search"
                  onClick={() => toast({
                    title: "AI Assistant",
                    description: "Ask me anything about current events or news topics!"
                  })}
                >
                  <Sparkles className="h-6 w-6" />
                </Button>
              </div>
            </div>
            <Button 
              type="submit" 
              className={cn(
                "ml-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 h-16 px-8 rounded-full text-base font-medium transition-all shadow-sm",
                isSearching ? "opacity-90" : ""
              )}
              disabled={isSearching}
            >
              {isSearching ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Searching...
                </span>
              ) : "Search"}
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <span className="text-muted-foreground mr-1">Trending:</span>
            {["Union Budget", "Cricket World Cup", "Assembly Elections", "Startup India", "Climate Change"].map((term) => (
              <button
                key={term}
                type="button"
                className="bg-muted/50 hover:bg-muted px-3 py-1.5 rounded-full transition-colors"
                onClick={() => setQuery(term)}
              >
                {term}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
