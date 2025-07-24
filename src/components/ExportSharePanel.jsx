import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { convertToCSV, downloadCSV, generateShareableLink, exportToExcel, exportToPDF } from '../utils/exportUtils';
import Button from './Button';
import { ArrowDownTrayIcon, ShareIcon, DocumentDuplicateIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../utils/themeContext';

const ExportSharePanel = ({ reports, filters, selectedCountries }) => {
  // Add null checking for reports
  const safeReports = reports || [];
  console.log('📤 ExportSharePanel received reports:', safeReports.length);
  
  // Utility function to detect report type
  const detectReportType = (reportsArray) => {
    return reportsArray.length > 0 && 
      (reportsArray[0].hasOwnProperty('year') && reportsArray[0].hasOwnProperty('quarter')) || 
      (reportsArray[0].hasOwnProperty('Year') && reportsArray[0].hasOwnProperty('Quarter'))
      ? 'apprm' : 'strategic';
  };

  // Filter reports based on current filters
  const filteredReports = safeReports.filter(report => {
    // Check if this is APPRM data or Strategic Result Area data using utility function
    const isAPPRMData = detectReportType([report]) === 'apprm';
    
         if (isAPPRMData) {
       // APPRM filtering logic
       const countryMatch = !filters.country || report.country === filters.country;
       const yearMatch = !filters.year || (report.year || report.Year)?.toString() === filters.year;
       const quarterMatch = !filters.quarter || (report.quarter || report.Quarter) === filters.quarter;
      const partnershipMatch = !filters.partnership || 
        (Array.isArray(report.partnerships) ? 
          report.partnerships.includes(filters.partnership) : 
          report.partnership === filters.partnership);
      
      return countryMatch && yearMatch && quarterMatch && partnershipMatch;
    } else {
      // Strategic Result Area filtering logic
      const sraMatch = !filters.strategicResultArea || report.strategicResultArea === filters.strategicResultArea;
      
      let refinedSubSraMatch = true;
      if (filters.subStrategicResultArea) {
        refinedSubSraMatch = report.subStrategicResultArea === filters.subStrategicResultArea;
      }

      const countryMatch = !filters.interventionCountries || filters.interventionCountries.length === 0 || 
        filters.interventionCountries.includes(report.interventionCountry);
      
      const partnershipMatch = !filters.partnership || 
        (Array.isArray(report.partnerships) ? 
          report.partnerships.includes(filters.partnership) : 
          report.partnerships === filters.partnership);
      
      return sraMatch && refinedSubSraMatch && countryMatch && partnershipMatch;
    }
  });

  // Determine which reports to export (filtered if filters are applied, all if no filters)
  const reportsToExport = Object.values(filters).some(value => value && value.length > 0) ? filteredReports : safeReports;
  const { isDark } = useTheme();
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [exportError, setExportError] = useState(null);

  // Close dialogs on escape key or outside click
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowShareDialog(false);
        setShowExportOptions(false);
      }
    };
    const handleClickOutside = (e) => {
      if (!e.target.closest('.export-options')) {
        setShowExportOptions(false);
      }
    };
    if (showShareDialog || showExportOptions) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showShareDialog, showExportOptions]);

  const handleExportCSV = () => {
    // Detect report type based on the data structure
    const reportType = detectReportType(reportsToExport);
    
    console.log('🎯 Detected report type for CSV export:', reportType);
    const csvContent = convertToCSV(reportsToExport, reportType);
    const timestamp = new Date().toISOString().split('T')[0];
    const filePrefix = reportType === 'apprm' ? 'ACS-apprm-report' : 'ACS-sra-report';
    downloadCSV(csvContent, `${filePrefix}-${timestamp}.csv`);
    setShowExportOptions(false);
  };

  const handleExportExcel = () => {
    // Detect report type based on the data structure
    const reportType = detectReportType(reportsToExport);
    
    console.log('🎯 Detected report type for Excel export:', reportType);
    exportToExcel(reportsToExport, reportType);
    setShowExportOptions(false);
  };

  const handleExportPDF = async () => {
    try {
      setExportError(null);
      
      // Detect report type based on the data structure
      const reportType = detectReportType(reportsToExport);
      
      console.log('🎯 Detected report type for PDF export:', reportType);
      await exportToPDF(reportsToExport, reportType);
      setShowExportOptions(false);
    } catch (error) {
      console.error('PDF Export Error:', error);
      setExportError(error.message);
      // Clear error after 5 seconds
      setTimeout(() => setExportError(null), 5000);
    }
  };

  const handleShare = () => {
    setShowShareDialog(true);
  };

  const handleCopyLink = async () => {
    const shareableLink = generateShareableLink(filters, selectedCountries);
    try {
      await navigator.clipboard.writeText(shareableLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const ShareDialog = () => (
    <div className="fixed inset-0 flex items-start justify-center" style={{ zIndex: 999999 }}>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setShowShareDialog(false)}
        style={{ zIndex: 999998 }}
      />
      
      {/* Dialog */}
      <div className={`relative mt-32 w-[32rem] ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-lg shadow-xl p-4`} style={{ zIndex: 999999 }}>
        <div className="flex justify-between items-center mb-3">
          <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'} flex items-center`}>
            <ShareIcon className="w-5 h-5 mr-2 text-blue-400" />
            Share View
          </h3>
          <button
            onClick={() => setShowShareDialog(false)}
            className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'} transition-colors`}
            title="Close dialog"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-3">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Share this link to show the current view with all selected filters:
          </p>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={generateShareableLink(filters, selectedCountries)}
                readOnly
                className={`w-full ${isDark ? 'bg-slate-900 border-slate-700 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700'} border rounded px-3 py-2 text-sm pr-24`}
              />
              <Button
                onClick={handleCopyLink}
                variant={copySuccess ? "success" : "primary"}
                className="absolute right-1 top-1 bottom-1 flex items-center px-3"
                title="Copy link to clipboard"
              >
                <DocumentDuplicateIcon className="w-4 h-4 mr-1" />
                {copySuccess ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
          
          <div className={`mt-4 pt-3 border-t ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
            <h4 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Included in this view:</h4>
            <ul className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} space-y-1`}>
              <li className="flex items-center">
                <span className="w-4 h-4 rounded-full bg-blue-500/20 border border-blue-500/40 mr-2 flex-shrink-0" />
                {reportsToExport.length} {Object.values(filters).some(value => value && value.length > 0) ? 'filtered' : 'total'} reports
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 rounded-full bg-green-500/20 border border-green-500/40 mr-2 flex-shrink-0" />
                {selectedCountries.size} selected {selectedCountries.size === 1 ? 'country' : 'countries'}
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 rounded-full bg-purple-500/20 border border-purple-500/40 mr-2 flex-shrink-0" />
                {Object.values(filters).filter(f => f && f.length > 0).length} active filters
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="relative export-options">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Button
              onClick={() => setShowExportOptions(!showExportOptions)}
              variant="primary"
              className="flex items-center px-4 py-2 text-sm"
              title="Export filtered reports"
            >
              <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
              Export
              <ChevronDownIcon className="w-4 h-4 ml-1" />
              <span className="ml-1 text-xs text-blue-200">
                ({safeReports.length})
              </span>
            </Button>
            {showExportOptions && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 py-1 z-50">
                <button
                  onClick={handleExportCSV}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  Export as CSV
                </button>
                <button
                  onClick={handleExportExcel}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  Export as Excel
                </button>
                <button
                  onClick={handleExportPDF}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  Export as PDF
                </button>
              </div>
            )}
          </div>
          <Button
            onClick={handleShare}
            variant="secondary"
            className="flex items-center px-4 py-2 text-sm"
            title="Share current view with filters"
          >
            <ShareIcon className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
        
        {/* Error Message */}
        {exportError && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-3 shadow-lg z-50">
            <p className="text-sm text-red-600 dark:text-red-400">
              {exportError}
            </p>
          </div>
        )}
      </div>

      {/* Share Dialog Portal */}
      {showShareDialog && createPortal(
        <ShareDialog />,
        document.body
      )}
    </>
  );
};

export default ExportSharePanel; 