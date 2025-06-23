import React from 'react';

const FilterDropdown = ({ 
  label, 
  icon, 
  options = [], 
  selectedValue, 
  onChange,
  placeholder = "Select an option",
  isMulti = false 
}) => {
  return (
    <div className="flex-1 min-w-[200px]">
      <div className="flex items-center gap-2 mb-2">
        {icon && (
          <span className="text-slate-950 dark:text-gray-300">
            {icon}
          </span>
        )}
        <label className="block text-base font-bold text-slate-950 dark:text-gray-200">
          {label}
        </label>
      </div>
      <div className="relative">
        <select
          value={selectedValue}
          onChange={(e) => onChange(e.target.value)}
          multiple={isMulti}
          size={isMulti ? 4 : 1}
          className="w-full px-4 py-2.5 text-slate-950 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 
                   rounded-lg shadow-sm appearance-none font-medium
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500
                   transition-colors duration-200"
        >
          {!isMulti && (
            <option value="" className="text-slate-950 dark:text-gray-200 font-medium">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option 
              key={option} 
              value={option}
              className="text-slate-950 dark:text-gray-200 font-medium py-1"
            >
              {option}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="w-5 h-5 text-slate-950 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {isMulti && (
        <p className="mt-1 text-sm text-slate-900 dark:text-gray-400 font-medium">
          Hold Ctrl/Cmd to select multiple options
        </p>
      )}
    </div>
  );
};

export default FilterDropdown; 