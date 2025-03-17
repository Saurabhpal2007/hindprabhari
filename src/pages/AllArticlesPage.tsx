
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bookmark, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Eye, 
  Filter, 
  MessageSquare, 
  Search,
  Share2, 
  X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "../components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Sample article data (more extensive for the all articles page)
const allArticlesData = [
  // Politics
  {
    id: "pol-1",
    title: "New Policy Reform Announced by Government",
    excerpt: "Government launches comprehensive policy reform addressing various sectors including education, healthcare, and infrastructure.",
    date: "2023-05-15",
    readTime: "5 min",
    author: "Rahul Sharma",
    category: "Politics",
    views: 1245,
    comments: 18,
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?ixlib=rb-4.0.3"
  },
  {
    id: "pol-2",
    title: "Parliament Debates New Economic Measures",
    excerpt: "Members of Parliament engage in heated debate over proposed economic measures aimed at boosting growth.",
    date: "2023-05-10",
    readTime: "4 min",
    author: "Priya Singh",
    category: "Politics",
    views: 890,
    comments: 12,
    image: "https://images.unsplash.com/photo-1575320181282-9afab399332c?ixlib=rb-4.0.3"
  },
  {
    id: "pol-3",
    title: "Election Commission Announces Poll Dates",
    excerpt: "The Election Commission has released the schedule for upcoming state assembly elections in five states.",
    date: "2023-05-05",
    readTime: "3 min",
    author: "Anand Kumar",
    category: "Politics",
    views: 1560,
    comments: 24,
    image: "https://images.unsplash.com/photo-1581025026888-77f223d2e352?ixlib=rb-4.0.3"
  },
  
  // Technology
  {
    id: "tech-1",
    title: "New AI Model Breaks Performance Records",
    excerpt: "Researchers unveil groundbreaking AI model that sets new benchmarks in natural language processing and computer vision tasks.",
    date: "2023-05-17",
    readTime: "4 min",
    author: "Vikram Iyer",
    category: "Technology",
    views: 2150,
    comments: 32,
    image: "https://images.unsplash.com/photo-1675271591211-da39259b686a?ixlib=rb-4.0.3"
  },
  {
    id: "tech-2",
    title: "Indian Startup Launches Revolutionary EV Battery",
    excerpt: "Bangalore-based startup develops battery technology promising 50% more range and faster charging for electric vehicles.",
    date: "2023-05-12",
    readTime: "5 min",
    author: "Kavita Reddy",
    category: "Technology",
    views: 1850,
    comments: 27,
    image: "https://images.unsplash.com/photo-1554744512-d6c603f27c54?ixlib=rb-4.0.3"
  },
  
  // Sports
  {
    id: "sport-1",
    title: "Indian Cricket Team Announces Squad for World Cup",
    excerpt: "Selectors reveal 15-member squad for upcoming Cricket World Cup with some surprise inclusions and exclusions.",
    date: "2023-05-18",
    readTime: "4 min",
    author: "Suresh Menon",
    category: "Sports",
    views: 3500,
    comments: 45,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3"
  },
  
  // Entertainment
  {
    id: "ent-1",
    title: "Bollywood Blockbuster Breaks Box Office Records",
    excerpt: "Latest release from top director-actor duo shatters all previous box office records in opening weekend.",
    date: "2023-05-16",
    readTime: "4 min",
    author: "Neha Kapoor",
    category: "Entertainment",
    views: 4200,
    comments: 38,
    image: "https://images.unsplash.com/photo-1616469829941-c7200edec809?ixlib=rb-4.0.3"
  },
  
  // Education
  {
    id: "edu-1",
    title: "NEP 2020: Implementation Progress Report",
    excerpt: "Ministry releases comprehensive report on implementation status of National Education Policy across states.",
    date: "2023-05-17",
    readTime: "6 min",
    author: "Anita Desai",
    category: "Education",
    views: 1780,
    comments: 22,
    image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3"
  },
  
  // Health
  {
    id: "health-1",
    title: "New Medical Research Breakthrough in Cancer Treatment",
    excerpt: "Indian scientists develop promising new approach to targeted cancer therapy with reduced side effects.",
    date: "2023-05-18",
    readTime: "5 min",
    author: "Dr. Rajan Patel",
    category: "Health",
    views: 2340,
    comments: 29,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3"
  },
  
  // World
  {
    id: "world-1",
    title: "Global Summit on Climate Change Concludes",
    excerpt: "World leaders agree on ambitious targets to reduce carbon emissions and increase renewable energy adoption.",
    date: "2023-05-16",
    readTime: "6 min",
    author: "Michael Chang",
    category: "World",
    views: 2150,
    comments: 31,
    image: "https://images.unsplash.com/photo-1564594985645-4427056e22e2?ixlib=rb-4.0.3"
  },
  
  // Business
  {
    id: "biz-1",
    title: "Stock Market Hits All-Time High",
    excerpt: "Sensex and Nifty reach historic levels driven by strong corporate earnings and positive economic indicators.",
    date: "2023-05-17",
    readTime: "4 min",
    author: "Rahul Nair",
    category: "Business",
    views: 3120,
    comments: 35,
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3"
  },
  {
    id: "biz-2",
    title: "Major Merger Creates Industry Giant",
    excerpt: "Two leading companies complete merger creating new powerhouse in technology services sector.",
    date: "2023-05-14",
    readTime: "5 min",
    author: "Priya Mehta",
    category: "Business",
    views: 2450,
    comments: 28,
    image: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?ixlib=rb-4.0.3"
  },
];

// Define categories for filter
const categories = [
  "Politics", 
  "Technology", 
  "Sports", 
  "Entertainment", 
  "Education", 
  "Health", 
  "World", 
  "Business"
];

// Define time periods for filter
const timePeriods = [
  "Today",
  "This Week",
  "This Month",
  "This Year",
  "All Time"
];

const AllArticlesPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("latest");
  const [timePeriod, setTimePeriod] = useState("All Time");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredArticles, setFilteredArticles] = useState(allArticlesData);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { toast } = useToast();
  
  const articlesPerPage = 9;

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply filters and search
    let results = [...allArticlesData];
    
    // Search query filter
    if (searchQuery) {
      results = results.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Category filter
    if (selectedCategories.length > 0) {
      results = results.filter(article => 
        selectedCategories.includes(article.category)
      );
    }
    
    // Sort results
    switch (sortBy) {
      case "latest":
        results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "oldest":
        results.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "mostViewed":
        results.sort((a, b) => b.views - a.views);
        break;
      case "mostCommented":
        results.sort((a, b) => b.comments - a.comments);
        break;
      default:
        break;
    }
    
    // Time period filter (simplified, would be more complex in real app)
    if (timePeriod !== "All Time") {
      const today = new Date();
      let startDate = new Date();
      
      switch (timePeriod) {
        case "Today":
          startDate.setHours(0, 0, 0, 0);
          break;
        case "This Week":
          startDate.setDate(today.getDate() - 7);
          break;
        case "This Month":
          startDate.setMonth(today.getMonth() - 1);
          break;
        case "This Year":
          startDate.setFullYear(today.getFullYear() - 1);
          break;
        default:
          break;
      }
      
      results = results.filter(article => 
        new Date(article.date) >= startDate
      );
    }
    
    setFilteredArticles(results);
    setCurrentPage(1); // Reset to first page when filters change
    
    // Set active filters for display
    const activeFiltersList: string[] = [];
    if (searchQuery) activeFiltersList.push(`Search: "${searchQuery}"`);
    if (selectedCategories.length > 0) activeFiltersList.push(`Categories: ${selectedCategories.join(', ')}`);
    if (timePeriod !== "All Time") activeFiltersList.push(`Time: ${timePeriod}`);
    if (sortBy !== "latest") {
      const sortLabel = sortBy === "oldest" ? "Oldest First" : 
                        sortBy === "mostViewed" ? "Most Viewed" : 
                        "Most Commented";
      activeFiltersList.push(`Sort: ${sortLabel}`);
    }
    
    setActiveFilters(activeFiltersList);
    
  }, [searchQuery, selectedCategories, sortBy, timePeriod]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSortBy("latest");
    setTimePeriod("All Time");
    setIsFilterOpen(false);
  };

  const removeFilter = (filter: string) => {
    if (filter.startsWith("Search:")) {
      setSearchQuery("");
    } else if (filter.startsWith("Categories:")) {
      setSelectedCategories([]);
    } else if (filter.startsWith("Time:")) {
      setTimePeriod("All Time");
    } else if (filter.startsWith("Sort:")) {
      setSortBy("latest");
    }
  };

  const handleBookmark = (articleId: string) => {
    toast({
      title: "Article Bookmarked",
      description: "This article has been saved to your bookmarks.",
    });
  };

  const handleShare = (articleId: string) => {
    toast({
      title: "Share Article",
      description: "Sharing options will be available soon.",
    });
  };

  // Calculate pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  // Generate pagination items
  const paginationItems = [];
  
  // Add previous button
  paginationItems.push(
    <PaginationItem key="prev">
      <PaginationPrevious 
        href="#" 
        onClick={(e) => {
          e.preventDefault();
          if (currentPage > 1) setCurrentPage(currentPage - 1);
        }} 
        isActive={currentPage > 1}
      />
    </PaginationItem>
  );
  
  // Add page numbers
  for (let i = 1; i <= totalPages; i++) {
    // Show: first page, last page, current page and 1 page before/after current page
    if (
      i === 1 || 
      i === totalPages || 
      i === currentPage || 
      i === currentPage - 1 || 
      i === currentPage + 1
    ) {
      paginationItems.push(
        <PaginationItem key={i}>
          <PaginationLink 
            href="#" 
            isActive={i === currentPage} 
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    } 
    // Add ellipsis for skipped pages
    else if (
      (i === currentPage - 2 && currentPage > 3) || 
      (i === currentPage + 2 && currentPage < totalPages - 2)
    ) {
      paginationItems.push(
        <PaginationItem key={`ellipsis-${i}`}>
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
  }
  
  // Add next button
  paginationItems.push(
    <PaginationItem key="next">
      <PaginationNext 
        href="#" 
        onClick={(e) => {
          e.preventDefault();
          if (currentPage < totalPages) setCurrentPage(currentPage + 1);
        }} 
        isActive={currentPage < totalPages}
      />
    </PaginationItem>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {/* Page Header */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">All Articles</h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Browse our complete collection of articles across all categories. Use the filters to find exactly what you're looking for.
              </p>
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10 pr-4 h-11 rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9" 
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button className="rounded-full md:w-auto">
                    <Filter className="h-5 w-5 mr-2" />
                    Filter
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full md:max-w-md">
                  <SheetHeader>
                    <SheetTitle>Filter Articles</SheetTitle>
                    <SheetDescription>
                      Apply filters to find specific articles. Click apply when you're done.
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="py-6 space-y-6">
                    {/* Categories */}
                    <div>
                      <h4 className="font-medium mb-3">Categories</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`category-${category}`} 
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => handleCategoryToggle(category)}
                            />
                            <label 
                              htmlFor={`category-${category}`}
                              className="text-sm cursor-pointer"
                            >
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Time Period */}
                    <div>
                      <h4 className="font-medium mb-3">Time Period</h4>
                      <Select value={timePeriod} onValueChange={setTimePeriod}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select time period" />
                        </SelectTrigger>
                        <SelectContent>
                          {timePeriods.map((period) => (
                            <SelectItem key={period} value={period}>
                              {period}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Separator />
                    
                    {/* Sort By */}
                    <div>
                      <h4 className="font-medium mb-3">Sort By</h4>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sort articles by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="latest">Latest First</SelectItem>
                          <SelectItem value="oldest">Oldest First</SelectItem>
                          <SelectItem value="mostViewed">Most Viewed</SelectItem>
                          <SelectItem value="mostCommented">Most Commented</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <SheetFooter className="flex-row justify-between sm:justify-between">
                    <Button variant="outline" onClick={clearFilters}>
                      Reset Filters
                    </Button>
                    <SheetClose asChild>
                      <Button>Apply Filters</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              
              <Select value={sortBy} onValueChange={setSortBy} className="w-full md:w-48">
                <SelectTrigger className="h-11 rounded-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="mostViewed">Most Viewed</SelectItem>
                  <SelectItem value="mostCommented">Most Commented</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {activeFilters.map((filter) => (
                  <Badge 
                    key={filter} 
                    variant="outline" 
                    className="py-1.5 px-3 rounded-full flex items-center"
                  >
                    {filter}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-5 w-5 ml-1 -mr-1" 
                      onClick={() => removeFilter(filter)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                  Clear All
                </Button>
              </div>
            )}
            
            {/* Results Summary */}
            <p className="text-muted-foreground mb-8">
              Showing {currentArticles.length > 0 ? indexOfFirstArticle + 1 : 0} - {Math.min(indexOfLastArticle, filteredArticles.length)} of {filteredArticles.length} articles
            </p>
            
            {/* Articles Grid */}
            {currentArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {currentArticles.map((article) => (
                  <Card key={article.id} className="hover-scale overflow-hidden h-full">
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                      />
                      <Link 
                        to={`/${article.category.toLowerCase()}`} 
                        className="absolute top-2 left-2 text-xs font-medium bg-background/80 text-foreground px-2 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {article.category}
                      </Link>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl line-clamp-2">
                        <Link to={`/article/${article.id}`} className="hover:text-primary transition-colors">
                          {article.title}
                        </Link>
                      </CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground space-x-2 mt-2">
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>{article.date}</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-muted-foreground/70"></div>
                        <div className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>{article.readTime}</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-muted-foreground/70"></div>
                        <div className="flex items-center">
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          <span>{article.views}</span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-2">
                      <CardDescription className="line-clamp-3">
                        {article.excerpt}
                      </CardDescription>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between pt-0">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-muted-foreground hover:text-primary"
                        onClick={() => handleBookmark(article.id)}
                      >
                        <Bookmark className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-muted-foreground hover:text-primary"
                        onClick={() => handleShare(article.id)}
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-muted-foreground hover:text-primary"
                        asChild
                      >
                        <Link to={`/article/${article.id}#comments`}>
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span>{article.comments}</span>
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <h3 className="text-xl font-medium mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter criteria.
                </p>
                <Button onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
            
            {/* Pagination */}
            {filteredArticles.length > 0 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  {paginationItems}
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AllArticlesPage;
