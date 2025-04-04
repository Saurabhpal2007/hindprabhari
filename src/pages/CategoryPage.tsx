
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategoryPageContent from "@/components/category/CategoryPageContent";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);
  
  // Format category name for display
  const formatCategoryName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  
  const getCategoryDescription = (name: string) => {
    const descriptions: Record<string, string> = {
      politics: "Stay updated with the latest political news, analysis and opinions from India and around the world.",
      technology: "Discover the latest tech innovations, gadget reviews, and digital trends shaping our future.",
      sports: "Get the latest sports news, match results, and in-depth analysis from cricket, football, and more.",
      entertainment: "Find the hottest news from Bollywood, Hollywood, and regional cinema, plus TV and streaming updates.",
      education: "Keep up with educational reforms, exam updates, and career guidance for students across India.",
      health: "Access important healthcare news, wellness tips, and medical breakthroughs that matter to you.",
      world: "Stay informed about global events, international relations, and news affecting India's position worldwide.",
      business: "Track market trends, company news, economic policies, and business strategies impacting India's growth."
    };
    
    return descriptions[name.toLowerCase()] || `Find all the latest news and updates related to ${formatCategoryName(name)}.`;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {category && (
          <CategoryPageContent 
            categoryName={formatCategoryName(category)}
            description={getCategoryDescription(category)}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
