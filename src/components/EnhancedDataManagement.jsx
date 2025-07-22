import React, { useEffect, useState } from 'react';
import { reportsAPI } from '../lib/appwrite';

function EnhancedDataManagement({ admin }) {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line
  }, []);

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

  // Filtering logic
  const filteredReports = reports.filter(report =>
    (!search ||
      (report.details && report.details.join(' ').toLowerCase().includes(search.toLowerCase())) ||
      (report.strategicResultArea && report.strategicResultArea.toLowerCase().includes(search.toLowerCase())) ||
      (report.subStrategicResultArea && report.subStrategicResultArea.toLowerCase().includes(search.toLowerCase()))
    ) &&
    (!userFilter || report.createdByUsername === userFilter) &&
    (!statusFilter || report.status === statusFilter)
  );

  // Counts
  const totalReports = reports.length;
  const pendingCount = reports.filter(r => r.status === 'pending_approval').length;
  const approvedCount = reports.filter(r => r.status === 'approved').length;

  async function handleStatusUpdate(reportId, newStatus) {
    await reportsAPI.updateReportStatus(reportId, newStatus, admin);
    await fetchReports();
  }

  async function handleDelete(reportId) {
    if (window.confirm('Are you sure you want to delete this report?')) {
      await reportsAPI.deleteReport(reportId);
      await fetchReports();
    }
  }

  // Unique users for filter dropdown
  const uniqueUsers = Array.from(new Set(reports.map(r => r.createdByUsername))).filter(Boolean);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Data Management</h2>
      <div className="flex flex-wrap gap-4 mb-4">
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
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search details or area..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded px-3 py-1"
        />
        <select value={userFilter} onChange={e => setUserFilter(e.target.value)} className="border rounded px-3 py-1">
          <option value="">All Users</option>
          {uniqueUsers.map(user => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border rounded px-3 py-1">
          <option value="">All Statuses</option>
          <option value="draft">Draft</option>
          <option value="pending_approval">Pending Approval</option>
          <option value="approved">Approved</option>
        </select>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="p-2 border">Strategic Area</th>
                <th className="p-2 border">Sub Area</th>
                <th className="p-2 border">Country</th>
                <th className="p-2 border">Year</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">User</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map(report => (
                <tr key={report.$id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="p-2 border">{report.strategicResultArea}</td>
                  <td className="p-2 border">{report.subStrategicResultArea}</td>
                  <td className="p-2 border">{report.interventionCountry}</td>
                  <td className="p-2 border">{report.year}</td>
                  <td className="p-2 border">
                    <span className={`px-2 py-1 rounded text-xs font-semibold bg-${report.status === 'approved' ? 'green' : report.status === 'pending_approval' ? 'yellow' : 'gray'}-200 text-${report.status === 'approved' ? 'green' : report.status === 'pending_approval' ? 'yellow' : 'gray'}-800`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="p-2 border">{report.createdByUsername}</td>
                  <td className="p-2 border space-x-2">
                    {report.status !== 'approved' && (
                      <button onClick={() => handleStatusUpdate(report.$id, 'approved')} className="px-2 py-1 bg-green-500 text-white rounded">Approve</button>
                    )}
                    {report.status !== 'pending_approval' && (
                      <button onClick={() => handleStatusUpdate(report.$id, 'pending_approval')} className="px-2 py-1 bg-yellow-500 text-white rounded">Set Pending</button>
                    )}
                    <button onClick={() => handleDelete(report.$id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredReports.length === 0 && <div className="text-center text-gray-500 py-8">No reports found.</div>}
        </div>
      )}
    </div>
  );
}

export default EnhancedDataManagement; 