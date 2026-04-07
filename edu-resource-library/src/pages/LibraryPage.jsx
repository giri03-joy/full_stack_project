import React, { useState } from 'react';
import { Search, Filter, BookOpen, Star, Download, Eye, Bookmark } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardBody } from '../components/ui/Card';
import { Pagination } from '../components/ui/DataTable';
import './Library.css';

import { useBooks } from '../context/BookContext';

const LibraryPage = () => {
    const { books, CATEGORIES, savedBookIds, toggleSaveBook } = useBooks();
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredBooks = books.filter(book => {
        const matchesCategory = activeCategory === 'All' || book.category === activeCategory;
        const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="library-page">
            <div className="library-header bg-primary text-white">
                <div className="container library-header-container">
                    <h1 className="library-title">Digital Library</h1>
                    <p className="library-subtitle">Explore our vast collection of academic resources and books.</p>

                    <div className="library-search-bar">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search by title, author, or ISBN..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="library-search-input"
                        />
                        <Button variant="secondary">Search</Button>
                    </div>
                </div>
            </div>

            <div className="container library-content flex-layout">
                {/* Sidebar Filters */}
                <aside className="library-sidebar">
                    <Card>
                        <CardBody>
                            <h3 className="filter-title">
                                <Filter size={18} /> Categories
                            </h3>
                            <ul className="filter-list">
                                {CATEGORIES.map(category => (
                                    <li key={category}>
                                        <button
                                            className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                                            onClick={() => setActiveCategory(category)}
                                        >
                                            {category}
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <h3 className="filter-title mt-4">Sort By</h3>
                            <select className="filter-select">
                                <option>Newest Additions</option>
                                <option>Highest Rated</option>
                                <option>A-Z (Title)</option>
                                <option>Z-A (Title)</option>
                            </select>
                        </CardBody>
                    </Card>
                </aside>

                {/* Main Grid */}
                <main className="library-main">
                    <div className="results-header">
                        <span>Showing <strong>{filteredBooks.length}</strong> results</span>
                    </div>

                    <div className="library-grid animate-fade-in">
                        {filteredBooks.length > 0 ? (
                            filteredBooks.map(book => (
                                <Card key={book.id} hoverable className="library-card">
                                    <div className="library-card-img-wrapper">
                                        <img src={book.image} alt={book.title} className="library-card-img" />
                                        <div className="library-card-overlay">
                                            <a href={book.pdfUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                                                <Button variant="primary" size="sm" icon={Eye}>Read Now</Button>
                                            </a>
                                            <a href={book.pdfUrl} download target="_blank" rel="noreferrer" style={{ textDecoration: 'none', marginLeft: '0.5rem' }}>
                                                <Button variant="outline" size="sm" icon={Download} className="bg-white">Download</Button>
                                            </a>
                                        </div>
                                    </div>
                                    <CardBody className="library-card-body">
                                        <div className="library-card-category">{book.category}</div>
                                        <h3 className="library-card-title">{book.title}</h3>
                                        <p className="library-card-author">{book.author}</p>
                                        <div className="library-card-footer">
                                            <div className="rating-badge">
                                                <Star size={14} fill="currentColor" className="text-warning" />
                                                <span>{book.rating}</span>
                                            </div>
                                            <button
                                                className={`icon-btn ${savedBookIds && savedBookIds.includes(book.id) ? 'text-primary' : 'text-muted'}`}
                                                onClick={() => toggleSaveBook(book.id)}
                                                title={savedBookIds && savedBookIds.includes(book.id) ? "Unsave Book" : "Save Book"}
                                            >
                                                <Bookmark size={18} fill={savedBookIds && savedBookIds.includes(book.id) ? "currentColor" : "none"} />
                                            </button>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))
                        ) : (
                            <div className="empty-state">
                                <BookOpen size={48} className="text-muted" />
                                <h3 className="mt-4">No books found</h3>
                                <p>Try adjusting your search or filters to find what you're looking for.</p>
                                <Button variant="outline" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>Clear Filters</Button>
                            </div>
                        )}
                    </div>

                    {filteredBooks.length > 0 && (
                        <div className="library-pagination">
                            <Pagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default LibraryPage;
