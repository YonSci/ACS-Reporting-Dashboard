/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Add custom CSS filters for logo colors
      css: {
        '.filter-blue': {
          filter: 'invert(27%) sepia(98%) saturate(1900%) hue-rotate(205deg) brightness(97%) contrast(95%)'
        },
        '.dark .filter-blue': {
          filter: 'invert(42%) sepia(98%) saturate(1000%) hue-rotate(190deg) brightness(100%) contrast(95%)'
        },
        '.filter-white': {
          filter: 'brightness(0) invert(1)'
        }
      }
    },
  },
  plugins: [],
} 