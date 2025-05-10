
import { Helmet } from "react-helmet-async";
import AboutUsSection from "@/components/home/AboutUsSection";
import ContactSection from "@/components/home/ContactSection";
import NewsTicker from "@/components/news/NewsTicker";
import FeaturedSlider from "@/components/home/FeaturedSlider";
import TrendingColumn from "@/components/home/TrendingColumn";
import CategoryGrid from "@/components/home/CategoryGrid";
import LatestNews from "@/components/news/LatestNews";

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
        {/* News Ticker */}
        <NewsTicker className="my-4" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Featured Stories Section - Takes 2/3 of the width on large screens */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Featured Stories</h2>
            <FeaturedSlider />
          </div>
          
          {/* Trending Column - Takes 1/3 of the width on large screens */}
          <div className="lg:col-span-1">
            <TrendingColumn />
          </div>
        </div>
        
        {/* Category Grid */}
        <section className="py-8">
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <CategoryGrid />
        </section>
        
        {/* Latest News Section */}
        <section className="py-8">
          <h2 className="text-2xl font-bold mb-4">Latest News</h2>
          <LatestNews />
        </section>
        
        {/* About & Contact Sections */}
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
