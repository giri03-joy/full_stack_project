import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch } from '../utils/api';

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Hydrate state from localStorage on load & set interceptor
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse stored user", e);
            }
        }

        const handleAuthError = () => {
            logout();
        };
        window.addEventListener('auth_error', handleAuthError);
        return () => window.removeEventListener('auth_error', handleAuthError);
    }, []);

    const login = async (credentials) => {
        try {
            // credentials should be { email, password }
            const data = await apiFetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify(credentials)
            });
            // data is { token, user }
            if (data.token && data.user) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                return true;
            }
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    };

    const register = async (userData) => {
        try {
            await apiFetch('/auth/register', {
                method: 'POST',
                body: JSON.stringify(userData)
            });
            return { success: true };
        } catch (error) {
            console.error("Registration failed:", error);
            return { success: false, error: error.message || 'Registration failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
