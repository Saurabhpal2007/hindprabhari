
import React, { createContext, useContext, useState, useCallback } from 'react';

// Define chat message type
export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isUser?: boolean; // Added for backward compatibility
}

// Define types for the AI context
interface AIContextType {
  isAIOpen: boolean;
  isAIEnabled: boolean;
  toggleAI: () => void;
  closeAI: () => void;
  openAI: () => void;
  chatHistory: ChatMessage[];
  addMessage: (message: string, isUser: boolean) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  clearChatHistory: () => void;
  clearChat: () => void;
  apiKey: string;
  setApiKey: (key: string) => void;
}

// Create context with default values
const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isAIEnabled, setIsAIEnabled] = useState(true);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const toggleAI = useCallback(() => {
    setIsAIEnabled(prev => !prev);
  }, []);

  const closeAI = useCallback(() => {
    setIsAIOpen(false);
  }, []);

  const openAI = useCallback(() => {
    setIsAIOpen(true);
  }, []);

  const addMessage = useCallback((message: string, isUser: boolean) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: isUser ? 'user' : 'ai',
      content: message,
      timestamp: new Date(),
      isUser: isUser
    };
    setChatHistory(prev => [...prev, newMessage]);
  }, []);

  const clearChatHistory = useCallback(() => {
    setChatHistory([]);
  }, []);

  const clearChat = useCallback(() => {
    setChatHistory([]);
  }, []);

  const value = {
    isAIOpen,
    isAIEnabled,
    toggleAI,
    closeAI,
    openAI,
    chatHistory,
    addMessage,
    isLoading,
    setIsLoading,
    clearChatHistory,
    clearChat,
    apiKey,
    setApiKey,
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
