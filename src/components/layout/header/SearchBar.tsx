
import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface SearchBarProps {
  isDesktop: boolean;
}

const SearchBar = ({ isDesktop }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(isDesktop);
  const { toast } = useToast();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsSearchExpanded(isDesktop);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        if (!isDesktop) {
          setIsSearchExpanded(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDesktop]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    toast({
      title: "Search",
      description: `Searching for: "${searchQuery}"`,
    });
  };

  return (
    <div ref={searchRef} className={cn(
      "relative transition-all duration-300 mr-2",
      isDesktop ? "w-64" : (isSearchExpanded ? "w-64" : "w-10")
    )}>
      {isSearchExpanded ? (
        <form onSubmit={handleSearch} className="w-full">
          <Input
            type="text"
            placeholder="Search news..."
            className="pr-8 pl-9 h-10 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus={!isDesktop}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          {!isDesktop && (
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0 h-10 w-10 rounded-full" 
              onClick={() => setIsSearchExpanded(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </form>
      ) : (
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-10 w-10 rounded-full"
          onClick={() => setIsSearchExpanded(true)}
        >
          <Search className="h-7 w-7" />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
