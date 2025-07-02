/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blue: {
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        slate: {
          700: '#334155',
          950: '#020617',
        }
      },
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