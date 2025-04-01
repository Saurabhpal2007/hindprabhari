import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Filter } from 'lucide-react';

const LatestPage = () => {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "Breaking: Government Announces New Economic Stimulus Package",
      excerpt: "The government has unveiled a comprehensive economic stimulus package aimed at boosting growth and creating jobs in the wake of recent economic challenges.",
      date: "May 15, 2023",
      author: {
        name: "Anjali Kapoor",
        image: "/placeholder.svg",
        role: "Senior Economic Correspondent"
      },
      category: "Economy",
      readTime: "7 min read"
    },
    {
      id: 2,
      title: "Supreme Court to Hear Landmark Case on Digital Privacy",
      excerpt: "A crucial case concerning digital privacy rights and data protection is set to be heard by the Supreme Court, potentially reshaping the legal landscape for online activities.",
      date: "June 2, 2023",
      author: {
        name: "Vikram Sharma",
        image: "/placeholder.svg",
        role: "Legal Affairs Analyst"
      },
      category: "Law",
      readTime: "9 min read"
    },
    {
      id: 3,
      title: "India's Space Agency Achieves Milestone with Successful Lunar Orbit",
      excerpt: "In a historic achievement, India's space agency has successfully placed a spacecraft into lunar orbit, marking a significant step forward in its space exploration program.",
      date: "July 10, 2023",
      author: {
        name: "Sneha Reddy",
        image: "/placeholder.svg",
        role: "Science and Technology Editor"
      },
      category: "Science",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "New Study Reveals Impact of Climate Change on Himalayan Glaciers",
      excerpt: "A groundbreaking study has revealed the alarming rate at which Himalayan glaciers are melting due to climate change, raising concerns about water security in the region.",
      date: "April 22, 2023",
      author: {
        name: "Arjun Verma",
        image: "/placeholder.svg",
        role: "Environmental Scientist"
      },
      category: "Environment",
      readTime: "8 min read"
    },
    {
      id: 5,
      title: "Rising Concerns Over Cybersecurity Threats to Critical Infrastructure",
      excerpt: "Experts are warning of increasing cybersecurity threats targeting critical infrastructure, highlighting the urgent need for enhanced security measures and international cooperation.",
      date: "August 5, 2023",
      author: {
        name: "Priya Patel",
        image: "/placeholder.svg",
        role: "Cybersecurity Analyst"
      },
      category: "Technology",
      readTime: "7 min read"
    },
    {
      id: 6,
      title: "Debate Over New Education Policy Sparks Nationwide Discussions",
      excerpt: "A nationwide debate has erupted over the government's proposed new education policy, with discussions focusing on curriculum reforms, funding models, and access to education.",
      date: "September 12, 2023",
      author: {
        name: "Rahul Singh",
        image: "/placeholder.svg",
        role: "Education Policy Expert"
      },
      category: "Education",
      readTime: "10 min read"
    }
  ]);

  const [visibleArticles, setVisibleArticles] = useState(3);

  const loadMore = () => {
    setVisibleArticles((prevValue) => prevValue + 3);
  };

  const hasMoreArticles = visibleArticles < articles.length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold">Latest News</h1>
              <Button variant="outlined" size="sm" className="ml-2">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            <p className="text-lg text-muted-foreground mb-12">
              Stay up-to-date with the most recent developments from India and around the world.
            </p>
            
            <div className="space-y-8">
              {articles.slice(0, visibleArticles).map((article) => (
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
                  <CardFooter className="border-t pt-4 flex justify-between items-center">
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
                  </CardFooter>
                </Card>
              ))}
            </div>

            {hasMoreArticles && (
              <Button variant="outlined" className="w-full" onClick={loadMore}>
                Load More
              </Button>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LatestPage;
