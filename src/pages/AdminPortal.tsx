
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Pencil, 
  Plus, 
  Trash, 
  Users, 
  FileText, 
  Settings, 
  Tag, 
  LayoutDashboard, 
  LogOut, 
  Image, 
  Folder, 
  Eye,
  PanelLeft,
  PanelRight,
  Sliders,
  MessageSquare,
  Search
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "../components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample data for admin dashboard
const sampleDashboardData = {
  totalUsers: 450,
  newUsers: 45,
  totalArticles: 120,
  newArticles: 12,
  totalComments: 560,
  pendingComments: 15,
  totalCategories: 8,
  storageUsed: 2.5, // GB
};

// Sample data for articles
const sampleArticles = [
  {
    id: "art-1",
    title: "The Future of AI in Healthcare",
    category: "Technology",
    status: "published",
    date: "2023-08-01",
    views: 1234,
  },
  {
    id: "art-2",
    title: "Economic Impact of Renewable Energy",
    category: "Politics",
    status: "draft",
    date: "2023-07-15",
    views: 567,
  },
  {
    id: "art-3",
    title: "Summer Sports Highlights",
    category: "Sports",
    status: "pending",
    date: "2023-07-01",
    views: 789,
  },
  {
    id: "art-4",
    title: "New Movie Releases for August",
    category: "Entertainment",
    status: "published",
    date: "2023-08-05",
    views: 890,
  },
  {
    id: "art-5",
    title: "Innovations in Education Technology",
    category: "Education",
    status: "published",
    date: "2023-07-20",
    views: 678,
  },
  {
    id: "art-6",
    title: "The Benefits of Regular Exercise",
    category: "Health",
    status: "draft",
    date: "2023-06-15",
    views: 456,
  },
  {
    id: "art-7",
    title: "Global Economic Trends in 2023",
    category: "World",
    status: "published",
    date: "2023-05-01",
    views: 901,
  },
  {
    id: "art-8",
    title: "The Rise of E-commerce",
    category: "Business",
    status: "pending",
    date: "2023-04-28",
    views: 345,
  },
];

// Sample data for analytics
const analyticsData = {
  topArticles: [
    { title: "The Future of AI in Healthcare", category: "Technology", views: 12345 },
    { title: "Economic Impact of Renewable Energy", category: "Politics", views: 9876 },
    { title: "Summer Sports Highlights", category: "Sports", views: 8765 },
    { title: "New Movie Releases for August", category: "Entertainment", views: 7654 },
    { title: "Innovations in Education Technology", category: "Education", views: 6543 },
  ],
  topCategories: [
    { name: "Technology", views: 45678 },
    { name: "Politics", views: 34567 },
    { name: "Entertainment", views: 23456 },
    { name: "Sports", views: 12345 },
    { name: "Health", views: 9876 },
  ],
};

const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dashboardData, setDashboardData] = useState(sampleDashboardData);
  const [articles, setArticles] = useState(sampleArticles);
  const [articlesSearchQuery, setArticlesSearchQuery] = useState("");
  const [articleCategoryFilter, setArticleCategoryFilter] = useState("all");
  const [articleStatusFilter, setArticleStatusFilter] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Admin Portal | HindPrabhari";
    setIsLoaded(true);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleNewArticle = () => {
    toast({
      title: "New Article",
      description: "Navigating to new article creation page.",
    });
  };

  const handleEditArticle = (articleId: string) => {
    toast({
      title: "Edit Article",
      description: `Navigating to edit article with ID: ${articleId}.`,
    });
  };

  const handleViewArticle = (articleId: string) => {
    toast({
      title: "View Article",
      description: `Navigating to view article with ID: ${articleId}.`,
    });
  };

  const handleDeleteArticle = (articleId: string) => {
    setArticles(articles.filter((article) => article.id !== articleId));
    toast({
      title: "Delete Article",
      description: `Article with ID: ${articleId} has been deleted.`,
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logout",
      description: "You have been logged out.",
    });
  };

  const getFilteredArticles = () => {
    return articles
      .filter((article) =>
        article.title.toLowerCase().includes(articlesSearchQuery.toLowerCase())
      )
      .filter((article) =>
        articleCategoryFilter === "all"
          ? true
          : article.category.toLowerCase() === articleCategoryFilter
      )
      .filter((article) =>
        articleStatusFilter === "all" ? true : article.status === articleStatusFilter
      );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-3 xl:col-span-2">
              <Card className="sticky top-24">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>PS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Priya Sharma</p>
                      <p className="text-xs text-muted-foreground">Administrator</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <nav className="flex flex-col">
                    <Button 
                      variant={activeTab === "dashboard" ? "default" : "ghost"} 
                      className="justify-start rounded-none h-12"
                      onClick={() => setActiveTab("dashboard")}
                    >
                      <LayoutDashboard className="h-5 w-5 mr-2" />
                      Dashboard
                    </Button>
                    <Button 
                      variant={activeTab === "articles" ? "default" : "ghost"} 
                      className="justify-start rounded-none h-12"
                      onClick={() => setActiveTab("articles")}
                    >
                      <FileText className="h-5 w-5 mr-2" />
                      Articles
                    </Button>
                    <Button 
                      variant={activeTab === "categories" ? "default" : "ghost"} 
                      className="justify-start rounded-none h-12"
                      onClick={() => setActiveTab("categories")}
                    >
                      <Tag className="h-5 w-5 mr-2" />
                      Categories
                    </Button>
                    <Button 
                      variant={activeTab === "comments" ? "default" : "ghost"} 
                      className="justify-start rounded-none h-12"
                      onClick={() => setActiveTab("comments")}
                    >
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Comments
                    </Button>
                    <Button 
                      variant={activeTab === "users" ? "default" : "ghost"} 
                      className="justify-start rounded-none h-12"
                      onClick={() => setActiveTab("users")}
                    >
                      <Users className="h-5 w-5 mr-2" />
                      Users
                    </Button>
                    <Button 
                      variant={activeTab === "media" ? "default" : "ghost"} 
                      className="justify-start rounded-none h-12"
                      onClick={() => setActiveTab("media")}
                    >
                      <Image className="h-5 w-5 mr-2" />
                      Media
                    </Button>
                    <Button 
                      variant={activeTab === "settings" ? "default" : "ghost"} 
                      className="justify-start rounded-none h-12"
                      onClick={() => setActiveTab("settings")}
                    >
                      <Settings className="h-5 w-5 mr-2" />
                      Settings
                    </Button>
                    <Separator />
                    <Button 
                      variant="ghost" 
                      className="justify-start rounded-none h-12 text-red-500 hover:text-red-600 hover:bg-red-100 mt-auto"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-9 xl:col-span-10">
              {/* Dashboard Tab */}
              {activeTab === "dashboard" && (
                <div>
                  <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
                  
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          Total Articles
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">254</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          <span className="text-green-500">+12</span> from last month
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          Total Users
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">8,652</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          <span className="text-green-500">+23%</span> from last month
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          Page Views
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">98.7K</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          <span className="text-green-500">+32%</span> from last month
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          Comments
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">1,352</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          <span className="text-red-500">-8%</span> from last month
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Charts and Tables */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Top Articles</CardTitle>
                        <CardDescription>
                          Most viewed articles this month
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Title</TableHead>
                              <TableHead className="text-right">Views</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {analyticsData.topArticles.map((article, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  <div className="font-medium">{article.title}</div>
                                  <div className="text-xs text-muted-foreground">{article.category}</div>
                                </TableCell>
                                <TableCell className="text-right">{article.views.toLocaleString()}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Top Categories</CardTitle>
                        <CardDescription>
                          Most popular categories by views
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Category</TableHead>
                              <TableHead className="text-right">Views</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {analyticsData.topCategories.map((category, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{category.name}</TableCell>
                                <TableCell className="text-right">{category.views.toLocaleString()}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
              
              {/* Articles Tab */}
              {activeTab === "articles" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Articles</h1>
                    <Button onClick={handleNewArticle}>
                      <Plus className="mr-2 h-4 w-4" />
                      New Article
                    </Button>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 mb-6">
                    <div className="flex flex-1 max-w-md relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search articles..." 
                        value={articlesSearchQuery}
                        onChange={(e) => setArticlesSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    
                    <div className="flex space-x-2">
                      <Select 
                        value={articleCategoryFilter} 
                        onValueChange={setArticleCategoryFilter}
                      >
                        <SelectTrigger className="w-[160px]">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="politics">Politics</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="entertainment">Entertainment</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Select 
                        value={articleStatusFilter} 
                        onValueChange={setArticleStatusFilter}
                      >
                        <SelectTrigger className="w-[160px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="pending">Pending Review</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[400px]">Title</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Views</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getFilteredArticles().map((article) => (
                          <TableRow key={article.id}>
                            <TableCell className="font-medium">{article.title}</TableCell>
                            <TableCell>{article.category}</TableCell>
                            <TableCell>
                              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                article.status === 'published' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                                  : article.status === 'draft' 
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' 
                                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                              }`}>
                                {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                              </div>
                            </TableCell>
                            <TableCell>{article.date}</TableCell>
                            <TableCell>{article.views}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <Sliders className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleEditArticle(article.id)}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    <span>Edit</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleViewArticle(article.id)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    <span>View</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    onClick={() => handleDeleteArticle(article.id)}
                                    className="text-red-600 hover:text-red-700 focus:text-red-700"
                                  >
                                    <Trash className="mr-2 h-4 w-4" />
                                    <span>Delete</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </div>
              )}
              
              {/* Categories Tab */}
              {activeTab === "categories" && (
                <div>
                  <h1 className="text-3xl font-bold mb-6">Categories</h1>
                  <p>Manage article categories here.</p>
                </div>
              )}
              
              {/* Comments Tab */}
              {activeTab === "comments" && (
                <div>
                  <h1 className="text-3xl font-bold mb-6">Comments</h1>
                  <p>Moderate and manage user comments.</p>
                </div>
              )}
              
              {/* Users Tab */}
              {activeTab === "users" && (
                <div>
                  <h1 className="text-3xl font-bold mb-6">Users</h1>
                  <p>Manage user accounts and permissions.</p>
                </div>
              )}
              
              {/* Media Tab */}
              {activeTab === "media" && (
                <div>
                  <h1 className="text-3xl font-bold mb-6">Media</h1>
                  <p>Upload and manage media files.</p>
                </div>
              )}
              
              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div>
                  <h1 className="text-3xl font-bold mb-6">Settings</h1>
                  <p>Configure website settings.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPortal;
