const API_BASE_URL = 'http://localhost:8081/api';

export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

export const apiFetch = async (endpoint, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            ...getAuthHeaders(),
            ...options.headers
        }
    });

    if (response.status === 401 || response.status === 403) {
        // Trigger a global event so the AuthContext can pick it up and log out
        window.dispatchEvent(new Event('auth_error'));
    }

    if (!response.ok) {
        let errorMsg = 'Network response was not ok';
        try {
            const clone = response.clone();
            const errJson = await clone.json();
            errorMsg = errJson.error || errJson.message || errorMsg;
        } catch(e) {
             errorMsg = await response.text() || errorMsg;
        }
        throw new Error(errorMsg);
    }

    if (response.status === 204 || response.headers.get('content-length') === '0') {
         return null;
    }
    
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
    } else {
        return response.text();
    }
};
