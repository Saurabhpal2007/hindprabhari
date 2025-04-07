
import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/home/HeroSection";
import AboutUsSection from "@/components/home/AboutUsSection";
import ContactSection from "@/components/home/ContactSection";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>HindPrabhari - The Pulse of Bharat</title>
        <meta 
          name="description" 
          content="HindPrabhari - Your trusted source for the latest news from India and around the world."
        />
      </Helmet>

      <div className="container mx-auto px-4">
        <HeroSection />
        
        <section id="about" className="py-12">
          <AboutUsSection />
        </section>
        
        <section id="contact" className="py-12">
          <ContactSection />
        </section>
      </div>
    </>
  );
};

export default Home;
