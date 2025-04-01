
import React from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AISettings from "@/components/ai/AISettings";
import { useAI } from "@/context/AIContext";

const AIButton: React.FC = () => {
  const { isAIEnabled } = useAI();
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant={isAIEnabled ? "default" : "outlined"} 
          size="sm"
          className="gap-1"
        >
          <Sparkles className="h-4 w-4" />
          <span className="hidden md:inline">AI</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>AI Features</DialogTitle>
        </DialogHeader>
        <AISettings />
      </DialogContent>
    </Dialog>
  );
};

export default AIButton;
