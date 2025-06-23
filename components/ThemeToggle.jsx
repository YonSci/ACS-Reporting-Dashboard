import React from 'react';
import { useTheme } from '../utils/themeContext.jsx';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-8 w-14 items-center rounded-full bg-slate-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
      role="switch"
      aria-checked={isDark}
    >
      <span className="sr-only">Toggle dark mode</span>
      <span
        className={`${
          isDark ? 'translate-x-7 bg-slate-900' : 'translate-x-1 bg-white'
        } inline-block h-6 w-6 transform rounded-full transition-transform duration-300 ease-in-out relative overflow-hidden`}
      >
        {/* Sun icon */}
        <svg
          className={`absolute inset-0 h-6 w-6 transition-opacity duration-300 ${
            isDark ? 'opacity-0' : 'opacity-100 text-amber-500'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
          />
        </svg>
        {/* Moon icon */}
        <svg
          className={`absolute inset-0 h-6 w-6 transition-opacity duration-300 ${
            isDark ? 'opacity-100 text-blue-400' : 'opacity-0'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </span>
    </button>
  );
};

export default ThemeToggle; 