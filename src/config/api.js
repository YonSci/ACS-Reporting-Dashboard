// API base URL
export const API_BASE_URL = 'http://localhost:3002/api';

// API endpoints
export const ENDPOINTS = {
    // Auth
    LOGIN: '/api/auth/login',
    VERIFY: '/api/auth/verify',

    // Reports
    REPORTS: '/api/reports',
    REPORTS_BY_COUNTRY: (country) => `/reports/country/${country}`,
    REPORTS_BY_YEAR: (year) => `/reports/year/${year}`,

    // Data
    STRATEGIC_AREAS: '/strategic-areas',
    COUNTRIES: '/countries',
    PARTNERSHIPS: '/partnerships',
    FILTERS: '/api/filters'
};

// Helper function to construct full API URL
export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

// Helper function to handle API responses
export const handleApiResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.text();
        console.error('API Error Response:', errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }
    
    throw new Error('Response was not JSON');
};

// API request options with authentication
export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        credentials: 'include'
    };
};

export const makeApiRequest = async (endpoint, options = {}) => {
    try {
        const response = await fetch(endpoint, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        return await handleApiResponse(response);
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}; 