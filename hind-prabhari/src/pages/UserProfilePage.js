import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">User Profile</h1>
        <p className="text-red-500 dark:text-red-400">You are not logged in. Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 border-b pb-3 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700">User Profile</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Welcome, {user.name || user.email}!</h2>
          <p className="text-gray-600 dark:text-gray-400">Your status: <span className="font-medium text-green-600 dark:text-green-400">Member</span></p>
          <p className="text-gray-600 dark:text-gray-400">Email: {user.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Bookmarks Section */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">My Bookmarks</h3>
            <p className="text-gray-600 dark:text-gray-400">Placeholder for bookmarked articles.</p>
            <ul className="list-disc list-inside mt-2 text-sm text-gray-600 dark:text-gray-400">
              <li>Article A - <span className="text-blue-500 dark:text-blue-400 cursor-pointer hover:underline">View</span></li>
              <li>Article B - <span className="text-blue-500 dark:text-blue-400 cursor-pointer hover:underline">View</span></li>
            </ul>
            <button className="mt-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm">Manage Bookmarks</button>
          </div>

          {/* User Preferences Section */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">User Preferences</h3>
            <p className="text-gray-600 dark:text-gray-400">Placeholder for user preference settings.</p>
            <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <p>Theme: Light/Dark</p>
              <p>Newsletter: Subscribed/Unsubscribed</p>
            </div>
            <button className="mt-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm">Edit Preferences</button>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfilePage;
