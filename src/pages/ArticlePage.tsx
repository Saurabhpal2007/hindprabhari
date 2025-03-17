
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Bookmark, 
  Calendar, 
  Clock, 
  Eye, 
  Facebook, 
  MessageSquare, 
  Share2, 
  ThumbsUp, 
  Twitter, 
  Linkedin, 
  WhatsApp,
  ArrowRight
} from "lucide-react";
import { useToast } from "../components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

// Sample article data
const sampleArticle = {
  id: "pol-1",
  title: "New Policy Reform Announced by Government",
  content: `<p class="text-lg mb-4">The government announced a comprehensive policy reform today addressing key sectors including education, healthcare, and infrastructure development. The initiative aims to boost economic growth and improve quality of life for citizens across the country.</p>
  <p class="mb-4">Finance Minister Nirmala Sitharaman, who unveiled the policy package at a press conference, emphasized the government's commitment to inclusive growth and sustainable development. "These reforms represent a holistic approach to addressing challenges in critical sectors while creating opportunities for all segments of society," she stated.</p>
  <h2 class="text-2xl font-bold mt-8 mb-4">Education Reform</h2>
  <p class="mb-4">The education component of the reform includes significant increases in budget allocation, with a focus on digital infrastructure and teacher training programs. The government plans to establish centers of excellence in every state to promote research and innovation.</p>
  <p class="mb-4">"We are committed to transforming our education system to meet the demands of the 21st century," said Education Minister Dharmendra Pradhan. "These reforms will help bridge the digital divide and ensure quality education for all."</p>
  <h2 class="text-2xl font-bold mt-8 mb-4">Healthcare Initiatives</h2>
  <p class="mb-4">The healthcare aspect of the reform package includes expanded coverage under the Ayushman Bharat scheme and increased investment in medical infrastructure, particularly in rural areas. The government also announced plans to establish new AIIMS-like institutions in underserved regions.</p>
  <p class="mb-4">Health Minister Mansukh Mandaviya highlighted the importance of accessible healthcare, stating, "Our goal is to ensure that every citizen has access to quality healthcare services regardless of their geographic location or economic status."</p>
  <h2 class="text-2xl font-bold mt-8 mb-4">Infrastructure Development</h2>
  <p class="mb-4">The infrastructure component includes major investments in road networks, railways, and digital connectivity. The government has allocated ₹10,000 crore for new projects aimed at improving connectivity between rural and urban areas.</p>
  <blockquote class="border-l-4 border-primary pl-4 italic my-6">"Infrastructure development is the backbone of economic growth. These investments will create jobs, improve logistics, and enhance the overall quality of life for our citizens," said Minister for Road Transport and Highways Nitin Gadkari.</blockquote>
  <p class="mb-4">The policy reform has been generally well-received by industry leaders and economists, though some have expressed concerns about implementation challenges and fiscal implications.</p>
  <p class="mb-4">"The direction is positive, but execution will be key," said economist Raghuram Rajan. "The government needs to ensure that these reforms are implemented effectively and that the benefits reach those who need them most."</p>
  <p>Opposition leaders have called for more transparency in the implementation process and have raised questions about funding sources for the ambitious programs. The government has indicated that detailed implementation plans will be released in the coming weeks.</p>`,
  date: "2023-05-15",
  readTime: "5 min",
  author: "Rahul Sharma",
  authorBio: "Senior Political Correspondent with over 15 years of experience covering national politics and policy developments.",
  authorAvatar: "RS",
  category: "Politics",
  views: 1245,
  likes: 342,
  comments: [
    {
      id: "c1",
      user: "Ankit Patel",
      userAvatar: "AP",
      date: "2023-05-15",
      content: "This is a much-needed reform. I hope the implementation is done properly this time.",
      likes: 24
    },
    {
      id: "c2",
      user: "Priya Singh",
      userAvatar: "PS",
      date: "2023-05-15",
      content: "While the education reforms sound promising, I'm concerned about the funding allocation. Will this be sustainable in the long run?",
      likes: 18
    },
    {
      id: "c3",
      user: "Rajesh Kumar",
      userAvatar: "RK",
      date: "2023-05-16",
      content: "The infrastructure development plan could be transformative for rural connectivity. Looking forward to seeing how this unfolds.",
      likes: 15
    }
  ],
  relatedArticles: [
    {
      id: "pol-2",
      title: "Parliament Debates New Economic Measures",
      excerpt: "Members of Parliament engage in heated debate over proposed economic measures aimed at boosting growth.",
      date: "2023-05-10",
      image: "https://images.unsplash.com/photo-1575320181282-9afab399332c?ixlib=rb-4.0.3"
    },
    {
      id: "pol-3",
      title: "Election Commission Announces Poll Dates",
      excerpt: "The Election Commission has released the schedule for upcoming state assembly elections in five states.",
      date: "2023-05-05",
      image: "https://images.unsplash.com/photo-1581025026888-77f223d2e352?ixlib=rb-4.0.3"
    },
    {
      id: "pol-4",
      title: "International Relations: PM's Foreign Visit",
      excerpt: "Prime Minister concludes successful diplomatic visit to neighboring countries, signs multiple agreements.",
      date: "2023-04-28",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3"
    }
  ],
  image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?ixlib=rb-4.0.3"
};

interface CommentFormValues {
  comment: string;
}

const ArticlePage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isLoaded, setIsLoaded] = useState(false);
  const [article, setArticle] = useState(sampleArticle);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const form = useForm<CommentFormValues>({
    defaultValues: {
      comment: "",
    },
  });

  useEffect(() => {
    // Simulate loading article data
    const timer = setTimeout(() => {
      setIsLoaded(true);
      // In a real app, fetch the article by ID
      // For now, we're using the sample article
    }, 300);
    
    // Scroll to comments if hash is present
    if (window.location.hash === '#comments') {
      setTimeout(() => {
        const commentsSection = document.getElementById('comments');
        if (commentsSection) {
          commentsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
    
    return () => clearTimeout(timer);
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      setArticle(prev => ({...prev, likes: prev.likes + 1}));
      toast({
        title: "Article Liked",
        description: "You've successfully liked this article.",
      });
    } else {
      setArticle(prev => ({...prev, likes: prev.likes - 1}));
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark Removed" : "Article Bookmarked",
      description: isBookmarked 
        ? "This article has been removed from your bookmarks." 
        : "This article has been saved to your bookmarks.",
    });
  };

  const handleCommentLike = (commentId: string) => {
    setArticle(prev => ({
      ...prev,
      comments: prev.comments.map(comment => 
        comment.id === commentId 
          ? {...comment, likes: comment.likes + 1} 
          : comment
      )
    }));
    toast({
      title: "Comment Liked",
      description: "You've liked this comment.",
    });
  };

  const handleShare = (platform: string) => {
    toast({
      title: "Share Article",
      description: `Sharing to ${platform}. This feature will be fully implemented soon.`,
    });
  };

  const onSubmitComment = (data: CommentFormValues) => {
    if (!data.comment.trim()) return;
    
    // In a real app, send this to the server
    const newComment = {
      id: `c${article.comments.length + 1}`,
      user: "Guest User",
      userAvatar: "GU",
      date: new Date().toISOString().split('T')[0],
      content: data.comment,
      likes: 0
    };
    
    setArticle(prev => ({
      ...prev,
      comments: [...prev.comments, newComment]
    }));
    
    form.reset();
    
    toast({
      title: "Comment Posted",
      description: "Your comment has been successfully posted.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {/* Hero Section */}
          <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src={article.image} 
                alt={article.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
              <div className="container mx-auto">
                <Link to={`/${article.category.toLowerCase()}`} className="inline-block mb-3 text-sm font-medium bg-primary/20 text-primary px-3 py-1 rounded-full">
                  {article.category}
                </Link>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl">
                  {article.title}
                </h1>
                <div className="flex flex-wrap items-center text-sm space-x-4 text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>{article.readTime} read</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-3.5 w-3.5 mr-1" />
                    <span>{article.views} views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Article Content */}
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Article Main Content */}
              <div className="lg:col-span-8">
                <div className="flex items-center mb-6 p-4 bg-muted/30 rounded-lg">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarFallback>{article.authorAvatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{article.author}</h3>
                    <p className="text-sm text-muted-foreground">{article.authorBio}</p>
                  </div>
                </div>
                
                <div 
                  className="prose prose-lg max-w-none dark:prose-invert mb-8"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
                
                {/* Article Actions */}
                <div className="flex flex-wrap justify-between items-center py-4 mb-8 border-t border-b">
                  <div className="flex space-x-2 mb-2 sm:mb-0">
                    <Button
                      variant={isLiked ? "default" : "outline"} 
                      onClick={handleLike}
                      className="rounded-full"
                    >
                      <ThumbsUp className="h-5 w-5 mr-1" />
                      <span>{article.likes}</span>
                    </Button>
                    <Button
                      variant={isBookmarked ? "default" : "outline"} 
                      onClick={handleBookmark}
                      className="rounded-full"
                    >
                      <Bookmark className="h-5 w-5 mr-1" />
                      <span>Save</span>
                    </Button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" className="rounded-full" onClick={() => handleShare('Facebook')}>
                      <Facebook className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full" onClick={() => handleShare('Twitter')}>
                      <Twitter className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full" onClick={() => handleShare('LinkedIn')}>
                      <Linkedin className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full" onClick={() => handleShare('WhatsApp')}>
                      <WhatsApp className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                {/* Comments Section */}
                <div id="comments" className="mt-12">
                  <h2 className="text-2xl font-bold mb-6">Comments ({article.comments.length})</h2>
                  
                  {/* Comment Form */}
                  <Card className="mb-8">
                    <CardContent className="pt-6">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmitComment)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Textarea
                                    placeholder="Share your thoughts..."
                                    className="min-h-24 resize-none"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex justify-end">
                            <Button type="submit">Post Comment</Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                  
                  {/* Comments List */}
                  <div className="space-y-6">
                    {article.comments.map((comment) => (
                      <div key={comment.id} className="p-4 border rounded-lg">
                        <div className="flex items-center mb-2">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarFallback>{comment.userAvatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{comment.user}</h4>
                            <p className="text-xs text-muted-foreground">{comment.date}</p>
                          </div>
                        </div>
                        <p className="mb-3 text-sm ml-13">{comment.content}</p>
                        <div className="flex justify-end">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleCommentLike(comment.id)}
                            className="rounded-full text-muted-foreground hover:text-primary"
                          >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span>{comment.likes}</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-4">
                {/* Related Articles */}
                <div className="sticky top-20">
                  <h3 className="text-xl font-bold mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {article.relatedArticles.map((related) => (
                      <Link key={related.id} to={`/article/${related.id}`}>
                        <div className="group flex space-x-3 items-start hover:bg-muted/50 p-2 rounded-lg transition-colors">
                          <img 
                            src={related.image} 
                            alt={related.title}
                            className="w-24 h-16 object-cover rounded-md flex-shrink-0"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">{related.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{related.date}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">More in {article.category}</h3>
                    <Link 
                      to={`/${article.category.toLowerCase()}`} 
                      className="flex items-center text-primary hover:underline"
                    >
                      View all articles <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticlePage;
