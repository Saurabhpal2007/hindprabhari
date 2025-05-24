import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockArticles } from '../mockData/articles';
import { useAuth } from '../contexts/AuthContext';
import LoginSignupModal from './LoginSignupModal';
import ThemeToggleButton from './ThemeToggleButton'; // Import ThemeToggleButton

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const filteredArticles = mockArticles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSuggestions(filteredArticles);
    setShowSuggestions(filteredArticles.length > 0);
  }, [searchQuery]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate('/search', { state: { query: searchQuery } });
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = () => {
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      setIsModalOpen(true);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="bg-gray-800 text-white p-4 dark:bg-gray-900"> {/* Dark mode for Navbar */}
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">
            <Link to="/">Hind Prabhari</Link>
          </div>

          <ul className="hidden md:flex space-x-4 items-center">
            <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
            <li><Link to="/trending" className="hover:text-gray-400">Trending</Link></li>
            <li><Link to="/india" className="hover:text-gray-400">India</Link></li>
            <li><Link to="/world" className="hover:text-gray-400">World</Link></li>
            <li><Link to="/videos" className="hover:text-gray-400">Videos</Link></li>
            <li><Link to="/contact" className="hover:text-gray-400">Contact</Link></li>
          </ul>

          <div className="flex items-center space-x-3"> {/* Group search, theme toggle, and profile */}
            <div className="relative hidden md:flex items-center">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-700 text-white px-2 py-1 rounded-md focus:outline-none focus:bg-gray-600 dark:bg-gray-800 dark:focus:bg-gray-700"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onFocus={() => setShowSuggestions(suggestions.length > 0 && searchQuery.length > 0)}
                />
                <button type="submit" className="absolute right-0 top-0 mt-1 mr-1 bg-gray-600 hover:bg-gray-500 p-1 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </button>
              </form>
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute top-full left-0 mt-1 w-full bg-white text-black rounded-md shadow-lg z-10 max-h-60 overflow-y-auto dark:bg-gray-700 dark:text-white">
                  {suggestions.map(article => (
                    <li key={article.id} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">
                      <Link to={`/article/${article.id}`} className="block" onClick={handleSuggestionClick}>
                        {article.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <ThemeToggleButton /> {/* Theme toggle button */}

            <div className="hidden md:block">
              {isAuthenticated ? (
                <div className="relative group">
                  <button 
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-600 dark:hover:bg-blue-700"
                      onClick={handleProfileClick} // Changed to handleProfileClick to navigate on click
                    >
                      Profile
                    </button>
                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20 hidden group-hover:block dark:bg-gray-700">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600">My Profile</Link>
                      <button 
                        onClick={handleLogout} 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                      >
                        Logout
                      </button>
                    </div>
                </div>
              ) : (
                <button 
                  onClick={() => setIsModalOpen(true)} // Open modal on click
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded dark:bg-green-600 dark:hover:bg-green-700"
                >
                  Login/Sign Up
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button (for small screens) */}
          <div className="md:hidden flex items-center">
            <ThemeToggleButton /> {/* Also include theme toggle for mobile */}
            <button className="text-white focus:outline-none ml-2"> {/* Added margin */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <LoginSignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;
