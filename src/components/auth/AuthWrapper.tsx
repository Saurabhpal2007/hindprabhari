
import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { useLocation } from 'react-router-dom';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  // Get Clerk key to check if Clerk is configured
  const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const isClerkConfigured = clerkKey && clerkKey !== "pk_test_YourClerkPublishableKey";
  
  // Only use Clerk hooks if Clerk is properly configured
  const clerkUser = isClerkConfigured ? useUser() : { isSignedIn: false, isLoaded: true };
  const { isSignedIn, isLoaded } = clerkUser;
  
  const location = useLocation();
  
  // Don't require authentication for these routes
  const publicRoutes = ['/', '/article', '/politics', '/technology', '/sports', 
                         '/entertainment', '/education', '/health', '/world', '/business'];
  
  // Check if current path is public
  const isPublicRoute = publicRoutes.some(route => 
    location.pathname === route || location.pathname.startsWith(route + '/')
  );
  
  // Special case for admin portal - always requires auth
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  // If Clerk is not configured, we'll skip authentication checks
  if (!isClerkConfigured) {
    console.warn("Authentication is disabled - all routes accessible");
    return <>{children}</>;
  }
  
  if (!isLoaded) {
    // Show loading state
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // For public routes, or when signed in, show the content
  if (isPublicRoute || isSignedIn) {
    return <>{children}</>;
  }
  
  // For admin route and other protected routes, show a message that auth is required
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isAdminRoute ? "Admin Login Required" : "Sign In to Continue"}
        </h1>
        <p className="text-center mb-4">
          Authentication is required but Clerk is not properly configured. 
          Please set up your VITE_CLERK_PUBLISHABLE_KEY environment variable.
        </p>
        <div className="flex justify-center">
          <a 
            href="/" 
            className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
