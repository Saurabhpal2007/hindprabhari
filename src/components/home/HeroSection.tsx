
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

  // Simplified animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
      }
    }
  };

  return (
    <motion.section 
      id="home"
      className="relative h-full w-full flex items-center justify-center overflow-hidden"
      style={{
        backgroundPosition: `50% ${offset * 0.3}px`
      }}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-card dark:from-background dark:to-card/20"></div>
      
      {/* Subtle dots pattern */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent [background-size:24px_24px] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          transform: `translateY(${offset * 0.1}px)`
        }}
      ></div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo */}
        <motion.div 
          className="relative mb-10 mx-auto w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56"
          variants={itemVariants}
        >
          <div className="relative flex items-center justify-center h-full">
            <div className="bg-card/80 rounded-full p-5">
              <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 flex items-center justify-center">
                <img 
                  src="/assets/logo-main.png" 
                  alt="HindPrabhari" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Hindi slogan with English subtitle */}
        <motion.h1 
          className="space-y-3"
          variants={itemVariants}
        >
          <span className="block text-3xl sm:text-4xl md:text-5xl font-bold mb-2 tracking-tight">भारत की धड़कन</span>
          <span className="block text-lg sm:text-xl md:text-2xl text-muted-foreground mt-2 leading-relaxed">
            The Pulse of Bharat - Truth in Every Story
          </span>
        </motion.h1>
        
        {/* Call to action buttons */}
        <motion.div 
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          <Button 
            onClick={scrollToFeatured}
            variant="filled"
            className="px-6 py-2 rounded-full w-full sm:w-auto h-11"
          >
            Explore Now
          </Button>
          <Button 
            variant="outlined" 
            onClick={scrollToContact}
            className="px-6 py-2 rounded-full w-full sm:w-auto h-11"
          >
            Subscribe
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
