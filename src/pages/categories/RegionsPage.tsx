
import CategoryPageTemplate from "@/components/shared/CategoryPageTemplate";

const RegionsPage = () => {
  return (
    <CategoryPageTemplate 
      title="World Regions"
      description="Explore news from different regions around the world. Find the latest updates, analysis, and stories from Asia, Europe, Americas, Middle East, Africa, and Oceania."
      sections={["Asia", "Europe", "Americas", "Middle East", "Africa", "Oceania"]}
    />
  );
};

export default RegionsPage;
