
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight, UserPlus } from "lucide-react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => {
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

  return (
    <section 
      id="home"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/40 dark:from-background dark:via-background/90 dark:to-card/20">
      </div>
      
      {/* Subtle dots pattern */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)'
        }}
      />

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium mb-2 text-muted-foreground">Scroll to explore</span>
          <ArrowDown className="h-5 w-5 text-primary" />
        </div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo */}
        <div className={`relative mb-12 mx-auto w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-card/80 dark:bg-card/40 rounded-full p-5 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-lg">
            <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 flex items-center justify-center">
              <img 
                src="/assets/logo-main.png" 
                alt="HindPrabhari" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
        
        {/* Hindi slogan with English subtitle */}
        <h1 className={`space-y-4 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="block text-4xl sm:text-5xl md:text-6xl font-bold mb-3 tracking-tight">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              भारत की धड़कन
            </span>
          </span>
          <span className="block text-lg sm:text-xl md:text-2xl text-muted-foreground mt-2 leading-relaxed tracking-wide">
            The Pulse of Bharat - Truth in Every Story
          </span>
        </h1>
        
        {/* Call to action buttons */}
        <div className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-500 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Button 
            onClick={scrollToFeatured}
            variant="default"
            className="bg-primary text-primary-foreground px-6 py-6 rounded-full w-full sm:w-auto shadow-md hover:shadow-lg transition-all duration-300 h-12"
          >
            Explore Now
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          
          <Button 
            variant="outline" 
            onClick={scrollToContact}
            className="border-2 border-primary text-primary dark:text-primary hover:bg-primary/10 px-6 py-6 rounded-full w-full sm:w-auto transition-all duration-300 h-12"
          >
            Subscribe
            <UserPlus className="ml-1.5 h-4 w-4" />
          </Button>
        </div>

        {/* Simple badge */}
        <div className="absolute top-10 right-10 hidden md:block">
          <div className="bg-primary/20 backdrop-blur-sm text-primary px-3 py-1.5 rounded-full border border-primary/30 flex items-center">
            <span className="font-medium">Breaking News</span>
            <div className="ml-2 h-2 w-2 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
