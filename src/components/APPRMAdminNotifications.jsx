import React, { useState, useEffect } from 'react';
import { apprmAPI } from '../lib/appwrite';

const APPRMAdminNotifications = ({ admin }) => {
  const [pendingCount, setPendingCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [pendingRecords, setPendingRecords] = useState([]);

  useEffect(() => {
    if (admin?.role === 'admin') {
      fetchPendingAPPRMData();
      // Set up polling for new APPRM submissions every 30 seconds
      const interval = setInterval(fetchPendingAPPRMData, 30000);
      return () => clearInterval(interval);
    }
  }, [admin]);

  const fetchPendingAPPRMData = async () => {
    try {
      const allData = await apprmAPI.getAllAPPRMData();
      const pending = allData.filter(record => record.status === 'pending');
      setPendingRecords(pending);
      setPendingCount(pending.length);
    } catch (error) {
      console.error('Failed to fetch pending APPRM data:', error);
    }
  };

  if (!admin?.role === 'admin' || pendingCount === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 transition-colors"
        title={`${pendingCount} pending APPRM submissions`}
      >
        {/* APPRM Icon - Globe with purple theme */}
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        
        {/* Notification Badge */}
        {pendingCount > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-purple-600 rounded-full animate-pulse">
            {pendingCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              🌍 Pending APPRM Data ({pendingCount})
            </h3>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {pendingRecords.map(record => (
              <div
                key={record.$id}
                className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer transition-colors"
                onClick={() => {
                  setShowNotifications(false);
                }}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {record.country} - {record.Year} {record.Quarter}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {Array.isArray(record.partnership) ? record.partnership.join(', ') : (record.partnership || 'No Partnership')}
                    </p>
                    <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                      {Array.isArray(record.deliverables) ? record.deliverables.length : 0} deliverables, 
                      {Array.isArray(record.outcomes) ? record.outcomes.length : 0} outcomes
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      Submitted {new Date(record.$createdAt || Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      )}
    </div>
  );
};

export default APPRMAdminNotifications; 