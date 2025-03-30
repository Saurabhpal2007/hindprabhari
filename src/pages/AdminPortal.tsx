
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { BarChart3, Users, FileText, Settings, Shield, BellRing, Database, Bot } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SupabaseDatabase from "@/components/admin/SupabaseDatabase";
import ContentManagement from "@/components/admin/ContentManagement";

const AdminPortal: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data for dashboard statistics
  const stats = [
    { name: "Total Users", value: "1,234", icon: Users, color: "bg-blue-100 text-blue-800" },
    { name: "Articles", value: "345", icon: FileText, color: "bg-green-100 text-green-800" },
    { name: "Sessions", value: "5,678", icon: BarChart3, color: "bg-purple-100 text-purple-800" },
    { name: "Alerts", value: "12", icon: BellRing, color: "bg-red-100 text-red-800" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 className="text-2xl font-bold">Admin Portal</h1>
            <p className="text-sm text-muted-foreground mt-1 sm:mt-0">
              Welcome back, Admin
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {stats.map((stat, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="flex w-full overflow-x-auto space-x-2 p-1 tabs-list">
              <TabsTrigger value="dashboard" className="flex items-center">
                <BarChart3 className="mr-2 h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Content
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Users
              </TabsTrigger>
              <TabsTrigger value="database" className="flex items-center">
                <Database className="mr-2 h-4 w-4" />
                Database
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center">
                <Bot className="mr-2 h-4 w-4" />
                AI Features
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center">
                <Shield className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="p-0 border-none">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
                <p className="text-muted-foreground mb-4">
                  Welcome to the HindPrabhari Admin Portal. Here you can manage all aspects of your news platform.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Recent Activities</h3>
                    <ul className="space-y-2">
                      <li className="text-sm text-muted-foreground">User "editor1" published a new article "Election Results"</li>
                      <li className="text-sm text-muted-foreground">3 new user registrations in the last 24 hours</li>
                      <li className="text-sm text-muted-foreground">System backup completed successfully</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Quick Actions</h3>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-sm text-primary hover:underline">Create new article</a></li>
                      <li><a href="#" className="text-sm text-primary hover:underline">View site analytics</a></li>
                      <li><a href="#" className="text-sm text-primary hover:underline">Manage user permissions</a></li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="content" className="p-0 border-none">
              <ContentManagement />
            </TabsContent>
            
            <TabsContent value="users" className="p-0 border-none">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">User Management</h2>
                <p className="text-muted-foreground mb-4">
                  Manage user accounts, roles, and permissions.
                </p>
                <div className="bg-muted rounded-lg p-12 text-center">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">User Management Coming Soon</h3>
                  <p className="text-muted-foreground">
                    This feature is currently under development. Check back later.
                  </p>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="database" className="p-0 border-none">
              <Card>
                <SupabaseDatabase />
              </Card>
            </TabsContent>
            
            <TabsContent value="ai" className="p-0 border-none">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">AI Features Management</h2>
                <p className="text-muted-foreground mb-4">
                  Configure AI assistant, content generation, and smart analytics features.
                </p>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">AI Assistant Configuration</h3>
                  <Separator className="my-4" />
                  
                  <div className="space-y-6">
                    <div className="bg-muted rounded-lg p-6">
                      <h4 className="font-medium mb-2">AI Assistant Status</h4>
                      <div className="flex items-center space-x-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">Online and functioning properly</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        The AI assistant is currently active and available to all users. 
                        Last updated: December 12, 2023.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Content Generation</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Configure AI for generating article summaries and content suggestions.
                        </p>
                        <button className="text-sm text-primary hover:underline" onClick={() => {
                          toast({
                            title: "Content Generation Settings",
                            description: "This feature is currently under development."
                          });
                        }}>
                          Configure Settings
                        </button>
                      </div>
                      
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Smart Analytics</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          AI-powered insights on user engagement and content performance.
                        </p>
                        <button className="text-sm text-primary hover:underline" onClick={() => {
                          toast({
                            title: "Smart Analytics",
                            description: "This feature is currently under development."
                          });
                        }}>
                          View Analytics
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="p-0 border-none">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">System Settings</h2>
                <p className="text-muted-foreground mb-4">
                  Configure system preferences, appearance, and site behavior.
                </p>
                <div className="bg-muted rounded-lg p-12 text-center">
                  <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Settings Coming Soon</h3>
                  <p className="text-muted-foreground">
                    This feature is currently under development. Check back later.
                  </p>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="p-0 border-none">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
                <p className="text-muted-foreground mb-4">
                  Manage security protocols, authentication methods, and access controls.
                </p>
                <div className="bg-muted rounded-lg p-12 text-center">
                  <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Security Features Coming Soon</h3>
                  <p className="text-muted-foreground">
                    This feature is currently under development. Check back later.
                  </p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPortal;
