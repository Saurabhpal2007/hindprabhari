
import { Helmet } from "react-helmet-async";
import NewsGrid from "@/components/news/NewsGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const IndiaPage = () => {
  const categories = [
    "All News",
    "Politics",
    "Economy",
    "Society",
    "Culture",
    "Science"
  ];

  return (
    <>
      <Helmet>
        <title>India News - HindPrabhari</title>
        <meta 
          name="description" 
          content="Latest news from across India covering politics, economy, society, culture, and more at HindPrabhari."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">India News</h1>
          <p className="text-muted-foreground">
            Comprehensive coverage of news and events from across India, with a focus on politics, economy, society, and culture.
          </p>
        </div>

        <Tabs defaultValue="All News">
          <TabsList className="mb-6 overflow-auto">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <NewsGrid 
                category={category === "All News" ? "all" : category.toLowerCase()} 
                showFilters={true}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
};

export default IndiaPage;
