
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal, Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  status: "published" | "draft";
  date: string;
}

const ContentManagement = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  const articles: Article[] = [
    { id: "1", title: "Election Results Analysis", category: "Politics", author: "Raj Sharma", status: "published", date: "2023-12-10" },
    { id: "2", title: "New AI Technology Launch", category: "Technology", author: "Priya Patel", status: "published", date: "2023-12-09" },
    { id: "3", title: "Cricket Match Preview", category: "Sports", author: "Vikram Singh", status: "published", date: "2023-12-08" },
    { id: "4", title: "Bollywood Awards Ceremony", category: "Entertainment", author: "Anjali Gupta", status: "draft", date: "2023-12-07" },
    { id: "5", title: "Education Reform Bill", category: "Education", author: "Deepak Kumar", status: "draft", date: "2023-12-06" },
    { id: "6", title: "Health Benefits of Yoga", category: "Health", author: "Sunita Verma", status: "published", date: "2023-12-05" },
  ];

  const filteredArticles = articles
    .filter((article) => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (selectedTab === "all") return matchesSearch;
      if (selectedTab === "published") return article.status === "published" && matchesSearch;
      if (selectedTab === "drafts") return article.status === "draft" && matchesSearch;
      
      return false;
    });

  const handleCreateNew = () => {
    toast({
      title: "Create New Article",
      description: "Opening article editor...",
    });
  };

  const handleAction = (action: string, article: Article) => {
    toast({
      title: `${action} Article`,
      description: `${action} "${article.title}"`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Content Management</h2>
        <Button onClick={handleCreateNew}>
          <Plus className="mr-2 h-4 w-4" /> Create New
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No articles found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredArticles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium">{article.title}</TableCell>
                      <TableCell>{article.category}</TableCell>
                      <TableCell>{article.author}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          article.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {article.status === "published" ? "Published" : "Draft"}
                        </span>
                      </TableCell>
                      <TableCell>{article.date}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleAction("View", article)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("Edit", article)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("Delete", article)} className="text-destructive focus:text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement;
