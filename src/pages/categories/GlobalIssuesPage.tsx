
import CategoryPageTemplate from "@/components/shared/CategoryPageTemplate";

const GlobalIssuesPage = () => {
  return (
    <CategoryPageTemplate 
      title="Global Issues"
      description="Comprehensive coverage of global challenges and issues affecting our world. From climate change to human rights, pandemic response to economic inequality."
      sections={["Climate", "Human Rights", "Economy", "Health", "Technology", "Governance"]}
    />
  );
};

export default GlobalIssuesPage;
