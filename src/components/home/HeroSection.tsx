
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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

  return (
    <section 
      id="home"
      className="relative h-[75vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundPosition: `50% ${offset * 0.5}px`
      }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-950 dark:to-amber-950"></div>
      
      {/* Parallax dots pattern */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:20px_20px] opacity-30"
        style={{
          transform: `translateY(${offset * 0.2}px)`
        }}
      ></div>
      
      <div className={cn(
        "relative z-10 text-center transition-all duration-1000 transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        {/* Logo with reduced glow effect */}
        <div className="relative mb-6 mx-auto w-64 h-64">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-md"></div>
          <div className="relative flex items-center justify-center h-full">
            <div className="bg-white/90 dark:bg-black/20 rounded-full p-6 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-md">
              <div className="w-44 h-44 flex items-center justify-center">
                <img 
                  src="/assets/logo-main.png" 
                  alt="HindPrabhari" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Hindi slogan with English subtitle - with added line spacing */}
        <h1 className="space-y-4">
          <span className="block text-4xl sm:text-5xl font-bold mb-2">भारत की धड़कन</span>
          <span className="block text-lg sm:text-xl text-muted-foreground mt-2 leading-relaxed">
            The Pulse of Bharat - Truth in Every Story
          </span>
        </h1>
        
        {/* Call to action buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            onClick={scrollToFeatured}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-5 h-auto rounded-full"
          >
            Explore Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            onClick={scrollToContact}
            className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500/10 px-6 py-5 h-auto rounded-full"
          >
            Subscribe <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
