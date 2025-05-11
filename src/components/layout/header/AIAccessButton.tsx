
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
  try {
    const { isAIEnabled, toggleAI } = useAI();

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isAIEnabled ? "filled" : "tonal"}
              size="sm"
              shape="pill"
              className="relative transition-all duration-300"
              onClick={toggleAI}
            >
              <Bot className={`h-4 w-4 mr-1 ${isAIEnabled ? "text-on-primary" : "text-primary"}`} />
              <span className="hidden sm:inline">AI Assistant</span>
              {isAIEnabled && (
                <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-tertiary animate-pulse-glow" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-popover border border-border shadow-elevation-2">
            {isAIEnabled 
              ? "AI assistant is active! Click the bot icon in bottom-right corner to chat." 
              : "Enable AI assistant"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  } catch (error) {
    console.error("Error rendering AIAccessButton:", error);
    return null;
  }
};

export default AIAccessButton;
