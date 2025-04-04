
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [offset, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToFeatured = () => {
    const featuredSection = document.getElementById("trending");
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Material design animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section 
      id="home"
      className="relative h-full w-full flex items-center justify-center overflow-hidden"
      style={{
        backgroundPosition: `50% ${offset * 0.5}px`
      }}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Gradient background - using Material Design inspired colors */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50"></div>
      
      {/* Parallax dots pattern with Material Design spacing */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:24px_24px] opacity-30"
        style={{
          transform: `translateY(${offset * 0.2}px)`
        }}
      ></div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo with Material Design elevation */}
        <motion.div 
          className="relative mb-12 mx-auto w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64"
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-md"></div>
          <div className="relative flex items-center justify-center h-full">
            <div className="bg-white/95 dark:bg-black/40 rounded-full p-5 backdrop-blur-sm border border-white/30 dark:border-white/10 shadow-lg">
              <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 flex items-center justify-center">
                <img 
                  src="/assets/logo-main.png" 
                  alt="HindPrabhari" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Hindi slogan with English subtitle - with added line spacing - Material Design typography */}
        <motion.h1 
          className="space-y-4"
          variants={itemVariants}
        >
          <span className="block text-4xl sm:text-5xl md:text-6xl font-bold mb-3 tracking-tight">भारत की धड़कन</span>
          <span className="block text-lg sm:text-xl md:text-2xl text-muted-foreground mt-2 leading-relaxed tracking-wide">
            The Pulse of Bharat - Truth in Every Story
          </span>
        </motion.h1>
        
        {/* Call to action buttons with Material Design styling */}
        <motion.div 
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          <Button 
            onClick={scrollToFeatured}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-6 rounded-full w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 h-11"
            variant="default" // Changed from "filled" to "default"
          >
            Explore Now
          </Button>
          <Button 
            variant="outline" 
            onClick={scrollToContact}
            className="border-2 border-orange-500 text-orange-600 dark:text-orange-400 hover:bg-orange-500/10 px-6 py-6 rounded-full w-full sm:w-auto hover:shadow-md transition-all duration-300 h-11"
          >
            Subscribe
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
