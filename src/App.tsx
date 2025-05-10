
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import Layout from './components/layout/Layout';

// Main Pages
import Home from './pages/Home';
import AboutUs from './pages/corporate/AboutUs';
import TermsOfService from './pages/corporate/TermsOfService';
import PrivacyPolicy from './pages/corporate/PrivacyPolicy';
import CookiePolicy from './pages/corporate/CookiePolicy';
import NotFound from './pages/NotFound';

// Category Pages
import IndiaPoliticsPage from './pages/categories/IndiaPoliticsPage';
import TechnologyPage from './pages/categories/TechnologyPage';
import BusinessPage from './pages/categories/BusinessPage';
import BusinessGlobalPage from './pages/categories/BusinessGlobalPage';
import HealthPage from './pages/categories/HealthPage';
import SportsPage from './pages/categories/SportsPage';
import EntertainmentPage from './pages/categories/EntertainmentPage';
import SciencePage from './pages/categories/SciencePage';
import CulturePage from './pages/categories/CulturePage';
import SocietyPage from './pages/categories/SocietyPage';
import CitiesPage from './pages/categories/CitiesPage';

// Format Pages
import WorldPage from './pages/WorldPage';
import IndiaPage from './pages/IndiaPage';
import TrendingPage from './pages/TrendingPage';
import VideosPage from './pages/VideosPage';
import CategoriesPage from './pages/CategoriesPage';
import SearchPage from './pages/SearchPage';
import ContactPage from './pages/ContactPage';
import AdvancedSearch from './pages/tools/AdvancedSearch';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Core Pages */}
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactPage />} />
          
          {/* Category Pages */}
          <Route path="india" element={<IndiaPage />} />
          <Route path="india/politics" element={<IndiaPoliticsPage />} />
          <Route path="trending" element={<TrendingPage />} />
          <Route path="world" element={<WorldPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="technology" element={<TechnologyPage />} />
          <Route path="business" element={<BusinessPage />} />
          <Route path="business/global" element={<BusinessGlobalPage />} />
          <Route path="health" element={<HealthPage />} />
          <Route path="sports" element={<SportsPage />} />
          <Route path="entertainment" element={<EntertainmentPage />} />
          <Route path="science" element={<SciencePage />} />
          <Route path="culture" element={<CulturePage />} />
          <Route path="society" element={<SocietyPage />} />
          <Route path="cities" element={<CitiesPage />} />
          
          {/* Format Pages */}
          <Route path="video" element={<VideosPage />} />
          <Route path="videos" element={<VideosPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="advanced-search" element={<AdvancedSearch />} />
          
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
