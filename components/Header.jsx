import React from 'react';
import { ChartBarIcon } from './icons/MiniIcons';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg shadow-lg p-4 sticky top-0 z-40 transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <ChartBarIcon className="h-8 w-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
             African Centre for Statistics (ACS) <span className="text-blue-400">Reporting Dashboard</span>
            </h1>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header; 