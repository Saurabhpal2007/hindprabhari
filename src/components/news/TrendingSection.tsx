
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Globe, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface TrendingArticle {
  id: string;
  title: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
}

const trendingArticles: Record<string, TrendingArticle[]> = {
  today: [
    {
      id: "1",
      title: "Government Announces Major Economic Reforms to Boost Infrastructure",
      category: "Politics",
      image: "/placeholder.svg",
      author: "Rahul Sharma",
      date: "2 hours ago",
      readTime: "5 min"
    },
    {
      id: "2",
      title: "Cricket Team Secures Historic Win Against Australia",
      category: "Sports",
      image: "/placeholder.svg",
      author: "Anjali Patel",
      date: "4 hours ago",
      readTime: "4 min"
    },
    {
      id: "3",
      title: "New AI Breakthrough from Indian Tech Startup",
      category: "Technology",
      image: "/placeholder.svg",
      author: "Vikram Singh",
      date: "6 hours ago",
      readTime: "7 min"
    },
    {
      id: "4",
      title: "Cultural Festival Celebrates Diversity Across States",
      category: "Culture",
      image: "/placeholder.svg",
      author: "Priya Mishra",
      date: "8 hours ago",
      readTime: "3 min"
    }
  ],
  weekly: [
    {
      id: "5",
      title: "Space Mission Successfully Launches Satellite for Weather Tracking",
      category: "Science",
      image: "/placeholder.svg",
      author: "Dr. Anil Kumar",
      date: "2 days ago",
      readTime: "6 min"
    },
    {
      id: "6",
      title: "Major Film Breaks Box Office Records Nationwide",
      category: "Entertainment",
      image: "/placeholder.svg",
      author: "Maya Kapoor",
      date: "3 days ago",
      readTime: "4 min"
    },
    {
      id: "7",
      title: "Healthcare Reform Bill Passed in Parliament",
      category: "Health",
      image: "/placeholder.svg",
      author: "Dr. Reena Gupta",
      date: "4 days ago",
      readTime: "8 min"
    },
    {
      id: "8",
      title: "Stock Market Reaches All-Time High Following Policy Changes",
      category: "Business",
      image: "/placeholder.svg",
      author: "Ajay Mehta",
      date: "5 days ago",
      readTime: "5 min"
    }
  ],
  global: [
    {
      id: "9",
      title: "International Climate Summit Reaches Landmark Agreement",
      category: "Environment",
      image: "/placeholder.svg",
      author: "Sarah Johnson",
      date: "1 day ago",
      readTime: "7 min"
    },
    {
      id: "10",
      title: "Tech Giants Launch Initiative for Digital Literacy",
      category: "Technology",
      image: "/placeholder.svg",
      author: "Michael Chen",
      date: "2 days ago",
      readTime: "5 min"
    },
    {
      id: "11",
      title: "Major Trade Deal Signed Between Asia and Europe",
      category: "Economy",
      image: "/placeholder.svg",
      author: "Robert Williams",
      date: "3 days ago",
      readTime: "6 min"
    },
    {
      id: "12",
      title: "International Sports Competition Opens with Spectacular Ceremony",
      category: "Sports",
      image: "/placeholder.svg",
      author: "Elena Martinez",
      date: "4 days ago",
      readTime: "4 min"
    }
  ]
};

const TrendingSection = () => {
  const [activeFilter, setActiveFilter] = useState("today");

  const filterOptions = [
    { value: "today", label: "Today", icon: <Clock className="h-4 w-4" /> },
    { value: "weekly", label: "This Week", icon: <TrendingUp className="h-4 w-4" /> },
    { value: "global", label: "Global", icon: <Globe className="h-4 w-4" /> }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="py-12 px-4 surface-container-low rounded-2xl md-elevation-1">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-3xl font-semibold flex items-center">
            <TrendingUp className="mr-2 h-6 w-6 text-primary" />
            <span className="text-gradient">Trending Now</span>
          </h2>
          
          <div className="flex items-center gap-4">
            <SegmentedControl 
              options={filterOptions}
              value={activeFilter}
              onChange={setActiveFilter}
              className="md-elevation-1"
            />
            
            <Link to="/trending" className="flex items-center text-primary hover:underline group md-state-layer px-3 py-2 rounded-full">
              View All <ArrowRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingArticles[activeFilter].map((article, index) => (
            <motion.div
              key={article.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <Card className="h-full md-card transition-all duration-300 hover:translate-y-[-5px] overflow-hidden">
                <AspectRatio ratio={16/9}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className="object-cover w-full h-full rounded-t-lg"
                  />
                </AspectRatio>
                <CardContent className="p-4">
                  <Badge className="mb-2 bg-primary/10 text-primary border-none">{article.category}</Badge>
                  <Link to={`/article/${article.id}`}>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
                    <span>{article.author}</span>
                    <div className="flex items-center gap-2">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
