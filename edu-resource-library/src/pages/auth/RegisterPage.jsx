import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, BookOpen } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card, { CardBody } from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const RegisterPage = () => {
    const [role, setRole] = useState('user');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (name.trim().length < 2) {
            setError('Name must be at least 2 characters long.');
            return;
        }
        if (!email || !email.includes('@')) {
            setError('Please enter a valid email address.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setLoading(true);
        // Map UI role to actual backend value
        const backendRole = role === 'admin' ? 'admin' : 'user';
        
        const result = await register({
            name,
            email,
            password,
            role: backendRole,
            status: 'Active'
        });
        
        setLoading(false);

        if (result.success) {
            navigate('/login');
        } else {
            setError(result.error);
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
                    
                    {error && <div className="auth-error-banner" style={{ color: '#dc3545', background: '#ffe6e6', padding: '10px', borderRadius: '4px', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}

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
                            placeholder="Password (min 6 characters)"
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

                        <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
                            {loading ? 'Creating Account...' : 'Create Account'}
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
