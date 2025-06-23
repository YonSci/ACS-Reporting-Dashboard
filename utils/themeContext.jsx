import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const theme = {
    colors: {
      primary: isDarkMode ? 'rgb(59, 130, 246)' : 'rgb(37, 99, 235)',
      secondary: isDarkMode ? 'rgb(107, 114, 128)' : 'rgb(71, 85, 105)',
      background: isDarkMode ? 'rgb(17, 24, 39)' : 'rgb(255, 255, 255)',
      surface: isDarkMode ? 'rgb(31, 41, 55)' : 'rgb(248, 250, 252)',
      text: {
        primary: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(15, 23, 42)',
        secondary: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(51, 65, 85)',
        muted: isDarkMode ? 'rgb(107, 114, 128)' : 'rgb(100, 116, 139)',
      },
      border: isDarkMode ? 'rgb(55, 65, 81)' : 'rgb(226, 232, 240)',
      hover: {
        primary: isDarkMode ? 'rgb(96, 165, 250)' : 'rgb(29, 78, 216)',
        surface: isDarkMode ? 'rgb(55, 65, 81)' : 'rgb(241, 245, 249)',
      },
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    },
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 