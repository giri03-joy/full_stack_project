import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiFetch } from '../utils/api';
import { useAuth } from './AuthContext';

export const UserContext = createContext(null);

export const useUsers = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [usersList, setUsersList] = useState([]);
    const { user } = useAuth(); // Track authentication status

    useEffect(() => {
        const fetchUsers = async () => {
            if (!user) return; // Prevent unauthenticated fetch
            try {
                // By default this might only work if the logged-in user is an admin.
                // Assuming it has valid JWT when accessed from the Admin Dashboard hook mount.
                const data = await apiFetch('/users');
                if (Array.isArray(data)) {
                    setUsersList(data);
                }
            } catch (error) {
                console.error("Failed to fetch users", error);
            }
        };
        fetchUsers();
    }, [user]);

    const addUser = async (newUser) => {
        try {
            const added = await apiFetch('/users', {
                method: 'POST',
                body: JSON.stringify(newUser)
            });
            setUsersList(prev => [...prev, added]);
        } catch (error) {
            console.error("Failed to add user", error);
        }
    };

    const updateUser = async (updatedUser) => {
        try {
            const returned = await apiFetch(`/users/${updatedUser.id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedUser)
            });
            setUsersList(prev => prev.map(user => user.id === returned.id ? returned : user));
        } catch (error) {
            console.error("Failed to update user", error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await apiFetch(`/users/${id}`, { method: 'DELETE' });
            setUsersList(prev => prev.filter(user => user.id !== id));
        } catch (error) {
            console.error("Failed to delete user", error);
        }
    };

    return (
        <UserContext.Provider value={{ usersList, addUser, updateUser, deleteUser, setUsersList }}>
            {children}
        </UserContext.Provider>
    );
};
