import React, { useEffect, useState } from 'react';
import { reportsAPI } from '../lib/appwrite';

function EnhancedDataManagement({ isOpen, onClose, admin }) {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState('reportIndex');
  const [sortDirection, setSortDirection] = useState('asc');
  const [expandedRows, setExpandedRows] = useState(new Set());

  useEffect(() => {
    if (isOpen) {
      fetchReports();
    }
    // eslint-disable-next-line
  }, [isOpen]);

  async function fetchReports() {
    setLoading(true);
    setError(null);
    try {
      const data = await reportsAPI.getAllReports();
      setReports(data);
    } catch (err) {
      setError('Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  }

  // Helper function to get user display name
  const getUserDisplayName = (report) => {
    // For submitted reports (pending), show the submitter
    if (report.status === 'pending_approval') {
      if (report.createdByUsername) return report.createdByUsername; // Existing reports
      
      // For new reports, try to identify the submitter by createdBy ID
      if (report.createdBy && report.createdBy !== 'system') {
        // If it's the current admin's ID, show admin name
        if (report.createdBy === admin?.$id) {
          return admin?.fullName || admin?.username || admin?.email || 'Admin';
        }
        return 'User'; // Other user
      }
      return 'System'; // System submitted
    }
    
    // For approved reports, show the current admin as approver
    if (report.status === 'approved') {
      return admin?.fullName || admin?.username || admin?.email || 'Admin';
    }
    
    return 'System'; // Default
  };

  // Sorting function
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Toggle row expansion
  const toggleRowExpansion = (reportId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(reportId)) {
      newExpanded.delete(reportId);
    } else {
      newExpanded.add(reportId);
    }
    setExpandedRows(newExpanded);
  };

  // Helper function to convert index to Roman numeral
  const toRomanNumeral = (num) => {
    const romanNumerals = [
      { value: 1000, symbol: 'm' },
      { value: 900, symbol: 'cm' },
      { value: 500, symbol: 'd' },
      { value: 400, symbol: 'cd' },
      { value: 100, symbol: 'c' },
      { value: 90, symbol: 'xc' },
      { value: 50, symbol: 'l' },
      { value: 40, symbol: 'xl' },
      { value: 10, symbol: 'x' },
      { value: 9, symbol: 'ix' },
      { value: 5, symbol: 'v' },
      { value: 4, symbol: 'iv' },
      { value: 1, symbol: 'i' }
    ];
    
    let result = '';
    for (const { value, symbol } of romanNumerals) {
      const count = Math.floor(num / value);
      if (count) {
        result += symbol.repeat(count);
        num -= value * count;
      }
    }
    return result;
  };

  // Filtering and sorting logic
  const filteredAndSortedReports = reports
    .filter(report =>
      (!search ||
        (report.details && report.details.join(' ').toLowerCase().includes(search.toLowerCase())) ||
        (report.strategicResultArea && report.strategicResultArea.toLowerCase().includes(search.toLowerCase())) ||
        (report.subStrategicResultArea && report.subStrategicResultArea.toLowerCase().includes(search.toLowerCase())) ||
        (report.interventionCountry && report.interventionCountry.toLowerCase().includes(search.toLowerCase()))
      ) &&
      (!userFilter || getUserDisplayName(report) === userFilter) &&
      (!statusFilter || report.status === statusFilter)
    )
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortField) {
        case 'strategicResultArea':
          aValue = a.strategicResultArea || '';
          bValue = b.strategicResultArea || '';
          break;
        case 'subStrategicResultArea':
          aValue = a.subStrategicResultArea || '';
          bValue = b.subStrategicResultArea || '';
          break;
        case 'interventionCountry':
          aValue = a.interventionCountry || '';
          bValue = b.interventionCountry || '';
          break;
        case 'year':
          aValue = a.year || 0;
          bValue = b.year || 0;
          break;
        case 'status':
          aValue = a.status || '';
          bValue = b.status || '';
          break;
        case 'user':
          aValue = getUserDisplayName(a);
          bValue = getUserDisplayName(b);
          break;
        default:
          aValue = a.reportIndex || 0;
          bValue = b.reportIndex || 0;
      }

      if (typeof aValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      } else {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
    });

  // Get unique users
  const uniqueUsers = [...new Set(reports.map(r => getUserDisplayName(r)).filter(Boolean))];

  // Counts
  const totalReports = reports.length;
  const pendingCount = reports.filter(r => r.status === 'pending_approval').length;
  const approvedCount = reports.filter(r => r.status === 'approved').length;
  const draftCount = reports.filter(r => r.status === 'draft').length;
  const needsApprovalCount = pendingCount; // Only pending approval reports need approval

  async function handleStatusUpdate(reportId, newStatus) {
    try {
      console.log(`🔄 Updating report ${reportId} to status: ${newStatus}`);
      console.log('Admin object:', admin);
      
      setLoading(true);
      setError(null);
      
      await reportsAPI.updateReportStatus(reportId, newStatus, admin);
      console.log(`✅ Successfully updated report ${reportId} to ${newStatus}`);
      
      await fetchReports(); // Refresh the list
    } catch (err) {
      console.error(`❌ Failed to update report ${reportId}:`, err);
      setError(`Failed to update report: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(reportId) {
    if (confirm('Are you sure you want to delete this report?')) {
      await reportsAPI.deleteReport(reportId);
      await fetchReports();
    }
  }

  async function handleBulkApproveAll() {
    if (confirm(`Are you sure you want to approve ALL ${needsApprovalCount} reports? This will make them visible on the dashboard.`)) {
      setLoading(true);
      setError(null);
      try {
        // Get all non-approved reports (draft + pending_approval)
        const nonApprovedReports = reports.filter(r => r.status !== 'approved');
        console.log(`🚀 Bulk approving ${nonApprovedReports.length} reports...`);
        
        // Update each report to approved
        console.log('👤 Admin info for approval:', admin);
        for (let i = 0; i < nonApprovedReports.length; i++) {
          const report = nonApprovedReports[i];
          console.log(`✅ Approving report ${i + 1}/${nonApprovedReports.length}: ${report.$id} (was: ${report.status})`);
          try {
            await reportsAPI.updateReportStatus(report.$id, 'approved', admin);
          } catch (reportErr) {
            console.error(`❌ Failed to approve report ${report.$id}:`, reportErr);
          }
        }
        
        console.log('🎉 Bulk approval completed!');
        await fetchReports(); // Refresh the list
      } catch (err) {
        console.error('❌ Error during bulk approval:', err);
        setError(`Failed to bulk approve reports: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Management</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Total Reports:</span> {totalReports}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Pending Approval:</span> {pendingCount}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Approved:</span> {approvedCount}
              </div>
            </div>
            {needsApprovalCount > 0 && (
              <button
                onClick={handleBulkApproveAll}
                disabled={loading}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded font-semibold transition-colors"
              >
                {loading ? 'Approving...' : `Approve All (${needsApprovalCount})`}
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-4 mb-4">
            <input
              type="text"
              placeholder="Search details or area..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border rounded px-3 py-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <select 
              value={userFilter} 
              onChange={e => setUserFilter(e.target.value)} 
              className="border rounded px-3 py-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">All Users</option>
              {uniqueUsers.map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
            <select 
              value={statusFilter} 
              onChange={e => setStatusFilter(e.target.value)} 
              className="border rounded px-3 py-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">All Statuses</option>
              <option value="pending_approval">Pending Approval</option>
              <option value="approved">Approved</option>
            </select>
          </div>
          
          {loading ? (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">Loading...</div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 dark:border-gray-700">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="p-2 border border-gray-200 dark:border-gray-600 text-left w-8">
                      <span className="text-xs text-gray-600 dark:text-gray-400">Details</span>
                    </th>
                    <th 
                      className="p-2 border border-gray-200 dark:border-gray-600 text-left cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                      onClick={() => handleSort('strategicResultArea')}
                    >
                      <div className="flex items-center gap-1">
                        Strategic Area
                        {sortField === 'strategicResultArea' && (
                          <span className="text-xs">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="p-2 border border-gray-200 dark:border-gray-600 text-left cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                      onClick={() => handleSort('subStrategicResultArea')}
                    >
                      <div className="flex items-center gap-1">
                        Sub Area
                        {sortField === 'subStrategicResultArea' && (
                          <span className="text-xs">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="p-2 border border-gray-200 dark:border-gray-600 text-left cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                      onClick={() => handleSort('interventionCountry')}
                    >
                      <div className="flex items-center gap-1">
                        Country
                        {sortField === 'interventionCountry' && (
                          <span className="text-xs">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="p-2 border border-gray-200 dark:border-gray-600 text-left cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                      onClick={() => handleSort('year')}
                    >
                      <div className="flex items-center gap-1">
                        Year
                        {sortField === 'year' && (
                          <span className="text-xs">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="p-2 border border-gray-200 dark:border-gray-600 text-left cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center gap-1">
                        Status
                        {sortField === 'status' && (
                          <span className="text-xs">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="p-2 border border-gray-200 dark:border-gray-600 text-left cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                      onClick={() => handleSort('user')}
                    >
                      <div className="flex items-center gap-1">
                        User
                        {sortField === 'user' && (
                          <span className="text-xs">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th className="p-2 border border-gray-200 dark:border-gray-600 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedReports.map(report => (
                    <>
                      <tr key={report.$id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                        <td className="p-2 border border-gray-200 dark:border-gray-600">
                          <button
                            onClick={() => toggleRowExpansion(report.$id)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                            title={expandedRows.has(report.$id) ? "Hide details" : "Show details"}
                          >
                            {expandedRows.has(report.$id) ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            )}
                          </button>
                        </td>
                        <td className="p-2 border border-gray-200 dark:border-gray-600">{report.strategicResultArea}</td>
                      <td className="p-2 border border-gray-200 dark:border-gray-600">{report.subStrategicResultArea}</td>
                      <td className="p-2 border border-gray-200 dark:border-gray-600">{report.interventionCountry}</td>
                      <td className="p-2 border border-gray-200 dark:border-gray-600">{report.year}</td>
                      <td className="p-2 border border-gray-200 dark:border-gray-600">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          report.status === 'approved' ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300' :
                          report.status === 'pending_approval' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                          'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="p-2 border border-gray-200 dark:border-gray-600">
                        <span className="text-sm">{getUserDisplayName(report)}</span>
                        {report.status === 'approved' && (
                          <span className="text-xs text-green-600 dark:text-green-400 ml-1">(Approver)</span>
                        )}
                        {report.status === 'pending_approval' && (
                          <span className="text-xs text-blue-600 dark:text-blue-400 ml-1">(Submitter)</span>
                        )}
                      </td>
                      <td className="p-2 border border-gray-200 dark:border-gray-600">
                        <div className="flex flex-wrap gap-1">
                          {report.status !== 'approved' && (
                            <button 
                              onClick={() => handleStatusUpdate(report.$id, 'approved')} 
                              className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-xs"
                              disabled={loading}
                            >
                              Approve
                            </button>
                          )}
                          {report.status !== 'pending_approval' && (
                            <button 
                              onClick={() => handleStatusUpdate(report.$id, 'pending_approval')} 
                              className="px-2 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-xs"
                              disabled={loading}
                            >
                              Set Pending
                            </button>
                          )}
                          <button 
                            onClick={() => handleDelete(report.$id)} 
                            className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
                            disabled={loading}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Expanded Details Row */}
                    {expandedRows.has(report.$id) && (
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <td colSpan="8" className="p-4 border border-gray-200 dark:border-gray-600">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            
                            {/* Project Details */}
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                                📋 Project Details:
                              </h4>
                              {Array.isArray(report.details) && report.details.length > 0 ? (
                                <ol className="list-none space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                  {report.details.map((detail, index) => (
                                    <li key={index} className="flex items-start">
                                      <span className="text-blue-600 dark:text-blue-400 mr-2 font-medium">
                                        {toRomanNumeral(index + 1)}.
                                      </span>
                                      <span>{detail}</span>
                                    </li>
                                  ))}
                                </ol>
                              ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400 italic">No details available</p>
                              )}
                            </div>

                            {/* SDG Contribution */}
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                                🎯 SDG Contribution:
                              </h4>
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                {report.sdgContribution || 'Not specified'}
                              </p>
                            </div>

                            {/* Partnerships */}
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                                🤝 Partnerships:
                              </h4>
                              {Array.isArray(report.partnerships) && report.partnerships.length > 0 ? (
                                <div className="flex flex-wrap gap-1">
                                  {report.partnerships.map((partnership, index) => (
                                    <span
                                      key={index}
                                      className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
                                    >
                                      {partnership}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400 italic">No partnerships listed</p>
                              )}
                            </div>

                            {/* Supporting Links */}
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                                🔗 Supporting Links:
                              </h4>
                              {Array.isArray(report.supportingLinks) && report.supportingLinks.length > 0 ? (
                                <div className="space-y-1">
                                  {report.supportingLinks.map((link, index) => (
                                    <a
                                      key={index}
                                      href={link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block text-sm text-blue-600 dark:text-blue-400 hover:underline truncate"
                                    >
                                      {link}
                                    </a>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400 italic">No supporting links</p>
                              )}
                            </div>

                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                  ))}
                </tbody>
              </table>
              {filteredAndSortedReports.length === 0 && (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                  No reports found matching your criteria.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EnhancedDataManagement; 