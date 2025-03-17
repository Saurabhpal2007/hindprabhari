
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
  MoreHorizontal
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

// Sample data for the admin dashboard
const sampleUsers = [
  { id: 1, name: "Rajiv Kumar", email: "rajiv@example.com", role: "Editor", status: "Active", lastActive: "2023-05-18" },
  { id: 2, name: "Priya Sharma", email: "priya@example.com", role: "Admin", status: "Active", lastActive: "2023-05-17" },
  { id: 3, name: "Vikram Singh", email: "vikram@example.com", role: "Writer", status: "Active", lastActive: "2023-05-15" },
  { id: 4, name: "Ananya Patel", email: "ananya@example.com", role: "Writer", status: "Inactive", lastActive: "2023-05-10" },
  { id: 5, name: "Suresh Reddy", email: "suresh@example.com", role: "Editor", status: "Active", lastActive: "2023-05-16" },
];

const sampleArticles = [
  { id: 1, title: "New Policy Reform Announced", category: "Politics", author: "Rajiv Kumar", status: "Published", date: "2023-05-15", views: 1245 },
  { id: 2, title: "Stock Market Hits All-Time High", category: "Business", author: "Priya Sharma", status: "Published", date: "2023-05-17", views: 3120 },
  { id: 3, title: "New AI Model Breaks Records", category: "Technology", author: "Vikram Singh", status: "Draft", date: "-", views: 0 },
  { id: 4, title: "Indian Cricket Team Announces Squad", category: "Sports", author: "Ananya Patel", status: "Published", date: "2023-05-18", views: 3500 },
  { id: 5, title: "Healthcare Reform Bill Proposed", category: "Health", author: "Suresh Reddy", status: "Under Review", date: "-", views: 0 },
];

const sampleCategories = [
  { id: 1, name: "Politics", articles: 42, color: "#ff5733" },
  { id: 2, name: "Technology", articles: 36, color: "#33ff57" },
  { id: 3, name: "Sports", articles: 28, color: "#3357ff" },
  { id: 4, name: "Entertainment", articles: 31, color: "#f033ff" },
  { id: 5, name: "Education", articles: 19, color: "#ff9933" },
  { id: 6, name: "Health", articles: 23, color: "#33ffec" },
  { id: 7, name: "World", articles: 27, color: "#9fff33" },
  { id: 8, name: "Business", articles: 34, color: "#ff33a8" },
];

const sampleComments = [
  { id: 1, article: "New Policy Reform Announced", author: "Ankit Patel", content: "This is a much-needed reform...", status: "Approved", date: "2023-05-15" },
  { id: 2, article: "Stock Market Hits All-Time High", author: "Neha Singh", content: "I'm skeptical about the sustainability...", status: "Pending", date: "2023-05-17" },
  { id: 3, article: "Indian Cricket Team Announces Squad", author: "Rahul Mehta", content: "They should have included...", status: "Approved", date: "2023-05-18" },
  { id: 4, article: "New Policy Reform Announced", author: "Sunita Patel", content: "This government keeps promising...", status: "Rejected", date: "2023-05-16" },
  { id: 5, article: "Healthcare Reform Bill Proposed", author: "Dr. Kapoor", content: "From a medical professional's perspective...", status: "Pending", date: "2023-05-18" },
];

// Analytics data
const analyticsData = {
  visitors: {
    today: 1245,
    yesterday: 1120,
    thisWeek: 8765,
    thisMonth: 34521,
    total: 256789
  },
  pageViews: {
    today: 3512,
    yesterday: 3155,
    thisWeek: 23421,
    thisMonth: 98752,
    total: 789543
  },
  topArticles: [
    { title: "Indian Cricket Team Announces Squad", views: 3500, category: "Sports" },
    { title: "Stock Market Hits All-Time High", views: 3120, category: "Business" },
    { title: "Bollywood Blockbuster Breaks Records", views: 2850, category: "Entertainment" },
    { title: "New Medical Research Breakthrough", views: 2340, category: "Health" },
    { title: "Global Summit on Climate Change", views: 2150, category: "World" }
  ],
  topCategories: [
    { name: "Politics", views: 12450 },
    { name: "Sports", views: 11320 },
    { name: "Business", views: 9875 },
    { name: "Technology", views: 8940 },
    { name: "Entertainment", views: 7650 }
  ],
  userEngagement: {
    averageTimeOnPage: "3m 24s",
    bounceRate: "32%",
    returnVisitors: "45%",
    newVisitors: "55%"
  }
};

const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
      
      // Welcome toast for admin
      toast({
        title: "Welcome to Admin Portal",
        description: "You are logged in as Administrator.",
      });
    }, 300);
    
    return () => clearTimeout(timer);
  }, [toast]);

  const handleDeleteUser = (userId: number) => {
    toast({
      title: "User Deleted",
      description: `User ID ${userId} has been deleted.`,
    });
  };

  const handleDeleteArticle = (articleId: number) => {
    toast({
      title: "Article Deleted",
      description: `Article ID ${articleId} has been deleted.`,
    });
  };

  const handleEditArticle = (articleId: number) => {
    toast({
      title: "Edit Article",
      description: `Editing article ID ${articleId}.`,
    });
  };

  const handleCreateArticle = () => {
    toast({
      title: "Create New Article",
      description: "Opening article editor.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out of the admin panel.",
    });
  };

  // Filter articles based on search term and status
  const filterArticles = () => {
    return sampleArticles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            article.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || article.status.toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });
  };

  // Filter users based on search term
  const filterUsers = () => {
    return sampleUsers.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Filter comments based on search term
  const filterComments = () => {
    return sampleComments.filter(comment => 
      comment.article.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
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
                        className="justify-start rounded-none h-12 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        Logout
                      </Button>
                    </nav>
                  </CardContent>
                </Card>
              </div>
              
              {/* Main Content Area */}
              <div className="lg:col-span-9 xl:col-span-10">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {activeTab === "dashboard" && "Dashboard"}
                      {activeTab === "articles" && "Manage Articles"}
                      {activeTab === "categories" && "Manage Categories"}
                      {activeTab === "comments" && "Manage Comments"}
                      {activeTab === "users" && "Manage Users"}
                      {activeTab === "settings" && "Settings"}
                    </CardTitle>
                    <CardDescription>
                      {activeTab === "dashboard" && "Overview of your site's performance and analytics."}
                      {activeTab === "articles" && "Create, edit, and manage your articles."}
                      {activeTab === "categories" && "Manage article categories."}
                      {activeTab === "comments" && "Moderate and manage user comments."}
                      {activeTab === "users" && "Manage user accounts and permissions."}
                      {activeTab === "settings" && "Configure site settings and preferences."}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Dashboard Tab */}
                    {activeTab === "dashboard" && (
                      <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium text-muted-foreground">Total Visitors</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">{analyticsData.visitors.total.toLocaleString()}</div>
                              <p className="text-xs text-muted-foreground mt-1">
                                <span className="text-emerald-500">↑ 12.5%</span> from last month
                              </p>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium text-muted-foreground">Page Views</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">{analyticsData.pageViews.total.toLocaleString()}</div>
                              <p className="text-xs text-muted-foreground mt-1">
                                <span className="text-emerald-500">↑ 8.3%</span> from last month
                              </p>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Time on Page</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">{analyticsData.userEngagement.averageTimeOnPage}</div>
                              <p className="text-xs text-muted-foreground mt-1">
                                <span className="text-emerald-500">↑ 5.2%</span> from last month
                              </p>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium text-muted-foreground">Bounce Rate</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">{analyticsData.userEngagement.bounceRate}</div>
                              <p className="text-xs text-muted-foreground mt-1">
                                <span className="text-rose-500">↑ 2.1%</span> from last month
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Top Articles</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-4">
                                {analyticsData.topArticles.map((article, index) => (
                                  <li key={index} className="flex justify-between items-center">
                                    <div>
                                      <p className="font-medium text-sm">{article.title}</p>
                                      <p className="text-xs text-muted-foreground">{article.category}</p>
                                    </div>
                                    <div className="flex items-center">
                                      <Eye className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                      <span className="text-sm">{article.views.toLocaleString()}</span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Top Categories</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-4">
                                {analyticsData.topCategories.map((category, index) => (
                                  <li key={index} className="flex justify-between items-center">
                                    <div className="flex items-center">
                                      <div 
                                        className="w-3 h-3 rounded-full mr-2" 
                                        style={{ 
                                          backgroundColor: sampleCategories.find(c => c.name === category.name)?.color || "#888" 
                                        }}
                                      ></div>
                                      <p className="font-medium text-sm">{category.name}</p>
                                    </div>
                                    <div className="flex items-center">
                                      <Eye className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                      <span className="text-sm">{category.views.toLocaleString()}</span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Recent Activity</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="relative">
                              <div className="absolute h-full w-px bg-muted left-2.5 top-0"></div>
                              <ul className="space-y-4 relative">
                                <li className="pl-6 relative">
                                  <div className="absolute left-0 top-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                    <FileText className="h-3 w-3 text-primary-foreground" />
                                  </div>
                                  <p className="text-sm">New article published: <span className="font-medium">Stock Market Hits All-Time High</span></p>
                                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                                </li>
                                <li className="pl-6 relative">
                                  <div className="absolute left-0 top-2 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                    <MessageSquare className="h-3 w-3 text-white" />
                                  </div>
                                  <p className="text-sm">New comment by <span className="font-medium">Dr. Kapoor</span> on <span className="font-medium">Healthcare Reform Bill Proposed</span></p>
                                  <p className="text-xs text-muted-foreground">4 hours ago</p>
                                </li>
                                <li className="pl-6 relative">
                                  <div className="absolute left-0 top-2 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                    <Users className="h-3 w-3 text-white" />
                                  </div>
                                  <p className="text-sm">New user registered: <span className="font-medium">Ananya Patel</span></p>
                                  <p className="text-xs text-muted-foreground">6 hours ago</p>
                                </li>
                                <li className="pl-6 relative">
                                  <div className="absolute left-0 top-2 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center">
                                    <Pencil className="h-3 w-3 text-white" />
                                  </div>
                                  <p className="text-sm">Article edited: <span className="font-medium">New Policy Reform Announced</span></p>
                                  <p className="text-xs text-muted-foreground">8 hours ago</p>
                                </li>
                                <li className="pl-6 relative">
                                  <div className="absolute left-0 top-2 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                                    <Tag className="h-3 w-3 text-white" />
                                  </div>
                                  <p className="text-sm">Category created: <span className="font-medium">Science & Technology</span></p>
                                  <p className="text-xs text-muted-foreground">Yesterday</p>
                                </li>
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                    
                    {/* Articles Tab */}
                    {activeTab === "articles" && (
                      <div>
                        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                          <div className="relative w-full md:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Search articles..."
                              className="pl-9"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="published">Published</SelectItem>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="under review">Under Review</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Button onClick={handleCreateArticle}>
                              <Plus className="h-4 w-4 mr-2" />
                              New Article
                            </Button>
                          </div>
                        </div>
                        
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[300px]">Title</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead>Author</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead className="text-right">Views</TableHead>
                              <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filterArticles().length > 0 ? (
                              filterArticles().map((article) => (
                                <TableRow key={article.id}>
                                  <TableCell className="font-medium">{article.title}</TableCell>
                                  <TableCell>{article.category}</TableCell>
                                  <TableCell>{article.author}</TableCell>
                                  <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      article.status === "Published" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                                      article.status === "Draft" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" :
                                      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                    }`}>
                                      {article.status}
                                    </span>
                                  </TableCell>
                                  <TableCell>{article.date}</TableCell>
                                  <TableCell className="text-right">{article.views}</TableCell>
                                  <TableCell>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleEditArticle(article.id)}>
                                          <Pencil className="h-4 w-4 mr-2" />
                                          Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Eye className="h-4 w-4 mr-2" />
                                          Preview
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => handleDeleteArticle(article.id)} className="text-destructive focus:text-destructive">
                                          <Trash className="h-4 w-4 mr-2" />
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                  No articles found
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                    
                    {/* Categories Tab */}
                    {activeTab === "categories" && (
                      <div>
                        <div className="flex justify-between items-center mb-6">
                          <div className="relative w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Search categories..."
                              className="pl-9"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>
                          
                          <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            New Category
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {sampleCategories
                            .filter(cat => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((category) => (
                              <Card key={category.id}>
                                <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                                  <div className="flex space-x-2 items-center">
                                    <div 
                                      className="w-4 h-4 rounded-full" 
                                      style={{ backgroundColor: category.color }}
                                    ></div>
                                    <CardTitle className="text-lg">{category.name}</CardTitle>
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>
                                        <Pencil className="h-4 w-4 mr-2" />
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                                        <Trash className="h-4 w-4 mr-2" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-sm text-muted-foreground">
                                    {category.articles} articles
                                  </div>
                                </CardContent>
                                <CardFooter className="pt-0">
                                  <Button variant="outline" size="sm" className="w-full">
                                    View Articles
                                  </Button>
                                </CardFooter>
                              </Card>
                            ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Comments Tab */}
                    {activeTab === "comments" && (
                      <div>
                        <div className="relative w-full md:w-72 mb-6">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search comments..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        
                        <Tabs defaultValue="all">
                          <TabsList className="mb-4">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="pending">Pending</TabsTrigger>
                            <TabsTrigger value="approved">Approved</TabsTrigger>
                            <TabsTrigger value="rejected">Rejected</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="all">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-[300px]">Comment</TableHead>
                                  <TableHead>Article</TableHead>
                                  <TableHead>Author</TableHead>
                                  <TableHead>Status</TableHead>
                                  <TableHead>Date</TableHead>
                                  <TableHead className="w-[100px]">Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {filterComments().length > 0 ? (
                                  filterComments().map((comment) => (
                                    <TableRow key={comment.id}>
                                      <TableCell className="font-medium truncate max-w-xs">{comment.content}</TableCell>
                                      <TableCell>{comment.article}</TableCell>
                                      <TableCell>{comment.author}</TableCell>
                                      <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                          comment.status === "Approved" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                                          comment.status === "Pending" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" :
                                          "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                        }`}>
                                          {comment.status}
                                        </span>
                                      </TableCell>
                                      <TableCell>{comment.date}</TableCell>
                                      <TableCell>
                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                              <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                              <Eye className="h-4 w-4 mr-2" />
                                              View
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                              <Pencil className="h-4 w-4 mr-2" />
                                              Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                                              <Trash className="h-4 w-4 mr-2" />
                                              Delete
                                            </DropdownMenuItem>
                                          </DropdownMenuContent>
                                        </DropdownMenu>
                                      </TableCell>
                                    </TableRow>
                                  ))
                                ) : (
                                  <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                      No comments found
                                    </TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </TabsContent>
                          
                          <TabsContent value="pending">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-[300px]">Comment</TableHead>
                                  <TableHead>Article</TableHead>
                                  <TableHead>Author</TableHead>
                                  <TableHead>Date</TableHead>
                                  <TableHead className="w-[200px]">Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {sampleComments
                                  .filter(comment => comment.status === "Pending" && comment.content.toLowerCase().includes(searchTerm.toLowerCase()))
                                  .map((comment) => (
                                    <TableRow key={comment.id}>
                                      <TableCell className="font-medium truncate max-w-xs">{comment.content}</TableCell>
                                      <TableCell>{comment.article}</TableCell>
                                      <TableCell>{comment.author}</TableCell>
                                      <TableCell>{comment.date}</TableCell>
                                      <TableCell>
                                        <div className="flex space-x-2">
                                          <Button variant="outline" size="sm" className="h-8 text-green-600">
                                            Approve
                                          </Button>
                                          <Button variant="outline" size="sm" className="h-8 text-red-600">
                                            Reject
                                          </Button>
                                          <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Trash className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                              </TableBody>
                            </Table>
                          </TabsContent>
                          
                          <TabsContent value="approved">
                            {/* Similar table for approved comments */}
                          </TabsContent>
                          
                          <TabsContent value="rejected">
                            {/* Similar table for rejected comments */}
                          </TabsContent>
                        </Tabs>
                      </div>
                    )}
                    
                    {/* Users Tab */}
                    {activeTab === "users" && (
                      <div>
                        <div className="flex justify-between items-center mb-6">
                          <div className="relative w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Search users..."
                              className="pl-9"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>
                          
                          <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            New User
                          </Button>
                        </div>
                        
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[250px]">Name</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Role</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Last Active</TableHead>
                              <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filterUsers().length > 0 ? (
                              filterUsers().map((user) => (
                                <TableRow key={user.id}>
                                  <TableCell className="font-medium">
                                    <div className="flex items-center space-x-2">
                                      <Avatar className="h-8 w-8">
                                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                      </Avatar>
                                      <span>{user.name}</span>
                                    </div>
                                  </TableCell>
                                  <TableCell>{user.email}</TableCell>
                                  <TableCell>{user.role}</TableCell>
                                  <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      user.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                                      "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                    }`}>
                                      {user.status}
                                    </span>
                                  </TableCell>
                                  <TableCell>{user.lastActive}</TableCell>
                                  <TableCell>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                          <Pencil className="h-4 w-4 mr-2" />
                                          Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <FileText className="h-4 w-4 mr-2" />
                                          View Articles
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-destructive focus:text-destructive">
                                          <Trash className="h-4 w-4 mr-2" />
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                  No users found
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                    
                    {/* Settings Tab */}
                    {activeTab === "settings" && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">General Settings</h3>
                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <label htmlFor="site-title" className="text-sm font-medium">
                                Site Title
                              </label>
                              <Input id="site-title" defaultValue="HindPrabhari" />
                            </div>
                            <div className="grid gap-2">
                              <label htmlFor="site-description" className="text-sm font-medium">
                                Site Description
                              </label>
                              <Input id="site-description" defaultValue="The Pulse of Bharat - Truth in Every Story" />
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">Appearance</h3>
                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <label htmlFor="theme" className="text-sm font-medium">
                                Default Theme
                              </label>
                              <Select defaultValue="system">
                                <SelectTrigger id="theme">
                                  <SelectValue placeholder="Select theme" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="light">Light</SelectItem>
                                  <SelectItem value="dark">Dark</SelectItem>
                                  <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <label htmlFor="primary-color" className="text-sm font-medium">
                                Primary Color
                              </label>
                              <Select defaultValue="orange">
                                <SelectTrigger id="primary-color">
                                  <SelectValue placeholder="Select color" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="orange">Orange</SelectItem>
                                  <SelectItem value="blue">Blue</SelectItem>
                                  <SelectItem value="green">Green</SelectItem>
                                  <SelectItem value="purple">Purple</SelectItem>
                                  <SelectItem value="red">Red</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">Content Settings</h3>
                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <label htmlFor="articles-per-page" className="text-sm font-medium">
                                Articles Per Page
                              </label>
                              <Input id="articles-per-page" type="number" defaultValue="10" />
                            </div>
                            <div className="grid gap-2">
                              <label htmlFor="comments-moderation" className="text-sm font-medium">
                                Comments Moderation
                              </label>
                              <Select defaultValue="approve-all">
                                <SelectTrigger id="comments-moderation">
                                  <SelectValue placeholder="Select moderation level" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="approve-all">Approve All Comments</SelectItem>
                                  <SelectItem value="moderate-first">Moderate First Comment</SelectItem>
                                  <SelectItem value="moderate-all">Moderate All Comments</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-4">
                          <Button variant="outline">Cancel</Button>
                          <Button>Save Changes</Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
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
