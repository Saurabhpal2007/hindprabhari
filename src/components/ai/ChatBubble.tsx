
import React, { useState } from "react";
import { MessageSquare, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatInterface from "./ChatInterface";
import { useAI } from "@/context/AIContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ChatBubble: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { isAIEnabled } = useAI();

  if (!isAIEnabled) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
          size="icon"
        >
          <MessageSquare className="h-6 w-6" />
          <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-yellow-400" />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md p-0 border-l" side="right">
        <div className="h-full flex flex-col">
          <ChatInterface />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatBubble;
