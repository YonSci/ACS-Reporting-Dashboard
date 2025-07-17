import React from 'react';
import { ChartBarIcon } from './icons/MiniIcons';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../utils/themeContext';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { isDark } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700 py-4 px-6 mb-2 transition-colors duration-200">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img 
            src="/assets/uneca_logo.svg" 
            alt="UNECA Logo" 
            className={`h-10 w-auto transition-all duration-200 ${isDark ? 'filter-blue' : ''}`}
          />
          <div className="flex items-center space-x-3">
            <ChartBarIcon className="h-8 w-8 text-blue-500 transition-colors duration-200" />
            <h1 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight transition-colors duration-200">
              African Centre for Statistics (ACS) Country-Based <span className="text-blue-400 transition-colors duration-200">Reporting Dashboard</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated && (
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Logged in as: <span className="font-medium text-gray-900 dark:text-white">{user?.fullName}</span>
              </span>
              <button
                onClick={logout}
                className="px-2 py-1 text-xs bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 rounded transition-colors"
              >
                Logout
              </button>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header; 