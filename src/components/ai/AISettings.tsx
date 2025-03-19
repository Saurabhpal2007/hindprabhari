
import React, { useState } from "react";
import { useAI } from "@/context/AIContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RefreshCw, Key, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AISettings: React.FC = () => {
  const { apiKey, setApiKey, isAIEnabled, toggleAI } = useAI();
  const [newApiKey, setNewApiKey] = useState(apiKey);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSaveApiKey = () => {
    if (!newApiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter a valid Google Gemini API key.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    // Simulate API key validation
    setTimeout(() => {
      setApiKey(newApiKey);
      setIsSaving(false);
      toast({
        title: "API Key Saved",
        description: "Your Google Gemini API key has been saved successfully.",
      });
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveApiKey();
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">AI Settings</CardTitle>
        <CardDescription>
          Configure your AI assistant and smart search preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium">Enable AI Features</h3>
              <p className="text-xs text-muted-foreground">Turn AI assistant and smart search on or off</p>
            </div>
            <Switch 
              checked={isAIEnabled} 
              onCheckedChange={toggleAI} 
              aria-label="Toggle AI features"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Google Gemini API Key</h3>
          <div className="flex items-center space-x-2">
            <div className="relative flex-grow">
              <Key className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                value={newApiKey}
                onChange={(e) => setNewApiKey(e.target.value)}
                placeholder="Enter your Google Gemini API key"
                className="pl-8"
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button 
              onClick={handleSaveApiKey} 
              disabled={isSaving || !newApiKey || newApiKey === apiKey}
              size="sm"
            >
              {isSaving ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Your API key is stored locally and never shared
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <p className="text-xs text-muted-foreground">
          Powered by Google Gemini AI
        </p>
      </CardFooter>
    </Card>
  );
};

export default AISettings;
