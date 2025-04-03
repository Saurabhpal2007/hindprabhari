
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  CommandDialog, 
  CommandInput, 
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from "@/components/ui/command";
import { useAI } from "@/context/AIContext";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import VoiceSearchButton from "./VoiceSearchButton";

// Sample search suggestions
const initialSuggestions = [
  { id: 1, text: "Latest political developments", category: "Politics" },
  { id: 2, text: "COVID-19 updates", category: "Health" },
  { id: 3, text: "Stock market analysis", category: "Business" },
  { id: 4, text: "Cricket match results", category: "Sports" },
  { id: 5, text: "Technology trends", category: "Technology" },
];

const SmartSearch: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { isAIEnabled } = useAI();
  const navigate = useNavigate();
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches).slice(0, 5));
    }
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleVoiceSearch = useCallback((transcript: string) => {
    setQuery(transcript);
    setOpen(true);
    
    // Simulate search after voice input
    setTimeout(() => {
      handleSelect(transcript);
    }, 1000);
  }, []);

  const addToRecentSearches = (text: string) => {
    const updated = [text, ...recentSearches.filter(item => item !== text)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  useEffect(() => {
    if (query.length > 2 && isAIEnabled) {
      setIsLoading(true);
      // Simulate AI-enhanced search suggestions
      const timer = setTimeout(() => {
        const filtered = initialSuggestions.filter(item => 
          item.text.toLowerCase().includes(query.toLowerCase())
        );
        
        // Add AI-enhanced suggestions
        const aiSuggestions = [
          { 
            id: 100, 
            text: `Analysis on "${query}"`, 
            category: "AI-Enhanced", 
            isAI: true 
          },
          { 
            id: 101, 
            text: `Latest news about "${query}"`, 
            category: "AI-Enhanced", 
            isAI: true 
          },
          { 
            id: 102, 
            text: `Opinion pieces on "${query}"`, 
            category: "AI-Enhanced", 
            isAI: true 
          }
        ];
        
        setSuggestions([...aiSuggestions, ...filtered]);
        setIsLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setSuggestions(initialSuggestions);
    }
  }, [query, isAIEnabled]);

  const handleSelect = (text: string) => {
    addToRecentSearches(text);
    setOpen(false);
    navigate(`/articles?q=${encodeURIComponent(text)}`);
    
    toast({
      title: "Search initiated",
      description: `Showing results for: "${text}"`,
    });
  };

  return (
    <>
      <Button
        variant="outlined"
        className="relative h-9 w-full justify-start rounded-lg text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64 transition-all duration-200"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search news...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
        {isAIEnabled && (
          <div className="absolute right-8 top-1.5 h-5 w-5 text-primary hidden sm:flex">
            <Sparkles />
          </div>
        )}
      </Button>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <CommandInput
            ref={inputRef}
            placeholder="Search news, events, topics..."
            value={query}
            onValueChange={setQuery}
            className="flex-1 border-0 focus:ring-0 focus:outline-none"
          />
          <div className="flex items-center">
            {query && (
              <Button 
                variant="ghost" 
                size="icon"
                className="h-7 w-7"
                onClick={() => setQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <VoiceSearchButton onResult={handleVoiceSearch} />
          </div>
        </div>
        <CommandList>
          <CommandEmpty className="py-6 text-center text-sm">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-full border-b-2 border-t-2 border-primary animate-spin"></div>
                <p className="mt-2">Searching with AI...</p>
              </div>
            ) : (
              <p>No results found.</p>
            )}
          </CommandEmpty>
          
          {recentSearches.length > 0 && (
            <CommandGroup heading="Recent Searches">
              {recentSearches.map((text) => (
                <CommandItem
                  key={`recent-${text}`}
                  onSelect={() => handleSelect(text)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <span>{text}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 opacity-50" />
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          
          <CommandGroup heading="Suggestions">
            {suggestions.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => handleSelect(item.text)}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center">
                  {(item as any).isAI && (
                    <Sparkles className="h-4 w-4 mr-2 text-primary" />
                  )}
                  <span>{item.text}</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="outline" className="mr-2 group-hover:bg-primary/10 transition-colors">
                    {item.category}
                  </Badge>
                  <ArrowRight className="h-4 w-4 opacity-50" />
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SmartSearch;
