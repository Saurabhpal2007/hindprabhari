
import { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/home/HeroSection";
import BreakingNews from "../components/news/BreakingNews";
import FeaturedArticles from "../components/news/FeaturedArticles";
import CategoryCards from "../components/home/CategoryCards";
import LatestNews from "../components/news/LatestNews";
import AboutUsSection from "../components/home/AboutUsSection";
import ContactSection from "../components/home/ContactSection";
import { useToast } from "../components/ui/use-toast";
import { ArrowRight } from "lucide-react";

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
    
    // Handle hash navigation for smooth scrolling
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.slice(1);
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    
    window.addEventListener("hashchange", handleHashChange);
    
    // Check for hash on initial load
    if (window.location.hash) {
      handleHashChange();
    }
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        <div className={`transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <HeroSection />
          <BreakingNews />
          
          <section className="container mx-auto py-8 px-4">
            <FeaturedArticles />
          </section>
          
          <section className="container mx-auto py-12 px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Categories</h2>
            <CategoryCards />
          </section>
          
          <section id="latest" className="container mx-auto py-12 px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Latest News</h2>
              <a href="/latest" className="flex items-center text-primary hover:underline">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
            <LatestNews />
          </section>
          
          <AboutUsSection />
          <ContactSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
