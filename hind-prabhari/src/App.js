import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import TrendingPage from './pages/TrendingPage';
import IndiaPage from './pages/IndiaPage';
import WorldPage from './pages/WorldPage';
import VideosPage from './pages/VideosPage';
import ContactPage from './pages/ContactPage';
import SearchPage from './pages/SearchPage';
import ArticlePage from './pages/ArticlePage';
import AuthorPage from './pages/AuthorPage';
import CategoriesPage from './pages/CategoriesPage';
import UserProfilePage from './pages/UserProfilePage';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext'; // Import ThemeProvider
import './App.css';

function App() {
  return (
    <ThemeProvider> {/* Wrap AuthProvider (and thus the whole app) with ThemeProvider */}
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/trending" element={<TrendingPage />} />
              <Route path="/india" element={<IndiaPage />} />
              <Route path="/world" element={<WorldPage />} />
              <Route path="/videos" element={<VideosPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/article/:articleId" element={<ArticlePage />} />
              <Route path="/author/:authorId" element={<AuthorPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
