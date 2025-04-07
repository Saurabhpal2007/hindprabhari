
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, User, Clock, Search, Filter, SlidersHorizontal, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

// Mock categories for filtering
const categories = [
  "Politics", "Business", "Technology", "Sports", "Entertainment", 
  "Health", "Education", "Science", "Travel", "Lifestyle"
];

// Mock time filters
const timeFilters = [
  { id: "anytime", label: "Anytime" },
  { id: "past-day", label: "Past 24 Hours" },
  { id: "past-week", label: "Past Week" },
  { id: "past-month", label: "Past Month" },
  { id: "past-year", label: "Past Year" }
];

interface SearchResult {
  id: number;
  title: string;
  summary: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  url: string;
  type: "article" | "video" | "image";
}

// Mock search results function
const getMockSearchResults = (query: string): SearchResult[] => {
  // This would be replaced with an actual API call
  return Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `${query} - Sample Search Result ${i + 1}`,
    summary: `This is a sample search result for "${query}" that would contain relevant information about the topic.`,
    category: categories[Math.floor(Math.random() * categories.length)],
    author: "Author Name",
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    readTime: `${Math.floor(Math.random() * 10) + 2} min read`,
    imageUrl: `https://source.unsplash.com/random/400x300?${query.split(" ").join(",")}`,
    url: `/article/${i + 1}`,
    type: i % 5 === 0 ? "video" : i % 7 === 0 ? "image" : "article"
  }));
};

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("q") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("anytime");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  const performSearch = (query: string) => {
    setLoading(true);
    
    // Simulating an API call delay
    setTimeout(() => {
      const results = getMockSearchResults(query);
      setResults(results);
      setFilteredResults(results);
      setLoading(false);
    }, 800);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      performSearch(searchQuery);
    }
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const applyFilters = () => {
    let filtered = [...results];
    
    // Filter by type if not "all"
    if (activeTab !== "all") {
      filtered = filtered.filter(item => item.type === activeTab);
    }
    
    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(item => selectedCategories.includes(item.category));
    }
    
    // Apply time filter (in a real app, this would use actual date logic)
    // Here we're just simulating it
    if (selectedTimeFilter !== "anytime") {
      const now = new Date();
      let cutoffDate = new Date();
      
      switch (selectedTimeFilter) {
        case "past-day":
          cutoffDate.setDate(now.getDate() - 1);
          break;
        case "past-week":
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case "past-month":
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case "past-year":
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      filtered = filtered.filter(item => new Date(item.date) >= cutoffDate);
    }
    
    setFilteredResults(filtered);
  };

  // Apply filters whenever selection changes
  useEffect(() => {
    applyFilters();
  }, [activeTab, selectedCategories, selectedTimeFilter, results]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTimeFilter("anytime");
    setActiveTab("all");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <>
      <Helmet>
        <title>{initialQuery ? `Search results for "${initialQuery}"` : "Search"} - HindPrabhari</title>
        <meta 
          name="description" 
          content={`Search results for "${initialQuery}" on HindPrabhari. Find the latest news, articles, videos, and more.`}
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles, videos, and more..."
                className="pl-10 pr-4 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg">Search</Button>
          </form>
        </div>

        {initialQuery && (
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <div>
                <h1 className="text-xl font-semibold">
                  {loading ? (
                    <Skeleton className="h-8 w-64" />
                  ) : (
                    `Search results for "${initialQuery}"`
                  )}
                </h1>
                {!loading && (
                  <p className="text-sm text-muted-foreground">
                    Found {filteredResults.length} results
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  className="flex items-center"
                  onClick={() => setFiltersOpen(!filtersOpen)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  <span>Filters</span>
                  {(selectedCategories.length > 0 || selectedTimeFilter !== "anytime") && (
                    <Badge variant="secondary" className="ml-2">
                      {selectedCategories.length + (selectedTimeFilter !== "anytime" ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
                
                {(selectedCategories.length > 0 || selectedTimeFilter !== "anytime") && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={clearFilters}
                    className="flex items-center"
                  >
                    <X className="h-4 w-4 mr-1" />
                    <span>Clear</span>
                  </Button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filters Sidebar - conditionally shown on mobile */}
              <div className={`lg:block ${filtersOpen ? 'block' : 'hidden'}`}>
                <div className="bg-card rounded-lg border p-4 sticky top-20">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold">Filters</h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setFiltersOpen(false)}
                      className="lg:hidden"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Categories Filter */}
                    <div>
                      <h3 className="text-sm font-medium mb-3">Categories</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center">
                            <Checkbox 
                              id={`category-${category}`}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => handleCategoryToggle(category)}
                            />
                            <label 
                              htmlFor={`category-${category}`}
                              className="ml-2 text-sm cursor-pointer"
                            >
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Time Filter */}
                    <div>
                      <h3 className="text-sm font-medium mb-3">Time Period</h3>
                      <div className="space-y-2">
                        {timeFilters.map((filter) => (
                          <div key={filter.id} className="flex items-center">
                            <Checkbox 
                              id={`time-${filter.id}`}
                              checked={selectedTimeFilter === filter.id}
                              onCheckedChange={() => setSelectedTimeFilter(
                                selectedTimeFilter === filter.id ? "anytime" : filter.id
                              )}
                            />
                            <label 
                              htmlFor={`time-${filter.id}`}
                              className="ml-2 text-sm cursor-pointer"
                            >
                              {filter.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Search Results */}
              <div className="lg:col-span-3">
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="all">All Results</TabsTrigger>
                    <TabsTrigger value="article">Articles</TabsTrigger>
                    <TabsTrigger value="video">Videos</TabsTrigger>
                    <TabsTrigger value="image">Images</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value={activeTab} className="mt-0">
                    {loading ? (
                      <div className="space-y-6">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Card key={i}>
                            <CardContent className="p-0">
                              <div className="flex flex-col md:flex-row gap-4 p-4">
                                <Skeleton className="h-40 w-full md:w-48 rounded-md flex-shrink-0" />
                                <div className="flex-1 space-y-3">
                                  <Skeleton className="h-4 w-20" />
                                  <Skeleton className="h-6 w-full" />
                                  <Skeleton className="h-4 w-3/4" />
                                  <Skeleton className="h-4 w-1/2" />
                                  <div className="flex gap-3 pt-2">
                                    <Skeleton className="h-3 w-24" />
                                    <Skeleton className="h-3 w-16" />
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : filteredResults.length > 0 ? (
                      <div className="space-y-6">
                        {filteredResults.map((result) => (
                          <Card key={result.id} className="overflow-hidden hover:shadow-md transition-shadow">
                            <CardContent className="p-0">
                              <Link to={result.url} className="flex flex-col md:flex-row gap-4 p-4">
                                <div className="relative md:w-48 h-40 flex-shrink-0">
                                  <img 
                                    src={result.imageUrl} 
                                    alt={result.title}
                                    className="w-full h-full object-cover rounded-md"
                                  />
                                  {result.type === "video" && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-md">
                                      <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-primary border-b-[8px] border-b-transparent ml-1"></div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <Badge className="mb-2">{result.category}</Badge>
                                  <h2 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">
                                    {result.title}
                                  </h2>
                                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                                    {result.summary}
                                  </p>
                                  <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-3">
                                    <div className="flex items-center">
                                      <User className="h-3 w-3 mr-1" />
                                      <span>{result.author}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Calendar className="h-3 w-3 mr-1" />
                                      <span>{formatDate(result.date)}</span>
                                    </div>
                                    {result.type === "article" && (
                                      <div className="flex items-center">
                                        <Clock className="h-3 w-3 mr-1" />
                                        <span>{result.readTime}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </Link>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <h3 className="text-lg font-semibold mb-2">No results found</h3>
                        <p className="text-muted-foreground mb-6">
                          No {activeTab === "all" ? "results" : activeTab + "s"} found for "{initialQuery}".
                          {(selectedCategories.length > 0 || selectedTimeFilter !== "anytime") && 
                            " Try adjusting your filters or search with different keywords."}
                        </p>
                        {(selectedCategories.length > 0 || selectedTimeFilter !== "anytime") && (
                          <Button onClick={clearFilters}>Clear Filters</Button>
                        )}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
