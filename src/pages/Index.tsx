
import { useState, useEffect, useRef } from "react";
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
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  
  // Refs for section scroll animations
  const trendingRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const latestRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  
  // Transform values for scroll animations
  const trendingY = useTransform(
    scrollY, 
    [
      trendingRef.current ? trendingRef.current.offsetTop - 800 : 0, 
      trendingRef.current ? trendingRef.current.offsetTop - 200 : 0
    ], 
    [50, 0]
  );
  
  const categoriesY = useTransform(
    scrollY, 
    [
      categoriesRef.current ? categoriesRef.current.offsetTop - 800 : 0, 
      categoriesRef.current ? categoriesRef.current.offsetTop - 200 : 0
    ], 
    [50, 0]
  );
  
  const latestY = useTransform(
    scrollY, 
    [
      latestRef.current ? latestRef.current.offsetTop - 800 : 0, 
      latestRef.current ? latestRef.current.offsetTop - 200 : 0
    ], 
    [50, 0]
  );
  
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

  // Material Design animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.2, 0, 0, 1]
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
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              {/* Search bar section with increased padding and prominence */}
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
                ref={trendingRef}
                style={{ y: trendingY }}
              >
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={sectionVariants}
                >
                  <div className="flex justify-between items-center mb-8">
                    <motion.h2 
                      className="text-3xl font-semibold flex items-center"
                      whileInView={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }}
                      transition={{
                        duration: 3,
                        ease: "easeInOut",
                      }}
                    >
                      <span className="text-gradient-heading">Trending</span>
                      <motion.span 
                        className="ml-2 text-sm font-medium px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full hidden sm:inline-block"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          opacity: [0.9, 1, 0.9]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        Live
                      </motion.span>
                    </motion.h2>
                    <motion.div
                      whileHover={{ x: 5 }}
                      whileTap={{ x: -2, scale: 0.98 }}
                    >
                      <Link to="/trending" className="flex items-center text-primary hover:underline group md-state-layer px-3 py-2 rounded-full">
                        View All <ArrowRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  </div>
                  <FeaturedArticles />
                </motion.div>
              </motion.section>
              
              <motion.section 
                id="categories" 
                className="bg-muted/30 py-16 px-4"
                ref={categoriesRef}
                style={{ y: categoriesY }}
              >
                <motion.div 
                  className="container mx-auto"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={sectionVariants}
                >
                  <div className="flex justify-between items-center mb-8">
                    <motion.h2 
                      className="text-3xl font-semibold"
                      whileInView={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }}
                      transition={{
                        duration: 3,
                        ease: "easeInOut",
                      }}
                    >
                      <span className="text-gradient-heading">Categories</span>
                    </motion.h2>
                    <motion.div
                      whileHover={{ x: 5 }}
                      whileTap={{ x: -2, scale: 0.98 }}
                    >
                      <Link to="/categories" className="flex items-center text-primary hover:underline group md-state-layer px-3 py-2 rounded-full">
                        View All <ArrowRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  </div>
                  <CategoryCards />
                </motion.div>
              </motion.section>
              
              <motion.section 
                id="latest" 
                className="container mx-auto py-16 px-4"
                ref={latestRef}
                style={{ y: latestY }}
              >
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={sectionVariants}
                >
                  <div className="flex justify-between items-center mb-8">
                    <motion.h2 
                      className="text-3xl font-semibold"
                      whileInView={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }}
                      transition={{
                        duration: 3,
                        ease: "easeInOut",
                      }}
                    >
                      <span className="text-gradient-heading">Latest News</span>
                    </motion.h2>
                    <motion.div
                      whileHover={{ x: 5 }}
                      whileTap={{ x: -2, scale: 0.98 }}
                    >
                      <Link to="/latest" className="flex items-center text-primary hover:underline group md-state-layer px-3 py-2 rounded-full">
                        View All <ArrowRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  </div>
                  <LatestNews />
                </motion.div>
              </motion.section>
              
              <motion.section 
                id="about"
                ref={aboutRef}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
              >
                <AboutUsSection />
              </motion.section>
              
              <motion.section 
                id="contact"
                ref={contactRef}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
              >
                <ContactSection />
              </motion.section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
