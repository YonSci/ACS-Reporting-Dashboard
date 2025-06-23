import React, { useState, useEffect, useMemo } from 'react';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, BookmarkIcon, PlusIcon, XMarkIcon } from './icons/MiniIcons';
import Button from './Button';
import { searchReports, filterReportsByDate, applyAdvancedFilters, saveFilterPreset, getFilterPresets, deleteFilterPreset } from '../utils/reportUtils';
import ReportCard from './ReportCard';

const ReportManagement = ({ reports, onFilteredReportsChange }) => {
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
    
    // Notify parent of filtered results
    onFilteredReportsChange(result);
    
    return result;
  }, [reports, searchTerm, dateRange, advancedFilters, onFilteredReportsChange]);

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
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <svg
            className="w-6 h-6 text-slate-950 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
            Reports
          </h2>
          <span className="ml-2 px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-950 dark:bg-blue-900 dark:text-blue-200">
            {reports.length} reports
          </span>
        </div>
        <p className="mt-2 text-slate-900 dark:text-gray-300 font-medium">
          Select a report to view its details and manage content
        </p>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            onSelect={handleReportSelect}
            isSelected={selectedReport?.id === report.id}
          />
        ))}
      </div>

      {selectedReport && (
        <div className="mt-6 p-4 rounded-lg bg-slate-100 dark:bg-gray-700 border-2 border-slate-300 dark:border-gray-600">
          <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">
            Selected Report Details
          </h3>
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

      <div className="space-y-4">
        {/* Search and Basic Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search reports..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-slate-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <div className="flex gap-4">
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
              className="rounded-lg bg-white/10 border border-slate-700 text-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
              className="rounded-lg bg-white/10 border border-slate-700 text-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <Button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            variant="secondary"
            className="flex items-center"
          >
            <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2" />
            {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
          </Button>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="bg-slate-800/50 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-200">Advanced Filters</h3>
              <Button
                onClick={handleAddFilterGroup}
                variant="secondary"
                size="sm"
                className="flex items-center"
              >
                <PlusIcon className="w-4 h-4 mr-1" />
                Add Filter Group
              </Button>
            </div>

            {advancedFilters.map((group, groupIndex) => (
              <div key={groupIndex} className="bg-slate-700/50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Filter Group {groupIndex + 1} (OR)</span>
                  <Button
                    onClick={() => handleAddCondition(groupIndex)}
                    variant="secondary"
                    size="sm"
                    className="flex items-center"
                  >
                    <PlusIcon className="w-4 h-4 mr-1" />
                    Add Condition
                  </Button>
                </div>

                {group.map((condition, conditionIndex) => (
                  <div key={conditionIndex} className="flex gap-2 items-center">
                    <select
                      value={condition.field}
                      onChange={(e) => handleUpdateCondition(groupIndex, conditionIndex, 'field', e.target.value)}
                      className="rounded-lg bg-white/10 border border-slate-600 text-gray-200 px-3 py-1.5"
                    >
                      <option value="title">Title</option>
                      <option value="description">Description</option>
                      <option value="status">Status</option>
                      <option value="budget">Budget</option>
                    </select>

                    <select
                      value={condition.operator}
                      onChange={(e) => handleUpdateCondition(groupIndex, conditionIndex, 'operator', e.target.value)}
                      className="rounded-lg bg-white/10 border border-slate-600 text-gray-200 px-3 py-1.5"
                    >
                      <option value="contains">Contains</option>
                      <option value="equals">Equals</option>
                      <option value="greaterThan">Greater Than</option>
                      <option value="lessThan">Less Than</option>
                    </select>

                    <input
                      type="text"
                      value={condition.value}
                      onChange={(e) => handleUpdateCondition(groupIndex, conditionIndex, 'value', e.target.value)}
                      className="flex-1 rounded-lg bg-white/10 border border-slate-600 text-gray-200 px-3 py-1.5"
                      placeholder="Value"
                    />

                    <Button
                      onClick={() => handleRemoveCondition(groupIndex, conditionIndex)}
                      variant="danger"
                      size="sm"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Filter Presets */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {filterPresets.map(preset => (
              <div key={preset.id} className="flex items-center gap-2 bg-slate-700/50 rounded-lg px-3 py-1.5">
                <button
                  onClick={() => handleLoadPreset(preset)}
                  className="text-gray-200 hover:text-blue-400 transition-colors"
                >
                  {preset.name}
                </button>
                <button
                  onClick={() => handleDeletePreset(preset.id)}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <Button
            onClick={() => setIsPresetModalOpen(true)}
            variant="secondary"
            size="sm"
            className="flex items-center"
          >
            <BookmarkIcon className="w-4 h-4 mr-1" />
            Save Current Filters
          </Button>
        </div>

        {/* Save Preset Modal */}
        {isPresetModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-lg p-6 w-96">
              <h3 className="text-lg font-semibold text-gray-200 mb-4">Save Filter Preset</h3>
              <input
                type="text"
                value={newPresetName}
                onChange={(e) => setNewPresetName(e.target.value)}
                placeholder="Preset name"
                className="w-full rounded-lg bg-white/10 border border-slate-600 text-gray-200 px-4 py-2 mb-4"
              />
              <div className="flex justify-end gap-2">
                <Button
                  onClick={() => setIsPresetModalOpen(false)}
                  variant="secondary"
                  size="sm"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSavePreset}
                  variant="primary"
                  size="sm"
                >
                  Save Preset
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="text-sm text-gray-400">
          Showing {filteredReports.length} of {reports.length} reports
        </div>
      </div>
    </div>
  );
};

export default ReportManagement; 