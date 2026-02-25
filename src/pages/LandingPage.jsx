import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Book, Video, Award, Star, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardBody } from '../components/ui/Card';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate('/library');
    };

    const categories = [
        { title: 'Computer Science', icon: <Video className="text-primary" size={24} />, count: 120 },
        { title: 'Mathematics', icon: <Book className="text-secondary" size={24} />, count: 85 },
        { title: 'Physics', icon: <Award className="text-danger" size={24} />, count: 64 },
        { title: 'Literature', icon: <Book className="text-warning" size={24} />, count: 92 },
    ];

    const trendingBooks = [
        { id: 1, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', rating: 4.8, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=500' },
        { id: 2, title: 'Clean Code', author: 'Robert C. Martin', rating: 4.9, image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400&h=500' },
        { id: 3, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', rating: 4.7, image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400&h=500' },
        { id: 4, title: 'Design Patterns', author: 'Erich Gamma', rating: 4.6, image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=400&h=500' },
    ];

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container hero-container animate-fade-in">
                    <div className="hero-content">
                        <h1 className="hero-title">Your Digital Gateway to Knowledge</h1>
                        <p className="hero-subtitle">
                            Access thousands of books, study materials, and online courses. Empower your learning journey with our modern EduLibrary platform.
                        </p>

                        <form className="hero-search" onSubmit={handleSearch}>
                            <div className="search-wrapper">
                                <Search className="search-icon" size={20} />
                                <input
                                    type="text"
                                    placeholder="What do you want to learn today?"
                                    className="hero-search-input"
                                />
                                <Button type="submit" variant="primary">Search</Button>
                            </div>
                        </form>

                        <div className="hero-actions">
                            <Link to="/login?role=user">
                                <Button variant="outline" size="lg">Login as User</Button>
                            </Link>
                            <Link to="/login?role=admin">
                                <Button variant="secondary" size="lg">Login as Admin</Button>
                            </Link>
                        </div>
                    </div>

                    <div className="hero-image-wrapper">
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800&h=600"
                            alt="Students learning"
                            className="hero-image"
                        />
                        <div className="hero-shape glass-panel">
                            <div className="stat-row">
                                <Book className="text-primary" size={24} />
                                <div>
                                    <div className="stat-value">10,000+</div>
                                    <div className="stat-label">Resources</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="categories-section container">
                <div className="section-header">
                    <h2 className="section-title">Explore Categories</h2>
                    <Button variant="text" icon={ArrowRight}>View All</Button>
                </div>

                <div className="categories-grid">
                    {categories.map((category, idx) => (
                        <Card key={idx} hoverable className="category-card">
                            <CardBody className="category-body">
                                <div className="category-icon-wrapper">
                                    {category.icon}
                                </div>
                                <div>
                                    <h3 className="category-title">{category.title}</h3>
                                    <p className="category-count">{category.count} Resources</p>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Trending Books */}
            <section className="trending-section bg-light">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Trending Books</h2>
                        <Link to="/library">
                            <Button variant="outline">Browse Library</Button>
                        </Link>
                    </div>

                    <div className="books-grid">
                        {trendingBooks.map((book) => (
                            <Card key={book.id} hoverable className="book-card">
                                <div className="book-image-container">
                                    <img src={book.image} alt={book.title} className="book-image" />
                                    <div className="book-rating">
                                        <Star className="text-warning" size={14} fill="currentColor" />
                                        <span>{book.rating}</span>
                                    </div>
                                </div>
                                <CardBody className="book-info">
                                    <h3 className="book-title" title={book.title}>{book.title}</h3>
                                    <p className="book-author">{book.author}</p>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section container">
                <div className="cta-card">
                    <div className="cta-content">
                        <h2 className="cta-title">Ready to start your learning journey?</h2>
                        <p className="cta-text">Join thousands of students and get access to premium learning materials.</p>
                        <Link to="/register">
                            <Button variant="primary" size="lg">Create Free Account</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Simple Footer Placeholder */}
            <footer className="footer bg-dark">
                <div className="container footer-content">
                    <div className="footer-brand">
                        <Book size={24} className="text-secondary" />
                        <span className="footer-logo-text">EduLibrary</span>
                    </div>
                    <div className="footer-links">
                        <Link to="/about">About Us</Link>
                        <Link to="/contact">Contact</Link>
                        <Link to="#">Privacy Policy</Link>
                    </div>
                    <div className="footer-copy">
                        &copy; {new Date().getFullYear()} EduLibrary. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
