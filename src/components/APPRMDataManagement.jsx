import React, { useEffect, useState } from 'react';
import { apprmAPI } from '../lib/appwrite';

function APPRMDataManagement({ isOpen, onClose, admin }) {
  const [apprmData, setApprmData] = useState([]);
  const [search, setSearch] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState('reportIndex');
  const [sortDirection, setSortDirection] = useState('desc');
  const [expandedRows, setExpandedRows] = useState(new Set());

  useEffect(() => {
    if (isOpen) {
      fetchAPPRMData();
    }
    // eslint-disable-next-line
  }, [isOpen]);

  async function fetchAPPRMData() {
    setLoading(true);
    setError(null);
    try {
      const data = await apprmAPI.getAllAPPRMData();
      console.log('📊 Fetched APPRM data for management:', data.length);
      setApprmData(data);
    } catch (err) {
      console.error('Error fetching APPRM data:', err);
      setError('Failed to fetch APPRM data');
    } finally {
      setLoading(false);
    }
  }

  // Helper function to get user display name
  const getUserDisplayName = (record) => {
    if (record.status === 'pending') {
      return record.createdBy || 'Unknown User';
    }
    
    if (record.status === 'approved') {
      return record.approvedBy || admin?.fullName || admin?.username || 'Admin';
    }
    
    return record.createdBy || 'System';
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
  const toggleRowExpansion = (recordId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(recordId)) {
      newExpanded.delete(recordId);
    } else {
      newExpanded.add(recordId);
    }
    setExpandedRows(newExpanded);
  };

  // Filtering and sorting logic
  const filteredAndSortedData = apprmData
    .filter(record => {
      const searchMatch = !search || 
        (record.country && record.country.toLowerCase().includes(search.toLowerCase())) ||
        (record.deliverables && Array.isArray(record.deliverables) && 
         record.deliverables.some(d => d.toLowerCase().includes(search.toLowerCase()))) ||
        (record.outcomes && Array.isArray(record.outcomes) && 
         record.outcomes.some(o => o.toLowerCase().includes(search.toLowerCase()))) ||
        (record.partnership && Array.isArray(record.partnership) && 
         record.partnership.some(p => p.toLowerCase().includes(search.toLowerCase()))) ||
        (record.sdgunsdcf && Array.isArray(record.sdgunsdcf) && 
         record.sdgunsdcf.some(s => s.toLowerCase().includes(search.toLowerCase())));

      const userMatch = !userFilter || getUserDisplayName(record) === userFilter;
      const statusMatch = !statusFilter || record.status === statusFilter;
      const countryMatch = !countryFilter || record.country === countryFilter;

      return searchMatch && userMatch && statusMatch && countryMatch;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortField) {
        case 'country':
          aValue = a.country || '';
          bValue = b.country || '';
          break;
        case 'Year':
          aValue = a.Year || 0;
          bValue = b.Year || 0;
          break;
        case 'Quarter':
          aValue = a.Quarter || '';
          bValue = b.Quarter || '';
          break;
        case 'partnership':
          // Handle both array and single values for partnership
          if (Array.isArray(a.partnership)) {
            aValue = a.partnership.length > 0 ? a.partnership.join(', ') : '';
          } else {
            aValue = a.partnership || '';
          }
          if (Array.isArray(b.partnership)) {
            bValue = b.partnership.length > 0 ? b.partnership.join(', ') : '';
          } else {
            bValue = b.partnership || '';
          }
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
  const uniqueUsers = [...new Set(apprmData.map(r => getUserDisplayName(r)).filter(Boolean))];
  const uniqueCountries = [...new Set(apprmData.map(r => r.country).filter(Boolean))];

  // Counts
  const totalRecords = apprmData.length;
  const pendingCount = apprmData.filter(r => r.status === 'pending').length;
  const approvedCount = apprmData.filter(r => r.status === 'approved').length;
  const needsApprovalCount = pendingCount;

  async function handleStatusUpdate(recordId, newStatus) {
    try {
      console.log(`🔄 Updating APPRM record ${recordId} to status: ${newStatus}`);
      
      setLoading(true);
      setError(null);
      
      const approver = newStatus === 'approved' ? admin?.fullName || admin?.username || 'Admin' : null;
      await apprmAPI.updateAPPRMStatus(recordId, newStatus, approver);
      console.log(`✅ Successfully updated APPRM record ${recordId} to ${newStatus}`);
      
      await fetchAPPRMData(); // Refresh the list
    } catch (err) {
      console.error(`❌ Failed to update APPRM record ${recordId}:`, err);
      setError(`Failed to update record: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(recordId) {
    if (confirm('Are you sure you want to delete this APPRM record?')) {
      try {
        setLoading(true);
        await apprmAPI.deleteAPPRMData(recordId);
        console.log(`✅ Successfully deleted APPRM record ${recordId}`);
        await fetchAPPRMData();
      } catch (err) {
        console.error(`❌ Failed to delete APPRM record ${recordId}:`, err);
        setError(`Failed to delete record: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
  }

  async function handleBulkApproveAll() {
    if (confirm(`Are you sure you want to approve ALL ${needsApprovalCount} pending APPRM records? This will make them visible on the dashboard.`)) {
      setLoading(true);
      setError(null);
      try {
        const pendingRecords = apprmData.filter(r => r.status === 'pending');
        console.log(`🚀 Bulk approving ${pendingRecords.length} APPRM records...`);
        
        const approver = admin?.fullName || admin?.username || 'Admin';
        for (let i = 0; i < pendingRecords.length; i++) {
          const record = pendingRecords[i];
          console.log(`✅ Approving APPRM record ${i + 1}/${pendingRecords.length}: ${record.$id}`);
          try {
            await apprmAPI.updateAPPRMStatus(record.$id, 'approved', approver);
          } catch (recordErr) {
            console.error(`❌ Failed to approve APPRM record ${record.$id}:`, recordErr);
          }
        }
        
        console.log('🎉 APPRM bulk approval completed!');
        await fetchAPPRMData();
      } catch (err) {
        console.error('❌ Error during APPRM bulk approval:', err);
        setError(`Failed to bulk approve records: ${err.message}`);
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🌍 APPRM Data Management (Country-Based Reports)</h2>
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
                <span className="font-semibold">Total Records:</span> {totalRecords}
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
              placeholder="Search country, deliverables, outcomes..."
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
              <option value="pending">Pending</option>
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
                      onClick={() => handleSort('country')}
                    >
                      <div className="flex items-center gap-1">
                        Country
                        {sortField === 'country' && (
                          <span className="text-xs">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="p-2 border border-gray-200 dark:border-gray-600 text-left cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                      onClick={() => handleSort('Year')}
                    >
                      <div className="flex items-center gap-1">
                        Year
                        {sortField === 'Year' && (
                          <span className="text-xs">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="p-2 border border-gray-200 dark:border-gray-600 text-left cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                      onClick={() => handleSort('Quarter')}
                    >
                      <div className="flex items-center gap-1">
                        Quarter
                        {sortField === 'Quarter' && (
                          <span className="text-xs">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="p-2 border border-gray-200 dark:border-gray-600 text-left cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                      onClick={() => handleSort('partnership')}
                    >
                      <div className="flex items-center gap-1">
                        Partnership
                        {sortField === 'partnership' && (
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
                  {filteredAndSortedData.map(record => (
                    <>
                      <tr key={record.$id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                        <td className="p-2 border border-gray-200 dark:border-gray-600">
                          <button
                            onClick={() => toggleRowExpansion(record.$id)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                            title={expandedRows.has(record.$id) ? "Hide details" : "Show details"}
                          >
                            {expandedRows.has(record.$id) ? (
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
                        <td className="p-2 border border-gray-200 dark:border-gray-600 font-medium">{record.country}</td>
                        <td className="p-2 border border-gray-200 dark:border-gray-600">
                          {record.Year}
                        </td>
                        <td className="p-2 border border-gray-200 dark:border-gray-600">{record.Quarter}</td>
                        <td className="p-2 border border-gray-200 dark:border-gray-600">
                          {Array.isArray(record.partnership) ? record.partnership.join(', ') : (record.partnership || 'None')}
                        </td>
                        <td className="p-2 border border-gray-200 dark:border-gray-600">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            record.status === 'approved' ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300' :
                            record.status === 'pending' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                            'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="p-2 border border-gray-200 dark:border-gray-600">
                          <span className="text-sm">{getUserDisplayName(record)}</span>
                          {record.status === 'approved' && (
                            <span className="text-xs text-green-600 dark:text-green-400 ml-1">(Approver)</span>
                          )}
                          {record.status === 'pending' && (
                            <span className="text-xs text-blue-600 dark:text-blue-400 ml-1">(Submitter)</span>
                          )}
                        </td>
                        <td className="p-2 border border-gray-200 dark:border-gray-600">
                          <div className="flex flex-wrap gap-1">
                            {record.status !== 'approved' && (
                              <button 
                                onClick={() => handleStatusUpdate(record.$id, 'approved')} 
                                className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-xs"
                                disabled={loading}
                              >
                                Approve
                              </button>
                            )}
                            {record.status !== 'pending' && (
                              <button 
                                onClick={() => handleStatusUpdate(record.$id, 'pending')} 
                                className="px-2 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-xs"
                                disabled={loading}
                              >
                                Set Pending
                              </button>
                            )}
                            <button 
                              onClick={() => handleDelete(record.$id)} 
                              className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
                              disabled={loading}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                      
                      {/* Expanded Details Row */}
                      {expandedRows.has(record.$id) && (
                        <tr className="bg-gray-50 dark:bg-gray-800">
                          <td colSpan="8" className="p-4 border border-gray-200 dark:border-gray-600">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              
                              {/* Deliverables */}
                              <div>
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                                  📋 Deliverables ({record.deliverables?.length || 0}):
                                </h4>
                                {Array.isArray(record.deliverables) && record.deliverables.length > 0 ? (
                                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                    {record.deliverables.map((deliverable, index) => (
                                      <li key={index}>{deliverable}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">No deliverables listed</p>
                                )}
                              </div>

                              {/* Outcomes */}
                              <div>
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                                  🎯 Outcomes ({record.outcomes?.length || 0}):
                                </h4>
                                {Array.isArray(record.outcomes) && record.outcomes.length > 0 ? (
                                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                    {record.outcomes.map((outcome, index) => (
                                      <li key={index}>{outcome}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">No outcomes listed</p>
                                )}
                              </div>

                              {/* SDGs & UNSDCF Result Areas */}
                              <div className="lg:col-span-2">
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                                  🌍 SDGs & UNSDCF Result Areas ({record.sdgunsdcf?.length || 0}):
                                </h4>
                                {Array.isArray(record.sdgunsdcf) && record.sdgunsdcf.length > 0 ? (
                                  <div className="flex flex-wrap gap-1">
                                    {record.sdgunsdcf.map((item, index) => (
                                      <span
                                        key={index}
                                        className={`inline-block px-2 py-1 text-xs rounded ${
                                          item.startsWith('SDG') 
                                            ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                                            : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                                        }`}
                                      >
                                        {item}
                                      </span>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">No SDGs or UNSDCF areas specified</p>
                                )}
                              </div>

                              {/* Metadata */}
                              <div className="lg:col-span-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-600 dark:text-gray-400">
                                  <div>
                                    <span className="font-semibold">Created By:</span><br/>
                                    {record.createdBy}
                                  </div>
                                  <div>
                                    <span className="font-semibold">Report Index:</span><br/>
                                    {record.reportIndex}
                                  </div>
                                  <div>
                                    <span className="font-semibold">Document ID:</span><br/>
                                    {record.$id}
                                  </div>
                                  <div>
                                    <span className="font-semibold">Approved By:</span><br/>
                                    {record.approvedBy || 'N/A'}
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
              {filteredAndSortedData.length === 0 && (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                  No APPRM records found matching your criteria.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default APPRMDataManagement; 