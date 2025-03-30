
import { useState } from "react";
import { 
  BarChart, 
  Users, 
  FileText, 
  Settings, 
  Database, 
  Shield, 
  BrainCircuit, 
  Bell, 
  Home 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import DatabaseManagement from "../components/admin/DatabaseManagement";

// Importing the Logo component for consistent branding
import Logo from "../components/layout/header/Logo";

const AdminPortal = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("dashboard");
  
  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    // Show toast for changing tabs - a small UI enhancement
    toast({
      title: `Navigated to ${value.charAt(0).toUpperCase() + value.slice(1)}`,
      description: `You are now viewing the ${value} section.`,
      duration: 2000,
    });
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-sidebar border-r">
        <div className="p-4 flex items-center">
          <div className="w-8 h-8 mr-2">
            <img src="/assets/logo-main.png" alt="HindPrabhari Admin" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-lg font-bold">HindPrabhari Admin</h1>
        </div>
        
        <Separator />
        
        <nav className="flex-1 p-4 space-y-1">
          <Button
            variant={selectedTab === "dashboard" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleTabChange("dashboard")}
          >
            <BarChart className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
          <Button
            variant={selectedTab === "users" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleTabChange("users")}
          >
            <Users className="h-4 w-4 mr-2" />
            User Management
          </Button>
          <Button
            variant={selectedTab === "content" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleTabChange("content")}
          >
            <FileText className="h-4 w-4 mr-2" />
            Content Management
          </Button>
          <Button
            variant={selectedTab === "database" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleTabChange("database")}
          >
            <Database className="h-4 w-4 mr-2" />
            Database
          </Button>
          <Button
            variant={selectedTab === "ai" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleTabChange("ai")}
          >
            <BrainCircuit className="h-4 w-4 mr-2" />
            AI Features
          </Button>
          <Button
            variant={selectedTab === "security" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleTabChange("security")}
          >
            <Shield className="h-4 w-4 mr-2" />
            Security
          </Button>
          <Button
            variant={selectedTab === "settings" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleTabChange("settings")}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </nav>
        
        <div className="p-4">
          <Link to="/">
            <Button variant="outline" className="w-full">
              <Home className="h-4 w-4 mr-2" />
              Back to Site
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-background border-b p-4 flex items-center justify-between">
          <div className="flex items-center md:hidden">
            <Logo />
          </div>
          
          <div className="md:flex items-center hidden">
            <h2 className="text-xl font-semibold">{selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2 border rounded-full p-1 px-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                A
              </div>
              <span className="hidden md:inline-block font-medium">Admin</span>
            </div>
          </div>
        </header>
        
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {selectedTab === "dashboard" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
                <Button>Refresh Data</Button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,582</div>
                    <p className="text-xs text-muted-foreground">
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Articles Published</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">458</div>
                    <p className="text-xs text-muted-foreground">
                      +36 since last week
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45.2k</div>
                    <p className="text-xs text-muted-foreground">
                      +18.3% from last week
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Engagement</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24.5%</div>
                    <p className="text-xs text-muted-foreground">
                      +5.2% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-7 lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Weekly Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center bg-muted/30 rounded-md">
                      <p className="text-muted-foreground">Analytics chart would appear here</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-7 lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Latest actions from users and admins
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {["User johndoe added a new article", 
                        "Admin updated site settings", 
                        "New user registered: jane_smith", 
                        "Article #192 was published", 
                        "Comments moderated: 24 new approvals"].map((activity, i) => (
                        <div key={i} className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                          <p className="text-sm">{activity}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {selectedTab === "database" && (
            <DatabaseManagement />
          )}
          
          {selectedTab === "ai" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">AI Features</h2>
                  <p className="text-muted-foreground mt-1">
                    Configure and manage AI-powered features across the platform
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <Tabs defaultValue="settings" className="w-full">
                <TabsList className="grid grid-cols-3 w-full md:w-auto">
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="content">Content Generation</TabsTrigger>
                  <TabsTrigger value="chat">Chat Features</TabsTrigger>
                </TabsList>
                <TabsContent value="settings" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Global AI Settings</CardTitle>
                      <CardDescription>
                        Configure how AI features behave across the platform
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">AI Model</label>
                          <select className="w-full p-2 border rounded-md">
                            <option>GPT-4 Turbo</option>
                            <option>GPT-3.5</option>
                            <option>Claude 3</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Temperature</label>
                          <input type="range" min="0" max="2" step="0.1" defaultValue="0.7" className="w-full" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Conservative (0)</span>
                            <span>Balanced (0.7)</span>
                            <span>Creative (2)</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Maximum Response Length</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>1000 tokens</option>
                          <option>2000 tokens</option>
                          <option>4000 tokens</option>
                          <option>8000 tokens</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="enable-ai" className="rounded" defaultChecked />
                        <label htmlFor="enable-ai" className="text-sm">Enable AI features for all users</label>
                      </div>
                      
                      <Button>Save Settings</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="content" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Content Generation</CardTitle>
                      <CardDescription>
                        Configure AI-assisted content creation for editors
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Writing Style</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>Journalistic</option>
                          <option>Academic</option>
                          <option>Conversational</option>
                          <option>Business</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Topic Categories</label>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="politics" className="rounded" defaultChecked />
                            <label htmlFor="politics" className="text-sm">Politics</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="tech" className="rounded" defaultChecked />
                            <label htmlFor="tech" className="text-sm">Technology</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="sports" className="rounded" defaultChecked />
                            <label htmlFor="sports" className="text-sm">Sports</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="entertainment" className="rounded" defaultChecked />
                            <label htmlFor="entertainment" className="text-sm">Entertainment</label>
                          </div>
                        </div>
                      </div>
                      
                      <Button>Apply Settings</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="chat" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Chatbot Configuration</CardTitle>
                      <CardDescription>
                        Configure the AI chat assistant for users
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Chatbot Name</label>
                        <input 
                          type="text" 
                          defaultValue="HindPrabhari Assistant" 
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Welcome Message</label>
                        <textarea 
                          className="w-full p-2 border rounded-md h-24"
                          defaultValue="Hello! I'm your HindPrabhari news assistant. How can I help you today?"
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="suggest-articles" className="rounded" defaultChecked />
                        <label htmlFor="suggest-articles" className="text-sm">
                          Suggest related articles in responses
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="personalization" className="rounded" defaultChecked />
                        <label htmlFor="personalization" className="text-sm">
                          Enable personalization based on user history
                        </label>
                      </div>
                      
                      <Button>Save Configuration</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
          
          {(selectedTab === "users" || selectedTab === "content" || selectedTab === "security" || selectedTab === "settings") && (
            <div className="flex items-center justify-center h-full">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Coming Soon</CardTitle>
                  <CardDescription>
                    This {selectedTab} section is under development.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    The {selectedTab} management module will be available in the next update. 
                    Please check back later.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPortal;
