
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import NewsGrid from "@/components/news/NewsGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Clock, Calendar } from "lucide-react";

const TrendingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("today");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger a search within trending articles
    console.log("Searching within trending:", searchQuery);
  };

  return (
    <>
      <Helmet>
        <title>Trending News - HindPrabhari</title>
        <meta 
          name="description" 
          content="Explore the most popular and trending news stories from India and around the world on HindPrabhari."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Trending News</h1>
          <p className="text-muted-foreground">
            Discover the most popular and widely-read stories that are capturing attention across India and the world.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search within trending */}
          <div className="flex-1">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search within trending news..."
                className="w-full pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Time filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={timeFilter === "today" ? "filled" : "outline"}
              onClick={() => setTimeFilter("today")}
              size="sm"
              className="flex items-center"
            >
              <Clock className="h-4 w-4 mr-2" />
              Today
            </Button>
            <Button
              variant={timeFilter === "week" ? "filled" : "outline"}
              onClick={() => setTimeFilter("week")}
              size="sm"
              className="flex items-center"
            >
              <Calendar className="h-4 w-4 mr-2" />
              This Week
            </Button>
            <Button
              variant={timeFilter === "month" ? "filled" : "outline"}
              onClick={() => setTimeFilter("month")}
              size="sm"
              className="flex items-center"
            >
              <Calendar className="h-4 w-4 mr-2" />
              This Month
            </Button>
            <Button
              variant={timeFilter === "year" ? "filled" : "outline"}
              onClick={() => setTimeFilter("year")}
              size="sm"
              className="flex items-center"
            >
              <Calendar className="h-4 w-4 mr-2" />
              This Year
            </Button>
          </div>
        </div>

        <NewsGrid category="all" filter="trending" showFilters={false} />
      </div>
    </>
  );
};

export default TrendingPage;
