
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
import { motion } from "framer-motion";

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

  // Simplified motion variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <div className="h-screen flex flex-col">
        <Header />
        <div className={`flex-grow flex flex-col transition-opacity ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <HeroSection />
        </div>
        <BreakingNews />
      </div>
      
      <main className="flex-grow">
        <div className={`transition-opacity ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {/* Search bar section */}
          <motion.div 
            className="bg-gradient-to-b from-background/80 to-background py-8 px-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={sectionVariants}
          >
            <div className="container mx-auto max-w-4xl">
              <SearchBar />
            </div>
          </motion.div>
          
          <motion.section 
            id="trending" 
            className="container mx-auto py-12 px-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={sectionVariants}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold flex items-center">
                <span>Trending</span>
                <span className="ml-2 text-sm font-medium px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full hidden sm:inline-block">
                  Live
                </span>
              </h2>
              <Link to="/trending" className="flex items-center text-primary hover:underline">
                View All <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </div>
            <FeaturedArticles />
          </motion.section>
          
          <motion.section 
            id="categories" 
            className="bg-muted/30 py-12 px-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={sectionVariants}
          >
            <div className="container mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Categories</h2>
                <Link to="/categories" className="flex items-center text-primary hover:underline">
                  View All <ArrowRight className="ml-1 h-5 w-5" />
                </Link>
              </div>
              <CategoryCards />
            </div>
          </motion.section>
          
          <motion.section 
            id="latest" 
            className="container mx-auto py-12 px-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={sectionVariants}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Latest News</h2>
              <Link to="/latest" className="flex items-center text-primary hover:underline">
                View All <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </div>
            <LatestNews />
          </motion.section>
          
          <motion.section 
            id="about"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={sectionVariants}
          >
            <AboutUsSection />
          </motion.section>
          
          <motion.section 
            id="contact"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={sectionVariants}
          >
            <ContactSection />
          </motion.section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
