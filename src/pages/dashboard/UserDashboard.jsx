import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BookOpen, Bookmark, TrendingUp, CheckSquare, Bell, User, Library } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card, { CardHeader, CardBody } from '../../components/ui/Card';
import UserProfile from './user/UserProfile';
import MyCourses from './user/MyCourses';
import SavedBooks from './user/SavedBooks';
import LearningProgress from './user/LearningProgress';
import Quizzes from './user/Quizzes';
import './DashboardPages.css';

const userMenuItems = [
    { label: 'Profile', path: '/dashboard/user/profile', icon: 'User' },
    { label: 'Browse Library', path: '/library', icon: 'Library' },
    { label: 'My Courses', path: '/dashboard/user/courses', icon: 'BookOpen' },
    { label: 'Saved Books', path: '/dashboard/user/saved', icon: 'Bookmark' },
    { label: 'Learning Progress', path: '/dashboard/user/progress', icon: 'TrendingUp' },
    { label: 'Quizzes', path: '/dashboard/user/quizzes', icon: 'CheckSquare' },
    { label: 'Notifications', path: '/dashboard/user/notifications', icon: 'Bell' },
];

const UserDashboardOverview = () => {
    return (
        <div className="dashboard-page animate-fade-in">
            <header className="dashboard-header">
                <h1 className="dashboard-title">Welcome back, Student!</h1>
                <p className="dashboard-subtitle">Here is an overview of your learning progress.</p>
            </header>

            <div className="stats-grid">
                <Card>
                    <CardBody className="stat-card">
                        <div className="stat-icon-wrapper bg-primary-light">
                            <TrendingUp size={24} className="text-primary" />
                        </div>
                        <div className="stat-info">
                            <h3 className="stat-value">85%</h3>
                            <p className="stat-label">Course Completion</p>
                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody className="stat-card">
                        <div className="stat-icon-wrapper bg-secondary-light">
                            <Bookmark size={24} className="text-secondary" />
                        </div>
                        <div className="stat-info">
                            <h3 className="stat-value">12</h3>
                            <p className="stat-label">Saved Books</p>
                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody className="stat-card">
                        <div className="stat-icon-wrapper bg-warning-light">
                            <CheckSquare size={24} className="text-warning" />
                        </div>
                        <div className="stat-info">
                            <h3 className="stat-value">4</h3>
                            <p className="stat-label">Pending Quizzes</p>
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div className="dashboard-content-grid">
                <Card className="full-height">
                    <CardHeader title="Recent Learning Activity" />
                    <CardBody>
                        <ul className="activity-list">
                            <li className="activity-item">
                                <div className="activity-indicator"></div>
                                <div className="activity-content">
                                    <p className="activity-title">Viewed "Introduction to Algorithms"</p>
                                    <p className="activity-time">2 hours ago</p>
                                </div>
                            </li>
                            <li className="activity-item">
                                <div className="activity-indicator"></div>
                                <div className="activity-content">
                                    <p className="activity-title">Completed Data Structures Quiz</p>
                                    <p className="activity-time">Yesterday</p>
                                </div>
                            </li>
                            <li className="activity-item">
                                <div className="activity-indicator"></div>
                                <div className="activity-content">
                                    <p className="activity-title">Saved "Clean Code" to Reading List</p>
                                    <p className="activity-time">3 days ago</p>
                                </div>
                            </li>
                        </ul>
                    </CardBody>
                </Card>

                <Card className="full-height">
                    <CardHeader title="Enrolled Courses" />
                    <CardBody>
                        <div className="course-progress-list">
                            <div className="course-progress-item">
                                <div className="course-header">
                                    <span className="course-name">Advanced Mathematics</span>
                                    <span className="course-percentage">60%</span>
                                </div>
                                <div className="progress-bar-bg">
                                    <div className="progress-bar-fill" style={{ width: '60%' }}></div>
                                </div>
                            </div>
                            <div className="course-progress-item">
                                <div className="course-header">
                                    <span className="course-name">Computer Science 101</span>
                                    <span className="course-percentage">90%</span>
                                </div>
                                <div className="progress-bar-bg">
                                    <div className="progress-bar-fill bg-success" style={{ width: '90%' }}></div>
                                </div>
                            </div>
                            <div className="course-progress-item">
                                <div className="course-header">
                                    <span className="course-name">Physics for Engineers</span>
                                    <span className="course-percentage">25%</span>
                                </div>
                                <div className="progress-bar-bg">
                                    <div className="progress-bar-fill bg-warning" style={{ width: '25%' }}></div>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

const UserDashboard = () => {
    return (
        <DashboardLayout menuItems={userMenuItems} role="user">
            <Routes>
                <Route path="/" element={<UserDashboardOverview />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="courses" element={<MyCourses />} />
                <Route path="saved" element={<SavedBooks />} />
                <Route path="progress" element={<LearningProgress />} />
                <Route path="quizzes" element={<Quizzes />} />
                <Route path="notifications" element={<div><h2>Notifications</h2><p>Notifications list coming soon.</p></div>} />
                <Route path="*" element={<Navigate to="/dashboard/user" replace />} />
            </Routes>
        </DashboardLayout>
    );
};

export default UserDashboard;
