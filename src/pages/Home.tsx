
import { useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import BreakingNews from "@/components/news/BreakingNews";
import TrendingSection from "@/components/news/TrendingSection";
import LatestNews from "@/components/news/LatestNews";
import FeaturedArticles from "@/components/news/FeaturedArticles";
import CategoryCards from "@/components/home/CategoryCards";
import AboutUsSection from "@/components/home/AboutUsSection";
import ContactSection from "@/components/home/ContactSection";
import { Helmet } from "react-helmet";

const Home = () => {
  useEffect(() => {
    document.title = "HindPrabhari - Latest News, Breaking News, India News";
  }, []);

  return (
    <>
      <Helmet>
        <meta name="description" content="HindPrabhari - Latest news, breaking news, and in-depth stories from India and around the world. Your trusted source for politics, business, technology, sports, and more." />
      </Helmet>

      <div className="space-y-10 mb-10">
        <BreakingNews />
        <HeroSection />
        <TrendingSection />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <LatestNews />
            </div>
            <div className="lg:col-span-1 space-y-8">
              <FeaturedArticles />
            </div>
          </div>
        </div>
        <CategoryCards />
        <div id="about" className="scroll-mt-20">
          <AboutUsSection />
        </div>
        <div id="contact" className="scroll-mt-20">
          <ContactSection />
        </div>
      </div>
    </>
  );
};

export default Home;
