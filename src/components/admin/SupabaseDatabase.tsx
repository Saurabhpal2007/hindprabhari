import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Database, Key, Shield, Lock, Table as TableIcon, FileJson, Code, FileCode } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const SupabaseDatabase = () => {
  const [activeTab, setActiveTab] = useState("tables");
  const { toast } = useToast();
  
  const tables = [
    {
      name: "articles", 
      rows: 342, 
      size: "4.2 MB",
      columns: [
        { name: "id", type: "uuid", isPrimary: true },
        { name: "title", type: "text", isPrimary: false },
        { name: "content", type: "text", isPrimary: false },
        { name: "category", type: "varchar", isPrimary: false },
        { name: "author_id", type: "uuid", isPrimary: false },
        { name: "published_at", type: "timestamp", isPrimary: false },
        { name: "updated_at", type: "timestamp", isPrimary: false },
        { name: "is_featured", type: "boolean", isPrimary: false }
      ]
    },
    {
      name: "users", 
      rows: 587, 
      size: "1.8 MB",
      columns: [
        { name: "id", type: "uuid", isPrimary: true },
        { name: "email", type: "varchar", isPrimary: false },
        { name: "name", type: "varchar", isPrimary: false },
        { name: "role", type: "varchar", isPrimary: false },
        { name: "created_at", type: "timestamp", isPrimary: false }
      ]
    },
    {
      name: "categories", 
      rows: 12, 
      size: "0.1 MB",
      columns: [
        { name: "id", type: "uuid", isPrimary: true },
        { name: "name", type: "varchar", isPrimary: false },
        { name: "slug", type: "varchar", isPrimary: false },
        { name: "description", type: "text", isPrimary: false },
        { name: "created_at", type: "timestamp", isPrimary: false }
      ]
    },
    {
      name: "comments", 
      rows: 1245, 
      size: "2.5 MB",
      columns: [
        { name: "id", type: "uuid", isPrimary: true },
        { name: "article_id", type: "uuid", isPrimary: false },
        { name: "user_id", type: "uuid", isPrimary: false },
        { name: "content", type: "text", isPrimary: false },
        { name: "created_at", type: "timestamp", isPrimary: false },
        { name: "is_approved", type: "boolean", isPrimary: false }
      ]
    }
  ];
  
  const policies = [
    {
      name: "articles_select_policy",
      table: "articles",
      action: "SELECT",
      definition: "true",
      description: "Allow public read access to published articles"
    },
    {
      name: "articles_insert_editors",
      table: "articles",
      action: "INSERT",
      definition: "auth.uid() IN (SELECT id FROM editors)",
      description: "Only editors can create articles"
    },
    {
      name: "articles_update_own",
      table: "articles",
      action: "UPDATE",
      definition: "auth.uid() = author_id",
      description: "Authors can update their own articles"
    },
    {
      name: "comments_insert_authenticated",
      table: "comments",
      action: "INSERT",
      definition: "auth.uid() IS NOT NULL",
      description: "Only authenticated users can comment"
    }
  ];
  
  const functions = [
    {
      name: "get_articles_by_category",
      type: "DATABASE FUNCTION",
      arguments: "category_slug text",
      returns: "SETOF articles",
      language: "plpgsql"
    },
    {
      name: "user_analytics",
      type: "DATABASE FUNCTION",
      arguments: "user_id uuid",
      returns: "json",
      language: "plpgsql"
    },
    {
      name: "send_notification",
      type: "EDGE FUNCTION",
      method: "POST",
      path: "/send-notification"
    },
    {
      name: "process_image",
      type: "EDGE FUNCTION",
      method: "POST",
      path: "/process-image"
    }
  ];

  const handleCreateTable = () => {
    toast({
      title: "Table Created",
      description: "The new table has been created successfully.",
    });
  };
  
  const handleCreatePolicy = () => {
    toast({
      title: "Policy Created",
      description: "The new RLS policy has been created successfully.",
    });
  };
  
  const handleCreateFunction = () => {
    toast({
      title: "Function Created",
      description: "The new function has been created successfully.",
    });
  };
  
  const handleGenerateAPIToken = () => {
    toast({
      title: "API Token Generated",
      description: "Your new API token has been generated. Keep it secure!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Database className="h-6 w-6 mr-2 text-primary" />
          <h2 className="text-2xl font-bold">Database Management</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outlined" size="sm">
            Connect
          </Button>
          <Button variant="outlined" size="sm">
            Backup
          </Button>
          <Button size="sm">
            New Table
          </Button>
        </div>
      </div>

      <Tabs defaultValue="tables" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="tables" className="flex items-center">
            <TableIcon className="h-4 w-4 mr-2" />
            Tables
          </TabsTrigger>
          <TabsTrigger value="policies" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Policies
          </TabsTrigger>
          <TabsTrigger value="functions" className="flex items-center">
            <Code className="h-4 w-4 mr-2" />
            Functions
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center">
            <Key className="h-4 w-4 mr-2" />
            API
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tables" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Database Tables</CardTitle>
              <CardDescription>
                Manage your database tables, columns, and relationships
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Rows</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tables.map((table) => (
                    <TableRow key={table.name}>
                      <TableCell className="font-medium">{table.name}</TableCell>
                      <TableCell>{table.rows}</TableCell>
                      <TableCell>{table.size}</TableCell>
                      <TableCell>Today, 2:30 PM</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">View</Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Table: {table.name}</DialogTitle>
                              <DialogDescription>
                                Table structure and columns
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="text-sm font-medium">Rows: {table.rows}</p>
                                  <p className="text-sm text-muted-foreground">Size: {table.size}</p>
                                </div>
                                <div className="flex space-x-2">
                                  <Button variant="outlined" size="sm">Add Column</Button>
                                  <Button variant="outlined" size="sm">Import</Button>
                                  <Button variant="outlined" size="sm">Export</Button>
                                </div>
                              </div>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Column Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Primary Key</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {table.columns.map((column) => (
                                    <TableRow key={column.name}>
                                      <TableCell>{column.name}</TableCell>
                                      <TableCell>
                                        <Badge variant="outlined">{column.type}</Badge>
                                      </TableCell>
                                      <TableCell>
                                        {column.isPrimary ? 
                                          <Badge className="bg-green-500 hover:bg-green-700">Yes</Badge> : 
                                          <span className="text-muted-foreground text-xs">No</span>
                                        }
                                      </TableCell>
                                      <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Edit</Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="pb-6 pt-3 flex flex-col items-stretch">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">Create New Table</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Table</DialogTitle>
                    <DialogDescription>
                      Define your table structure and columns
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tableName">Table Name</Label>
                      <Input id="tableName" placeholder="e.g., products" />
                    </div>
                    <div className="space-y-2">
                      <Label>Columns</Label>
                      <div className="space-y-2">
                        <div className="grid grid-cols-4 gap-2">
                          <Input placeholder="Column name" defaultValue="id" />
                          <Select defaultValue="uuid">
                            <SelectTrigger>
                              <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="uuid">UUID</SelectItem>
                              <SelectItem value="text">Text</SelectItem>
                              <SelectItem value="varchar">Varchar</SelectItem>
                              <SelectItem value="integer">Integer</SelectItem>
                              <SelectItem value="boolean">Boolean</SelectItem>
                              <SelectItem value="timestamp">Timestamp</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="primaryKey" defaultChecked />
                            <Label htmlFor="primaryKey" className="text-sm">Primary Key</Label>
                          </div>
                          <Button variant="outlined" type="button" size="sm">Remove</Button>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <Input placeholder="Column name" defaultValue="name" />
                          <Select defaultValue="varchar">
                            <SelectTrigger>
                              <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="uuid">UUID</SelectItem>
                              <SelectItem value="text">Text</SelectItem>
                              <SelectItem value="varchar">Varchar</SelectItem>
                              <SelectItem value="integer">Integer</SelectItem>
                              <SelectItem value="boolean">Boolean</SelectItem>
                              <SelectItem value="timestamp">Timestamp</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="notNull" defaultChecked />
                            <Label htmlFor="notNull" className="text-sm">Not Null</Label>
                          </div>
                          <Button variant="outlined" type="button" size="sm">Remove</Button>
                        </div>
                      </div>
                      <Button type="button" variant="outlined" size="sm" className="mt-2">
                        + Add Column
                      </Button>
                    </div>
                  </form>
                  <DialogFooter>
                    <Button variant="outlined" className="mr-2">Cancel</Button>
                    <Button onClick={handleCreateTable}>Create Table</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="policies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Row Level Security Policies</CardTitle>
              <CardDescription>
                Manage access control for your database tables
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Table</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Definition</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {policies.map((policy) => (
                    <TableRow key={policy.name}>
                      <TableCell className="font-medium">{policy.name}</TableCell>
                      <TableCell>{policy.table}</TableCell>
                      <TableCell>{policy.action}</TableCell>
                      <TableCell>
                        <code className="bg-muted p-1 rounded text-xs">{policy.definition}</code>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="pb-6 pt-3 flex flex-col items-stretch">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">Create New Policy</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create RLS Policy</DialogTitle>
                    <DialogDescription>
                      Define access control for your database table
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="policyName">Policy Name</Label>
                      <Input id="policyName" placeholder="e.g., users_select_own" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tableSelect">Table</Label>
                      <Select defaultValue="users">
                        <SelectTrigger id="tableSelect">
                          <SelectValue placeholder="Select table" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="articles">articles</SelectItem>
                          <SelectItem value="users">users</SelectItem>
                          <SelectItem value="categories">categories</SelectItem>
                          <SelectItem value="comments">comments</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="actionSelect">Action</Label>
                      <Select defaultValue="SELECT">
                        <SelectTrigger id="actionSelect">
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SELECT">SELECT</SelectItem>
                          <SelectItem value="INSERT">INSERT</SelectItem>
                          <SelectItem value="UPDATE">UPDATE</SelectItem>
                          <SelectItem value="DELETE">DELETE</SelectItem>
                          <SelectItem value="ALL">ALL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="definition">Policy Definition</Label>
                      <Textarea id="definition" placeholder="e.g., auth.uid() = user_id" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input id="description" placeholder="Brief description of this policy" />
                    </div>
                  </form>
                  <DialogFooter>
                    <Button variant="outlined" className="mr-2">Cancel</Button>
                    <Button onClick={handleCreatePolicy}>Create Policy</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="functions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Functions</CardTitle>
              <CardDescription>
                Manage database and edge functions
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Arguments/Method</TableHead>
                    <TableHead>Returns/Path</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {functions.map((func) => (
                    <TableRow key={func.name}>
                      <TableCell className="font-medium">{func.name}</TableCell>
                      <TableCell>
                        <Badge variant={func.type === "DATABASE FUNCTION" ? "outline" : "default"}>
                          {func.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {func.type === "DATABASE FUNCTION" ? (
                          <code className="bg-muted p-1 rounded text-xs">{func.arguments}</code>
                        ) : (
                          <Badge variant="outline">{func.method}</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {func.type === "DATABASE FUNCTION" ? (
                          func.returns
                        ) : (
                          <code className="bg-muted p-1 rounded text-xs">{func.path}</code>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Deploy</Button>
                        <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="pb-6 pt-3 flex flex-col items-stretch">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">Create New Function</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Function</DialogTitle>
                    <DialogDescription>
                      Define your database or edge function
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="functionName">Function Name</Label>
                      <Input id="functionName" placeholder="e.g., get_user_profile" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="functionType">Function Type</Label>
                      <Select defaultValue="database">
                        <SelectTrigger id="functionType">
                          <SelectValue placeholder="Select function type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="database">Database Function</SelectItem>
                          <SelectItem value="edge">Edge Function</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="functionCode">Function Code</Label>
                      <Textarea 
                        id="functionCode" 
                        className="font-mono h-40"
                        placeholder="CREATE OR REPLACE FUNCTION get_user_profile(user_id uuid)
RETURNS json
LANGUAGE plpgsql
AS $$
BEGIN
  -- Function code here
  RETURN NULL;
END;
$$;"
                      />
                    </div>
                  </form>
                  <DialogFooter>
                    <Button variant="outlined" className="mr-2">Cancel</Button>
                    <Button onClick={handleCreateFunction}>Create Function</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Management</CardTitle>
              <CardDescription>
                Manage API keys, endpoints, and documentation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">API Settings</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>API Access</Label>
                      <div className="flex items-center space-x-2">
                        <Switch defaultChecked />
                        <span className="text-sm text-muted-foreground">Enable API access</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>CORS Origins</Label>
                      <Input defaultValue="*" placeholder="e.g., https://yourapp.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Authentication</Label>
                      <div className="flex items-center space-x-2">
                        <Switch defaultChecked />
                        <span className="text-sm text-muted-foreground">Require authentication for API access</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Rate Limiting</Label>
                      <div className="flex items-center space-x-2">
                        <Input type="number" defaultValue="100" className="w-20" />
                        <span className="text-sm text-muted-foreground">requests per minute</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">API Keys</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Key Name</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Expires</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Main API Key</TableCell>
                      <TableCell>2023-08-01</TableCell>
                      <TableCell>2024-08-01</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500 hover:bg-green-700">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Revoke</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Development Key</TableCell>
                      <TableCell>2023-07-15</TableCell>
                      <TableCell>2023-10-15</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500 hover:bg-green-700">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Revoke</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Test Key</TableCell>
                      <TableCell>2023-06-10</TableCell>
                      <TableCell>2023-09-10</TableCell>
                      <TableCell>
                        <Badge variant="outline">Expired</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Renew</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="mt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Generate New API Key</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Generate API Key</DialogTitle>
                        <DialogDescription>
                          Create a new API key for accessing your backend services
                        </DialogDescription>
                      </DialogHeader>
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="keyName">Key Name</Label>
                          <Input id="keyName" placeholder="e.g., Production API Key" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="keyExpiration">Expiration</Label>
                          <Select defaultValue="1year">
                            <SelectTrigger id="keyExpiration">
                              <SelectValue placeholder="Select expiration" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30days">30 Days</SelectItem>
                              <SelectItem value="90days">90 Days</SelectItem>
                              <SelectItem value="1year">1 Year</SelectItem>
                              <SelectItem value="never">Never Expire</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Permissions</Label>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="readPerm" defaultChecked />
                              <Label htmlFor="readPerm" className="text-sm">Read</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="writePerm" defaultChecked />
                              <Label htmlFor="writePerm" className="text-sm">Write</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="deletePerm" />
                              <Label htmlFor="deletePerm" className="text-sm">Delete</Label>
                            </div>
                          </div>
                        </div>
                      </form>
                      <DialogFooter>
                        <Button variant="outlined" className="mr-2">Cancel</Button>
                        <Button onClick={handleGenerateAPIToken}>Generate Key</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">API Documentation</h3>
                <div className="bg-muted rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium">REST API Documentation</div>
                    <Button variant="outline" size="sm">View Docs</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">GraphQL Schema</div>
                    <Button variant="outline" size="sm">View Schema</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupabaseDatabase;
