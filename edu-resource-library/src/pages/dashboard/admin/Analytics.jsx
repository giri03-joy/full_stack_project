import React from 'react';
import Card, { CardHeader, CardBody } from '../../../components/ui/Card';
import { useUsers } from '../../../context/UserContext';
import { useBooks } from '../../../context/BookContext';
import { TrendingUp, Users, BookOpen, Download } from 'lucide-react';

const Analytics = () => {
    const { usersList } = useUsers();
    const { books } = useBooks();

    // Mock analytical data
    const activeUsers = usersList.filter(u => u.status === 'Active').length;
    const totalDownloads = 3450;

    // Monthly signup data for a CSS bar chart
    const monthlyData = [
        { month: 'Jan', users: 120, height: '40%' },
        { month: 'Feb', users: 150, height: '50%' },
        { month: 'Mar', users: 220, height: '70%' },
        { month: 'Apr', users: 180, height: '60%' },
        { month: 'May', users: 290, height: '90%' },
        { month: 'Jun', users: 310, height: '100%' },
    ];

    // Popular categories mock data
    const categoryStats = [
        { name: 'Computer Science', percentage: 45, color: 'var(--primary-color)' },
        { name: 'Mathematics', percentage: 25, color: 'var(--secondary-color)' },
        { name: 'Physics', percentage: 15, color: 'var(--warning-color)' },
        { name: 'Other', percentage: 15, color: 'var(--text-muted)' },
    ];

    return (
        <div className="dashboard-content-section animate-fade-in dashboard-analytics">
            <header className="mb-6">
                <h2 className="text-2xl font-bold">Platform Analytics</h2>
                <p className="text-muted">Detailed insights into library usage and user engagement.</p>
            </header>

            {/* Quick Stats Grid */}
            <div className="stats-grid mb-6">
                <Card>
                    <CardBody className="stat-card">
                        <div className="stat-icon-wrapper bg-primary-light">
                            <BookOpen size={24} className="text-primary" />
                        </div>
                        <div className="stat-info">
                            <h3 className="stat-value">{books.length}</h3>
                            <p className="stat-label">Total Resources</p>
                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody className="stat-card">
                        <div className="stat-icon-wrapper bg-secondary-light">
                            <Users size={24} className="text-secondary" />
                        </div>
                        <div className="stat-info">
                            <h3 className="stat-value">{usersList.length}</h3>
                            <p className="stat-label">Registered Users</p>
                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody className="stat-card">
                        <div className="stat-icon-wrapper bg-success-light">
                            <TrendingUp size={24} className="text-success" />
                        </div>
                        <div className="stat-info">
                            <h3 className="stat-value">{Math.round((activeUsers / usersList.length) * 100) || 0}%</h3>
                            <p className="stat-label">Active Engagement</p>
                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody className="stat-card">
                        <div className="stat-icon-wrapper bg-warning-light">
                            <Download size={24} className="text-warning" />
                        </div>
                        <div className="stat-info">
                            <h3 className="stat-value">{(totalDownloads / 1000).toFixed(1)}k</h3>
                            <p className="stat-label">Total Downloads</p>
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div className="dashboard-content-grid">
                {/* CSS Bar Chart for User Growth */}
                <Card className="full-height">
                    <CardHeader title="User Growth (6 Months)" />
                    <CardBody>
                        <div className="chart-container" style={{ height: '250px', display: 'flex', alignItems: 'flex-end', gap: '1rem', paddingTop: '2rem' }}>
                            {monthlyData.map((data, index) => (
                                <div key={index} className="chart-bar-group" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                                    <div className="chart-bar-value text-xs text-muted mb-2">{data.users}</div>
                                    <div
                                        className="chart-bar bg-primary rounded-t"
                                        style={{
                                            width: '100%',
                                            maxWidth: '40px',
                                            height: data.height,
                                            transition: 'height 1s ease-out'
                                        }}
                                    ></div>
                                    <div className="chart-bar-label text-sm mt-2 font-medium">{data.month}</div>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>

                {/* Categories Distribution */}
                <Card className="full-height">
                    <CardHeader title="Resource Distribution" />
                    <CardBody>
                        <div className="distribution-list mt-4">
                            {categoryStats.map((stat, index) => (
                                <div key={index} className="distribution-item mb-4">
                                    <div className="dist-header flex justify-between mb-2">
                                        <span className="font-medium">{stat.name}</span>
                                        <span className="font-bold">{stat.percentage}%</span>
                                    </div>
                                    <div className="progress-bar-bg" style={{ height: '8px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div
                                            className="progress-bar-fill"
                                            style={{
                                                width: `${stat.percentage}%`,
                                                backgroundColor: stat.color,
                                                height: '100%',
                                                borderRadius: '4px'
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default Analytics;
