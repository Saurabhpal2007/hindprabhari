
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { createRipple } from "@/hooks/use-animations";

const HeroSection = () => {
  const [offset, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // Transform values for parallax effects
  const logoY = useTransform(scrollY, [0, 300], [0, -50]);
  const dotY = useTransform(scrollY, [0, 300], [0, 100]);
  const backgroundY = useTransform(scrollY, [0, 300], [0, 150]);

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
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.2, 0, 0, 1], // M3 standard easing
      }
    }
  };

  return (
    <motion.section 
      id="home"
      ref={heroRef}
      className="relative h-full w-full flex items-center justify-center overflow-hidden"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Gradient background - using Material You colors */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-background to-card dark:from-background dark:to-card/20"
        style={{ y: backgroundY }}
      />
      
      {/* Restore the parallax dots pattern with Material Design spacing */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          y: dotY
        }}
      />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo with Material Design elevation */}
        <motion.div 
          className="relative mb-12 mx-auto w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64"
          variants={itemVariants}
          style={{ y: logoY }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-md"
            animate={{ 
              scale: [1, 1.02, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="relative flex items-center justify-center h-full"
            whileHover={{ 
              scale: 1.05,
              rotate: 2,
              filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.2))"
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15
            }}
          >
            <motion.div 
              className="bg-card/95 dark:bg-card/40 rounded-full p-5 backdrop-blur-sm border border-white/30 dark:border-white/10 md-elevation-2"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 1, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 6,
                ease: "easeInOut"
              }}
            >
              <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 flex items-center justify-center">
                <motion.img 
                  src="/assets/logo-main.png" 
                  alt="HindPrabhari" 
                  className="w-full h-full object-contain"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: 1,
                    opacity: 1,
                    transition: {
                      duration: 0.5,
                      ease: [0.2, 0, 0.2, 1]
                    }
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Hindi slogan with English subtitle - with Material You typography */}
        <motion.h1 
          className="space-y-4"
          variants={itemVariants}
        >
          <motion.span 
            className="block text-4xl sm:text-5xl md:text-6xl font-bold mb-3 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.3,
                duration: 0.7,
                ease: [0.2, 0, 0.2, 1]
              }
            }}
          >
            भारत की धड़कन
          </motion.span>
          <motion.span 
            className="block text-lg sm:text-xl md:text-2xl text-muted-foreground mt-2 leading-relaxed tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.5,
                duration: 0.7,
                ease: [0.2, 0, 0.2, 1]
              }
            }}
          >
            The Pulse of Bharat - Truth in Every Story
          </motion.span>
        </motion.h1>
        
        {/* Call to action buttons with Material You styling */}
        <motion.div 
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 15
            }}
          >
            <Button 
              onClick={(e) => {
                createRipple(e);
                scrollToFeatured();
              }}
              variant="filled"
              className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-6 rounded-full w-full sm:w-auto md-elevation-1 hover:md-elevation-2 transition-all duration-300 h-12 md-ripple relative overflow-hidden"
            >
              Explore Now
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 15
            }}
          >
            <Button 
              variant="outlined" 
              onClick={(e) => {
                createRipple(e);
                scrollToContact();
              }}
              className="border-2 border-primary text-primary dark:text-primary hover:bg-primary/10 px-6 py-6 rounded-full w-full sm:w-auto transition-all duration-300 h-12 md-ripple relative overflow-hidden"
            >
              Subscribe
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
