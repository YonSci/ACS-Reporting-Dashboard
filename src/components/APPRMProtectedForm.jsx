import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';
import APPRMDataImportForm from './APPRMDataImportForm';
import Modal from './Modal';

const APPRMProtectedForm = ({ isOpen, onClose }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleAddNewData = () => {
    if (isAuthenticated) {
      // User is authenticated, show the form directly
      setShowLoginModal(false);
    } else {
      // User is not authenticated, show login modal
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    // Login was successful, now show the form
    setShowLoginModal(false);
  };

  const handleClose = () => {
    setShowLoginModal(false);
    onClose();
  };

  // If login modal is open, show it
  if (showLoginModal) {
    return (
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />
    );
  }

  // If user is authenticated, show the protected form
  if (isAuthenticated) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title={
          <div className="flex items-center justify-between w-full">
            <span>Add APPRM Data</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Logged in as: {user?.fullName}
              </span>
              <button
                onClick={logout}
                className="text-xs bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 px-2 py-1 rounded transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        }
      >
        <APPRMDataImportForm onClose={handleClose} />
      </Modal>
    );
  }

  // If not authenticated and not showing login, show login modal
  return (
    <LoginModal
      isOpen={isOpen}
      onClose={handleClose}
      onSuccess={handleLoginSuccess}
    />
  );
};

export default APPRMProtectedForm; 