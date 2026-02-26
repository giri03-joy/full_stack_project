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
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();
        login({
            role,
            email,
            name: role === 'admin' ? 'Admin User' : 'Student User'
        }); // Trigger context login

        // Redirect based on role
        if (role === 'admin') {
            navigate('/dashboard/admin');
        } else {
            navigate('/dashboard/user');
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
                        <p className="auth-subtitle">Log in to access your {role} dashboard</p>
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

                        <Button type="submit" variant="primary" size="lg" fullWidth>
                            Sign In
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
