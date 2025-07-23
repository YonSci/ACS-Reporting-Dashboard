import React, { useState, useEffect } from 'react';
import { reportsAPI } from '../lib/appwrite';

const AdminNotifications = ({ admin, onNotificationClick }) => {
  const [pendingCount, setPendingCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [pendingReports, setPendingReports] = useState([]);

  useEffect(() => {
    if (admin?.role === 'admin') {
      fetchPendingReports();
      // Set up polling for new reports every 30 seconds
      const interval = setInterval(fetchPendingReports, 30000);
      return () => clearInterval(interval);
    }
  }, [admin]);

  const fetchPendingReports = async () => {
    try {
      const allReports = await reportsAPI.getAllReports();
      const pending = allReports.filter(report => report.status === 'pending_approval');
      setPendingReports(pending);
      setPendingCount(pending.length);
    } catch (error) {
      console.error('Failed to fetch pending reports:', error);
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
        className="relative p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        title={`${pendingCount} pending reports`}
      >
        {/* Bell Icon */}
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM5.07 7A7.002 7.002 0 0119 7v4.07L21 13v1H3v-1l2-1.93V7z" />
        </svg>
        
        {/* Notification Badge */}
        {pendingCount > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full animate-pulse">
            {pendingCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              📋 Pending Reports ({pendingCount})
            </h3>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {pendingReports.map(report => (
              <div
                key={report.$id}
                className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                onClick={() => {
                  setShowNotifications(false);
                  onNotificationClick && onNotificationClick();
                }}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {report.strategicResultArea}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {report.interventionCountry} • {report.year}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      Submitted {new Date(report.$createdAt || Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-700">
            <button
              onClick={() => {
                setShowNotifications(false);
                onNotificationClick && onNotificationClick();
              }}
              className="w-full px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              View All in Data Management
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotifications; 