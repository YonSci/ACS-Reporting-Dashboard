import React, { useState, useEffect } from 'react';
import { convertToCSV, downloadCSV, generateShareableLink } from '../utils/exportUtils';
import Button from './Button';
import { ArrowDownTrayIcon, ShareIcon, DocumentDuplicateIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ExportSharePanel = ({ reports, filters, selectedCountries }) => {
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Close dialog on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowShareDialog(false);
      }
    };
    if (showShareDialog) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showShareDialog]);

  const handleExportCSV = () => {
    const csvContent = convertToCSV(reports);
    const timestamp = new Date().toISOString().split('T')[0];
    downloadCSV(csvContent, `african-development-reports-${timestamp}.csv`);
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

  return (
    <>
      <div className="relative">
        <div className="flex items-center gap-2">
          <Button
            onClick={handleExportCSV}
            variant="primary"
            className="flex items-center px-4 py-2 text-sm"
            title="Export filtered reports as CSV"
          >
            <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
            Export
            <span className="ml-1 text-xs text-blue-200">
              ({reports.length})
            </span>
          </Button>
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
      </div>

      {/* Share Dialog Portal */}
      {showShareDialog && (
        <div className="fixed inset-0 flex items-start justify-center z-[9999]">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowShareDialog(false)}
          />
          
          {/* Dialog */}
          <div className="relative mt-20 w-[32rem] bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-200 flex items-center">
                <ShareIcon className="w-5 h-5 mr-2 text-blue-400" />
                Share View
              </h3>
              <button
                onClick={() => setShowShareDialog(false)}
                className="text-gray-400 hover:text-gray-300 transition-colors"
                title="Close dialog"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-gray-400">
                Share this link to show the current view with all selected filters:
              </p>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={generateShareableLink(filters, selectedCountries)}
                    readOnly
                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-gray-300 pr-24"
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
              
              <div className="mt-4 pt-3 border-t border-slate-700">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Included in this view:</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li className="flex items-center">
                    <span className="w-4 h-4 rounded-full bg-blue-500/20 border border-blue-500/40 mr-2 flex-shrink-0" />
                    {reports.length} filtered reports
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
      )}
    </>
  );
};

export default ExportSharePanel; 