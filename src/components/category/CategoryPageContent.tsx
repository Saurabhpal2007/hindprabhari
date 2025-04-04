
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, MessageSquare, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

interface CategoryPageContentProps {
  categoryName: string;
  description?: string;
}

const CategoryPageContent = ({ categoryName, description }: CategoryPageContentProps) => {
  // This would be fetched from an API in a real application
  const articles = [
    {
      id: "1",
      title: `Latest news in ${categoryName}`,
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imageUrl: "/placeholder.svg",
      date: "2023-12-15",
      author: "John Doe",
      comments: 5
    },
    {
      id: "2",
      title: `Breaking story in ${categoryName}`,
      excerpt: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      imageUrl: "/placeholder.svg",
      date: "2023-12-14",
      author: "Jane Smith",
      comments: 8
    },
    {
      id: "3",
      title: `${categoryName} insights for today`,
      excerpt: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      imageUrl: "/placeholder.svg",
      date: "2023-12-13",
      author: "Robert Johnson",
      comments: 3
    },
    {
      id: "4",
      title: `Important development in ${categoryName}`,
      excerpt: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      imageUrl: "/placeholder.svg",
      date: "2023-12-12",
      author: "Emily Davis",
      comments: 12
    },
    {
      id: "5",
      title: `${categoryName} analysis and opinion`,
      excerpt: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      imageUrl: "/placeholder.svg",
      date: "2023-12-11",
      author: "Michael Wilson",
      comments: 7
    },
    {
      id: "6",
      title: `The future of ${categoryName}`,
      excerpt: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
      imageUrl: "/placeholder.svg",
      date: "2023-12-10",
      author: "Sarah Brown",
      comments: 9
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{categoryName}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
                {categoryName}
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold line-clamp-2">
                <Link to={`/article/${article.id}`} className="hover:text-primary transition-colors">
                  {article.title}
                </Link>
              </CardTitle>
              <CardDescription className="flex items-center text-xs">
                <Clock className="h-3 w-3 mr-1" /> {article.date} • By {article.author}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
            </CardContent>
            <CardFooter className="pt-2 flex justify-between">
              <div className="flex items-center text-xs text-muted-foreground">
                <MessageSquare className="h-3 w-3 mr-1" /> {article.comments} comments
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button variant="outline" className="mr-2">Previous</Button>
        <Button variant="outline" className="ml-2">Next</Button>
      </div>
    </div>
  );
};

export default CategoryPageContent;
