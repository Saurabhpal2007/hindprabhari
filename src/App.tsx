import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import Index from './pages/Index';
import CategoryPage from './pages/CategoryPage';
import ArticlePage from './pages/ArticlePage';
import AllArticlesPage from './pages/AllArticlesPage';
import AdminPortal from './pages/AdminPortal';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AuthWrapper from './components/auth/AuthWrapper';
import './App.css';

// Get the Clerk publishable key from environment variable
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Create a fallback component when Clerk is not properly configured
const ClerkProviderWithFallback = ({ children }: { children: React.ReactNode }) => {
  // If no valid Clerk key, just render the children without Clerk
  if (!PUBLISHABLE_KEY || PUBLISHABLE_KEY === "pk_test_YourClerkPublishableKey") {
    console.warn("Clerk authentication is disabled because no valid publishable key was provided.");
    return <>{children}</>;
  }

  // Otherwise use Clerk as intended
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      signInUrl="/login"
      signUpUrl="/signup"
      afterSignInUrl="/"
      afterSignUpUrl="/"
    >
      {children}
    </ClerkProvider>
  );
};

function App() {
  return (
    <ClerkProviderWithFallback>
      <Router>
        <AuthWrapper>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/articles" element={<AllArticlesPage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/trending" element={<AllArticlesPage />} />
            <Route path="/politics" element={<CategoryPage />} />
            <Route path="/technology" element={<CategoryPage />} />
            <Route path="/sports" element={<CategoryPage />} />
            <Route path="/entertainment" element={<CategoryPage />} />
            <Route path="/education" element={<CategoryPage />} />
            <Route path="/health" element={<CategoryPage />} />
            <Route path="/world" element={<CategoryPage />} />
            <Route path="/business" element={<CategoryPage />} />
            <Route path="/contact" element={<Index />} /> {/* Contact will scroll to section for now */}
            <Route path="/:category" element={<CategoryPage />} />
            <Route path="/admin" element={<AdminPortal />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthWrapper>
      </Router>
    </ClerkProviderWithFallback>
  );
}

export default App;
