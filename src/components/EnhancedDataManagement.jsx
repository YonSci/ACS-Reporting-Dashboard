import React, { useEffect, useState } from 'react';
import { reportsAPI } from '../lib/appwrite';

function EnhancedDataManagement({ isOpen, onClose, admin }) {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState('year');
  const [sortDirection, setSortDirection] = useState('desc');
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
      console.log('📊 Fetched reports for management:', data.length);
      setReports(data);
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError('Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  }

  // Helper function to get user display name
  const getUserDisplayName = (report) => {
    if (report.status === 'pending_approval') {
      if (report.createdByUsername) return report.createdByUsername;
      
      if (report.createdBy && report.createdBy !== 'system') {
        if (report.createdBy === admin?.$id) {
          return admin?.fullName || admin?.username || admin?.email || 'Admin';
        }
        return 'User';
      }
      return 'System';
    }
    
    if (report.status === 'approved') {
      return admin?.fullName || admin?.username || admin?.email || 'Admin';
    }
    
    return 'System';
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

  // Filtering and sorting logic
  const filteredAndSortedReports = reports
    .filter(report => {
      const searchMatch = !search || 
        (report.interventionCountry && report.interventionCountry.toLowerCase().includes(search.toLowerCase())) ||
        (report.strategicResultArea && report.strategicResultArea.toLowerCase().includes(search.toLowerCase())) ||
        (report.subStrategicResultArea && report.subStrategicResultArea.toLowerCase().includes(search.toLowerCase())) ||
        (report.partnerships && Array.isArray(report.partnerships) && 
         report.partnerships.some(p => p.toLowerCase().includes(search.toLowerCase())));

      const userMatch = !userFilter || getUserDisplayName(report) === userFilter;
      const statusMatch = !statusFilter || report.status === statusFilter;
      const countryMatch = !countryFilter || report.interventionCountry === countryFilter;

      return searchMatch && userMatch && statusMatch && countryMatch;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortField) {
        case 'interventionCountry':
          aValue = a.interventionCountry || '';
          bValue = b.interventionCountry || '';
          break;
        case 'strategicResultArea':
          aValue = a.strategicResultArea || '';
          bValue = b.strategicResultArea || '';
          break;
        case 'subStrategicResultArea':
          aValue = a.subStrategicResultArea || '';
          bValue = b.subStrategicResultArea || '';
          break;
        case 'year':
          aValue = a.year || 0;
          bValue = b.year || 0;
          break;
        case 'partnerships':
          aValue = Array.isArray(a.partnerships) ? a.partnerships.join(', ') : '';
          bValue = Array.isArray(b.partnerships) ? b.partnerships.join(', ') : '';
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

  // Get unique values for filters
  const uniqueUsers = [...new Set(reports.map(r => getUserDisplayName(r)).filter(Boolean))];
  const uniqueCountries = [...new Set(reports.map(r => r.interventionCountry).filter(Boolean))];

  // Counts
  const totalReports = reports.length;
  const pendingCount = reports.filter(r => r.status === 'pending_approval').length;
  const approvedCount = reports.filter(r => r.status === 'approved').length;
  const needsApprovalCount = pendingCount;

  async function handleStatusUpdate(reportId, newStatus) {
    try {
      console.log(`🔄 Updating report ${reportId} to status: ${newStatus}`);
      
      setLoading(true);
      setError(null);
      
      await reportsAPI.updateReportStatus(reportId, newStatus);
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
      try {
        setLoading(true);
        await reportsAPI.deleteReport(reportId);
        console.log(`✅ Successfully deleted report ${reportId}`);
        await fetchReports();
      } catch (err) {
        console.error(`❌ Failed to delete report ${reportId}:`, err);
        setError(`Failed to delete report: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
  }

  async function handleBulkApproveAll() {
    if (confirm(`Are you sure you want to approve ALL ${needsApprovalCount} pending reports? This will make them visible on the dashboard.`)) {
      setLoading(true);
      setError(null);
      try {
        const pendingReports = reports.filter(r => r.status === 'pending_approval');
        console.log(`🚀 Bulk approving ${pendingReports.length} reports...`);
        
        for (let i = 0; i < pendingReports.length; i++) {
          const report = pendingReports[i];
          console.log(`✅ Approving report ${i + 1}/${pendingReports.length}: ${report.$id}`);
          try {
            await reportsAPI.updateReportStatus(report.$id, 'approved');
          } catch (reportErr) {
            console.error(`❌ Failed to approve report ${report.$id}:`, reportErr);
          }
        }
        
        console.log('🎉 Bulk approval completed!');
        await fetchReports();
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📊 Strategic Result Area Data Management</h2>
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
              placeholder="Search country, strategic area, partnerships..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border rounded px-3 py-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white flex-1 min-w-64"
            />
            <select 
              value={countryFilter} 
              onChange={e => setCountryFilter(e.target.value)} 
              className="border rounded px-3 py-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">All Countries</option>
              {uniqueCountries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
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
              <option value="pending_approval">Pending</option>
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
                        Sub-Strategic Area
                        {sortField === 'subStrategicResultArea' && (
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
                      onClick={() => handleSort('partnerships')}
                    >
                      <div className="flex items-center gap-1">
                        Partnerships
                        {sortField === 'partnerships' && (
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
                        <td className="p-2 border border-gray-200 dark:border-gray-600 font-medium">{report.interventionCountry}</td>
                        <td className="p-2 border border-gray-200 dark:border-gray-600">{report.strategicResultArea}</td>
                        <td className="p-2 border border-gray-200 dark:border-gray-600">{report.subStrategicResultArea}</td>
                        <td className="p-2 border border-gray-200 dark:border-gray-600">{report.year}</td>
                        <td className="p-2 border border-gray-200 dark:border-gray-600">
                          {Array.isArray(report.partnerships) ? report.partnerships.join(', ') : 'N/A'}
                        </td>
                        <td className="p-2 border border-gray-200 dark:border-gray-600">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            report.status === 'approved' ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300' :
                            report.status === 'pending_approval' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                            'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {report.status === 'pending_approval' ? 'pending' : report.status}
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
                          <td colSpan="9" className="p-4 border border-gray-200 dark:border-gray-600">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              
                              {/* Partnerships */}
                              <div>
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                                  🤝 Partnerships ({Array.isArray(report.partnerships) ? report.partnerships.length : 0}):
                                </h4>
                                {Array.isArray(report.partnerships) && report.partnerships.length > 0 ? (
                                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                    {report.partnerships.map((partnership, index) => (
                                      <li key={index}>{partnership}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">No partnerships listed</p>
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

                              {/* Details */}
                              <div className="lg:col-span-2">
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                                  📋 Details ({Array.isArray(report.details) ? report.details.length : 0}):
                                </h4>
                                {Array.isArray(report.details) && report.details.length > 0 ? (
                                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                    {report.details.map((detail, index) => (
                                      <li key={index}>{detail}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">No details provided</p>
                                )}
                              </div>

                              {/* Supporting Links */}
                              {Array.isArray(report.supportingLinks) && report.supportingLinks.length > 0 && (
                                <div className="lg:col-span-2">
                                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                                    🔗 Supporting Links ({report.supportingLinks.length}):
                                  </h4>
                                  <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                    {report.supportingLinks.map((link, index) => (
                                      <li key={index}>
                                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                                          {link}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Metadata */}
                              <div className="lg:col-span-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-600 dark:text-gray-400">
                                  <div>
                                    <span className="font-semibold">Created By:</span><br/>
                                    {report.createdBy || 'Unknown'}
                                  </div>
                                  <div>
                                    <span className="font-semibold">Report Index:</span><br/>
                                    {report.reportIndex}
                                  </div>
                                  <div>
                                    <span className="font-semibold">Document ID:</span><br/>
                                    {report.$id}
                                  </div>
                                  <div>
                                    <span className="font-semibold">Created At:</span><br/>
                                    {report.$createdAt ? new Date(report.$createdAt).toLocaleDateString() : 'N/A'}
                                  </div>
                                </div>
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