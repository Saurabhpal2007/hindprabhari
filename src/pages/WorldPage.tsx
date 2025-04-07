
import { Helmet } from "react-helmet-async";
import NewsGrid from "@/components/news/NewsGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WorldPage = () => {
  const regions = [
    "All Regions",
    "Asia",
    "Europe",
    "Americas",
    "Middle East",
    "Africa",
    "Oceania"
  ];

  return (
    <>
      <Helmet>
        <title>World News - HindPrabhari</title>
        <meta 
          name="description" 
          content="Find the latest international news and world events from Asia, Europe, the Middle East, and more at HindPrabhari."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">World News</h1>
          <p className="text-muted-foreground">
            Stay informed about global events and developments with our comprehensive coverage of international news from all corners of the world.
          </p>
        </div>

        <Tabs defaultValue="All Regions">
          <TabsList className="mb-6 overflow-auto">
            {regions.map((region) => (
              <TabsTrigger key={region} value={region}>
                {region}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {regions.map((region) => (
            <TabsContent key={region} value={region}>
              <NewsGrid 
                category={region === "All Regions" ? "all" : region.toLowerCase()} 
                showFilters={true}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
};

export default WorldPage;
