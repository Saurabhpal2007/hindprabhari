
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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Core Pages */}
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          
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
