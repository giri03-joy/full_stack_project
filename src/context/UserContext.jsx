import React, { createContext, useState, useContext } from 'react';

export const UserContext = createContext(null);

export const useUsers = () => useContext(UserContext);

const MOCK_USERS = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Student', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Student', status: 'Active' },
    { id: 3, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Instructor', status: 'Pending' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Student', status: 'Inactive' },
    { id: 5, name: 'Admin User', email: 'admin@library.com', role: 'Admin', status: 'Active' },
];

export const UserProvider = ({ children }) => {
    const [usersList, setUsersList] = useState(MOCK_USERS);

    const addUser = (newUser) => {
        setUsersList(prev => [...prev, {
            ...newUser,
            id: prev.length ? Math.max(...prev.map(u => u.id)) + 1 : 1,
            status: newUser.status || 'Active'
        }]);
    };

    const updateUser = (updatedUser) => {
        setUsersList(prev => prev.map(user => user.id === updatedUser.id ? updatedUser : user));
    };

    const deleteUser = (id) => {
        setUsersList(prev => prev.filter(user => user.id !== id));
    };

    return (
        <UserContext.Provider value={{ usersList, addUser, updateUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
};
