
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider, useUser } from '@clerk/clerk-react';
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

// Replace with your actual Clerk publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_YourClerkPublishableKey";

function App() {
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      clerkJSVersion="5.56.0-snapshot.v20250312225817"
      signInUrl="/login"
      signUpUrl="/signup"
      afterSignInUrl="/"
      afterSignUpUrl="/"
    >
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
    </ClerkProvider>
  );
}

export default App;
