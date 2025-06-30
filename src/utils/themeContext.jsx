import React, { createContext, useContext, useEffect, useState } from 'react';

// Initialize context with default values to avoid undefined check
const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

// Custom hook for using theme
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme provider component
const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Check for saved theme preference or system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) {
        return saved === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    // Update class on document.documentElement when theme changes
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const value = React.useMemo(() => ({
    isDark,
    toggleTheme
  }), [isDark]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme }; 