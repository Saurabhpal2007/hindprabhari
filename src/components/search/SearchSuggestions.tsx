
import { useState, useEffect } from "react";
import { SearchIcon, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SearchSuggestionsProps {
  query: string;
  onSelectSuggestion: (suggestion: string) => void;
}

interface Suggestion {
  id: number;
  title: string;
  category: string;
  url: string;
}

const SearchSuggestions = ({ query, onSelectSuggestion }: SearchSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    // Simulate API call
    setLoading(true);
    
    // In a real implementation, this would be an API call
    const fetchSuggestions = setTimeout(() => {
      // Mock suggestions based on query
      const mockSuggestions: Suggestion[] = [
        { id: 1, title: `${query} in politics today`, category: "Politics", url: "/article/1" },
        { id: 2, title: `How ${query} affects the economy`, category: "Economy", url: "/article/2" },
        { id: 3, title: `${query} technology innovations`, category: "Technology", url: "/article/3" },
        { id: 4, title: `${query} and its impact on society`, category: "Society", url: "/article/4" },
      ];
      
      setSuggestions(mockSuggestions);
      setLoading(false);
    }, 300);

    return () => clearTimeout(fetchSuggestions);
  }, [query]);

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-md z-10 max-h-[300px] overflow-y-auto">
      {loading ? (
        <div className="p-3 text-sm text-muted-foreground">Loading suggestions...</div>
      ) : suggestions.length > 0 ? (
        <>
          {suggestions.map((suggestion) => (
            <Link
              key={suggestion.id}
              to={suggestion.url}
              className="block p-3 hover:bg-accent hover:text-accent-foreground border-b last:border-0"
              onClick={() => onSelectSuggestion(suggestion.title)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{suggestion.title}</div>
                  <div className="text-xs text-muted-foreground">{suggestion.category}</div>
                </div>
                <ArrowRight className="h-4 w-4 flex-shrink-0" />
              </div>
            </Link>
          ))}
          <Link
            to={`/search?q=${encodeURIComponent(query)}`}
            className="flex items-center justify-center p-3 text-sm text-primary hover:bg-accent hover:text-accent-foreground font-medium"
            onClick={() => onSelectSuggestion(query)}
          >
            <SearchIcon className="h-4 w-4 mr-2" />
            See all results for "{query}"
          </Link>
        </>
      ) : (
        <div className="p-3 text-sm text-muted-foreground">No suggestions found</div>
      )}
    </div>
  );
};

export default SearchSuggestions;
