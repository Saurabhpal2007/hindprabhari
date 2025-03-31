
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/home/HeroSection";
import BreakingNews from "../components/news/BreakingNews";
import FeaturedArticles from "../components/news/FeaturedArticles";
import CategoryCards from "../components/home/CategoryCards";
import LatestNews from "../components/news/LatestNews";
import AboutUsSection from "../components/home/AboutUsSection";
import ContactSection from "../components/home/ContactSection";
import SearchBar from "../components/common/SearchBar";
import { useToast } from "../components/ui/use-toast";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      toast({
        title: "Welcome to HindPrabhari",
        description: "The Pulse of Bharat - Truth in Every Story",
      });
    }, 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, [toast]);

  useEffect(() => {
    // Handle scrolling based on hash or state
    if (location.hash) {
      const sectionId = location.hash.slice(1);
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    } else if (location.state && location.state.scrollTo) {
      setTimeout(() => {
        const section = document.getElementById(location.state.scrollTo);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        <div className={`transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div>
            <HeroSection />
            <BreakingNews />
            
            <div className="container mx-auto py-8 px-4 -mt-4">
              <SearchBar />
            </div>
          </div>
          
          <section id="trending" className="container mx-auto py-12 px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Trending</h2>
              <Link to="/trending" className="flex items-center text-primary hover:underline">
                View All <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </div>
            <FeaturedArticles />
          </section>
          
          <section id="categories" className="container mx-auto py-16 px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Categories</h2>
              <Link to="/categories" className="flex items-center text-primary hover:underline">
                View All <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </div>
            <CategoryCards />
          </section>
          
          <section id="latest" className="container mx-auto py-16 px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Latest News</h2>
              <Link to="/latest" className="flex items-center text-primary hover:underline">
                View All <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </div>
            <LatestNews />
          </section>
          
          <section id="about">
            <AboutUsSection />
          </section>
          
          <section id="contact">
            <ContactSection />
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
