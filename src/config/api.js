// API base URL
export const API_BASE_URL = 'http://localhost:3001/api';

// API endpoints
export const ENDPOINTS = {
    // Auth
    LOGIN: '/auth/login',
    VERIFY: '/auth/verify',

    // Reports
    REPORTS: '/reports',
    REPORTS_BY_COUNTRY: (country) => `/reports/country/${country}`,
    REPORTS_BY_YEAR: (year) => `/reports/year/${year}`,

    // Data
    STRATEGIC_AREAS: '/strategic-areas',
    COUNTRIES: '/countries',
    PARTNERSHIPS: '/partnerships',
    FILTERS: '/filters'
};

// Helper function to construct full API URL
export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

// Helper function to handle API responses
export const handleApiResponse = async (response) => {
    if (!response.ok) {
        try {
            const errorData = await response.json();
            console.error('API Error Response:', errorData);
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        } catch (e) {
            if (e instanceof SyntaxError) {
                // If response is not JSON
                const errorText = await response.text();
                console.error('API Error Response (non-JSON):', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            throw e;
        }
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
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

export const makeApiRequest = async (endpoint, options = {}) => {
    try {
        const response = await fetch(getApiUrl(endpoint), {
            ...options,
            headers: {
                ...getAuthHeaders(),
                ...options.headers,
            },
            credentials: 'include'
        });
        return await handleApiResponse(response);
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}; 