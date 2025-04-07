import { Helmet } from "react-helmet-async";
import FeaturedSlider from "@/components/home/FeaturedSlider";
import TrendingColumn from "@/components/home/TrendingColumn";
import CategoryGrid from "@/components/home/CategoryGrid";
import AboutUsSection from "@/components/home/AboutUsSection";
import ContactSection from "@/components/home/ContactSection";
import NewsGrid from "@/components/news/NewsGrid";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>HindPrabhari - Latest News from India and Around the World</title>
        <meta 
          name="description" 
          content="Stay informed with the latest news, breaking stories, and in-depth analysis from India and around the world at HindPrabhari."
        />
      </Helmet>

      <div className="pt-8 pb-12">
        {/* Hero Section: Featured Articles + Trending */}
        <section className="container mx-auto px-4 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <FeaturedSlider />
            </div>
            <div className="lg:col-span-1">
              <TrendingColumn />
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-12">
          <CategoryGrid />
        </section>

        {/* Latest News Section */}
        <section className="container mx-auto px-4 mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Latest News</h2>
          </div>
          <NewsGrid category="latest" limit={6} />
        </section>

        {/* About Us Section (keep existing) */}
        <section id="about" className="scroll-mt-20">
          <AboutUsSection />
        </section>

        {/* Contact Section (keep existing) */}
        <section id="contact" className="scroll-mt-20">
          <ContactSection />
        </section>
      </div>
    </>
  );
};

export default Home;
