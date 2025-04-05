
import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, TrendingUp, Zap, BarChart3 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";

// Mock data for trending categories
const trendingCategories = [
  { id: "trending", label: "Trending", icon: <TrendingUp className="h-4 w-4" /> },
  { id: "latest", label: "Latest", icon: <Clock className="h-4 w-4" /> },
  { id: "popular", label: "Popular", icon: <BarChart3 className="h-4 w-4" /> },
  { id: "breaking", label: "Breaking", icon: <Zap className="h-4 w-4" /> },
];

// Mock trending articles data
const mockTrendingData = {
  trending: [
    {
      id: "1",
      title: "Global Markets Respond to Latest Economic Indicators",
      excerpt: "Major indices show mixed reactions as inflation data surprises economists...",
      category: "Business",
      time: "2 hours ago",
      imageUrl: "/placeholder.svg",
      readTime: "4 min read",
    },
    {
      id: "2",
      title: "Tech Innovation Summit Announces Breakthrough AI Research",
      excerpt: "Industry leaders reveal advancements in artificial intelligence technology...",
      category: "Technology",
      time: "5 hours ago",
      imageUrl: "/placeholder.svg",
      readTime: "6 min read",
    },
    {
      id: "3",
      title: "Climate Agreement Reaches New Milestone with Global Participation",
      excerpt: "Nations commit to ambitious carbon reduction targets in historic accord...",
      category: "Environment",
      time: "7 hours ago",
      imageUrl: "/placeholder.svg",
      readTime: "5 min read",
    },
    {
      id: "4",
      title: "Cultural Festival Celebrates Diversity with Record Attendance",
      excerpt: "Annual event showcases traditional arts, cuisine, and performances...",
      category: "Culture",
      time: "9 hours ago",
      imageUrl: "/placeholder.svg",
      readTime: "3 min read",
    },
  ],
  latest: [
    {
      id: "5",
      title: "Healthcare Initiative Expands Access to Rural Communities",
      excerpt: "New program brings medical services to underserved areas with mobile clinics...",
      category: "Health",
      time: "Just now",
      imageUrl: "/placeholder.svg",
      readTime: "4 min read",
    },
    {
      id: "6",
      title: "Education Reform Bill Passes with Bipartisan Support",
      excerpt: "Legislation introduces major changes to funding and curriculum standards...",
      category: "Education",
      time: "30 minutes ago",
      imageUrl: "/placeholder.svg",
      readTime: "7 min read",
    },
    {
      id: "7",
      title: "Sports Championship Sees Dramatic Final-Minute Victory",
      excerpt: "Underdog team claims title with remarkable comeback in closing moments...",
      category: "Sports",
      time: "1 hour ago",
      imageUrl: "/placeholder.svg",
      readTime: "5 min read",
    },
    {
      id: "8",
      title: "Space Mission Successfully Deploys New Satellite Constellation",
      excerpt: "Network will provide advanced communications capabilities globally...",
      category: "Science",
      time: "2 hours ago",
      imageUrl: "/placeholder.svg",
      readTime: "6 min read",
    },
  ],
  popular: [
    {
      id: "9",
      title: "Celebrity Interview Reveals Behind-the-Scenes Industry Insights",
      excerpt: "Award-winning actor discusses upcoming projects and career challenges...",
      category: "Entertainment",
      time: "1 day ago",
      imageUrl: "/placeholder.svg",
      readTime: "8 min read",
    },
    {
      id: "10",
      title: "Food Trend Analysis Shows Shift Toward Sustainable Choices",
      excerpt: "Consumer preferences increasingly favor eco-friendly production methods...",
      category: "Food",
      time: "2 days ago",
      imageUrl: "/placeholder.svg",
      readTime: "4 min read",
    },
    {
      id: "11",
      title: "Historical Discovery Changes Understanding of Ancient Civilization",
      excerpt: "Archaeological find provides new evidence of advanced technologies...",
      category: "History",
      time: "3 days ago",
      imageUrl: "/placeholder.svg",
      readTime: "9 min read",
    },
    {
      id: "12",
      title: "Travel Destination Named World's Best for Third Consecutive Year",
      excerpt: "Combination of natural beauty and cultural experiences cited as key factors...",
      category: "Travel",
      time: "4 days ago",
      imageUrl: "/placeholder.svg",
      readTime: "5 min read",
    },
  ],
  breaking: [
    {
      id: "13",
      title: "BREAKING: Major Policy Announcement Expected Within Hours",
      excerpt: "Government officials prepare statement on significant regulatory changes...",
      category: "Politics",
      time: "10 minutes ago",
      imageUrl: "/placeholder.svg",
      readTime: "2 min read",
    },
    {
      id: "14",
      title: "BREAKING: Emergency Response Activated Following Regional Incident",
      excerpt: "Authorities coordinate efforts as situation develops in eastern district...",
      category: "National",
      time: "25 minutes ago",
      imageUrl: "/placeholder.svg",
      readTime: "3 min read",
    },
    {
      id: "15",
      title: "BREAKING: Scientific Breakthrough Announced in Medical Research",
      excerpt: "Team reports potential revolution in treatment of widespread condition...",
      category: "Health",
      time: "45 minutes ago",
      imageUrl: "/placeholder.svg",
      readTime: "4 min read",
    },
    {
      id: "16",
      title: "BREAKING: International Agreement Reached After Marathon Negotiations",
      excerpt: "Diplomatic solution found to long-standing dispute between nations...",
      category: "World",
      time: "1 hour ago",
      imageUrl: "/placeholder.svg",
      readTime: "5 min read",
    },
  ],
};

const TrendingSection = () => {
  const [activeCategory, setActiveCategory] = useState("trending");

  return (
    <section className="py-8 md:py-12 bg-muted/30" id="trending">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            What's Happening Now
          </h2>
          <div className="w-full max-w-xl">
            <SegmentedControl value={activeCategory} onValueChange={setActiveCategory}>
              {trendingCategories.map((category) => (
                <SegmentedControlItem 
                  key={category.id} 
                  value={category.id}
                  className="flex items-center gap-2"
                >
                  {category.icon}
                  <span>{category.label}</span>
                </SegmentedControlItem>
              ))}
            </SegmentedControl>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockTrendingData[activeCategory as keyof typeof mockTrendingData]?.map((article) => (
            <Card key={article.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
              <Link to={`/article/${article.id}`}>
                <div className="relative aspect-video">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-primary/80 backdrop-blur-sm">
                    {article.category}
                  </Badge>
                </div>
              </Link>
              <CardContent className="p-4">
                <Link to={`/article/${article.id}`}>
                  <h3 className="font-semibold text-lg line-clamp-2 mb-2 hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                  {article.excerpt}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between text-xs text-muted-foreground">
                <span>{article.time}</span>
                <span>{article.readTime}</span>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link 
            to={`/${activeCategory}`}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
          >
            View all {activeCategory}
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
