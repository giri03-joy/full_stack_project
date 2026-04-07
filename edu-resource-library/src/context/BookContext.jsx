import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiFetch } from '../utils/api';
import { useAuth } from './AuthContext';

export const BookContext = createContext(null);

export const useBooks = () => useContext(BookContext);

export const INITIAL_CATEGORIES = ['All', 'Computer Science', 'Software Engineering', 'Mathematics', 'Physics', 'Chemistry'];

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [CATEGORIES, setCategories] = useState(INITIAL_CATEGORIES);
    const [savedBookIds, setSavedBookIds] = useState([]);
    const { user } = useAuth();

    // Fetch all books
    useEffect(() => {
        const fetchBooks = async () => {
            if (!user) return; // Prevent unauthenticated fetch
            try {
                const data = await apiFetch('/books');
                setBooks(data);
            } catch (error) {
                console.error("Failed to fetch books", error);
            }
        };
        fetchBooks();
    }, [user]);

    // Fetch saved books when user changes
    useEffect(() => {
        const fetchSavedBooks = async () => {
            if (user && user.id) {
                try {
                    const saved = await apiFetch(`/users/${user.id}/saved-books`);
                    // Backend returns Set<Book>, we just want IDs
                    setSavedBookIds(saved.map(b => b.id));
                } catch (error) {
                    console.error("Failed to fetch saved books", error);
                }
            } else {
                setSavedBookIds([]);
            }
        };
        fetchSavedBooks();
    }, [user]);

    const toggleSaveBook = async (bookId) => {
        if (!user || !user.id) return;
        
        // Optimistic UI update
        setSavedBookIds(prev =>
            prev.includes(bookId)
                ? prev.filter(id => id !== bookId)
                : [...prev, bookId]
        );

        try {
            await apiFetch(`/users/${user.id}/saved-books/${bookId}`, { method: 'POST' });
        } catch (error) {
            console.error("Failed to toggle save book", error);
            // Revert on failure (simplified)
        }
    };

    const addCategory = (category) => {
        if (!CATEGORIES.includes(category)) {
            setCategories(prev => [...prev, category]);
        }
    };

    const updateCategory = (oldCategory, newCategory) => {
        setCategories(prev => prev.map(c => c === oldCategory ? newCategory : c));
        setBooks(prev => prev.map(book => book.category === oldCategory ? { ...book, category: newCategory } : book));
    };

    const deleteCategory = (category) => {
        if (category === 'All') return; 
        setCategories(prev => prev.filter(c => c !== category));
    };

    const addBook = async (newBook) => {
        try {
            const added = await apiFetch('/books', {
                method: 'POST',
                body: JSON.stringify(newBook)
            });
            setBooks(prev => [...prev, added]);
        } catch (error) {
            console.error("Failed to add book", error);
        }
    };

    const updateBook = async (updatedBook) => {
        try {
            const updated = await apiFetch(`/books/${updatedBook.id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedBook)
            });
            setBooks(prev => prev.map(book => book.id === updated.id ? updated : book));
        } catch (error) {
            console.error("Failed to update book", error);
        }
    };

    const deleteBook = async (id) => {
        try {
            await apiFetch(`/books/${id}`, { method: 'DELETE' });
            setBooks(prev => prev.filter(book => book.id !== id));
        } catch (error) {
            console.error("Failed to delete book", error);
        }
    };

    return (
        <BookContext.Provider value={{
            books,
            CATEGORIES,
            savedBookIds,
            addBook,
            updateBook,
            deleteBook,
            addCategory,
            updateCategory,
            deleteCategory,
            toggleSaveBook
        }}>
            {children}
        </BookContext.Provider>
    );
};
