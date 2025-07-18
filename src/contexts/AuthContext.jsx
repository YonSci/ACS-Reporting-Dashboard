import React, { createContext, useContext, useState, useEffect } from 'react';
import { appwrite } from '../lib/appwrite';
import { Query } from 'appwrite';

const DATABASE_ID = '6879f6dd00088a1bd33b';
const PROFILES_COLLECTION_ID = '687a07e9001db8b275db';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch profile by userId
  const fetchProfile = async (userId) => {
    try {
      const res = await appwrite.databases.listDocuments(
        DATABASE_ID,
        PROFILES_COLLECTION_ID,
        [Query.equal('userId', userId)]
      );
      if (res.documents.length > 0) {
        setProfile(res.documents[0]);
        console.log('Fetched profile:', res.documents[0]);
        return res.documents[0];
      } else {
        setProfile(null);
        console.log('Fetched profile: null');
        return null;
      }
    } catch (error) {
      setProfile(null);
      console.log('Fetched profile: error', error);
      return null;
    }
  };

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true);
      try {
        const account = await appwrite.account.get();
        setUser(account);
        setIsAuthenticated(true);
        await fetchProfile(account.$id);
      } catch (error) {
        setUser(null);
        setProfile(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  // Login function
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      await appwrite.account.createEmailPasswordSession(email, password);
      const account = await appwrite.account.get();
      setUser(account);
      setIsAuthenticated(true);
      await fetchProfile(account.$id);
      return { success: true };
    } catch (error) {
      return { success: false, message: error?.message || 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    try {
      await appwrite.account.deleteSession('current');
      setUser(null);
      setProfile(null);
      setIsAuthenticated(false);
    } catch (error) {
      // Ignore
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new user (admin only)
  const addUser = async (newUser) => {
    try {
      // 1. Create the user in Appwrite Auth
      const created = await appwrite.account.create(
        'unique()',
        newUser.email,
        newUser.password,
        newUser.fullName
      );
      // 2. Create the profile in the database
      await appwrite.databases.createDocument(
        DATABASE_ID, // Database ID
        PROFILES_COLLECTION_ID,
        'unique()',
        {
          userId: created.$id,
          username: newUser.username,
          role: newUser.role,
          fullName: newUser.fullName,
          email: newUser.email
        }
      );
      return { success: true };
    } catch (error) {
      return { success: false, message: error?.message || 'Failed to add user' };
    }
  };

  // Get all users (admin only) - not available from client for security
  const getUsers = () => [];

  // Role helpers
  const hasRole = (role) => profile && profile.role === role;
  const hasAnyRole = (roles) => profile && roles.includes(profile.role);

  const value = {
    user,
    profile,
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