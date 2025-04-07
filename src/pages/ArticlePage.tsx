
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Mail, Bookmark, ThumbsUp, ThumbsDown, Share2, Calendar, Clock, User, MessageSquare, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import NewsGrid from "@/components/news/NewsGrid";

interface Comment {
  id: number;
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
  date: string;
  likes: number;
}

interface Article {
  id: number;
  title: string;
  content: string[];
  category: string;
  subcategory?: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
    url: string;
  };
  date: string;
  readTime: string;
  views: number;
  likes: number;
  dislikes: number;
  comments: Comment[];
  tags: string[];
  imageUrl: string;
  relatedArticles: number[];
}

// Mock article data
const mockArticle: Article = {
  id: 1,
  title: "India's Digital Revolution: How Technology is Transforming Rural Communities",
  content: [
    "India is witnessing a remarkable digital transformation that extends beyond its bustling urban centers into the heart of rural communities. This technological revolution is reshaping the social, economic, and educational landscape of villages across the country.",
    
    "The government's Digital India initiative, launched in 2015, has been instrumental in bringing high-speed internet, digital literacy programs, and e-governance services to remote areas. What began as an ambitious vision is now showing tangible results, with millions of rural citizens gaining access to digital tools that were previously unavailable to them.",
    
    "One of the most significant impacts has been in financial inclusion. With the introduction of digital payment systems and mobile banking solutions, villagers who once had to travel long distances to access banking services can now conduct transactions from their phones. Farmers are receiving direct subsidies through digital transfers, eliminating intermediaries and reducing corruption.",
    
    "Education has also seen a dramatic transformation. Rural schools are being equipped with computers and internet connectivity, exposing students to global learning resources. During the pandemic, many villages set up community digital centers where students could access online classes when schools were closed.",
    
    "Healthcare delivery has improved through telemedicine initiatives, allowing villagers to consult with specialists in cities without the need for expensive and time-consuming travel. Digital health records are making it easier to track and manage healthcare needs in underserved communities.",
    
    "Agriculture, the backbone of rural India, is becoming smarter with the adoption of precision farming techniques, weather forecasting apps, and online marketplaces that connect farmers directly with buyers. This technological integration is helping increase yields, reduce waste, and improve income levels for farming families.",
    
    "However, challenges remain. Digital literacy levels vary widely, and many elderly residents struggle to adapt to new technologies. Infrastructure limitations, including unreliable electricity and internet connectivity in some areas, continue to be obstacles. There's also the concern of the digital divide widening between those who can access and effectively use digital tools and those who cannot.",
    
    "Despite these challenges, the momentum of digital transformation in rural India continues to build. Government initiatives are being complemented by efforts from private companies, NGOs, and social entrepreneurs who see the potential for technology to address longstanding problems in rural development.",
    
    "As this digital revolution progresses, it's creating new opportunities for rural youth who can now access remote work, online education, and entrepreneurship resources without migrating to cities. This could potentially slow or even reverse the rural-to-urban migration trend that has characterized India's development for decades.",
    
    "The story of India's rural digital transformation is still being written, but it's already clear that technology is becoming a powerful force for positive change in the country's vast countryside."
  ],
  category: "Technology",
  subcategory: "Digital India",
  author: {
    name: "Priya Sharma",
    role: "Technology Editor",
    avatar: "https://randomuser.me/api/portraits/women/43.jpg",
    url: "/author/priya-sharma"
  },
  date: "2023-04-15",
  readTime: "8 min read",
  views: 12580,
  likes: 843,
  dislikes: 52,
  comments: [
    {
      id: 1,
      user: {
        name: "Rahul Verma",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      content: "This is a great summary of how technology is changing life in rural areas. I've seen these changes firsthand in my village in Maharashtra. The digital payment systems have made life so much easier for everyone.",
      date: "2023-04-15",
      likes: 24
    },
    {
      id: 2,
      user: {
        name: "Anjali Patel"
      },
      content: "While there has been progress, I think the article could have addressed the issue of internet reliability more. In many villages, connectivity is still a major problem, especially during monsoon season.",
      date: "2023-04-14",
      likes: 18
    },
    {
      id: 3,
      user: {
        name: "Sunil Kumar",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      },
      content: "The point about telemedicine is spot on. My father in our village was able to consult with a cardiologist in Delhi without traveling. This technology is literally saving lives!",
      date: "2023-04-14",
      likes: 32
    }
  ],
  tags: ["Digital India", "Rural Development", "Technology", "Digital Literacy", "Internet"],
  imageUrl: "https://source.unsplash.com/random/1200x600?india,technology,rural",
  relatedArticles: [2, 3, 4, 5]
};

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call to fetch article based on ID
    setLoading(true);
    window.scrollTo(0, 0);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      // Using mock data for now
      setArticle(mockArticle);
      setLoading(false);
    }, 800);
  }, [id]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      toast({
        title: "Comment Submitted",
        description: "Your comment has been submitted for review.",
      });
      setCommentText("");
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast({
      title: bookmarked ? "Removed from Bookmarks" : "Added to Bookmarks",
      description: bookmarked ? "Article removed from your bookmarks." : "Article saved to your bookmarks.",
    });
  };

  const handleLike = () => {
    if (disliked) setDisliked(false);
    setLiked(!liked);
    
    toast({
      title: liked ? "Removed Like" : "Article Liked",
      description: liked ? "You've removed your like from this article." : "Thanks for liking this article!",
    });
  };

  const handleDislike = () => {
    if (liked) setLiked(false);
    setDisliked(!disliked);
    
    toast({
      title: disliked ? "Removed Dislike" : "Article Disliked",
      description: disliked ? "You've removed your dislike from this article." : "Thanks for your feedback.",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        url: window.location.href,
      });
    } else {
      // Copy to clipboard as fallback
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Article link copied to clipboard.",
      });
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-8 w-1/2 mb-8" />
          <Skeleton className="h-[400px] w-full mb-8 rounded-lg" />
          <div className="space-y-4 mb-8">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.title} - HindPrabhari</title>
        <meta name="description" content={article.content[0]} />
      </Helmet>

      <article className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Category and Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Link to={`/categories/${article.category.toLowerCase()}`}>
              <Badge variant="outline" className="text-primary border-primary">
                {article.category}
              </Badge>
            </Link>
            {article.subcategory && (
              <Badge variant="outline">
                {article.subcategory}
              </Badge>
            )}
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{article.title}</h1>
          
          {/* Author and Metadata */}
          <div className="flex flex-wrap items-center justify-between mb-6">
            <div className="flex items-center">
              <Link to={article.author.url} className="flex items-center mr-4">
                <Avatar className="h-10 w-10 mr-2">
                  <AvatarImage src={article.author.avatar} />
                  <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{article.author.name}</p>
                  <p className="text-xs text-muted-foreground">{article.author.role}</p>
                </div>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{formatDate(article.date)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                <span>{article.views.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          {/* Featured Image */}
          <div className="mb-8">
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full max-h-[600px] object-cover rounded-lg"
            />
          </div>
          
          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-8">
            {article.content.map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
          
          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link key={tag} to={`/search?tag=${encodeURIComponent(tag)}`}>
                  <Badge variant="secondary">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Engagement */}
          <div className="flex flex-wrap items-center justify-between py-4 border-t border-b mb-8">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className={`flex items-center ${liked ? 'bg-primary/10 text-primary' : ''}`}
                onClick={handleLike}
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                <span>{(article.likes + (liked ? 1 : 0)).toLocaleString()}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`flex items-center ${disliked ? 'bg-destructive/10 text-destructive' : ''}`}
                onClick={handleDislike}
              >
                <ThumbsDown className="h-4 w-4 mr-2" />
                <span>{(article.dislikes + (disliked ? 1 : 0)).toLocaleString()}</span>
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className={`flex items-center ${bookmarked ? 'bg-primary/10 text-primary' : ''}`}
                onClick={handleBookmark}
              >
                <Bookmark className={`h-4 w-4 mr-2 ${bookmarked ? 'fill-current' : ''}`} />
                <span>Bookmark</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-2" />
                <span>Share</span>
              </Button>
            </div>
          </div>
          
          {/* Social Share */}
          <div className="flex items-center justify-center space-x-3 mb-8">
            <span className="text-sm font-medium">Share on:</span>
            <Button variant="ghost" size="icon" className="rounded-full bg-[#1877F2] text-white hover:bg-[#1877F2]/90">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-[#EA4335] text-white hover:bg-[#EA4335]/90">
              <Mail className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Comments Section */}
          <div className="mb-12">
            <Tabs defaultValue="comments">
              <TabsList className="mb-4">
                <TabsTrigger value="comments" className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  <span>Comments ({article.comments.length})</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="comments">
                {/* Comment Form */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Leave a Comment</h3>
                  <form onSubmit={handleCommentSubmit}>
                    <Textarea
                      placeholder="Share your thoughts on this article..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="mb-4"
                      rows={4}
                    />
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground">
                        All comments are reviewed before being published.
                      </p>
                      <Button type="submit" disabled={!commentText.trim()}>
                        Submit Comment
                      </Button>
                    </div>
                  </form>
                </div>
                
                <Separator className="my-6" />
                
                {/* Comments List */}
                <div className="space-y-6">
                  {article.comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-4">
                      <Avatar>
                        <AvatarImage src={comment.user.avatar} />
                        <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{comment.user.name}</h4>
                            <p className="text-xs text-muted-foreground">{formatDate(comment.date)}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs flex items-center"
                            onClick={() => toast({
                              title: "Comment Liked",
                              description: "Thanks for your feedback!"
                            })}
                          >
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            <span>{comment.likes}</span>
                          </Button>
                        </div>
                        <p className="text-sm mt-2">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Related Articles */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <NewsGrid category="all" limit={3} />
          </div>
        </div>
      </article>
    </>
  );
};

export default ArticlePage;
