import React, { useState } from 'react';
import { CalendarDaysIcon, BanknotesIcon, BriefcaseIconC, GlobeAltIconC, UsersIconC, ChevronDownIcon, ChevronUpIcon, LinkIcon, SparklesIcon } from './icons/MiniIcons';
import { STRATEGIC_RESULT_AREAS } from '../constants';

const ReportCard = ({ report }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Format partnerships array to string
  const formattedPartnerships = Array.isArray(report.partnerships) 
    ? report.partnerships.join(', ')
    : report.partnerships;

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-950 dark:bg-green-900 dark:text-green-200 font-semibold';
      case 'in progress':
        return 'bg-blue-100 text-blue-950 dark:bg-blue-900 dark:text-blue-200 font-semibold';
      case 'pending':
        return 'bg-yellow-100 text-yellow-950 dark:bg-yellow-900 dark:text-yellow-200 font-semibold';
      default:
        return 'bg-gray-100 text-gray-950 dark:bg-gray-900 dark:text-gray-200 font-semibold';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-950 dark:text-red-400 font-semibold';
      case 'medium':
        return 'text-yellow-950 dark:text-yellow-400 font-semibold';
      case 'low':
        return 'text-green-950 dark:text-green-400 font-semibold';
      default:
        return 'text-gray-950 dark:text-gray-400 font-semibold';
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-slate-900 backdrop-blur-md shadow-xl rounded-lg p-5 hover:shadow-2xl transition-all duration-300 ease-in-out border-2 border-gray-200 dark:border-slate-700 hover:border-blue-500/50">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">{STRATEGIC_RESULT_AREAS[report.strategicResultArea] || report.strategicResultArea}</h3>
          {report.subStrategicResultArea && (
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 leading-relaxed">
              <span className="text-gray-600 dark:text-gray-400">Sub Strategic Result Area: </span>
              {report.subStrategicResultArea}
            </p>
          )}
        </div>
        <button
          onClick={toggleExpand}
          className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-1 ml-4"
          aria-label={isExpanded ? "Collapse details" : "Expand details"}
        >
          {isExpanded ? (
            <ChevronUpIcon className="w-5 h-5" />
          ) : (
            <ChevronDownIcon className="w-5 h-5" />
          )}
        </button>
      </div>
      
      {/* Basic Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-700 dark:text-gray-400">
          <GlobeAltIconC className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
          <span>Country:</span>
          <span className="font-medium text-gray-900 dark:text-gray-200 ml-1">{report.interventionCountry}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-700 dark:text-gray-400">
          <CalendarDaysIcon className="w-4 h-4 mr-2 text-yellow-600 dark:text-yellow-400" />
          <span>Year:</span>
          <span className="font-medium text-gray-900 dark:text-gray-200 ml-1">{report.year}</span>
        </div>

        <div className="flex items-center text-sm text-gray-700 dark:text-gray-400">
          <UsersIconC className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
          <span>Partnerships:</span>
          <span className="font-medium text-gray-900 dark:text-gray-200 ml-1">{formattedPartnerships}</span>
        </div>

        {report.sdgContribution && (
          <div className="flex items-center text-sm text-gray-700 dark:text-gray-400">
            <SparklesIcon className="w-4 h-4 mr-2 text-amber-600 dark:text-amber-400" />
            <span>SDG:</span>
            <span className="font-medium text-gray-900 dark:text-gray-200 ml-1">{report.sdgContribution}</span>
          </div>
        )}
        
        {report.supportingLinks && (
          <div className="flex items-center text-sm text-gray-700 dark:text-gray-400">
            <LinkIcon className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
            <span>Links:</span>
            <a 
              href={report.supportingLinks} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-medium text-blue-600 dark:text-blue-400 ml-1 hover:text-blue-700 dark:hover:text-blue-300 truncate max-w-[200px]"
            >
              View Source
            </a>
          </div>
        )}
      </div>

      {/* Expandable Details Section */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out`}
        style={{ maxHeight: isExpanded ? '500px' : '0px' }}
      >
        <div className="border-t border-gray-200 dark:border-slate-600 pt-4">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200 mb-3">Project Details:</h4>
          {Array.isArray(report.details) && report.details.length > 0 ? (
            <ul className="list-none space-y-2">
              {report.details.map((detail, index) => (
                <li key={index} className="flex items-baseline text-sm">
                  <span className="text-blue-700 dark:text-blue-400 mr-2">{toRomanNumeral(index + 1)}.</span>
                  <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-700 dark:text-gray-300">No details available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to convert numbers to Roman numerals
const toRomanNumeral = (num) => {
  const romanNumerals = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];
  return romanNumerals[num - 1] || num.toString();
};

export default ReportCard; 