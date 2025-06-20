import React from 'react';

const Button = ({ children, className, variant = 'primary', ...props }) => {
  const baseStyle = "font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-150 ease-in-out flex items-center justify-center shadow-md hover:shadow-lg";
  
  let variantStyle = '';
  switch(variant) {
    case 'primary':
      variantStyle = 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500';
      break;
    case 'secondary':
      variantStyle = 'bg-slate-600 hover:bg-slate-700 text-gray-200 focus:ring-slate-500';
      break;
    case 'danger':
      variantStyle = 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500';
      break;
    case 'danger-outline':
      variantStyle = 'border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white focus:ring-red-500';
      break;
  }

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 