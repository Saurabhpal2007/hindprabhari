
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// News Categories
import WorldNews from './pages/categories/WorldNews';
import RegionsPage from './pages/categories/RegionsPage';
import CountriesPage from './pages/categories/CountriesPage';
import GlobalIssuesPage from './pages/categories/GlobalIssuesPage';
import IndiaPoliticsPage from './pages/categories/IndiaPoliticsPage';
import BusinessPage from './pages/categories/BusinessPage';
import TechnologyPage from './pages/categories/TechnologyPage';
import SportsPage from './pages/categories/SportsPage';
import EntertainmentPage from './pages/categories/EntertainmentPage';
import SocietyPage from './pages/categories/SocietyPage';
import CitiesPage from './pages/categories/CitiesPage';
import BusinessGlobalPage from './pages/categories/BusinessGlobalPage';
import SciencePage from './pages/categories/SciencePage';
import HealthPage from './pages/categories/HealthPage';
import CulturePage from './pages/categories/CulturePage';

// Content Formats
import VideoHub from './pages/formats/VideoHub';
import AudioHub from './pages/formats/AudioHub';
import PhotoGallery from './pages/formats/PhotoGallery';
import DataJournalism from './pages/formats/DataJournalism';
import Investigations from './pages/formats/Investigations';
import Explainers from './pages/formats/Explainers';
import Opinion from './pages/formats/Opinion';
import LiveBlogs from './pages/formats/LiveBlogs';
import FactCheck from './pages/formats/FactCheck';
import SpecialReports from './pages/formats/SpecialReports';

// User Engagement
import UserAccount from './pages/user/UserAccount';
import CommunityFeatures from './pages/user/CommunityFeatures';
import Newsletters from './pages/user/Newsletters';

// Tools & Services
import AdvancedSearch from './pages/tools/AdvancedSearch';
import Archives from './pages/tools/Archives';
import Weather from './pages/tools/Weather';
import MarketData from './pages/tools/MarketData';
import EventCalendar from './pages/tools/EventCalendar';

// Corporate & Legal
import AboutUs from './pages/corporate/AboutUs';
import EditorialPolicy from './pages/corporate/EditorialPolicy';
import EthicsStandards from './pages/corporate/EthicsStandards';
import ContactUs from './pages/corporate/ContactUs';
import Careers from './pages/corporate/Careers';
import Advertise from './pages/corporate/Advertise';
import TermsOfService from './pages/corporate/TermsOfService';
import PrivacyPolicy from './pages/corporate/PrivacyPolicy';
import CookiePolicy from './pages/corporate/CookiePolicy';
import HelpFAQ from './pages/corporate/HelpFAQ';

// Dynamic Pages for Categories and Regions
import CategoryPage from './pages/CategoryPage';
import ArticlePage from './pages/ArticlePage';
import TrendingPage from './pages/TrendingPage';
import LatestPage from './pages/LatestPage';

import './App.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Main Layout wrapper */}
          <Route path="/" element={<Layout />}>
            {/* Home and Core Pages */}
            <Route index element={<Home />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/latest" element={<LatestPage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            
            {/* News Categories */}
            <Route path="/world" element={<WorldNews />} />
            <Route path="/regions" element={<RegionsPage />} />
            <Route path="/regions/:region" element={<CategoryPage />} />
            <Route path="/countries" element={<CountriesPage />} />
            <Route path="/countries/:country" element={<CategoryPage />} />
            <Route path="/global-issues" element={<GlobalIssuesPage />} />
            <Route path="/global-issues/:issue" element={<CategoryPage />} />
            <Route path="/india/politics" element={<IndiaPoliticsPage />} />
            <Route path="/business" element={<BusinessPage />} />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="/sports" element={<SportsPage />} />
            <Route path="/entertainment" element={<EntertainmentPage />} />
            <Route path="/society" element={<SocietyPage />} />
            <Route path="/cities" element={<CitiesPage />} />
            <Route path="/cities/:city" element={<CategoryPage />} />
            <Route path="/business-global" element={<BusinessGlobalPage />} />
            <Route path="/science" element={<SciencePage />} />
            <Route path="/health" element={<HealthPage />} />
            <Route path="/culture" element={<CulturePage />} />
            
            {/* Content Formats */}
            <Route path="/video" element={<VideoHub />} />
            <Route path="/audio" element={<AudioHub />} />
            <Route path="/photos" element={<PhotoGallery />} />
            <Route path="/data" element={<DataJournalism />} />
            <Route path="/investigations" element={<Investigations />} />
            <Route path="/explainers" element={<Explainers />} />
            <Route path="/opinion" element={<Opinion />} />
            <Route path="/live" element={<LiveBlogs />} />
            <Route path="/fact-check" element={<FactCheck />} />
            <Route path="/special-reports" element={<SpecialReports />} />
            
            {/* User Engagement */}
            <Route path="/account" element={<UserAccount />} />
            <Route path="/community" element={<CommunityFeatures />} />
            <Route path="/newsletters" element={<Newsletters />} />
            
            {/* Tools & Services */}
            <Route path="/search" element={<AdvancedSearch />} />
            <Route path="/archives" element={<Archives />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/markets" element={<MarketData />} />
            <Route path="/events" element={<EventCalendar />} />
            
            {/* Corporate & Legal */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/editorial-policy" element={<EditorialPolicy />} />
            <Route path="/ethics" element={<EthicsStandards />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/advertise" element={<Advertise />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/help" element={<HelpFAQ />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </HelmetProvider>
  );
}

export default App;
