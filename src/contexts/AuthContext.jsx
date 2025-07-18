import React, { createContext, useContext, useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';

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
const validateCredentials = (users, email, password) => {
  console.log('🔍 Validating credentials for:', email);
  console.log('🔍 Available users:', users.map(u => ({ email: u.email, password: u.password.substring(0, 10) + '...' })));
  
  const user = users.find(u => u.email === email);
  if (!user) {
    console.log('❌ User not found:', email);
    return { isValid: false, message: 'Invalid email or password' };
  }
  
  console.log('✅ User found:', user.email);
  console.log('🔍 User password hash:', user.password);
  console.log('🔍 Entered password:', password);
  
  // If password is hashed, use bcrypt compare
  if (user.password && (user.password.startsWith('$2a$') || user.password.startsWith('$2b$'))) {
    console.log('🔍 Using bcrypt comparison');
    const isValid = bcrypt.compareSync(password, user.password);
    console.log('🔍 Bcrypt comparison result:', isValid);
    if (!isValid) {
      return { isValid: false, message: 'Invalid email or password' };
    }
  } else {
    // Support legacy plain text passwords (for demo)
    console.log('🔍 Using plain text comparison');
    if (user.password !== password) {
      console.log('❌ Plain text password mismatch');
      return { isValid: false, message: 'Invalid email or password' };
    }
  }
  
  console.log('✅ Login successful for:', email);
  return {
    isValid: true,
    user: {
      email: user.email,
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
    console.log('🚀 Initializing users state...');
    
    // Initialize with demo users
    const demoUsers = [
      {
        email: 'admin@acs.com',
        username: 'admin',
        password: bcrypt.hashSync('admin123', 10),
        role: 'admin',
        fullName: 'Admin User'
      },
      {
        email: 'editor@acs.com',
        username: 'editor',
        password: bcrypt.hashSync('editor123', 10),
        role: 'editor',
        fullName: 'Editor User'
      },
      {
        email: 'analyst@acs.com',
        username: 'analyst',
        password: bcrypt.hashSync('analyst123', 10),
        role: 'analyst',
        fullName: 'Analyst User'
      }
    ];
    
    console.log('🚀 Demo users created:', demoUsers.map(u => ({ email: u.email, username: u.username, password: u.password.substring(0, 10) + '...' })));
    
    // Try to load users from localStorage, else use demo users
    const saved = localStorage.getItem('acs_users');
    if (saved) {
      try {
        const loadedUsers = JSON.parse(saved);
        console.log('📦 Loaded users from localStorage:', loadedUsers.map(u => ({ email: u.email, username: u.username, password: u.password.substring(0, 10) + '...' })));
        return loadedUsers;
      } catch (error) {
        console.log('❌ Failed to parse localStorage, using demo users');
        return demoUsers;
      }
    } else {
      console.log('📦 No localStorage data, using demo users');
      return demoUsers;
    }
  });

  // Persist users to localStorage
  useEffect(() => {
    console.log('💾 Saving users to localStorage:', users.map(u => ({ email: u.email, password: u.password.substring(0, 10) + '...' })));
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
  const login = async (email, password) => {
    console.log('🔐 Login attempt for:', email);
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      const result = validateCredentials(users, email, password);
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
      console.error('❌ Login error:', error);
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

  // Add a new user (hash password before storing)
  const addUser = (newUser) => {
    const hashedPassword = bcrypt.hashSync(newUser.password, 10);
    setUsers(prev => [...prev, { ...newUser, password: hashedPassword }]);
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