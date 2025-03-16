
import { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/home/HeroSection";
import BreakingNews from "../components/news/BreakingNews";
import FeaturedArticles from "../components/news/FeaturedArticles";
import CategoryCards from "../components/home/CategoryCards";
import LatestNews from "../components/news/LatestNews";
import SearchBar from "../components/common/SearchBar";
import { useToast } from "../components/ui/use-toast";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate loading and then show welcome toast
    const timer = setTimeout(() => {
      setIsLoaded(true);
      toast({
        title: "Welcome to HindPrabhari",
        description: "The Pulse of Bharat - Truth in Every Story",
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        <div className={`transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <HeroSection />
          <BreakingNews />
          
          <section className="container mx-auto py-8 px-4">
            <SearchBar />
          </section>
          
          <section className="container mx-auto py-8 px-4">
            <FeaturedArticles />
          </section>
          
          <section className="container mx-auto py-12 px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Categories</h2>
            <CategoryCards />
          </section>
          
          <section className="container mx-auto py-12 px-4">
            <h2 className="text-3xl font-bold mb-8">Latest News</h2>
            <LatestNews />
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
