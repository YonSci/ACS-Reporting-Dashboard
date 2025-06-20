import React from 'react';
import { ChartBarIcon } from './icons/MiniIcons';

const Header = () => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-lg shadow-lg p-4 sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <ChartBarIcon className="h-8 w-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-white tracking-tight">
             African Centre for Statistics (ACS) <span className="text-blue-400">Reporting Dashboard</span>
            </h1>
        </div>
        {/* Potentially add user profile or other actions here */}
      </div>
    </header>
  );
};

export default Header; 