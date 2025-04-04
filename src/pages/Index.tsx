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
import MaterialDesignDemo from "../components/examples/MaterialDesignDemo";

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

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <div className="h-screen flex flex-col">
        <Header />
        <div className={`flex-grow flex flex-col transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <HeroSection />
        </div>
        <BreakingNews />
      </div>
      
      <main className="flex-grow">
        <div className={`transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <motion.div 
            className="bg-gradient-to-b from-background/80 to-background py-10 px-4 md-elevation-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <div className="container mx-auto max-w-4xl">
              <SearchBar />
            </div>
          </motion.div>
          
          <motion.section 
            id="trending" 
            className="container mx-auto py-16 px-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-semibold flex items-center">
                <span className="text-gradient-heading">Trending</span>
                <span className="ml-2 text-sm font-medium px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full hidden sm:inline-block">
                  Live
                </span>
              </h2>
              <Link to="/trending" className="flex items-center text-primary hover:underline group md-state-layer px-3 py-2 rounded-full">
                View All <ArrowRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <FeaturedArticles />
          </motion.section>
          
          <motion.section 
            id="categories" 
            className="bg-muted/30 py-16 px-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <div className="container mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-semibold"><span className="text-gradient-heading">Categories</span></h2>
                <Link to="/categories" className="flex items-center text-primary hover:underline group md-state-layer px-3 py-2 rounded-full">
                  View All <ArrowRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <CategoryCards />
            </div>
          </motion.section>
          
          <motion.section 
            id="material-design" 
            className="container mx-auto py-16 px-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-semibold"><span className="text-gradient-heading">Material Design 3</span></h2>
            </div>
            <MaterialDesignDemo />
          </motion.section>
          
          <motion.section 
            id="latest" 
            className="container mx-auto py-16 px-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-semibold"><span className="text-gradient-heading">Latest News</span></h2>
              <Link to="/latest" className="flex items-center text-primary hover:underline group md-state-layer px-3 py-2 rounded-full">
                View All <ArrowRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <LatestNews />
          </motion.section>
          
          <motion.section 
            id="about"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <AboutUsSection />
          </motion.section>
          
          <motion.section 
            id="contact"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
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
