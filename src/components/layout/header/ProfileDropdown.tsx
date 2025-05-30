
import { User, LogIn, Settings, Bot, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useAI } from "@/context/AIContext";
import { useTheme } from "@/components/ui/use-theme";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import ChatInterface from "@/components/ai/ChatInterface";

const ProfileDropdown = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const [chatOpen, setChatOpen] = useState(false);
  const navigate = useNavigate();
  
  // Try-catch to handle potential errors with useAI hook
  let isAIEnabled = false;
  let toggleAI = () => {};
  
  try {
    const aiContext = useAI();
    isAIEnabled = aiContext.isAIEnabled;
    toggleAI = aiContext.toggleAI;
  } catch (error) {
    console.error("Error using AI context in ProfileDropdown:", error);
  }

  const handleLogin = () => {
    toast({
      title: "Login",
      description: "Login functionality will be implemented soon.",
    });
  };

  const handleAdminAccess = () => {
    navigate('/admin');
    toast({
      title: "Admin Access",
      description: "Redirecting to admin portal.",
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full bg-muted/50 hover:bg-muted h-10 w-10"
            aria-label="Profile options"
          >
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 rounded-xl">
          <DropdownMenuLabel>My Profile</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogin} className="rounded-lg focus:bg-accent">
            <LogIn className="mr-2 h-5 w-5" />
            <span>Account</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleAdminAccess} className="rounded-lg focus:bg-accent">
            <Settings className="mr-2 h-5 w-5" />
            <span>Admin</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Preferences</DropdownMenuLabel>
          
          <DropdownMenuItem className="rounded-lg focus:bg-accent py-0">
            <ThemeToggle showIcon={true} showText={true} />
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            className="rounded-lg focus:bg-accent"
            onClick={toggleAI}
          >
            <Bot className="mr-2 h-5 w-5" />
            <span>{isAIEnabled ? "Disable AI Assistant" : "Enable AI Assistant"}</span>
          </DropdownMenuItem>
          
          {isAIEnabled && (
            <DropdownMenuItem 
              className="rounded-lg focus:bg-accent"
              onSelect={(e) => {
                e.preventDefault();
                setChatOpen(true);
              }}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              <span>Chat with AI</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Sheet open={chatOpen} onOpenChange={setChatOpen}>
        <SheetContent className="sm:max-w-md p-0 border-l" side="right">
          <div className="h-full flex flex-col">
            <SheetHeader className="px-4 py-2 border-b">
              <SheetTitle>AI Assistant</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-hidden">
              <ChatInterface />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProfileDropdown;
