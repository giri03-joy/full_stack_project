import React, { createContext, useContext, useState } from 'react';

// Create the context
export const AuthContext = createContext(null);

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Simplified login function to simulate auth
    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
