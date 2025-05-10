
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface AIContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  isAIEnabled: boolean;
  toggleAI: () => void;
  chatHistory: ChatMessage[];
  addMessage: (message: string, isUser: boolean) => void;
  clearChat: () => void;
  isLoading: boolean;
}

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem("gemini_api_key") || "AIzaSyACgdPNOGlW5YO0YYnWvBhIKVx73zaARqU";
  });
  const [isAIEnabled, setIsAIEnabled] = useState<boolean>(() => {
    return localStorage.getItem("ai_enabled") === "true";
  });
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("gemini_api_key", apiKey);
  }, [apiKey]);

  useEffect(() => {
    localStorage.setItem("ai_enabled", isAIEnabled.toString());
  }, [isAIEnabled]);

  const toggleAI = () => {
    if (!apiKey && !isAIEnabled) {
      toast({
        title: "API Key Required",
        description: "Please set a Google Gemini API key in settings first.",
        variant: "destructive",
      });
      return;
    }
    setIsAIEnabled(prev => !prev);
    toast({
      title: isAIEnabled ? "AI Features Disabled" : "AI Features Enabled",
      description: isAIEnabled 
        ? "AI assistant and smart search are now turned off." 
        : "AI assistant and smart search are now active.",
      className: "bg-card border-primary/20 md-elevation-2",
    });
  };

  const addMessage = async (content: string, isUser: boolean) => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please set a Google Gemini API key in settings first.",
        variant: "destructive",
        className: "bg-card border-destructive/20 md-elevation-2",
      });
      return;
    }

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      isUser,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, newMessage]);

    if (isUser && isAIEnabled) {
      setIsLoading(true);
      try {
        // Add AI response
        setTimeout(() => {
          const aiResponse: ChatMessage = {
            id: (Date.now() + 1).toString(),
            content: "This is a simulated AI response. Once connected to the Gemini API, I'll provide real news insights and answer questions about current events.",
            isUser: false,
            timestamp: new Date()
          };
          setChatHistory(prev => [...prev, aiResponse]);
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error calling AI API:", error);
        toast({
          title: "AI Error",
          description: "Failed to get response from AI. Please try again later.",
          variant: "destructive",
          className: "bg-card border-destructive/20 md-elevation-2",
        });
        setIsLoading(false);
      }
    }
  };

  const clearChat = () => {
    setChatHistory([]);
    toast({
      title: "Chat Cleared",
      description: "All conversation history has been cleared.",
      className: "bg-card border-primary/20 md-elevation-2",
    });
  };

  return (
    <AIContext.Provider value={{
      apiKey,
      setApiKey,
      isAIEnabled,
      toggleAI,
      chatHistory,
      addMessage,
      clearChat,
      isLoading
    }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error("useAI must be used within an AIProvider");
  }
  return context;
};
