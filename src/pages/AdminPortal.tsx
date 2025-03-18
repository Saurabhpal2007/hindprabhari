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

const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dashboardData, setDashboardData] = useState(sampleDashboardData);
  const [articles, setArticles] = useState(sampleArticles);
  const [articlesSearchQuery, setArticlesSearchQuery] = useState("");
  const [articleCategoryFilter, setArticleCategoryFilter] = useState("all");
  const [articleStatusFilter, setArticleStatusFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Admin Portal | HindPrabhari";
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
        <div className="container mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Admin Portal</h1>
            <p className="text-muted-foreground">
              Manage your website content and users.
            </p>
          </div>
          
          <Tabs defaultValue="dashboard" className="space-y-4">
            <TabsList>
              <TabsTrigger value="dashboard" onClick={() => handleTabChange("dashboard")}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="articles" onClick={() => handleTabChange("articles")}>
                <FileText className="mr-2 h-4 w-4" />
                Articles
              </TabsTrigger>
              <TabsTrigger value="categories" onClick={() => handleTabChange("categories")}>
                <Tag className="mr-2 h-4 w-4" />
                Categories
              </TabsTrigger>
              <TabsTrigger value="comments" onClick={() => handleTabChange("comments")}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Comments
              </TabsTrigger>
              <TabsTrigger value="users" onClick={() => handleTabChange("users")}>
                <Users className="mr-2 h-4 w-4" />
                Users
              </TabsTrigger>
              <TabsTrigger value="media" onClick={() => handleTabChange("media")}>
                <Image className="mr-2 h-4 w-4" />
                Media
              </TabsTrigger>
              <TabsTrigger value="settings" onClick={() => handleTabChange("settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>
            <Separator />
            <div className="mt-4">
              <TabsContent value="dashboard" className={activeTab === "dashboard" ? "block" : "hidden"}>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Total Users</CardTitle>
                      <CardDescription>
                        Total number of registered users
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{dashboardData.totalUsers}</div>
                      <div className="text-sm text-muted-foreground">
                        <Users className="mr-2 h-4 w-4 inline-block" />
                        {dashboardData.newUsers} new users this month
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Total Articles</CardTitle>
                      <CardDescription>
                        Total number of published articles
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{dashboardData.totalArticles}</div>
                      <div className="text-sm text-muted-foreground">
                        <FileText className="mr-2 h-4 w-4 inline-block" />
                        {dashboardData.newArticles} new articles this month
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Total Comments</CardTitle>
                      <CardDescription>
                        Total number of comments on articles
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{dashboardData.totalComments}</div>
                      <div className="text-sm text-muted-foreground">
                        <MessageSquare className="mr-2 h-4 w-4 inline-block" />
                        {dashboardData.pendingComments} pending comments
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Storage Used</CardTitle>
                      <CardDescription>
                        Total storage used by media files
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{dashboardData.storageUsed} GB</div>
                      <div className="text-sm text-muted-foreground">
                        <Folder className="mr-2 h-4 w-4 inline-block" />
                        {dashboardData.totalCategories} categories
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
                
                {/* Articles Tab */}
                <TabsContent value="articles" className={activeTab === "articles" ? "block" : "hidden"}>
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
                </TabsContent>
                
                {/* Categories Tab */}
                <TabsContent value="categories" className={activeTab === "categories" ? "block" : "hidden"}>
                  <div>
                    <h1 className="text-3xl font-bold mb-6">Categories</h1>
                    <p>Manage article categories here.</p>
                  </div>
                </TabsContent>
                
                {/* Comments Tab */}
                <TabsContent value="comments" className={activeTab === "comments" ? "block" : "hidden"}>
                  <div>
                    <h1 className="text-3xl font-bold mb-6">Comments</h1>
                    <p>Moderate and manage user comments.</p>
                  </div>
                </TabsContent>
                
                {/* Users Tab */}
                <TabsContent value="users" className={activeTab === "users" ? "block" : "hidden"}>
                  <div>
                    <h1 className="text-3xl font-bold mb-6">Users</h1>
                    <p>Manage user accounts and permissions.</p>
                  </div>
                </TabsContent>
                
                {/* Media Tab */}
                <TabsContent value="media" className={activeTab === "media" ? "block" : "hidden"}>
                  <div>
                    <h1 className="text-3xl font-bold mb-6">Media</h1>
                    <p>Upload and manage media files.</p>
                  </div>
                </TabsContent>
                
                {/* Settings Tab */}
                <TabsContent value="settings" className={activeTab === "settings" ? "block" : "hidden"}>
                  <div>
                    <h1 className="text-3xl font-bold mb-6">Settings</h1>
                    <p>Configure website settings.</p>
                  </div>
                </TabsContent>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPortal;
