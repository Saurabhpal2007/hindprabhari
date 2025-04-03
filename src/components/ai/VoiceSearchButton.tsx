import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

interface SpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
        confidence: number;
      };
    };
    item(index: number): { [index: number]: { transcript: string } };
    length: number;
  };
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: (event: Event) => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: (event: Event) => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface VoiceSearchButtonProps {
  onResult: (transcript: string) => void;
  size?: "default" | "sm" | "lg" | "icon";
}

const VoiceSearchButton: React.FC<VoiceSearchButtonProps> = ({ onResult, size = "icon" }) => {
  const [isListening, setIsListening] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const isApiAvailable = 'webkitSpeechRecognition' in window || 
                            'SpeechRecognition' in window;
    setIsAvailable(isApiAvailable);
    
    if (!isApiAvailable) {
      console.log('Speech Recognition API not available');
    }
  }, []);

  const toggleListening = () => {
    if (!isAvailable) {
      toast({
        title: "Voice search unavailable",
        description: "Your browser doesn't support voice search. Try Chrome or Edge.",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    setIsLoading(true);
    setIsListening(true);

    const SpeechRecognition = window.SpeechRecognition || 
                             window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) return;
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    recognition.onstart = () => {
      setIsLoading(false);
      toast({
        title: "Listening...",
        description: "Speak now to search",
      });
    };
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      stopListening();
      
      toast({
        title: "Search by voice",
        description: `Searching for: "${transcript}"`,
      });
    };
    
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      stopListening();
      
      toast({
        title: "Voice search failed",
        description: event.error === 'not-allowed' 
          ? "Microphone access denied. Check permissions." 
          : "An error occurred. Please try again.",
        variant: "destructive"
      });
    };
    
    recognition.onend = () => {
      stopListening();
    };
    
    recognition.start();
  };
  
  const stopListening = () => {
    setIsListening(false);
    setIsLoading(false);
  };

  if (!isAvailable) return null;
  
  return (
    <Button
      variant="ghost"
      size={size}
      className={`relative overflow-hidden ${isListening ? 'bg-red-100 dark:bg-red-900/30' : ''}`}
      onClick={toggleListening}
      disabled={isLoading}
      aria-label={isListening ? "Stop voice search" : "Search with voice"}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Loader2 className="h-4 w-4 animate-spin" />
          </motion.div>
        ) : isListening ? (
          <motion.div
            key="mic-active"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-red-500 dark:text-red-400"
          >
            <div className="voice-animation">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="mic-inactive"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Mic className="h-4 w-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
};

export default VoiceSearchButton;
