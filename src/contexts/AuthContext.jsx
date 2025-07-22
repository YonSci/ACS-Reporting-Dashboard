import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client, Account, Databases, Query } from 'appwrite';

// Profiles Project/Database/Collection IDs (hardcoded for user auth/profile)
const PROFILES_PROJECT_ID = '6879ef820031fa4dd590';
const PROFILES_DATABASE_ID = '6879f6dd00088a1bd33b';
const PROFILES_COLLECTION_ID = '687a07e9001db8b275db';

// Separate Appwrite client for profiles/auth
const profilesClient = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(PROFILES_PROJECT_ID);

const profilesAccount = new Account(profilesClient);
const profilesDatabases = new Databases(profilesClient);

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
      const res = await profilesDatabases.listDocuments(
        PROFILES_DATABASE_ID,
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
        const userAccount = await profilesAccount.get();
        setUser(userAccount);
        setIsAuthenticated(true);
        await fetchProfile(userAccount.$id);
      } catch (error) {
        // 401 errors are expected when not logged in - don't log them
        if (error.code !== 401) {
          console.error('Session check error:', error);
        }
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
      await profilesAccount.createEmailPasswordSession(email, password);
      const userAccount = await profilesAccount.get();
      setUser(userAccount);
      setIsAuthenticated(true);
      await fetchProfile(userAccount.$id);
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
      await profilesAccount.deleteSession('current');
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
      const createdAccount = await profilesAccount.create(
        'unique()',
        newUser.email,
        newUser.password,
        newUser.fullName
      );
      // 2. Create the profile in the database
      await profilesDatabases.createDocument(
        PROFILES_DATABASE_ID, // Database ID
        PROFILES_COLLECTION_ID,
        'unique()',
        {
          userId: createdAccount.$id,
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

  // Fetch all user profiles (admin only)
  const getUsers = async () => {
    try {
      const res = await profilesDatabases.listDocuments(
        PROFILES_DATABASE_ID,
        PROFILES_COLLECTION_ID
      );
      return res.documents;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      return [];
    }
  };

  // Delete a user profile (admin only)
  const deleteUserProfile = async (profileId) => {
    try {
      await profilesDatabases.deleteDocument(
        PROFILES_DATABASE_ID,
        PROFILES_COLLECTION_ID,
        profileId
      );
      return { success: true };
    } catch (error) {
      console.error('Failed to delete user profile:', error);
      return { success: false, message: error?.message || 'Delete failed' };
    }
  };

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
    getUsers,
    deleteUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 