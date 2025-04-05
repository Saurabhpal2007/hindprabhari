
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

const VideoHub = () => {
  return (
    <>
      <Helmet>
        <title>Video Hub - HindPrabhari</title>
        <meta name="description" content="Watch the latest news videos, documentaries, interviews, and explainers from HindPrabhari." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Video Hub</h1>
        
        <Tabs defaultValue="featured">
          <TabsList className="mb-6">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="shows">Shows</TabsTrigger>
            <TabsTrigger value="documentaries">Documentaries</TabsTrigger>
          </TabsList>
          
          <TabsContent value="featured" className="space-y-8">
            {/* Featured video section would go here */}
            <div className="aspect-video rounded-lg overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="aspect-video rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="latest">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="aspect-video rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="shows">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="aspect-video rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="documentaries">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="aspect-video rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default VideoHub;
