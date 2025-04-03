
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

  // Material design M3 animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.3,
        ease: [0.2, 0, 0, 1], // M3 standard easing
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.2, 0, 0, 1], // M3 standard easing
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
      {/* Gradient background - using Material You colors */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-card dark:from-background dark:to-card/20"></div>
      
      {/* Restore the parallax dots pattern with Material Design spacing */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          transform: `translateY(${offset * 0.2}px)`
        }}
      ></div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo with Material Design elevation */}
        <motion.div 
          className="relative mb-12 mx-auto w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64"
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-md"></div>
          <div className="relative flex items-center justify-center h-full">
            <div className="bg-card/95 dark:bg-card/40 rounded-full p-5 backdrop-blur-sm border border-white/30 dark:border-white/10 md-elevation-2">
              <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 flex items-center justify-center">
                <img 
                  src="/assets/logo-main.png" 
                  alt="HindPrabhari" 
                  className="w-full h-full object-contain animate-md-scale-up"
                />
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Hindi slogan with English subtitle - with Material You typography */}
        <motion.h1 
          className="space-y-4"
          variants={itemVariants}
        >
          <span className="block text-4xl sm:text-5xl md:text-6xl font-bold mb-3 tracking-tight">भारत की धड़कन</span>
          <span className="block text-lg sm:text-xl md:text-2xl text-muted-foreground mt-2 leading-relaxed tracking-wide">
            The Pulse of Bharat - Truth in Every Story
          </span>
        </motion.h1>
        
        {/* Call to action buttons with Material You styling */}
        <motion.div 
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          <Button 
            onClick={scrollToFeatured}
            variant="filled"
            className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-6 rounded-full w-full sm:w-auto md-elevation-1 hover:md-elevation-2 transition-all duration-300 h-12"
          >
            Explore Now
          </Button>
          <Button 
            variant="outlined" 
            onClick={scrollToContact}
            className="border-2 border-primary text-primary dark:text-primary hover:bg-primary/10 px-6 py-6 rounded-full w-full sm:w-auto transition-all duration-300 h-12"
          >
            Subscribe
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
