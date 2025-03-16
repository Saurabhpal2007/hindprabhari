
import { useState } from "react";
import { Search, Mic, Sparkles } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

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
    <div className="max-w-3xl mx-auto">
      <div className="bg-card rounded-xl p-4 shadow-sm border relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-2xl"></div>
        
        <form onSubmit={handleSearch} className="relative z-10">
          <div className="flex items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for news, topics, or keywords..."
                className="pl-10 pr-20 h-12"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-muted-foreground"
                  aria-label="Voice search"
                  onClick={() => toast({
                    title: "Voice Search",
                    description: "Voice search is not available yet."
                  })}
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <span className="h-5 w-px bg-border"></span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-primary"
                  aria-label="AI search"
                  onClick={() => toast({
                    title: "AI Assistant",
                    description: "Ask me anything about current events!"
                  })}
                >
                  <Sparkles className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button 
              type="submit" 
              className="ml-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
              disabled={isSearching}
            >
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="text-muted-foreground mr-1">Trending:</span>
            {["Union Budget", "Cricket World Cup", "Assembly Elections", "Startup India"].map((term) => (
              <button
                key={term}
                type="button"
                className="bg-muted/50 hover:bg-muted px-2 py-1 rounded-full transition-colors"
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
