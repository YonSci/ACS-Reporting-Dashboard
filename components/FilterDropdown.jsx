import React from 'react';

const FilterDropdown = ({ label, options, selectedValue, onChange, icon, disabled = false }) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={label} className={`text-sm font-medium flex items-center ${disabled ? 'text-gray-500' : 'text-gray-300'}`}>
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </label>
      <select
        id={label}
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full p-2.5 bg-slate-700 border border-slate-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 ease-in-out ${disabled ? 'text-gray-400 cursor-not-allowed bg-slate-700/50 border-slate-600/50' : 'text-gray-200 hover:border-slate-500'}`}
      >
        {options.map(option => (
          <option key={option} value={option} className="bg-slate-700 text-gray-200">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown; 