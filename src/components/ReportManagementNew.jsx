import React, { useState, useEffect, useMemo } from 'react';
import { ChartBarIcon, GlobeAltIcon, BriefcaseIcon, FunnelIcon, XCircleIcon } from './icons/MiniIcons';
import Button from './Button';
import { searchReports, filterReportsByDate, applyAdvancedFilters, saveFilterPreset, getFilterPresets, deleteFilterPreset } from '../utils/reportUtils';
import ReportCard from './ReportCard';

const ReportManagement = ({ reports = [], onFilteredReportsChange = () => {} }) => {
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
          <BriefcaseIcon className="w-6 h-6 text-slate-950 dark:text-gray-300" />
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
              <ChartBarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <div className="flex gap-4">
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
              className="px-4 py-2 rounded-lg bg-white/10 border border-slate-700 text-gray-200"
            />
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
              className="px-4 py-2 rounded-lg bg-white/10 border border-slate-700 text-gray-200"
            />
          </div>
        </div>

        {/* Advanced Filters */}
        <div>
          <Button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            variant="secondary"
            className="flex items-center"
          >
            <FunnelIcon className="w-5 h-5 mr-2" />
            {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
          </Button>

          {showAdvancedFilters && (
            <div className="mt-4 space-y-4">
              {advancedFilters.map((group, groupIndex) => (
                <div key={groupIndex} className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                  <div className="space-y-2">
                    {group.map((condition, conditionIndex) => (
                      <div key={conditionIndex} className="flex items-center gap-2">
                        <select
                          value={condition.field}
                          onChange={(e) => handleUpdateCondition(groupIndex, conditionIndex, 'field', e.target.value)}
                          className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600"
                        >
                          <option value="title">Title</option>
                          <option value="description">Description</option>
                          <option value="status">Status</option>
                        </select>

                        <select
                          value={condition.operator}
                          onChange={(e) => handleUpdateCondition(groupIndex, conditionIndex, 'operator', e.target.value)}
                          className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600"
                        >
                          <option value="contains">Contains</option>
                          <option value="equals">Equals</option>
                          <option value="startsWith">Starts with</option>
                        </select>

                        <input
                          type="text"
                          value={condition.value}
                          onChange={(e) => handleUpdateCondition(groupIndex, conditionIndex, 'value', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600"
                          placeholder="Value"
                        />

                        <Button
                          onClick={() => handleRemoveCondition(groupIndex, conditionIndex)}
                          variant="danger"
                          size="sm"
                        >
                          <XCircleIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-2">
                    <Button
                      onClick={() => handleAddCondition(groupIndex)}
                      variant="secondary"
                      size="sm"
                    >
                      Add Condition
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                onClick={handleAddFilterGroup}
                variant="secondary"
              >
                Add Filter Group
              </Button>
            </div>
          )}
        </div>

        {/* Filter Presets */}
        <div className="flex flex-wrap gap-2">
          {filterPresets.map((preset) => (
            <div
              key={preset.id}
              className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full"
            >
              <button
                onClick={() => handleLoadPreset(preset)}
                className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              >
                {preset.name}
              </button>
              <button
                onClick={() => handleDeletePreset(preset.id)}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <XCircleIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
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

        {/* Selected Report Details */}
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
      </div>
    </div>
  );
};

export default ReportManagement; 