
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

interface CategoryPageTemplateProps {
  title: string;
  description: string;
  sections?: string[];
}

const CategoryPageTemplate = ({
  title,
  description,
  sections = ["Latest", "Featured", "Most Read", "Analysis"]
}: CategoryPageTemplateProps) => {
  useEffect(() => {
    document.title = `${title} - HindPrabhari`;
  }, [title]);

  return (
    <>
      <Helmet>
        <meta name="description" content={description} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>

          <Tabs defaultValue={sections[0].toLowerCase()}>
            <TabsList className="w-full md:w-auto overflow-auto mb-4">
              {sections.map((section) => (
                <TabsTrigger 
                  key={section} 
                  value={section.toLowerCase()}
                  className="min-w-[100px]"
                >
                  {section}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {sections.map((section) => (
              <TabsContent key={section} value={section.toLowerCase()}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i}>
                      <CardContent className="p-0">
                        <Skeleton className="h-48 w-full rounded-t-lg" />
                        <div className="p-4 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-10 w-full" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default CategoryPageTemplate;
