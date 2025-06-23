import React from 'react';
import { ChartBarIcon } from './icons/MiniIcons';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg shadow-lg p-4 sticky top-0 z-40 transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img 
            src="/assets/uneca_logo.svg" 
            alt="UNECA Logo" 
            className="h-10 w-auto [filter:invert(33%)_sepia(93%)_saturate(900%)_hue-rotate(199deg)_brightness(97%)_contrast(97%)] dark:[filter:invert(66%)_sepia(67%)_saturate(789%)_hue-rotate(177deg)_brightness(101%)_contrast(101%)]"
          />
          <div className="flex items-center space-x-3">
            <ChartBarIcon className="h-8 w-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Executive African Centre for Statistics (ACS) <span className="text-blue-400">Reporting Dashboard</span>
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