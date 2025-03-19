
import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';

const VideosPage = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  
  const videos = [
    {
      id: 1,
      title: "Impact of Union Budget 2023 on Middle Class",
      category: "Economy",
      date: "Feb 2, 2023",
      duration: "12:45",
      thumbnail: "https://source.unsplash.com/random/800x450?budget",
      embedId: "dQw4w9WgXcQ" // Example YouTube ID
    },
    {
      id: 2,
      title: "Cricket World Cup: India's Chances Analysis",
      category: "Sports",
      date: "March 15, 2023",
      duration: "18:32",
      thumbnail: "https://source.unsplash.com/random/800x450?cricket",
      embedId: "dQw4w9WgXcQ"
    },
    {
      id: 3,
      title: "Tech Startups Revolutionizing Rural India",
      category: "Technology",
      date: "April 10, 2023",
      duration: "22:15",
      thumbnail: "https://source.unsplash.com/random/800x450?startup",
      embedId: "dQw4w9WgXcQ"
    },
    {
      id: 4,
      title: "Climate Change: How It's Affecting Indian Agriculture",
      category: "Environment",
      date: "May 22, 2023",
      duration: "15:47",
      thumbnail: "https://source.unsplash.com/random/800x450?climate",
      embedId: "dQw4w9WgXcQ"
    },
    {
      id: 5,
      title: "Election Results Analysis: What It Means for India",
      category: "Politics",
      date: "June 5, 2023",
      duration: "28:32",
      thumbnail: "https://source.unsplash.com/random/800x450?election",
      embedId: "dQw4w9WgXcQ"
    },
    {
      id: 6,
      title: "Healthcare Revolution: New Policies Explained",
      category: "Health",
      date: "July 18, 2023",
      duration: "14:20",
      thumbnail: "https://source.unsplash.com/random/800x450?healthcare",
      embedId: "dQw4w9WgXcQ"
    }
  ];

  const handlePlayVideo = (id: number) => {
    setSelectedVideo(id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Videos</h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
            In-depth video reports, interviews, and analysis on the latest news and current events in Bharat and around the world.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className="overflow-hidden">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-52 object-cover"
                  />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="default" 
                        size="icon" 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-primary/80 hover:bg-primary transition-colors"
                        onClick={() => handlePlayVideo(video.id)}
                      >
                        <Play className="h-8 w-8 text-primary-foreground" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{video.title}</DialogTitle>
                        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none">
                          <X className="h-4 w-4" />
                        </DialogClose>
                      </DialogHeader>
                      <div className="aspect-video">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${video.embedId}`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Badge 
                    variant="secondary" 
                    className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm"
                  >
                    {video.duration}
                  </Badge>
                </div>
                <CardHeader>
                  <Badge variant="outline" className="mb-2 w-fit">{video.category}</Badge>
                  <CardTitle className="text-xl">{video.title}</CardTitle>
                  <CardDescription>{video.date}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="default" 
                        className="w-full"
                        onClick={() => handlePlayVideo(video.id)}
                      >
                        Watch Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{video.title}</DialogTitle>
                        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none">
                          <X className="h-4 w-4" />
                        </DialogClose>
                      </DialogHeader>
                      <div className="aspect-video">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${video.embedId}`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VideosPage;
