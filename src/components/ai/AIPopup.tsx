
import React, { useState } from "react";
import { Bot, X, MessageSquare, Sparkles } from "lucide-react";
import { useAI } from "@/context/AIContext";
import { Button } from "@/components/ui/button";
import ChatInterface from "./ChatInterface";
import AISettings from "./AISettings";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const AIPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<"chat" | "settings">("chat");
  const { isAIEnabled } = useAI();

  if (!isAIEnabled) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className="h-14 w-14 rounded-full shadow-lg relative"
            aria-label="Open AI Assistant"
          >
            <Bot className="h-6 w-6" />
            <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-yellow-400" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[350px] p-0 mr-2 mb-2" 
          side="top" 
          align="end"
          sideOffset={10}
        >
          <Card className="border-0 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3 px-4 bg-primary/5 rounded-t-lg">
              <CardTitle className="text-lg font-semibold">
                {view === "chat" ? "AI Assistant" : "AI Settings"}
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8",
                    view === "chat" ? "bg-primary/10" : "bg-transparent"
                  )}
                  onClick={() => setView("chat")}
                  aria-label="Chat"
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8",
                    view === "settings" ? "bg-primary/10" : "bg-transparent"
                  )}
                  onClick={() => setView("settings")}
                  aria-label="Settings"
                >
                  <Sparkles className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            {view === "chat" ? (
              <div className="h-[500px]">
                <ChatInterface />
              </div>
            ) : (
              <div className="p-4">
                <AISettings />
              </div>
            )}
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AIPopup;
