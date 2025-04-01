import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowRight } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Mock Category Data (Replace with actual data fetching)
const mockCategoryData = {
  name: "Technology",
  description: "The latest news and trends in technology, including gadgets, software, and innovations.",
  articles: [
    {
      id: "tech-1",
      title: "New Smartphone Revolutionizes Mobile Photography",
      excerpt: "A leading tech company has launched a new smartphone with groundbreaking camera technology.",
      date: "2023-08-01",
      imageUrl: "https://images.unsplash.com/photo-1556656793-08538906a9b8?ixlib=rb-4.0.3",
      category: "Technology"
    },
    {
      id: "tech-2",
      title: "AI Breakthrough: Neural Networks Achieve Human-Level Accuracy",
      excerpt: "Researchers have made a significant leap in artificial intelligence with neural networks.",
      date: "2023-07-25",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47a04ca0ecd8?ixlib=rb-4.0.3",
      category: "Technology"
    },
    {
      id: "tech-3",
      title: "The Future of Electric Vehicles: Innovations and Challenges",
      excerpt: "Experts discuss the future of electric vehicles and the challenges facing the industry.",
      date: "2023-07-18",
      imageUrl: "https://images.unsplash.com/photo-1614033995453-f45244c140ca?ixlib=rb-4.0.3",
      category: "Technology"
    },
    {
      id: "tech-4",
      title: "Cybersecurity Threats on the Rise: Protecting Your Data",
      excerpt: "With increasing cyberattacks, learn how to protect your personal and business data.",
      date: "2023-07-10",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-464c4c690144?ixlib=rb-4.0.3",
      category: "Technology"
    },
    {
      id: "tech-5",
      title: "The Impact of 5G Technology on Smart Cities",
      excerpt: "5G technology is set to transform urban living with faster connectivity and smarter infrastructure.",
      date: "2023-07-03",
      imageUrl: "https://images.unsplash.com/photo-1583416762037-394442443874?ixlib=rb-4.0.3",
      category: "Technology"
    },
    {
      id: "tech-6",
      title: "Quantum Computing: A New Era of Processing Power",
      excerpt: "Quantum computing promises unprecedented processing power and could revolutionize various industries.",
      date: "2023-06-26",
      imageUrl: "https://images.unsplash.com/photo-1662154421718-4b999a1942ca?ixlib=rb-4.0.3",
      category: "Technology"
    }
  ]
};

const CategoryPageContent = () => {
  const { categoryName } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState(mockCategoryData.articles);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    document.title = `${categoryName} - HindPrabhari`;
  }, [categoryName]);

  // Implement search functionality
  useEffect(() => {
    if (searchQuery) {
      const filteredArticles = mockCategoryData.articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setArticles(filteredArticles);
      setCurrentPage(1); // Reset to first page after search
    } else {
      setArticles(mockCategoryData.articles);
    }
  }, [searchQuery]);

  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{categoryName}</h1>
          <p className="text-muted-foreground">{mockCategoryData.description}</p>
        </div>
        <div className="w-full sm:w-auto flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="sm:w-64"
          />
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentArticles.map((article) => (
          <Card key={article.id} className="bg-card text-card-foreground shadow-sm">
            <CardHeader>
              <CardTitle>
                <Link to={`/article/${article.id}`} className="hover:text-primary transition-colors">
                  {article.title}
                </Link>
              </CardTitle>
              <CardDescription className="line-clamp-2 text-muted-foreground">{article.excerpt}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <Badge variant="secondary">{article.category}</Badge>
              <Link to={`/article/${article.id}`} className="text-sm text-primary hover:underline">
                Read more <ArrowRight className="inline-block h-4 w-4 ml-1" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {articles.length > articlesPerPage && (
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-2">
            <Button variant="outlined" size="sm" className="text-sm">
              Latest
            </Button>
            <Button variant="outlined" size="sm" className="text-sm">
              Popular
            </Button>
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationPrevious
                href="#"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {Array.from({ length: Math.ceil(articles.length / articlesPerPage) }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={() => paginate(page)}
                    isactive={page === currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationNext
                href="#"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(articles.length / articlesPerPage)}
              />
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default CategoryPageContent;
