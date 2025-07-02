import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LoginForm from './LoginForm';
import DataImportForm from '../DataImportForm';

const AuthenticatedDataImport = ({ onClose }) => {
    const { isAuthenticated } = useAuth();
    const [showLoginForm, setShowLoginForm] = useState(!isAuthenticated);

    const handleLoginSuccess = () => {
        setShowLoginForm(false);
    };

    if (showLoginForm) {
        return <LoginForm onSuccess={handleLoginSuccess} onClose={onClose} />;
    }

    return <DataImportForm onClose={onClose} />;
};

export default AuthenticatedDataImport; 