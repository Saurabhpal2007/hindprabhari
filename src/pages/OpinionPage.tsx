import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const OpinionPage = () => {
  const opinions = [
    {
      id: 1,
      title: "The Future of Digital Governance in India",
      excerpt: "As India continues its digital transformation, new challenges and opportunities emerge for governance, privacy, and citizen rights.",
      date: "May 15, 2023",
      author: {
        name: "Rahul Sharma",
        image: "/placeholder.svg",
        role: "Political Analyst"
      },
      category: "Politics",
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "Climate Change: India's Response and Responsibility",
      excerpt: "India's position as both a developing nation and one of the world's largest economies creates unique tensions in addressing climate change.",
      date: "June 2, 2023",
      author: {
        name: "Priya Desai",
        image: "/placeholder.svg",
        role: "Environmental Journalist"
      },
      category: "Environment",
      readTime: "6 min read"
    },
    {
      id: 3,
      title: "Economic Reform: The Path Forward Post-COVID",
      excerpt: "The pandemic has reshaped India's economic landscape. What reforms are necessary to ensure growth and stability in the coming decade?",
      date: "July 10, 2023",
      author: {
        name: "Vikram Mehta",
        image: "/placeholder.svg",
        role: "Economic Analyst"
      },
      category: "Economy",
      readTime: "10 min read"
    },
    {
      id: 4,
      title: "India's Startup Ecosystem: Challenges and Triumphs",
      excerpt: "From unicorns to grassroots innovation, India's startup scene is vibrant but faces unique obstacles in scaling globally.",
      date: "April 22, 2023",
      author: {
        name: "Neha Gupta",
        image: "/placeholder.svg",
        role: "Tech Journalist"
      },
      category: "Technology",
      readTime: "7 min read"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Opinion</h1>
            <p className="text-lg text-muted-foreground mb-12">
              Thoughtful analysis and commentary on India's politics, economy, society, and culture from our expert contributors.
            </p>
            
            <div className="space-y-8">
              {opinions.map((opinion) => (
                <Card key={opinion.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge variant="outlined" className="mb-2">{opinion.category}</Badge>
                        <CardTitle className="text-2xl hover:text-primary transition-colors">
                          <Link to={`/article/${opinion.id}`}>{opinion.title}</Link>
                        </CardTitle>
                        <CardDescription className="mt-1 flex items-center text-sm">
                          {opinion.date} • {opinion.readTime}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{opinion.excerpt}</p>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={opinion.author.image} alt={opinion.author.name} />
                        <AvatarFallback>{opinion.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{opinion.author.name}</p>
                        <p className="text-xs text-muted-foreground">{opinion.author.role}</p>
                      </div>
                    </div>
                    <Link to={`/article/${opinion.id}`}>
                      <Button variant="outlined" size="sm" className="ml-2">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OpinionPage;
