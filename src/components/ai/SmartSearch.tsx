import React, { useState, useCallback } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAI } from "@/context/AIContext";
import { useDebounce } from "@/hooks/use-debounce";

interface SmartSearchProps {
  className?: string;
}

const SmartSearch: React.FC<SmartSearchProps> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { addMessage, isLoading } = useAI();
  const [open, setOpen] = useState(false);

  const handleSearch = useCallback(() => {
    if (!debouncedSearchQuery.trim()) return;
    addMessage(debouncedSearchQuery, true);
    setOpen(false);
  }, [addMessage, debouncedSearchQuery]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <span>Search...</span>
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <div className="p-2">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type your question..."
            className="focus-visible:ring-ring"
            onKeyDown={handleKeyDown}
          />
          <Button
            onClick={handleSearch}
            disabled={isLoading || !searchQuery.trim()}
            variant="outlined"
            className="ml-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SmartSearch;
