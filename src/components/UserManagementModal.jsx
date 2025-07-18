import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { useAuth } from '../contexts/AuthContext';
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'analyst', label: 'Analyst' },
];

const UserManagementModal = ({ isOpen, onClose }) => {
  const { user, addUser, getUsers } = useAuth();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    fullName: '',
    username: '',
    email: '',
    role: 'analyst',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load users when modal opens
  useEffect(() => {
    if (isOpen && user?.role === 'admin') {
      const currentUsers = getUsers();
      setUsers(currentUsers);
    }
  }, [isOpen, user, getUsers]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validation
    if (!form.fullName.trim() || !form.username.trim() || !form.email.trim() || !form.password.trim()) {
      setError('All fields are required.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // Check if email already exists
    if (users.some(u => u.email === form.email)) {
      setError('Email already exists.');
      return;
    }

    // Check if username already exists
    if (users.some(u => u.username === form.username)) {
      setError('Username already exists.');
      return;
    }

    setIsSubmitting(true);

    try {
      const newUser = {
        fullName: form.fullName.trim(),
        username: form.username.trim(),
        email: form.email.trim(),
        role: form.role,
        password: form.password
      };

      addUser(newUser);
      setSuccess('User added successfully!');
      setForm({
        fullName: '',
        username: '',
        email: '',
        role: 'analyst',
        password: ''
      });
      setShowPassword(false);
      
      // Reload users list
      const updatedUsers = getUsers();
      setUsers(updatedUsers);
    } catch (error) {
      setError('An error occurred while adding the user.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !user || user.role !== 'admin') return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Management (Admin Only)">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Add New User</h3>
        <form onSubmit={handleAddUser} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
              placeholder="Enter full name"
              disabled={isSubmitting}
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username *
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
              placeholder="Enter username"
              disabled={isSubmitting}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
              placeholder="Enter email address"
              disabled={isSubmitting}
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Role *
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
              disabled={isSubmitting}
            >
              {roles.map(r => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white"
                placeholder="Enter password (min 6 characters)"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
          {success && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-3">
              <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Adding User...
              </div>
            ) : (
              'Add User'
            )}
          </button>
        </form>
      </div>

      {/* Existing Users List */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Existing Users</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 dark:bg-slate-700">
                <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-left text-gray-700 dark:text-gray-300">Name</th>
                <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-left text-gray-700 dark:text-gray-300">Username</th>
                <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-left text-gray-700 dark:text-gray-300">Email</th>
                <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-left text-gray-700 dark:text-gray-300">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr key={u.email + idx} className="odd:bg-white even:bg-gray-50 dark:odd:bg-slate-800 dark:even:bg-slate-700">
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                    {u.fullName || 'N/A'}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                    {u.username || 'N/A'}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                    {u.email}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      u.role === 'admin' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                      u.role === 'editor' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                      'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
};

export default UserManagementModal; 