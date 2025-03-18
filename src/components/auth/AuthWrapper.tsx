
import React from 'react';
import { SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { useLocation } from 'react-router-dom';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();
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
  
  // For admin route, show sign in
  if (isAdminRoute) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login Required</h1>
          <SignIn redirectUrl="/admin" />
        </div>
      </div>
    );
  }
  
  // For other protected routes, show sign in with different message
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In to Continue</h1>
        <SignIn />
      </div>
    </div>
  );
};

export default AuthWrapper;
