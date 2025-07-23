import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const ForgotPasswordModal = ({ isOpen, onClose, onSubmit, isSubmitting, error, success }) => {
  const [email, setEmail] = useState('');
  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Reset Password
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Enter your email to receive a password reset link
          </p>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSubmit(email); }} className="space-y-4">
          <div>
            <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="reset-email"
              name="reset-email"
              value={email}
              onChange={e => { setEmail(e.target.value); }}
              disabled={isSubmitting}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white disabled:opacity-50"
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>
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
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  ) : null;
};

const LoginModal = ({ isOpen, onClose, onSuccess }) => {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [forgotSubmitting, setForgotSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Please enter both email and password');
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        onSuccess();
        onClose();
        setFormData({ email: '', password: '' });
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ email: '', password: '' });
      setError('');
      setShowPassword(false);
      onClose();
    }
  };

  // Password reset handler
  const handleRequestPasswordReset = async (email) => {
    setForgotError('');
    setForgotSuccess('');
    setForgotSubmitting(true);
    try {
      // Use your frontend URL for redirect (update as needed)
      const redirectUrl = window.location.origin + '/reset-password';
      
      // Import the profiles account from AuthContext for password reset
      const { Client, Account } = await import('appwrite');
      const profilesClient = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('6879ef820031fa4dd590'); // Profiles project ID
      const profilesAccount = new Account(profilesClient);
      
      await profilesAccount.createRecovery(email, redirectUrl);
      setForgotSuccess('If this email exists, a reset link has been sent.');
    } catch (err) {
      setForgotError(err?.message || 'Failed to send reset link.');
    } finally {
      setForgotSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Login Required
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please authenticate to add new reports
          </p>
        </div>
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white disabled:opacity-50"
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>
          {/* Password field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white disabled:opacity-50"
                placeholder="Enter your password"
                autoComplete="current-password"
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
          {/* Error message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Logging in...
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>
        {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-blue-600 hover:underline text-sm"
            onClick={() => setShowForgot(true)}
            disabled={isSubmitting}
          >
            Forgot Password?
          </button>
        </div>
        {/* Forgot Password Modal */}
        <ForgotPasswordModal
          isOpen={showForgot}
          onClose={() => { setShowForgot(false); setForgotError(''); setForgotSuccess(''); }}
          onSubmit={handleRequestPasswordReset}
          isSubmitting={forgotSubmitting}
          error={forgotError}
          success={forgotSuccess}
        />
      </div>
    </div>
  );
};

export default LoginModal; 