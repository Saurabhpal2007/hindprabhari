
import React, { useState, useRef, useEffect } from "react";
import { Send, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAI } from "@/context/AIContext";
import { useToast } from "@/components/ui/use-toast";

const ChatInterface: React.FC = () => {
  const { chatHistory, addMessage, clearChat, isLoading, isAIEnabled } = useAI();
  const [message, setMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    if (!isAIEnabled) {
      toast({
        title: "AI is disabled",
        description: "Please enable AI features in settings to use the chat.",
        variant: "destructive",
      });
      return;
    }

    addMessage(message, true);
    setMessage("");
    inputRef.current?.focus();
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Card className="w-full h-[500px] flex flex-col shadow-lg">
      <CardHeader className="bg-primary/5 rounded-t-xl">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">HindPrabhari AI Assistant</CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outlined" 
              size="icon"
              onClick={clearChat}
              aria-label="Clear chat"
              className="h-8 w-8"
              disabled={chatHistory.length === 0}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <ScrollArea className="flex-grow" ref={scrollAreaRef}>
        <CardContent className="p-4 space-y-4">
          {chatHistory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
              <p className="mb-2 font-medium">Ask me about news & current events!</p>
              <p className="text-sm">I can help summarize news, explain context, or provide relevant information on trending topics.</p>
            </div>
          ) : (
            chatHistory.map((chat) => (
              <div
                key={chat.id}
                className={`flex ${chat.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    chat.isUser
                      ? 'bg-primary text-primary-foreground rounded-tr-none'
                      : 'bg-muted text-muted-foreground rounded-tl-none'
                  }`}
                >
                  <div className="text-sm">{chat.content}</div>
                  <div className={`text-xs mt-1 ${chat.isUser ? 'text-primary-foreground/70' : 'text-muted-foreground/70'}`}>
                    {formatTime(chat.timestamp)}
                  </div>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] px-4 py-2 rounded-lg bg-muted text-muted-foreground rounded-tl-none">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </ScrollArea>
      
      <CardFooter className="p-4 border-t bg-card">
        <form onSubmit={handleSubmit} className="flex gap-2 w-full">
          <Input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your question..."
            className="flex-grow"
            disabled={isLoading || !isAIEnabled}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading || !message.trim() || !isAIEnabled}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;
