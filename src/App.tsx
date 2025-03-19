
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
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
import AIPopup from './components/ai/AIPopup';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
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
        <Route path="/contact" element={<Index />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/sitemap" element={<SitemapPage />} />
        <Route path="/:category" element={<CategoryPage />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
      <AIPopup />
    </Router>
  );
}

export default App;
