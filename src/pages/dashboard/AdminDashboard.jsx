import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BookOpen, Users, PieChart, UploadCloud, Layers, Megaphone } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card, { CardHeader, CardBody } from '../../components/ui/Card';
import { DataTable } from '../../components/ui/DataTable';
import Button from '../../components/ui/Button';
import ManageBooks from './admin/ManageBooks';
import UploadMaterials from './admin/UploadMaterials';
import ManageUsers from './admin/ManageUsers';
import Categories from './admin/Categories';
import Analytics from './admin/Analytics';
import Announcements from './admin/Announcements';
import UserProfile from './user/UserProfile';
import { useUsers } from '../../context/UserContext';
import './DashboardPages.css';

const adminMenuItems = [
    { label: 'Profile', path: '/dashboard/admin/profile', icon: 'User' },
    { label: 'Manage Books', path: '/dashboard/admin/books', icon: 'BookOpen' },
    { label: 'Upload Materials', path: '/dashboard/admin/upload', icon: 'UploadCloud' },
    { label: 'Manage Users', path: '/dashboard/admin/users', icon: 'Users' },
    { label: 'Categories', path: '/dashboard/admin/categories', icon: 'Layers' },
    { label: 'Analytics', path: '/dashboard/admin/analytics', icon: 'PieChart' },
    { label: 'Announcements', path: '/dashboard/admin/announcements', icon: 'Megaphone' },
];

// Removed static mockUsers, using useUsers context instead

const userColumns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' },
    {
        header: 'Status',
        render: (row) => (
            <span className={`status-badge status-${row.status.toLowerCase()}`}>
                {row.status}
            </span>
        )
    },
    {
        header: 'Actions',
        render: (row) => (
            <div className="action-buttons">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="danger" size="sm">Delete</Button>
            </div>
        )
    }
];

const AdminDashboardOverview = () => {
    const { usersList } = useUsers();

    return (
        <div className="dashboard-page animate-fade-in">
            <header className="dashboard-header">
                <h1 className="dashboard-title">Admin Control Panel</h1>
                <p className="dashboard-subtitle">Manage platform resources and track key metrics.</p>
            </header>

            <div className="stats-grid">
                <Card>
                    <CardBody className="stat-card">
                        <div className="stat-icon-wrapper bg-primary-light">
                            <BookOpen size={24} className="text-primary" />
                        </div>
                        <div className="stat-info">
                            <h3 className="stat-value">1,248</h3>
                            <p className="stat-label">Total Books</p>
                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody className="stat-card">
                        <div className="stat-icon-wrapper bg-secondary-light">
                            <Users size={24} className="text-secondary" />
                        </div>
                        <div className="stat-info">
                            <h3 className="stat-value">8,432</h3>
                            <p className="stat-label">Active Users</p>
                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody className="stat-card">
                        <div className="stat-icon-wrapper bg-success-light">
                            <UploadCloud size={24} className="text-success" />
                        </div>
                        <div className="stat-info">
                            <h3 className="stat-value">345</h3>
                            <p className="stat-label">New Uploads (This month)</p>
                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody className="stat-card">
                        <div className="stat-icon-wrapper bg-warning-light">
                            <PieChart size={24} className="text-warning" />
                        </div>
                        <div className="stat-info">
                            <h3 className="stat-value">$4.2k</h3>
                            <p className="stat-label">Revenue Generate</p>
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div className="dashboard-content-section mt-4">
                <Card>
                    <CardHeader
                        title="Recent User Registrations"
                        action={<Button variant="outline" size="sm">View All</Button>}
                    />
                    <CardBody className="no-padding">
                        <DataTable columns={userColumns} data={usersList.slice(0, 5)} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

const AdminDashboard = () => {
    return (
        <DashboardLayout menuItems={adminMenuItems} role="admin">
            <Routes>
                <Route path="/" element={<AdminDashboardOverview />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="books" element={<ManageBooks />} />
                <Route path="upload" element={<UploadMaterials />} />
                <Route path="users" element={<ManageUsers />} />
                <Route path="categories" element={<Categories />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="announcements" element={<Announcements />} />
                <Route path="*" element={<Navigate to="/dashboard/admin" replace />} />
            </Routes>
        </DashboardLayout>
    );
};

export default AdminDashboard;
