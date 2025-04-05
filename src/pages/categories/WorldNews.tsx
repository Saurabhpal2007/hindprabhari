
import CategoryPageTemplate from "@/components/shared/CategoryPageTemplate";

const WorldNews = () => {
  return (
    <CategoryPageTemplate 
      title="World News"
      description="Stay informed about global events, international politics, conflicts, diplomacy, and global trends shaping our world. Comprehensive coverage from across the continents."
      sections={["Latest", "Featured", "Asia", "Europe", "Americas", "Middle East", "Africa"]}
    />
  );
};

export default WorldNews;
