
import React, { createContext, useContext, useState, useCallback } from 'react';

// Define types for the AI context
interface AIContextType {
  isAIOpen: boolean;
  toggleAI: () => void;
  closeAI: () => void;
  openAI: () => void;
  chatHistory: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  clearChatHistory: () => void;
}

// Define chat message type
export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  message: string;
  timestamp: Date;
}

// Create context with default values
const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleAI = useCallback(() => {
    setIsAIOpen(prev => !prev);
  }, []);

  const closeAI = useCallback(() => {
    setIsAIOpen(false);
  }, []);

  const openAI = useCallback(() => {
    setIsAIOpen(true);
  }, []);

  const addMessage = useCallback((message: ChatMessage) => {
    setChatHistory(prev => [...prev, message]);
  }, []);

  const clearChatHistory = useCallback(() => {
    setChatHistory([]);
  }, []);

  const value = {
    isAIOpen,
    toggleAI,
    closeAI,
    openAI,
    chatHistory,
    addMessage,
    isLoading,
    setIsLoading,
    clearChatHistory,
  };

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
};

// Custom hook to use the AI context
export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};
