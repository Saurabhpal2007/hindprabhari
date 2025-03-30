
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Eye,
  Sliders,
  MessageSquare,
  Search,
  Bot,
  Sparkles,
  Database
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
import AISettings from "../components/ai/AISettings";
import SupabaseDatabase from "../components/admin/SupabaseDatabase";

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
  const navigate = useNavigate();

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
    setTimeout(() => {
      navigate('/');
    }, 1500);
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
                      variant={activeTab === "database" ? "default" : "ghost"} 
                      className="justify-start rounded-none h-12"
                      onClick={() => setActiveTab("database")}
                    >
                      <Database className="h-5 w-5 mr-2" />
                      Database
                    </Button>
                    <Button 
                      variant={activeTab === "ai" ? "default" : "ghost"} 
                      className="justify-start rounded-none h-12"
                      onClick={() => setActiveTab("ai")}
                    >
                      <Bot className="h-5 w-5 mr-2" />
                      AI Features
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
                  <Card className="p-6">
                    <p className="mb-4">Manage article categories here.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {analyticsData.topCategories.map((category, index) => (
                        <Card key={index} className="p-4">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">{category.name}</h3>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-500">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {category.views.toLocaleString()} total views
                          </p>
                        </Card>
                      ))}
                    </div>
                    <Button className="mt-6">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Category
                    </Button>
                  </Card>
                </div>
              )}
              
              {/* Comments Tab */}
              {activeTab === "comments" && (
                <div>
                  <h1 className="text-3xl font-bold mb-6">Comments</h1>
                  <Card className="p-6">
                    <p>Moderate and manage user comments here.</p>
                    <div className="mt-6">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Comment</TableHead>
                            <TableHead>Article</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {Array.from({ length: 5 }).map((_, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <div className="flex items-center">
                                  <Avatar className="h-6 w-6 mr-2">
                                    <AvatarFallback>{`U${index+1}`}</AvatarFallback>
                                  </Avatar>
                                  <span>User {index+1}</span>
                                </div>
                              </TableCell>
                              <TableCell className="max-w-xs truncate">
                                This is a sample comment that could be longer but is truncated here...
                              </TableCell>
                              <TableCell className="truncate">
                                Sample Article Title {index+1}
                              </TableCell>
                              <TableCell>2023-08-{10+index}</TableCell>
                              <TableCell>
                                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  index % 3 === 0 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                                    : index % 3 === 1
                                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' 
                                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                                }`}>
                                  {index % 3 === 0 ? 'Approved' : index % 3 === 1 ? 'Pending' : 'Rejected'}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="outline" size="sm" className="text-red-500">
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </Card>
                </div>
              )}
              
              {/* Users Tab */}
              {activeTab === "users" && (
                <div>
                  <h1 className="text-3xl font-bold mb-6">Users</h1>
                  <Card className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">User Management</h2>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add User
                      </Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Joined Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarFallback>{`U${index+1}`}</AvatarFallback>
                                </Avatar>
                                <span>User Name {index+1}</span>
                              </div>
                            </TableCell>
                            <TableCell>user{index+1}@example.com</TableCell>
                            <TableCell>
                              {index === 0 ? 'Admin' : index === 1 ? 'Editor' : 'Subscriber'}
                            </TableCell>
                            <TableCell>
                              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                index % 2 === 0 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                              }`}>
                                {index % 2 === 0 ? 'Active' : 'Inactive'}
                              </div>
                            </TableCell>
                            <TableCell>2023-0{index+1}-01</TableCell>
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
                                  <DropdownMenuItem>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    <span>Edit</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    <span>View Profile</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
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
              
              {/* Media Tab */}
              {activeTab === "media" && (
                <div>
                  <h1 className="text-3xl font-bold mb-6">Media</h1>
                  <Card className="p-6">
                    <p className="mb-6">Upload and manage media files here.</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Array.from({ length: 8 }).map((_, index) => (
                        <Card key={index} className="overflow-hidden">
                          <div className="aspect-square bg-gray-200 flex items-center justify-center">
                            <Image className="h-12 w-12 text-gray-400" />
                          </div>
                          <div className="p-2">
                            <p className="text-sm truncate">image-{index+1}.jpg</p>
                            <p className="text-xs text-muted-foreground">120 KB</p>
                          </div>
                        </Card>
                      ))}
                    </div>
                    <Button className="mt-6">
                      <Plus className="mr-2 h-4 w-4" />
                      Upload Media
                    </Button>
                  </Card>
                </div>
              )}
              
              {/* Database Tab */}
              {activeTab === "database" && (
                <div>
                  <h1 className="text-3xl font-bold mb-6">Database</h1>
                  <SupabaseDatabase />
                </div>
              )}
              
              {/* AI Features Tab */}
              {activeTab === "ai" && (
                <div>
                  <h1 className="text-3xl font-bold mb-6">AI Features</h1>
                  <div className="grid grid-cols-1 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>AI Settings</CardTitle>
                        <CardDescription>
                          Configure AI assistant and smart search features
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <AISettings />
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>AI Content Generation</CardTitle>
                        <CardDescription>
                          Generate content using AI
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Content Type
                            </label>
                            <Select defaultValue="article">
                              <SelectTrigger>
                                <SelectValue placeholder="Select content type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="article">Article</SelectItem>
                                <SelectItem value="headline">Headline</SelectItem>
                                <SelectItem value="summary">Summary</SelectItem>
                                <SelectItem value="social">Social Media Post</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Topic/Keywords
                            </label>
                            <Input placeholder="Enter topic or keywords" />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Tone
                            </label>
                            <Select defaultValue="informative">
                              <SelectTrigger>
                                <SelectValue placeholder="Select tone" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="informative">Informative</SelectItem>
                                <SelectItem value="formal">Formal</SelectItem>
                                <SelectItem value="casual">Casual</SelectItem>
                                <SelectItem value="persuasive">Persuasive</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <Button className="w-full">
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generate Content
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>AI Usage Analytics</CardTitle>
                        <CardDescription>
                          Monitor AI feature usage
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                          <div className="bg-background border rounded-lg p-4">
                            <h3 className="text-sm font-medium text-muted-foreground mb-1">
                              AI Queries
                            </h3>
                            <p className="text-2xl font-bold">1,245</p>
                            <p className="text-xs text-muted-foreground">Last 30 days</p>
                          </div>
                          
                          <div className="bg-background border rounded-lg p-4">
                            <h3 className="text-sm font-medium text-muted-foreground mb-1">
                              Content Generated
                            </h3>
                            <p className="text-2xl font-bold">87</p>
                            <p className="text-xs text-muted-foreground">Last 30 days</p>
                          </div>
                          
                          <div className="bg-background border rounded-lg p-4">
                            <h3 className="text-sm font-medium text-muted-foreground mb-1">
                              API Usage
                            </h3>
                            <p className="text-2xl font-bold">76%</p>
                            <p className="text-xs text-muted-foreground">Of monthly limit</p>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <Button variant="outline">
                            View Detailed Analytics
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
              
              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div>
                  <h1 className="text-3xl font-bold mb-6">Settings</h1>
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>General Settings</CardTitle>
                      <CardDescription>Configure website settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Site Title</label>
                          <Input defaultValue="HindPrabhari" />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Site Description</label>
                          <Input defaultValue="The Pulse of Bharat - Truth in Every Story" />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Language</label>
                          <Select defaultValue="en">
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="hi">Hindi</SelectItem>
                              <SelectItem value="bn">Bengali</SelectItem>
                              <SelectItem value="ta">Tamil</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save Changes</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Appearance</CardTitle>
                      <CardDescription>Customize site appearance</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Theme Mode</label>
                          <Select defaultValue="system">
                            <SelectTrigger>
                              <SelectValue placeholder="Select theme mode" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Primary Color</label>
                          <div className="flex space-x-2">
                            <div className="w-6 h-6 rounded-full bg-blue-600 border cursor-pointer" />
                            <div className="w-6 h-6 rounded-full bg-purple-600 border cursor-pointer" />
                            <div className="w-6 h-6 rounded-full bg-red-600 border cursor-pointer" />
                            <div className="w-6 h-6 rounded-full bg-green-600 border cursor-pointer" />
                            <div className="w-6 h-6 rounded-full bg-orange-600 border cursor-pointer" />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Font Size</label>
                          <Select defaultValue="medium">
                            <SelectTrigger>
                              <SelectValue placeholder="Select font size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="small">Small</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="large">Large</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Apply Changes</Button>
                    </CardFooter>
                  </Card>
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
