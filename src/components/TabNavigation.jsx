import React from 'react';

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'strategic-reports',
      label: 'Strategic Result Area Reports',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: 'apprm-reports',
      label: 'APPRM Reports',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md shadow-2xl rounded-xl p-1 mb-3">
      <div className="flex space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center space-x-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200
              ${activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              }
            `}
          >
            <span className={`transition-colors duration-200 ${
              activeTab === tab.id ? 'text-white' : 'text-gray-500 dark:text-gray-400'
            }`}>
              {tab.icon}
            </span>
            <span className="whitespace-nowrap">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation; 