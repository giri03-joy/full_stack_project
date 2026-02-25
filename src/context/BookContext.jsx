import React, { createContext, useState, useContext } from 'react';

export const BookContext = createContext(null);

export const useBooks = () => useContext(BookContext);

export const MOCK_BOOKS = [
    { id: 1, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Computer Science', rating: 4.8, image: 'https://covers.openlibrary.org/b/isbn/9780262033848-L.jpg' },
    { id: 2, title: 'Clean Code: A Handbook', author: 'Robert C. Martin', category: 'Software Engineering', rating: 4.9, image: 'https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg' },
    { id: 3, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'Software Engineering', rating: 4.7, image: 'https://covers.openlibrary.org/b/isbn/9780201616224-L.jpg' },
    { id: 4, title: 'Design Patterns', author: 'Erich Gamma', category: 'Computer Science', rating: 4.6, image: 'https://covers.openlibrary.org/b/isbn/9780201633610-L.jpg' },
    { id: 5, title: 'Calculus: Early Transcendentals', author: 'James Stewart', category: 'Mathematics', rating: 4.5, image: 'https://covers.openlibrary.org/b/isbn/9781285057095-L.jpg' },
    { id: 6, title: 'University Physics', author: 'Hugh D. Young', category: 'Physics', rating: 4.6, image: 'https://covers.openlibrary.org/b/isbn/9780321675460-L.jpg' },
    { id: 7, title: 'Artificial Intelligence', author: 'Stuart Russell', category: 'Computer Science', rating: 4.8, image: 'https://covers.openlibrary.org/b/isbn/9780134610993-L.jpg' },
    { id: 8, title: 'Organic Chemistry', author: 'Paula Yurkanis', category: 'Chemistry', rating: 4.4, image: 'https://covers.openlibrary.org/b/isbn/9780321768414-L.jpg' },
];

export const INITIAL_CATEGORIES = ['All', 'Computer Science', 'Software Engineering', 'Mathematics', 'Physics', 'Chemistry'];

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState(MOCK_BOOKS);
    const [CATEGORIES, setCategories] = useState(INITIAL_CATEGORIES);
    const [savedBookIds, setSavedBookIds] = useState([]);

    const toggleSaveBook = (bookId) => {
        setSavedBookIds(prev =>
            prev.includes(bookId)
                ? prev.filter(id => id !== bookId)
                : [...prev, bookId]
        );
    };

    const addCategory = (category) => {
        if (!CATEGORIES.includes(category)) {
            setCategories(prev => [...prev, category]);
        }
    };

    const updateCategory = (oldCategory, newCategory) => {
        setCategories(prev => prev.map(c => c === oldCategory ? newCategory : c));
        // Also update books that had the old category
        setBooks(prev => prev.map(book => book.category === oldCategory ? { ...book, category: newCategory } : book));
    };

    const deleteCategory = (category) => {
        if (category === 'All') return; // Protect 'All'
        setCategories(prev => prev.filter(c => c !== category));
    };

    const addBook = (newBook) => {
        setBooks(prev => [...prev, { ...newBook, id: prev.length ? Math.max(...prev.map(b => b.id)) + 1 : 1, rating: newBook.rating || 4.0 }]);
    };

    const updateBook = (updatedBook) => {
        setBooks(prev => prev.map(book => book.id === updatedBook.id ? updatedBook : book));
    };

    const deleteBook = (id) => {
        setBooks(prev => prev.filter(book => book.id !== id));
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
