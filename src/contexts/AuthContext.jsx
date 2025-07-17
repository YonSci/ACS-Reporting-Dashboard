import React, { createContext, useContext, useState, useEffect } from 'react';
import { authorizedUsers as initialUsers } from '../utils/userData';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper function to validate credentials against a user list
const validateCredentials = (users, username, password) => {
  const user = users.find(u => u.username === username);
  if (!user) {
    return { isValid: false, message: 'Invalid username or password' };
  }
  if (user.password !== password) {
    return { isValid: false, message: 'Invalid username or password' };
  }
  return {
    isValid: true,
    user: {
      username: user.username,
      role: user.role,
      fullName: user.fullName
    }
  };
};

// Authentication provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState(() => {
    // Try to load users from localStorage, else use initialUsers
    const saved = localStorage.getItem('acs_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [...initialUsers];
      }
    }
    return [...initialUsers];
  });

  // Persist users to localStorage
  useEffect(() => {
    localStorage.setItem('acs_users', JSON.stringify(users));
  }, [users]);

  // Check for existing session on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('acs_user');
    const savedAuth = localStorage.getItem('acs_authenticated');
    if (savedUser && savedAuth === 'true') {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('acs_user');
        localStorage.removeItem('acs_authenticated');
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (username, password) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const result = validateCredentials(users, username, password);
      if (result.isValid) {
        setUser(result.user);
        setIsAuthenticated(true);
        localStorage.setItem('acs_user', JSON.stringify(result.user));
        localStorage.setItem('acs_authenticated', 'true');
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      return { success: false, message: 'An error occurred during login' };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('acs_user');
    localStorage.removeItem('acs_authenticated');
  };

  // Add a new user
  const addUser = (newUser) => {
    setUsers(prev => [...prev, newUser]);
  };

  // Get all users
  const getUsers = () => users;

  // Check if user has specific role
  const hasRole = (role) => {
    return user && user.role === role;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    return user && roles.includes(user.role);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    hasRole,
    hasAnyRole,
    addUser,
    getUsers
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 