import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Eye } from 'lucide-react';

// Sample category data
const sampleCategories = [
  {
    id: "politics",
    name: "Politics",
    description: "Stay informed on the latest political developments, policy changes, and government activities.",
    image: "https://images.unsplash.com/photo-1489533119213-66a5cd877091?ixlib=rb-4.0.3"
  },
  {
    id: "economy",
    name: "Economy",
    description: "Get insights into economic trends, market analysis, and financial news affecting India and the world.",
    image: "https://images.unsplash.com/photo-1554224155-1696e5ef9c57?ixlib=rb-4.0.3"
  },
  {
    id: "technology",
    name: "Technology",
    description: "Explore the latest technological innovations, gadgets, and digital trends shaping the future.",
    image: "https://images.unsplash.com/photo-1518770660439-464c4c52ef1c?ixlib=rb-4.0.3"
  },
  {
    id: "sports",
    name: "Sports",
    description: "Catch up on sports news, match highlights, and athlete profiles from India and around the globe.",
    image: "https://images.unsplash.com/photo-1485550490522-4179154e6846?ixlib=rb-4.0.3"
  },
  {
    id: "environment",
    name: "Environment",
    description: "Read about environmental issues, conservation efforts, and sustainable practices for a greener future.",
    image: "https://images.unsplash.com/photo-1472781547308-9b4a4647af84?ixlib=rb-4.0.3"
  },
  {
    id: "world",
    name: "World",
    description: "Stay informed on global affairs, international relations, and news from around the world.",
    image: "https://images.unsplash.com/photo-1503756502390-c905f449d23f?ixlib=rb-4.0.3"
  }
];

// Sample articles data
const sampleArticles = [
  {
    id: "pol-1",
    title: "New Policy Reform Announced by Government",
    excerpt: "The government announced a comprehensive policy reform today addressing key sectors including education, healthcare, and infrastructure development.",
    date: "2023-05-15",
    readTime: "5 min",
    category: "Politics",
    views: 1245,
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?ixlib=rb-4.0.3"
  },
  {
    id: "eco-1",
    title: "RBI Announces New Monetary Policy",
    excerpt: "The Reserve Bank of India (RBI) has announced its latest monetary policy, keeping the repo rate unchanged.",
    date: "2023-05-10",
    readTime: "7 min",
    category: "Economy",
    views: 879,
    image: "https://images.unsplash.com/photo-1554224155-1696e5ef9c57?ixlib=rb-4.0.3"
  },
  {
    id: "tec-1",
    title: "New AI Model Revolutionizes Healthcare",
    excerpt: "A new artificial intelligence model developed by Indian researchers is set to revolutionize healthcare diagnostics.",
    date: "2023-05-05",
    readTime: "6 min",
    category: "Technology",
    views: 1567,
    image: "https://images.unsplash.com/photo-1518770660439-464c4c52ef1c?ixlib=rb-4.0.3"
  },
  {
    id: "spo-1",
    title: "India Wins Cricket World Cup",
    excerpt: "The Indian cricket team has won the Cricket World Cup, defeating Australia in a thrilling final match.",
    date: "2023-05-01",
    readTime: "8 min",
    category: "Sports",
    views: 2345,
    image: "https://images.unsplash.com/photo-1485550490522-4179154e6846?ixlib=rb-4.0.3"
  },
  {
    id: "env-1",
    title: "India Commits to Net-Zero Emissions by 2070",
    excerpt: "India has pledged to achieve net-zero carbon emissions by 2070, outlining a roadmap for sustainable development.",
    date: "2023-04-28",
    readTime: "6 min",
    category: "Environment",
    views: 987,
    image: "https://images.unsplash.com/photo-1472781547308-9b4a4647af84?ixlib=rb-4.0.3"
  },
  {
    id: "wor-1",
    title: "UN Addresses Global Food Crisis",
    excerpt: "The United Nations is convening an emergency summit to address the growing global food crisis.",
    date: "2023-04-25",
    readTime: "7 min",
    category: "World",
    views: 1122,
    image: "https://images.unsplash.com/photo-1503756502390-c905f449d23f?ixlib=rb-4.0.3"
  }
];

const CategoriesPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      const selectedCategory = sampleCategories.find(cat => cat.id === categoryId);
      const filteredArticles = sampleArticles.filter(article => article.category.toLowerCase() === categoryId);

      setCategory(selectedCategory);
      setArticles(filteredArticles);
      setIsLoading(false);
    }, 300);
  }, [categoryId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Category Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Category Hero Section */}
        <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={category.image} 
              alt={category.name}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                {category.name}
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl">{category.description}</p>
            </div>
          </div>
        </div>

        {/* Articles Listing */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(article => (
              <Card key={article.id} className="bg-card text-card-foreground shadow-md overflow-hidden">
                <Link to={`/article/${article.id}`}>
                  <div className="relative">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="aspect-video w-full object-cover" 
                    />
                  </div>
                  <CardHeader className="pb-4">
                    <CardTitle className="line-clamp-2 hover:text-primary transition-colors">{article.title}</CardTitle>
                    <CardDescription className="flex items-center text-sm text-muted-foreground">
                      {article.date} • {article.readTime} read
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-0">
                    <p className="text-muted-foreground line-clamp-3">{article.excerpt}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <Button variant="outlined" size="sm">
              View All
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoriesPage;
