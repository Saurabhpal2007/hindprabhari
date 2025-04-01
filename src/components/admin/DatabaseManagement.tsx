import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Database, 
  Table as TableIcon, 
  Shield, 
  Code, 
  Edit, 
  Trash2, 
  Plus,
  Filter,
  RefreshCw,
  Download,
  Upload,
  FileJson,
  EyeIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface TableData {
  id: string;
  name: string;
  rowCount: number;
  lastModified: string;
  description: string;
  hasRLS: boolean;
}

interface PolicyData {
  id: string;
  tableName: string;
  type: string;
  definition: string;
  using: string;
}

const DatabaseManagement = () => {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock database tables data
  const tables: TableData[] = [
    { 
      id: "1", 
      name: "articles", 
      rowCount: 158, 
      lastModified: "2023-06-14", 
      description: "Published news articles and content",
      hasRLS: true
    },
    { 
      id: "2", 
      name: "users", 
      rowCount: 2456, 
      lastModified: "2023-06-15", 
      description: "User accounts and profile data",
      hasRLS: true
    },
    { 
      id: "3", 
      name: "categories", 
      rowCount: 12, 
      lastModified: "2023-05-20", 
      description: "News categories and classification",
      hasRLS: false
    },
    { 
      id: "4", 
      name: "comments", 
      rowCount: 876, 
      lastModified: "2023-06-15", 
      description: "User comments on articles",
      hasRLS: true
    },
    { 
      id: "5", 
      name: "media", 
      rowCount: 432, 
      lastModified: "2023-06-13", 
      description: "Images and videos for articles",
      hasRLS: false
    }
  ];
  
  // Mock RLS policies
  const policies: PolicyData[] = [
    {
      id: "1",
      tableName: "articles",
      type: "SELECT",
      definition: "authenticated or anon",
      using: "true"
    },
    {
      id: "2",
      tableName: "articles",
      type: "INSERT",
      definition: "authenticated",
      using: "auth.uid() = created_by"
    },
    {
      id: "3",
      tableName: "users",
      type: "SELECT",
      definition: "authenticated",
      using: "auth.uid() = id"
    },
    {
      id: "4",
      tableName: "comments",
      type: "SELECT",
      definition: "authenticated or anon",
      using: "true"
    },
    {
      id: "5",
      tableName: "comments",
      type: "INSERT",
      definition: "authenticated",
      using: "auth.uid() = user_id"
    }
  ];
  
  const filteredTables = tables.filter(table => 
    table.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    table.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Database Management</h2>
          <p className="text-muted-foreground">
            Manage your database tables, policies, and data with Supabase integration.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outlined" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outlined" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="default" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Table
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <Tabs defaultValue="tables">
        <TabsList className="grid grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="tables">
            <TableIcon className="h-4 w-4 mr-2" />
            Tables
          </TabsTrigger>
          <TabsTrigger value="policies">
            <Shield className="h-4 w-4 mr-2" />
            Policies
          </TabsTrigger>
          <TabsTrigger value="sql">
            <Code className="h-4 w-4 mr-2" />
            SQL Editor
          </TabsTrigger>
          <TabsTrigger value="backups">
            <Database className="h-4 w-4 mr-2" />
            Backups
          </TabsTrigger>
        </TabsList>
        
        {/* Tables Tab Content */}
        <TabsContent value="tables" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-full md:w-72">
              <Input 
                placeholder="Search tables..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4"
              />
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="hidden md:flex items-center gap-2">
              <Select defaultValue="10">
                <SelectTrigger className="w-16">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">per page</span>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Rows</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead>RLS</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTables.map((table) => (
                  <TableRow key={table.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedTable(table.name)}>
                    <TableCell className="font-medium">{table.name}</TableCell>
                    <TableCell>{table.description}</TableCell>
                    <TableCell>{table.rowCount.toLocaleString()}</TableCell>
                    <TableCell>{formatDate(table.lastModified)}</TableCell>
                    <TableCell>
                      {table.hasRLS ? (
                        <Badge variant="outlined" className="bg-green-50 text-green-700 border-green-200">
                          Enabled
                        </Badge>
                      ) : (
                        <Badge variant="outlined" className="bg-amber-50 text-amber-700 border-amber-200">
                          Disabled
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredTables.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8">
              <Database className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No tables found</h3>
              <p className="text-muted-foreground mt-1">
                Try adjusting your search or create a new table.
              </p>
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Create New Table
              </Button>
            </div>
          )}
        </TabsContent>
        
        {/* Policies Tab Content */}
        <TabsContent value="policies" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-full md:w-72">
              <Input placeholder="Search policies..." className="pl-4" />
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Table</TableHead>
                  <TableHead>Operation</TableHead>
                  <TableHead>Definition</TableHead>
                  <TableHead>Using Expression</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {policies.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell>{policy.tableName}</TableCell>
                    <TableCell>
                      <Badge variant="outlined" className="font-mono">
                        {policy.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{policy.definition}</TableCell>
                    <TableCell>
                      <code className="bg-muted p-1 rounded text-xs">{policy.using}</code>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        {/* SQL Editor Tab */}
        <TabsContent value="sql" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SQL Editor</CardTitle>
              <CardDescription>
                Run SQL queries directly against your database
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 border rounded-md p-4 bg-muted/30 mb-4">
                <pre className="text-sm font-mono">
                  {`-- Example SQL query
SELECT * FROM articles
WHERE published_at > NOW() - INTERVAL '7 days'
ORDER BY published_at DESC
LIMIT 10;`}
                </pre>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outlined">
                  <FileJson className="h-4 w-4 mr-2" />
                  Save Query
                </Button>
                <Button variant="default">
                  Run Query
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Backups Tab */}
        <TabsContent value="backups" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Database Backups</CardTitle>
              <CardDescription>
                Manage and restore backups of your database
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-semibold">Automated Backups</h4>
                  <p className="text-sm text-muted-foreground">
                    Daily backups at 03:00 AM UTC
                  </p>
                </div>
                <Badge variant="outlined" className="bg-green-50 text-green-700">
                  Enabled
                </Badge>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h4 className="font-semibold">Recent Backups</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Jun 15, 2023 03:00 AM</TableCell>
                      <TableCell>245 MB</TableCell>
                      <TableCell>Automated</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="ghost" size="sm" className="ml-2">
                          Restore
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Jun 14, 2023 03:00 AM</TableCell>
                      <TableCell>244 MB</TableCell>
                      <TableCell>Automated</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="ghost" size="sm" className="ml-2">
                          Restore
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Jun 13, 2023 03:00 AM</TableCell>
                      <TableCell>243 MB</TableCell>
                      <TableCell>Automated</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="ghost" size="sm" className="ml-2">
                          Restore
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="pt-4">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Manual Backup
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Table Detail Panel */}
      {selectedTable && (
        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{selectedTable}</CardTitle>
              <CardDescription>
                {tables.find(t => t.name === selectedTable)?.description}
              </CardDescription>
            </div>
            <Button variant="outlined" size="sm" onClick={() => setSelectedTable(null)}>
              Close
            </Button>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="data">
              <TabsList>
                <TabsTrigger value="data">Data</TabsTrigger>
                <TabsTrigger value="structure">Structure</TabsTrigger>
                <TabsTrigger value="relationships">Relationships</TabsTrigger>
                <TabsTrigger value="policies">Policies</TabsTrigger>
              </TabsList>
              <TabsContent value="data" className="pt-4">
                <p className="text-center text-muted-foreground py-12">
                  Table data viewer would be displayed here.
                </p>
              </TabsContent>
              <TabsContent value="structure" className="pt-4">
                <p className="text-center text-muted-foreground py-12">
                  Table structure editor would be displayed here.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DatabaseManagement;
