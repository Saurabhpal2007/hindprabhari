
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import Index from './pages/Index';
import CategoryPage from './pages/CategoryPage';
import ArticlePage from './pages/ArticlePage';
import AllArticlesPage from './pages/AllArticlesPage';
import AdminPortal from './pages/AdminPortal';
import NotFound from './pages/NotFound';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CookiesPage from './pages/CookiesPage';
import SitemapPage from './pages/SitemapPage';
import OpinionPage from './pages/OpinionPage';
import VideosPage from './pages/VideosPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import TrendingPage from './pages/TrendingPage';
import LatestPage from './pages/LatestPage';
import ChatBubble from './components/ai/ChatBubble';
import CategoriesPage from './pages/CategoriesPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home and Core Pages */}
        <Route path="/" element={<Index />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/latest" element={<LatestPage />} />
        <Route path="/articles" element={<AllArticlesPage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        
        {/* Media Content */}
        <Route path="/videos" element={<VideosPage />} />
        
        {/* Categories */}
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/opinion" element={<OpinionPage />} />
        
        {/* News Categories */}
        <Route path="/politics" element={<CategoryPage />} />
        <Route path="/technology" element={<CategoryPage />} />
        <Route path="/sports" element={<CategoryPage />} />
        <Route path="/entertainment" element={<CategoryPage />} />
        <Route path="/education" element={<CategoryPage />} />
        <Route path="/health" element={<CategoryPage />} />
        <Route path="/world" element={<CategoryPage />} />
        <Route path="/business" element={<CategoryPage />} />
        <Route path="/science" element={<CategoryPage />} />
        <Route path="/environment" element={<CategoryPage />} />
        <Route path="/lifestyle" element={<CategoryPage />} />
        <Route path="/culture" element={<CategoryPage />} />
        
        {/* Regional Categories */}
        <Route path="/india" element={<CategoryPage />} />
        <Route path="/asia" element={<CategoryPage />} />
        <Route path="/europe" element={<CategoryPage />} />
        <Route path="/americas" element={<CategoryPage />} />
        <Route path="/middle-east" element={<CategoryPage />} />
        <Route path="/africa" element={<CategoryPage />} />
        <Route path="/oceania" element={<CategoryPage />} />
        
        {/* Company Pages */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/sitemap" element={<SitemapPage />} />
        
        {/* Dynamic Category Route */}
        <Route path="/:category" element={<CategoryPage />} />
        
        {/* Admin Portal */}
        <Route path="/admin" element={<AdminPortal />} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
      <ChatBubble />
    </Router>
  );
}

export default App;
