import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDateRangePicker } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon, Filter, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Sample article data (replace with actual data fetching)
const sampleArticles = [
  {
    id: "art-1",
    title: "Global Tech Summit Concludes with Focus on AI Ethics",
    excerpt: "The annual Global Tech Summit concluded in San Francisco, with discussions centered on the ethical implications of artificial intelligence and its impact on society.",
    date: "2023-05-15",
    author: {
      name: "Jane Doe",
      image: "/placeholder.svg",
      role: "Tech Correspondent"
    },
    category: "Technology",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3"
  },
  {
    id: "art-2",
    title: "New Economic Policy Unveiled by Government",
    excerpt: "The government has announced a new set of economic policies aimed at boosting growth and creating jobs in key sectors.",
    date: "2023-05-10",
    author: {
      name: "John Smith",
      image: "/placeholder.svg",
      role: "Economic Analyst"
    },
    category: "Economy",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3"
  },
  {
    id: "art-3",
    title: "Climate Change Conference Addresses Global Warming",
    excerpt: "World leaders gathered in Geneva to discuss strategies for combating climate change and reducing carbon emissions.",
    date: "2023-05-05",
    author: {
      name: "Alice Johnson",
      image: "/placeholder.svg",
      role: "Environmental Reporter"
    },
    category: "Environment",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3"
  },
  {
    id: "art-4",
    title: "Cultural Festival Celebrates Diversity",
    excerpt: "The annual Cultural Festival in Mumbai showcased the rich diversity of Indian arts, music, and traditions.",
    date: "2023-04-28",
    author: {
      name: "Priya Sharma",
      image: "/placeholder.svg",
      role: "Culture Critic"
    },
    category: "Culture",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3"
  },
  {
    id: "art-5",
    title: "New Advancements in Medical Research Announced",
    excerpt: "Scientists have made significant breakthroughs in cancer research, offering new hope for treatment and prevention.",
    date: "2023-04-20",
    author: {
      name: "David Lee",
      image: "/placeholder.svg",
      role: "Science Journalist"
    },
    category: "Health",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1532938314630-e94398ca03ca?ixlib=rb-4.0.3"
  },
  {
    id: "art-6",
    title: "Local Elections See High Voter Turnout",
    excerpt: "Citizens across the state turned out in large numbers to cast their votes in the local elections, reflecting a strong interest in civic engagement.",
    date: "2023-04-15",
    author: {
      name: "Rahul Verma",
      image: "/placeholder.svg",
      role: "Political Correspondent"
    },
    category: "Politics",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?ixlib=rb-4.0.3"
  },
  {
    id: "art-7",
    title: "New Space Mission Launched to Explore Mars",
    excerpt: "A new international space mission has been launched to explore the surface of Mars and search for signs of life.",
    date: "2023-04-10",
    author: {
      name: "Emily Carter",
      image: "/placeholder.svg",
      role: "Space Reporter"
    },
    category: "Science",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1606140751437-3c25a9c5af14?ixlib=rb-4.0.3"
  },
  {
    id: "art-8",
    title: "Sports Tournament Brings Together Athletes from Around the World",
    excerpt: "Athletes from over 50 countries competed in the annual International Sports Tournament, showcasing talent and sportsmanship.",
    date: "2023-04-05",
    author: {
      name: "Kevin O'Connell",
      image: "/placeholder.svg",
      role: "Sports Analyst"
    },
    category: "Sports",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1541534720735-344cdb7b9759?ixlib=rb-4.0.3"
  },
  {
    id: "art-9",
    title: "Art Exhibition Features Emerging Artists",
    excerpt: "A new art exhibition in New York City is showcasing the works of emerging artists from around the world.",
    date: "2023-03-28",
    author: {
      name: "Sophia Rodriguez",
      image: "/placeholder.svg",
      role: "Art Critic"
    },
    category: "Art",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1544510238-7a68aca19c9c?ixlib=rb-4.0.3"
  },
  {
    id: "art-10",
    title: "New Book Explores the History of Ancient Civilizations",
    excerpt: "A new book by a renowned historian delves into the history of ancient civilizations and their impact on modern society.",
    date: "2023-03-20",
    author: {
      name: "Thomas Williams",
      image: "/placeholder.svg",
      role: "History Scholar"
    },
    category: "History",
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-4.0.3"
  }
];

const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "technology", label: "Technology" },
  { value: "economy", label: "Economy" },
  { value: "environment", label: "Environment" },
  { value: "culture", label: "Culture" },
  { value: "health", label: "Health" },
  { value: "politics", label: "Politics" },
  { value: "science", label: "Science" },
  { value: "sports", label: "Sports" },
  { value: "art", label: "Art" },
  { value: "history", label: "History" },
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "popular", label: "Popular" },
];

const AllArticlesPage = () => {
  const [articles, setArticles] = useState(sampleArticles);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("newest");
  const [dateRange, setDateRange] = useState<undefined | {
    from?: Date;
    to?: Date;
  }>({
    from: undefined,
    to: undefined,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  const location = useLocation();

  useEffect(() => {
    document.title = "All Articles | HindPrabhari";
  }, []);

  useEffect(() => {
    // Reset current page when filters change
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedSort, dateRange]);

  const filteredArticles = articles.filter((article) => {
    const searchMatch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const categoryMatch = selectedCategory === "all" || article.category.toLowerCase() === selectedCategory;

    const dateMatch = !dateRange?.from ||
      (new Date(article.date) >= dateRange.from &&
        (!dateRange.to || new Date(article.date) <= dateRange.to));

    return searchMatch && categoryMatch && dateMatch;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (selectedSort === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (selectedSort === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      // Replace with actual popularity logic (e.g., view count)
      return 0;
    }
  });

  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);
  const paginatedArticles = sortedArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">All Articles</h1>
            <p className="text-muted-foreground">Explore all the latest news and insights.</p>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSort} onValueChange={setSelectedSort}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !dateRange?.from && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "MMM dd, yyyy")} -{" "}
                        {format(dateRange.to, "MMM dd, yyyy")}
                      </>
                    ) : (
                      format(dateRange.from, "MMM dd, yyyy")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center" side="bottom">
                <CalendarDateRangePicker
                  date={dateRange}
                  onDateChange={setDateRange}
                  className="border-0 shadow-md"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="outline" className="mb-2">{article.category}</Badge>
                      <CardTitle className="text-2xl hover:text-primary transition-colors">
                        <Link to={`/article/${article.id}`}>{article.title}</Link>
                      </CardTitle>
                      <CardDescription className="mt-1 flex items-center text-sm">
                        {article.date} • {article.readTime}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{article.excerpt}</p>
                </CardContent>
                {/*<CardFooter className="border-t pt-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={article.author.image} alt={article.author.name} />
                      <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{article.author.name}</p>
                      <p className="text-xs text-muted-foreground">{article.author.role}</p>
                    </div>
                  </div>
                  <Link to={`/article/${article.id}`}>
                    <Button variant="outline" size="sm">Read More</Button>
                  </Link>
                </CardFooter>*/}
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              {currentPage > 1 && (
                <Button variant="ghost" onClick={() => handlePageChange(currentPage - 1)} className="mr-4">
                  Previous
                </Button>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "default" : "ghost"}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </Button>
              ))}

              {currentPage < totalPages && (
                <Button variant="ghost" onClick={() => handlePageChange(currentPage + 1)} className="ml-4">
                  Next
                </Button>
              )}
            </div>
          )}

          {sortedArticles.length > articlesPerPage && currentPage < totalPages && (
            <div className="flex justify-center mt-8">
              <Button variant="outlined" className="w-full" onClick={handleLoadMore}>
                Load More
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AllArticlesPage;
