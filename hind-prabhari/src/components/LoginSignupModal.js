import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginSignupModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
    onClose();
  };

  const handleSignup = (e) => {
    e.preventDefault();
    login(email, password); 
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Login or Sign Up</h2>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-2xl">&times;</button>
        </div>

        <form>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <button
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Login
            </button>
            <button
              onClick={handleSignup}
              className="bg-green-500 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="my-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">or continue with</p>
        </div>

        <div className="flex flex-col space-y-2">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full">
            Continue with Google
          </button>
          <button className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded w-full">
            Continue with Facebook
          </button>
          <button className="bg-gray-900 hover:bg-black text-white font-bold py-2 px-4 rounded w-full">
            Continue with X
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupModal;
