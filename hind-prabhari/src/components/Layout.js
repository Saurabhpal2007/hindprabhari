import React from 'react';
import Navbar from './Navbar'; // Import the Navbar component
import { useTheme } from '../contexts/ThemeContext'; // Import useTheme

const Layout = ({ children }) => {
  const { theme } = useTheme(); // Access the current theme

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'dark' : ''} bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
      {/* Header - Navbar */}
      <header className="sticky top-0 z-50"> {/* Made navbar sticky */}
        <Navbar />
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto p-4">
        {children} 
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 text-center transition-colors duration-300">
        <p>&copy; {new Date().getFullYear()} Hind Prabhari. All rights reserved.</p>
        {/* Additional footer content can be added here */}
      </footer>
    </div>
  );
};

export default Layout;
