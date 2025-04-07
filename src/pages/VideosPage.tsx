
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, Calendar, Play } from "lucide-react";

// Mock data for videos
const longVideos = [
  {
    id: 1,
    title: "Special Report: The Future of India's Economy Post-Pandemic",
    category: "Economy",
    duration: "12:45",
    views: 42580,
    date: "2023-04-12",
    thumbnail: "https://source.unsplash.com/random/800x450?economy,india",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 2,
    title: "Climate Change Impact on India's Agriculture: Documentary",
    category: "Environment",
    duration: "18:20",
    views: 31250,
    date: "2023-04-08",
    thumbnail: "https://source.unsplash.com/random/800x450?farm,climate",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 3,
    title: "Technology Revolution in Rural India: Success Stories",
    category: "Technology",
    duration: "15:38",
    views: 28970,
    date: "2023-04-05",
    thumbnail: "https://source.unsplash.com/random/800x450?technology,rural",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 4,
    title: "Behind the Scenes: Indian Diplomatic Missions Abroad",
    category: "Politics",
    duration: "21:05",
    views: 19870,
    date: "2023-04-01",
    thumbnail: "https://source.unsplash.com/random/800x450?diplomat,india",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];

const shortVideos = [
  {
    id: 101,
    title: "Government Announces New Education Policy",
    duration: "1:45",
    views: 89320,
    date: "2023-04-15",
    thumbnail: "https://source.unsplash.com/random/400x600?education"
  },
  {
    id: 102,
    title: "Stock Market Hits All-Time High",
    duration: "1:20",
    views: 75640,
    date: "2023-04-14",
    thumbnail: "https://source.unsplash.com/random/400x600?stockmarket"
  },
  {
    id: 103,
    title: "Monsoon Arrives Early in Kerala",
    duration: "0:58",
    views: 62180,
    date: "2023-04-13",
    thumbnail: "https://source.unsplash.com/random/400x600?rain,monsoon"
  },
  {
    id: 104,
    title: "New Smartphone Launch Event Highlights",
    duration: "1:32",
    views: 58970,
    date: "2023-04-12",
    thumbnail: "https://source.unsplash.com/random/400x600?smartphone"
  },
  {
    id: 105,
    title: "Cricket: Team Selection for World Cup",
    duration: "1:15",
    views: 95430,
    date: "2023-04-11",
    thumbnail: "https://source.unsplash.com/random/400x600?cricket"
  },
  {
    id: 106,
    title: "Delhi Air Quality Improves After Rain",
    duration: "0:48",
    views: 42760,
    date: "2023-04-10",
    thumbnail: "https://source.unsplash.com/random/400x600?delhi,air"
  },
  {
    id: 107,
    title: "New Healthcare Initiative in Rural Areas",
    duration: "1:28",
    views: 38920,
    date: "2023-04-09",
    thumbnail: "https://source.unsplash.com/random/400x600?healthcare,rural"
  },
  {
    id: 108,
    title: "Traditional Festival Celebrations Across India",
    duration: "1:05",
    views: 51380,
    date: "2023-04-08",
    thumbnail: "https://source.unsplash.com/random/400x600?festival,india"
  }
];

const VideosPage = () => {
  const [selectedVideo, setSelectedVideo] = useState(longVideos[0]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <>
      <Helmet>
        <title>Videos - HindPrabhari</title>
        <meta 
          name="description" 
          content="Watch the latest news videos, short clips, documentaries, and special reports from HindPrabhari."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">HindPrabhari Videos</h1>
          <p className="text-muted-foreground">
            Watch the latest news videos, documentaries, short clips, and special reports from our team of journalists.
          </p>
        </div>

        <Tabs defaultValue="long-videos">
          <TabsList className="mb-6">
            <TabsTrigger value="long-videos">Long Videos</TabsTrigger>
            <TabsTrigger value="shorts">Shorts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="long-videos">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Video Player */}
              <div className="lg:col-span-2">
                <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src={selectedVideo.embedUrl}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <div>
                  <Badge className="mb-2">{selectedVideo.category}</Badge>
                  <h2 className="text-xl font-bold mb-2">{selectedVideo.title}</h2>
                  <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-4">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      <span>{formatViews(selectedVideo.views)} views</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{selectedVideo.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{formatDate(selectedVideo.date)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Video List */}
              <div className="lg:col-span-1">
                <h3 className="font-semibold mb-4">More Videos</h3>
                <div className="space-y-4">
                  {longVideos.map((video) => (
                    <Card 
                      key={video.id} 
                      className={`cursor-pointer hover:bg-accent/50 transition-colors ${
                        selectedVideo.id === video.id ? 'border-primary' : ''
                      }`}
                      onClick={() => setSelectedVideo(video)}
                    >
                      <CardContent className="p-3 flex gap-3">
                        <div className="relative w-24 h-16 flex-shrink-0">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title} 
                            className="w-full h-full object-cover rounded"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded">
                            <Play className="h-6 w-6 text-white" fill="white" />
                          </div>
                          <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                            {video.duration}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium line-clamp-2">{video.title}</h4>
                          <div className="flex items-center mt-1 text-xs text-muted-foreground">
                            <Eye className="h-3 w-3 mr-1" />
                            <span>{formatViews(video.views)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="shorts">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {shortVideos.map((video) => (
                <div key={video.id} className="relative group">
                  <div className="aspect-[9/16] rounded-lg overflow-hidden bg-card">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="h-12 w-12 text-white" fill="white" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-white text-sm font-medium line-clamp-2">{video.title}</h3>
                    <div className="flex items-center justify-between mt-2 text-xs text-white/80">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{video.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        <span>{formatViews(video.views)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default VideosPage;
