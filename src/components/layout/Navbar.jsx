import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Search, Menu, X, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar glass-panel">
            <div className="container navbar-container">

                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <BookOpen className="logo-icon" size={28} />
                    <span className="logo-text">EduLibrary</span>
                </Link>

                {/* Desktop Search Bar */}
                <div className="navbar-search desktop-only">
                    <Search className="search-icon" size={20} />
                    <input type="text" placeholder="Search books, courses..." className="search-input" />
                </div>

                {/* Desktop Navigation Links */}
                <div className="navbar-links desktop-only">
                    <Link to="/library" className="nav-link">Library</Link>
                    <Link to="/courses" className="nav-link">Courses</Link>
                    <div className="nav-divider"></div>
                    {user ? (
                        <>
                            <Link to={`/dashboard/${user.role}`} className="btn btn-text">
                                <User size={18} className="btn-icon" /> Dashboard
                            </Link>
                            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-text">Login</Link>
                            <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle Button */}
                <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="mobile-menu animate-fade-in">
                    <div className="mobile-search">
                        <Search className="search-icon" size={20} />
                        <input type="text" placeholder="Search books..." className="search-input" />
                    </div>
                    <div className="mobile-links">
                        <Link to="/library" className="mobile-nav-link" onClick={toggleMobileMenu}>Library</Link>
                        <Link to="/courses" className="mobile-nav-link" onClick={toggleMobileMenu}>Courses</Link>
                        <div className="mobile-auth-links">
                            {user ? (
                                <>
                                    <Link to={`/dashboard/${user.role}`} className="btn btn-primary mobile-btn" onClick={toggleMobileMenu}>Dashboard</Link>
                                    <button onClick={() => { handleLogout(); toggleMobileMenu(); }} className="btn btn-outline mobile-btn">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="btn btn-outline mobile-btn" onClick={toggleMobileMenu}>Login</Link>
                                    <Link to="/register" className="btn btn-primary mobile-btn" onClick={toggleMobileMenu}>Sign Up</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
