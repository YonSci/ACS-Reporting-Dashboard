import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  const renderPageNumbers = () => {
    if (totalPages <= 7) {
      return pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md transition-colors ${
            currentPage === page
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 bg-white dark:bg-slate-800 shadow-sm'
          }`}
        >
          {page}
        </button>
      ));
    }

    let pageButtons = [];
    if (currentPage <= 3) {
      pageButtons = [1, 2, 3, 4, '...', totalPages];
    } else if (currentPage >= totalPages - 2) {
      pageButtons = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      pageButtons = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }

    return pageButtons.map((page, index) => (
      <button
        key={index}
        onClick={() => page !== '...' && onPageChange(page)}
        disabled={page === '...'}
        className={`px-3 py-1 rounded-md transition-colors ${
          currentPage === page
            ? 'bg-blue-600 text-white shadow-sm'
            : page === '...'
            ? 'text-slate-500 dark:text-slate-400 cursor-default bg-transparent'
            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 bg-white dark:bg-slate-800 shadow-sm'
        }`}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-700 mt-4">
      <div className="flex items-center">
        <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
          Showing page <span className="text-blue-600 dark:text-blue-400">{currentPage}</span> of{' '}
          <span className="text-blue-600 dark:text-blue-400">{totalPages}</span>
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
        >
          Previous
        </button>
        <div className="flex gap-1">
          {renderPageNumbers()}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination; 