
import CategoryPageTemplate from "@/components/shared/CategoryPageTemplate";

const CountriesPage = () => {
  return (
    <CategoryPageTemplate 
      title="Countries"
      description="Find latest news, analysis, and in-depth coverage from countries around the world. Stay informed about international events and developments."
      sections={["Asia", "Europe", "Americas", "Middle East", "Africa", "Oceania"]}
    />
  );
};

export default CountriesPage;
