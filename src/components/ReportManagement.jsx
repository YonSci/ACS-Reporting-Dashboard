import React, { useState, useEffect, useMemo } from 'react';
import { FunnelIcon, XCircleIcon, ListBulletIcon, ChevronDownIcon, ChevronUpIcon } from './icons/MiniIcons';
import Button from './Button';
import { searchReports, filterReportsByDate, applyAdvancedFilters, saveFilterPreset, getFilterPresets, deleteFilterPreset } from '../utils/reportUtils';
import ReportCard from './ReportCard';

const ReportManagement = ({ reports, isLoading, error }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const [advancedFilters, setAdvancedFilters] = useState([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filterPresets, setFilterPresets] = useState([]);
  const [isPresetModalOpen, setIsPresetModalOpen] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  // Load saved presets on mount
  useEffect(() => {
    const savedPresets = getFilterPresets();
    setFilterPresets(savedPresets);
  }, []);

  // Apply all filters and search
  const filteredReports = useMemo(() => {
    let result = reports;
    
    // Apply search
    result = searchReports(result, searchTerm);
    
    // Apply date filters
    result = filterReportsByDate(result, dateRange.startDate, dateRange.endDate);
    
    // Apply advanced filters
    result = applyAdvancedFilters(result, advancedFilters);
    
    return result;
  }, [reports, searchTerm, dateRange, advancedFilters]);

  if (isLoading) {
    return (
      <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg border-2 border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-300">Loading reports...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg border-2 border-gray-200 dark:border-gray-700">
        <div className="text-center text-red-600 dark:text-red-400">
          <h3 className="text-lg font-semibold mb-2">Error Loading Reports</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const handleAddFilterGroup = () => {
    setAdvancedFilters(prev => [...prev, []]);
  };

  const handleAddCondition = (groupIndex) => {
    setAdvancedFilters(prev => {
      const newFilters = [...prev];
      newFilters[groupIndex] = [...newFilters[groupIndex], {
        field: 'title',
        operator: 'contains',
        value: ''
      }];
      return newFilters;
    });
  };

  const handleRemoveCondition = (groupIndex, conditionIndex) => {
    setAdvancedFilters(prev => {
      const newFilters = [...prev];
      newFilters[groupIndex] = newFilters[groupIndex].filter((_, i) => i !== conditionIndex);
      if (newFilters[groupIndex].length === 0) {
        return newFilters.filter((_, i) => i !== groupIndex);
      }
      return newFilters;
    });
  };

  const handleUpdateCondition = (groupIndex, conditionIndex, field, value) => {
    setAdvancedFilters(prev => {
      const newFilters = [...prev];
      newFilters[groupIndex][conditionIndex] = {
        ...newFilters[groupIndex][conditionIndex],
        [field]: value
      };
      return newFilters;
    });
  };

  const handleSavePreset = () => {
    if (!newPresetName.trim()) return;

    const newPreset = {
      name: newPresetName,
      filters: {
        searchTerm,
        dateRange,
        advancedFilters
      }
    };

    const updatedPresets = saveFilterPreset(newPreset);
    setFilterPresets(updatedPresets);
    setNewPresetName('');
    setIsPresetModalOpen(false);
  };

  const handleLoadPreset = (preset) => {
    setSearchTerm(preset.filters.searchTerm);
    setDateRange(preset.filters.dateRange);
    setAdvancedFilters(preset.filters.advancedFilters);
  };

  const handleDeletePreset = (presetId) => {
    const updatedPresets = deleteFilterPreset(presetId);
    setFilterPresets(updatedPresets);
  };

  const handleReportSelect = (report) => {
    setSelectedReport(report.id === selectedReport?.id ? null : report);
  };

  return (
    <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg border-2 border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <ListBulletIcon className="w-6 h-6 text-slate-950 dark:text-gray-300" />
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
            Reports
          </h2>
          <span className="ml-2 px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-950 dark:bg-blue-900 dark:text-blue-200">
            {reports.length} reports
          </span>
        </div>
      </div>

      {/* Search and Basic Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[300px]">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search reports..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-slate-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
        
        <div className="flex gap-4">
          <input
            type="date"
            value={dateRange.startDate}
            onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
            className="px-4 py-2 rounded-lg bg-white/10 border border-slate-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="date"
            value={dateRange.endDate}
            onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
            className="px-4 py-2 rounded-lg bg-white/10 border border-slate-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="mb-6">
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center gap-2 text-slate-900 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
        >
          <FunnelIcon className="w-5 h-5" />
          Advanced Filters
          {showAdvancedFilters ? (
            <ChevronUpIcon className="w-4 h-4" />
          ) : (
            <ChevronDownIcon className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            onSelect={handleReportSelect}
            isSelected={selectedReport?.id === report.id}
          />
        ))}
      </div>

      {/* Report Selection Instructions */}
      <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-slate-700/50 border border-blue-100 dark:border-slate-600">
        <p className="text-slate-900 dark:text-gray-300 font-medium">
          Select a report from the list above to view its details and manage content
        </p>
      </div>

      {/* Selected Report Details */}
      {selectedReport && (
        <div className="mt-6 p-4 rounded-lg bg-slate-100 dark:bg-gray-700 border-2 border-slate-300 dark:border-gray-600">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-slate-950 dark:text-white">
              Selected Report Details
            </h3>
            <button
              onClick={() => setSelectedReport(null)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <XCircleIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="space-y-2">
            <p className="text-slate-900 dark:text-gray-300 font-medium">
              <span className="font-bold">Title:</span> {selectedReport.title}
            </p>
            <p className="text-slate-900 dark:text-gray-300 font-medium">
              <span className="font-bold">Description:</span>{' '}
              {selectedReport.description}
            </p>
            <p className="text-slate-900 dark:text-gray-300 font-medium">
              <span className="font-bold">Status:</span> {selectedReport.status}
            </p>
            <p className="text-slate-900 dark:text-gray-300 font-medium">
              <span className="font-bold">Priority:</span>{' '}
              {selectedReport.priority}
            </p>
            <p className="text-slate-900 dark:text-gray-300 font-medium">
              <span className="font-bold">Progress:</span>{' '}
              {selectedReport.progress}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportManagement; 