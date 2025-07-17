import React, { useState } from 'react';
import Modal from './Modal';
import { useAuth } from '../contexts/AuthContext';

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'analyst', label: 'Analyst' },
];

const UserManagementModal = ({ isOpen, onClose }) => {
  const { user, addUser, getUsers } = useAuth();
  const [form, setForm] = useState({ username: '', password: '', role: 'editor', fullName: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const users = getUsers();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.username.trim() || !form.password.trim() || !form.fullName.trim()) {
      setError('All fields are required.');
      return;
    }
    if (users.some(u => u.username === form.username)) {
      setError('Username already exists.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const newUser = {
        username: form.username,
        password: form.password,
        role: form.role,
        fullName: form.fullName
      };
      addUser(newUser);
      setSuccess('User added successfully!');
      setForm({ username: '', password: '', role: 'editor', fullName: '' });
      setIsSubmitting(false);
    }, 500);
  };

  if (!isOpen || !user || user.role !== 'admin') return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Management (Admin Only)">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Add New User</h3>
        <form onSubmit={handleAddUser} className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
              autoComplete="off"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
              autoComplete="new-password"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
              autoComplete="off"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
              disabled={isSubmitting}
            >
              {roles.map(r => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add User'}
          </button>
        </form>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Existing Users</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead>
              <tr className="bg-gray-100 dark:bg-slate-700">
                <th className="px-2 py-1 border">Username</th>
                <th className="px-2 py-1 border">Full Name</th>
                <th className="px-2 py-1 border">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr key={u.username + idx} className="odd:bg-white even:bg-gray-50 dark:odd:bg-slate-800 dark:even:bg-slate-700">
                  <td className="px-2 py-1 border">{u.username}</td>
                  <td className="px-2 py-1 border">{u.fullName}</td>
                  <td className="px-2 py-1 border capitalize">{u.role}</td>
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