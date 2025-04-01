
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

  // Material Design 3 animation variants (with easing)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
        ease: [0.4, 0.0, 0.2, 1], // Material Design 3 standard easing
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        ease: [0.4, 0.0, 0.2, 1], // Material Design 3 standard easing
        duration: 0.5
      }
    }
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
      {/* Gradient background using Material Design 3 color tokens */}
      <div className="absolute inset-0 bg-gradient-to-r from-surface to-surface-variant dark:from-surface dark:to-surface-variant"></div>
      
      {/* Parallax dots pattern with Material Design spacing */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(var(--primary)_1px,transparent_1px)] [background-size:24px_24px] opacity-10"
        style={{
          transform: `translateY(${offset * 0.2}px)`
        }}
      ></div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo with Material Design 3 elevation and shape */}
        <motion.div 
          className="relative mb-12 mx-auto w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64"
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-md"></div>
          <div className="relative flex items-center justify-center h-full">
            <div className="bg-surface md-elevation-2 md-surface-tint-2 rounded-full p-5 backdrop-blur-sm border border-surface-variant">
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
        
        {/* Hindi slogan with English subtitle - with Material Design 3 typography */}
        <motion.h1 
          className="space-y-4"
          variants={itemVariants}
        >
          <span className="block text-4xl sm:text-5xl md:text-6xl font-normal mb-3 tracking-tight">भारत की धड़कन</span>
          <span className="block text-lg sm:text-xl md:text-2xl text-muted-foreground mt-2 leading-relaxed tracking-wide">
            The Pulse of Bharat - Truth in Every Story
          </span>
        </motion.h1>
        
        {/* Call to action buttons with Material Design 3 styling */}
        <motion.div 
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          <Button 
            onClick={scrollToFeatured}
            variant="filled"
            size="lg"
            className="w-full sm:w-auto transition-all duration-300"
          >
            Explore Now
          </Button>
          <Button 
            variant="outlined" 
            onClick={scrollToContact}
            size="lg"
            className="w-full sm:w-auto transition-all duration-300"
          >
            Subscribe
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
