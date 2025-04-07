
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import Layout from './components/layout/Layout';

// Main Pages
import Home from './pages/Home';
import IndiaPage from './pages/IndiaPage';
import WorldPage from './pages/WorldPage';
import TrendingPage from './pages/TrendingPage';
import VideosPage from './pages/VideosPage';
import CategoriesPage from './pages/CategoriesPage';
import ContactPage from './pages/ContactPage';
import SearchPage from './pages/SearchPage';
import ArticlePage from './pages/ArticlePage';
import NotFound from './pages/NotFound';

// Reuse existing pages where appropriate
import AboutUs from './pages/corporate/AboutUs';
import TermsOfService from './pages/corporate/TermsOfService';
import PrivacyPolicy from './pages/corporate/PrivacyPolicy';
import CookiePolicy from './pages/corporate/CookiePolicy';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Core Pages */}
          <Route index element={<Home />} />
          <Route path="india" element={<IndiaPage />} />
          <Route path="world" element={<WorldPage />} />
          <Route path="trending" element={<TrendingPage />} />
          <Route path="videos" element={<VideosPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="about" element={<AboutUs />} />
          
          {/* Dynamic Pages */}
          <Route path="article/:id" element={<ArticlePage />} />
          <Route path="search" element={<SearchPage />} />
          
          {/* Legal Pages */}
          <Route path="terms" element={<TermsOfService />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="cookies" element={<CookiePolicy />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
