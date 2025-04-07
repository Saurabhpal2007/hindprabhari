
import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Link } from 'react-router-dom';
import { CalendarDays, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for featured articles
const featuredArticles = [
  {
    id: 1,
    title: "India's Digital Revolution: How Technology is Transforming Rural Communities",
    category: "Technology",
    author: "Priya Sharma",
    date: "2023-04-15",
    imageUrl: "https://source.unsplash.com/random/1200x600?india,technology",
    url: "/article/1"
  },
  {
    id: 2,
    title: "Climate Change Impact on Agriculture: New Study Reveals Challenges for Farmers",
    category: "Environment",
    author: "Rahul Verma",
    date: "2023-04-14",
    imageUrl: "https://source.unsplash.com/random/1200x600?farming,climate",
    url: "/article/2"
  },
  {
    id: 3,
    title: "Economic Growth Forecast: India Set to Become World's Third Largest Economy by 2030",
    category: "Economy",
    author: "Arun Patel",
    date: "2023-04-13",
    imageUrl: "https://source.unsplash.com/random/1200x600?india,economy",
    url: "/article/3"
  },
  {
    id: 4,
    title: "Healthcare Innovation: New Affordable Medical Devices Developed in India",
    category: "Healthcare",
    author: "Meera Kapoor",
    date: "2023-04-12",
    imageUrl: "https://source.unsplash.com/random/1200x600?healthcare,india",
    url: "/article/4"
  }
];

const FeaturedSlider = () => {
  const [autoPlay, setAutoPlay] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (autoPlay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredArticles.length);
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [autoPlay]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="w-full">
      <Carousel
        className="w-full"
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
      >
        <CarouselContent>
          {featuredArticles.map((article) => (
            <CarouselItem key={article.id}>
              <div className="relative overflow-hidden rounded-xl md-elevation-1 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-20">
                  <div className="mb-2">
                    <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
                    {article.title}
                  </h2>
                  <div className="flex flex-wrap items-center text-white/90 text-sm gap-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-2" />
                      <span>{formatDate(article.date)}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button asChild variant="filled" size="sm">
                      <Link to={article.url}>Read More</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute -bottom-12 left-0 right-0 flex justify-center space-x-2">
          {featuredArticles.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentIndex === index ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  );
};

export default FeaturedSlider;
