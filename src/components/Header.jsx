import React from 'react';
import { ChartBarIcon } from './icons/MiniIcons';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../utils/themeContext';

const Header = () => {
  const { isDark } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700 py-4 px-6 mb-2">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img 
            src="/assets/uneca_logo.svg" 
            alt="UNECA Logo" 
            className={`h-10 w-auto ${isDark ? 'filter-blue' : ''}`}
          />
          <div className="flex items-center space-x-3">
            <ChartBarIcon className="h-8 w-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
              African Centre for Statistics (ACS) <span className="text-blue-400">Reporting Dashboard</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header; 