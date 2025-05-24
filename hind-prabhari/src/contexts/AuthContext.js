import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // To store mock user data

  const login = (email, password) => {
    // Mock login logic:
    // In a real app, you'd validate credentials against a backend.
    // For now, any email/password will work.
    console.log("Attempting login with:", email); // For debugging
    setUser({ email, name: "Mock User" }); // Store some mock user data
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
