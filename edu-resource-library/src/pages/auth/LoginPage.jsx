import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, BookOpen } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card, { CardBody } from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const LoginPage = () => {
    const [searchParams] = useSearchParams();
    const initialRole = searchParams.get('role') === 'admin' ? 'admin' : 'user';

    const [role, setRole] = useState(initialRole);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Validation states
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!email || !email.includes('@')) {
            setError('Please enter a valid email address.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setLoading(true);
        const success = await login({ email, password });
        setLoading(false);

        if (success) {
            navigate(role === 'admin' ? '/dashboard/admin' : '/dashboard/user');
        } else {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="auth-container">
            <Card className="auth-card animate-fade-in">
                <CardBody className="auth-card-body">
                    <div className="auth-header">
                        <Link to="/" className="auth-logo">
                            <BookOpen size={32} className="text-secondary" />
                        </Link>
                        <h1 className="auth-title">Welcome Back</h1>
                        <p className="auth-subtitle">Log in to access your dashboard</p>
                    </div>

                    <div className="role-selector">
                        <button
                            className={`role-btn ${role === 'user' ? 'active' : ''}`}
                            onClick={() => setRole('user')}
                            type="button"
                        >
                            Student / User
                        </button>
                        <button
                            className={`role-btn ${role === 'admin' ? 'active' : ''}`}
                            onClick={() => setRole('admin')}
                            type="button"
                        >
                            Administrator
                        </button>
                    </div>

                    {error && <div className="auth-error-banner" style={{ color: '#dc3545', background: '#ffe6e6', padding: '10px', borderRadius: '4px', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}

                    <form className="auth-form" onSubmit={handleLogin}>
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

                        <div className="auth-options">
                            <label className="remember-me">
                                <input type="checkbox" /> Remember me
                            </label>
                            <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
                        </div>

                        <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </Button>
                    </form>

                    <div className="auth-footer">
                        <p>Don't have an account? <Link to="/register" className="auth-link">Sign up</Link></p>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default LoginPage;
