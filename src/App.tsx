
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import CategoryPage from './pages/CategoryPage';
import ArticlePage from './pages/ArticlePage';
import AllArticlesPage from './pages/AllArticlesPage';
import AdminPortal from './pages/AdminPortal';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/articles" element={<AllArticlesPage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/:category" element={<CategoryPage />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
