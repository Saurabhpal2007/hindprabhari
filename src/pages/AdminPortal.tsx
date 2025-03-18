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
const analyticsData = {
  topArticles: [
    { title: "PM Inaugurates New Metro Line", category: "Politics", views: 24587 },
    { title: "Tech Giants Announce AI Partnership", category: "Technology", views: 19354 },
    { title: "Team India's Historic Win", category: "Sports", views: 18965 },
    { title: "Budget 2023: Key Highlights", category: "Business", views: 15472 },
    { title: "New Education Policy Impact", category: "Education", views: 12198 }
  ],
  topCategories: [
    { name: "Politics", views: 145897 },
    { name: "Technology", views: 121543 },
    { name: "Sports", views: 98765 },
    { name: "Entertainment", views: 87654 },
    { name: "Business", views: 76543 }
  ]
};

// Sample articles data
const articlesData = [
  { 
    id: 1, 
    title: "PM Inaugurates New Metro Line", 
    category: "Politics",
    author: "Priya Sharma",
    publishDate: "2023-07-15",
    status: "Published",
    views: 24587
  },
  { 
    id: 2, 
    title: "Tech Giants Announce AI Partnership", 
    category: "Technology",
    author: "Arjun Reddy",
    publishDate: "2023-07-14",
    status: "Published",
    views: 19354
  },
  { 
    id: 3, 
    title: "Team India's Historic Win", 
    category: "Sports",
    author: "Rahul Verma",
    publishDate: "2023-07-13",
    status: "Published",
    views: 18965
  },
  { 
    id: 4, 
    title: "Budget 2023: Key Highlights", 
    category: "Business",
    author: "Neha Gupta",
    publishDate: "2023-07-12",
    status: "Published",
    views: 15472
  },
  { 
    id: 5, 
    title: "Upcoming Bollywood Releases", 
    category: "Entertainment",
    author: "Karan Malhotra",
    publishDate: "2023-07-11",
    status: "Draft",
    views: 0
  }
];

const AdminPortal = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [articles, setArticles] = useState(articlesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
      toast({
        title: "Welcome to Admin Portal",
        description: "You've successfully logged in as administrator.",
      });
    }, 600);
    
    // Update page title
    document.title = "Admin Portal | HindPrabhari";
    
    return () => clearTimeout(timer);
  }, [toast]);

  const handleDeleteArticle = (id: number) => {
    setArticles(articles.filter(article => article.id !== id));
    toast({
      title: "Article Deleted",
      description: "The article has been successfully deleted.",
    });
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setArticles(articles.map(article => 
      article.id === id ? { ...article, status: newStatus } : article
    ));
    toast({
      title: "Status Updated",
      description: `Article status changed to ${newStatus}.`,
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    // In a real app, this would redirect to login page
  };

  // Filtered articles based on search term and filters
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || article.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || article.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

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
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                      <h1 className="text-3xl font-bold">Articles</h1>
                      <Button className="mt-2 sm:mt-0">
                        <Plus className="h-5 w-5 mr-1" />
                        New Article
                      </Button>
                    </div>
                    
                    <Card className="mb-6">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input 
                              placeholder="Search articles..." 
                              className="pl-10"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>
                          <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger>
                              <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Statuses</SelectItem>
                              <SelectItem value="Published">Published</SelectItem>
                              <SelectItem value="Draft">Draft</SelectItem>
                              <SelectItem value="Archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger>
                              <SelectValue placeholder="Filter by category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Categories</SelectItem>
                              <SelectItem value="Politics">Politics</SelectItem>
                              <SelectItem value="Technology">Technology</SelectItem>
                              <SelectItem value="Sports">Sports</SelectItem>
                              <SelectItem value="Business">Business</SelectItem>
                              <SelectItem value="Entertainment">Entertainment</SelectItem>
                              <SelectItem value="Education">Education</SelectItem>
                              <SelectItem value="Health">Health</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Title</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead>Author</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredArticles.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={6} className="text-center py-8">
                                  No articles found matching your filters.
                                </TableCell>
                              </TableRow>
                            ) : (
                              filteredArticles.map((article) => (
                                <TableRow key={article.id}>
                                  <TableCell>
                                    <div className="font-medium">{article.title}</div>
                                    <div className="text-xs text-muted-foreground">ID: {article.id}</div>
                                  </TableCell>
                                  <TableCell>{article.category}</TableCell>
                                  <TableCell>{article.author}</TableCell>
                                  <TableCell>{article.publishDate}</TableCell>
                                  <TableCell>
                                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                      ${article.status === 'Published' ? 'bg-green-100 text-green-800' : ''}
                                      ${article.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' : ''}
                                      ${article.status === 'Archived' ? 'bg-gray-100 text-gray-800' : ''}
                                    `}>
                                      {article.status}
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex justify-end">
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Pencil className="h-4 w-4" />
                                      </Button>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Sliders className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                          <DropdownMenuSeparator />
                                          {article.status !== "Published" && (
                                            <DropdownMenuItem onClick={() => handleStatusChange(article.id, "Published")}>
                                              Publish
                                            </DropdownMenuItem>
                                          )}
                                          {article.status !== "Draft" && (
                                            <DropdownMenuItem onClick={() => handleStatusChange(article.id, "Draft")}>
                                              Move to Draft
                                            </DropdownMenuItem>
                                          )}
                                          {article.status !== "Archived" && (
                                            <DropdownMenuItem onClick={() => handleStatusChange(article.id, "Archived")}>
                                              Archive
                                            </DropdownMenuItem>
                                          )}
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem 
                                            onClick={() => handleDeleteArticle(article.id)}
                                            className="text-red-600"
                                          >
                                            Delete
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {/* Categories Tab */}
                {activeTab === "categories" && (
                  <div>
                    <h1 className="text-3xl font-bold mb-6">Categories</h1>
                    <p className="text-muted-foreground mb-6">Manage your content categories here.</p>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-center py-12">
                          <LayoutDashboard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">Category Management</h3>
                          <p className="text-muted-foreground mb-4">This feature is coming soon.</p>
                          <Button>Get Notified</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {/* Other tabs with placeholder content */}
                {(activeTab === "comments" || activeTab === "users" || activeTab === "media" || activeTab === "settings") && (
                  <div>
                    <h1 className="text-3xl font-bold mb-6">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
                    <p className="text-muted-foreground mb-6">This section is under development.</p>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-center py-12">
                          <LayoutDashboard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                          <p className="text-muted-foreground mb-4">This feature is being built and will be available soon.</p>
                          <Button>Get Notified</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
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
