
import { useState } from "react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [isVisible] = useState(true);

  const scrollToFeatured = () => {
    const featuredSection = document.getElementById("about");
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
      className="relative h-full w-full flex items-center justify-center overflow-hidden py-16"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50"></div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="relative mb-12 mx-auto w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
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
        </div>
        
        {/* Hindi slogan with English subtitle */}
        <h1 className="space-y-4">
          <span className="block text-4xl sm:text-5xl md:text-6xl font-bold mb-3 tracking-tight">भारत की धड़कन</span>
          <span className="block text-lg sm:text-xl md:text-2xl text-muted-foreground mt-2 leading-relaxed tracking-wide">
            The Pulse of Bharat - Truth in Every Story
          </span>
        </h1>
        
        {/* Call to action buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            onClick={scrollToFeatured}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-6 rounded-full w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 h-11"
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
