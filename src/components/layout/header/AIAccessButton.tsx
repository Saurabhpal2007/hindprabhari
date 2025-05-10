
import React from "react";
import { Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAI } from "@/context/AIContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AIAccessButton = () => {
  // Try-catch to handle any potential errors with the useAI hook
  try {
    const { isAIEnabled, toggleAI } = useAI();

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isAIEnabled ? "default" : "outline"}
              size="sm"
              className="relative rounded-full"
              onClick={toggleAI}
            >
              <Bot className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">AI Assistant</span>
              {isAIEnabled && (
                <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-400" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isAIEnabled 
              ? "AI assistant is active! Click the bot icon in bottom-right corner to chat." 
              : "Enable AI assistant"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  } catch (error) {
    console.error("Error rendering AIAccessButton:", error);
    return null; // Fallback rendering in case of errors
  }
};

export default AIAccessButton;
