
import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import TrendingColumn from "@/components/home/TrendingColumn";
import BreakingNews from "@/components/news/BreakingNews";
import FeaturedArticles from "@/components/news/FeaturedArticles";
import LatestNews from "@/components/news/LatestNews";
import AboutUsSection from "@/components/home/AboutUsSection";
import ContactSection from "@/components/home/ContactSection";
import { Link } from "react-router-dom";
import { Grid, Clock, ArrowRight } from "lucide-react";

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
        
        <section id="trending" className="py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold">Trending Now</h2>
            <Link to="/trending" className="flex items-center text-primary hover:underline">
              View All <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <FeaturedArticles />
            </div>
            <div className="lg:col-span-1">
              <TrendingColumn />
            </div>
          </div>
        </section>

        <section id="categories" className="py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold flex items-center">
              <Grid className="mr-2 h-6 w-6 text-primary" />
              <span>Categories</span>
            </h2>
            <Link to="/categories" className="flex items-center text-primary hover:underline">
              View All <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </div>
          <CategoryGrid />
        </section>
        
        <section id="latest" className="py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold flex items-center">
              <Clock className="mr-2 h-6 w-6 text-primary" />
              <span>Latest News</span>
            </h2>
            <Link to="/latest" className="flex items-center text-primary hover:underline">
              View All <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </div>
          <LatestNews />
        </section>
        
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
