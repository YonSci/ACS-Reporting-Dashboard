import React, { useState, useEffect } from 'react';
import { FunnelIcon, ChevronDownIcon } from './icons/MiniIcons';

const ReportManagement = ({ reports }) => {
  const [filters, setFilters] = useState({
    strategicResultArea: '',
    subStrategicResultArea: '',
    interventionCountries: [],
    partnership: ''
  });

  return (
    <div className="p-6">
      {/* Filter Header */}
      <div className="flex items-center gap-2 mb-6">
        <FunnelIcon className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold">
          Filter Reports
          <span className="ml-2 text-sm text-gray-500">(1 active)</span>
        </h2>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Strategic Result Area */}
        <div>
          <label className="flex items-center gap-2 mb-2 text-sm font-medium">
            <span className="text-blue-500">☰</span>
            Strategic Result Area
          </label>
          <div className="relative">
            <select
              value={filters.strategicResultArea}
              onChange={(e) => setFilters(prev => ({ ...prev, strategicResultArea: e.target.value }))}
              className="w-full p-2 border rounded-lg pr-10 appearance-none bg-white"
            >
              <option value="">All Strategic Result Areas</option>
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Sub Strategic Result Area */}
        <div>
          <label className="flex items-center gap-2 mb-2 text-sm font-medium">
            <span className="text-blue-500">☰</span>
            Sub Strategic Result Area
          </label>
          <div className="relative">
            <select
              value={filters.subStrategicResultArea}
              onChange={(e) => setFilters(prev => ({ ...prev, subStrategicResultArea: e.target.value }))}
              className="w-full p-2 border rounded-lg pr-10 appearance-none bg-white"
            >
              <option value="">All Sub Categories</option>
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Intervention Countries */}
        <div>
          <label className="flex items-center gap-2 mb-2 text-sm font-medium">
            <span className="text-green-500">🌍</span>
            Intervention Countries
          </label>
          <div className="relative">
            <select
              value={filters.interventionCountries}
              onChange={(e) => setFilters(prev => ({ ...prev, interventionCountries: e.target.value }))}
              className="w-full p-2 border rounded-lg pr-10 appearance-none bg-white"
            >
              <option value="">All Countries</option>
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Partnership */}
        <div>
          <label className="flex items-center gap-2 mb-2 text-sm font-medium">
            <span className="text-purple-500">🤝</span>
            Partnership
          </label>
          <div className="relative">
            <select
              value={filters.partnership}
              onChange={(e) => setFilters(prev => ({ ...prev, partnership: e.target.value }))}
              className="w-full p-2 border rounded-lg pr-10 appearance-none bg-white"
            >
              <option value="">All Partnerships</option>
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2 mt-6">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <span>Export</span>
          <span className="text-sm">(109)</span>
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
          Share
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Import Data
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Clear All
        </button>
      </div>
    </div>
  );
};

export default ReportManagement; 