import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '', 
  disabled = false,
  title,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900";
  
  const sizeStyles = {
    sm: 'px-2.5 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const variantStyles = {
    primary: `
      bg-blue-500 hover:bg-blue-600 text-white
      dark:bg-blue-600 dark:hover:bg-blue-700
      disabled:bg-blue-500/50 dark:disabled:bg-blue-600/50 
      disabled:hover:bg-blue-500/50 dark:disabled:hover:bg-blue-600/50 
      disabled:cursor-not-allowed
      focus:ring-blue-500
    `,
    secondary: `
      bg-slate-200 hover:bg-slate-300 text-slate-900
      dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-gray-200
      disabled:bg-slate-200/50 dark:disabled:bg-slate-700/50 
      disabled:hover:bg-slate-200/50 dark:disabled:hover:bg-slate-700/50 
      disabled:cursor-not-allowed
      focus:ring-slate-500
    `,
    danger: `
      bg-red-500 hover:bg-red-600 text-white
      dark:bg-red-600 dark:hover:bg-red-700
      disabled:bg-red-500/50 dark:disabled:bg-red-600/50
      disabled:hover:bg-red-500/50 dark:disabled:hover:bg-red-600/50
      disabled:cursor-not-allowed
      focus:ring-red-500
    `,
    'danger-outline': `
      border border-red-500/50 text-red-600 hover:bg-red-500/10
      dark:text-red-400 dark:hover:bg-red-500/20
      disabled:border-red-500/30 disabled:text-red-600/50 
      dark:disabled:text-red-400/50 disabled:hover:bg-transparent 
      disabled:cursor-not-allowed
      focus:ring-red-500
    `,
    success: `
      bg-green-500 hover:bg-green-600 text-white
      dark:bg-green-600 dark:hover:bg-green-700
      disabled:bg-green-500/50 dark:disabled:bg-green-600/50
      disabled:hover:bg-green-500/50 dark:disabled:hover:bg-green-600/50
      disabled:cursor-not-allowed
      focus:ring-green-500
    `,
    'success-outline': `
      border border-green-500/50 text-green-600 hover:bg-green-500/10
      dark:text-green-400 dark:hover:bg-green-500/20
      disabled:border-green-500/30 disabled:text-green-600/50 
      dark:disabled:text-green-400/50 disabled:hover:bg-transparent 
      disabled:cursor-not-allowed
      focus:ring-green-500
    `
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      title={title}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 