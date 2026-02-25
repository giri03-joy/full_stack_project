import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, BookOpen } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card, { CardBody } from '../../components/ui/Card';
import './Auth.css';

const RegisterPage = () => {
    const [role, setRole] = useState('user');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // Placeholder logic
        navigate('/login');
    };

    return (
        <div className="auth-container">
            <Card className="auth-card animate-fade-in">
                <CardBody className="auth-card-body">
                    <div className="auth-header">
                        <Link to="/" className="auth-logo">
                            <BookOpen size={32} className="text-secondary" />
                        </Link>
                        <h1 className="auth-title">Create an Account</h1>
                        <p className="auth-subtitle">Sign up to start your learning journey</p>
                    </div>

                    <div className="role-selector">
                        <button
                            className={`role-btn ${role === 'user' ? 'active' : ''}`}
                            onClick={() => setRole('user')}
                            type="button"
                        >
                            Student
                        </button>
                        <button
                            className={`role-btn ${role === 'admin' ? 'active' : ''}`}
                            onClick={() => setRole('admin')}
                            type="button"
                        >
                            Educator / Admin
                        </button>
                    </div>

                    <form className="auth-form" onSubmit={handleRegister}>
                        <Input
                            icon={User}
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <Input
                            icon={Mail}
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            icon={Lock}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <div className="auth-terms">
                            <label className="terms-label">
                                <input type="checkbox" required />
                                <span>I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link></span>
                            </label>
                        </div>

                        <Button type="submit" variant="primary" size="lg" fullWidth>
                            Create Account
                        </Button>
                    </form>

                    <div className="auth-footer">
                        <p>Already have an account? <Link to="/login" className="auth-link">Log in</Link></p>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default RegisterPage;
