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
import { useAuth } from '../../context/AuthContext';
import { useCourses } from '../../context/CourseContext';
import { useBooks } from '../../context/BookContext';

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
    const { user } = useAuth();
    const { enrolledCourses } = useCourses();
    const { savedBookIds } = useBooks();

    const totalProgress = enrolledCourses.reduce((sum, c) => sum + (c.progress || 0), 0);
    const avgProgress = enrolledCourses.length > 0 ? Math.round(totalProgress / enrolledCourses.length) : 0;

    return (
        <div className="dashboard-page animate-fade-in">
            <header className="dashboard-header">
                <h1 className="dashboard-title">Welcome back, {user?.name || 'Student'}!</h1>
                <p className="dashboard-subtitle">Here is an overview of your active learning progress.</p>
            </header>

            <div className="stats-grid">
                <Card>
                    <CardBody className="stat-card">
                        <div className="stat-icon-wrapper bg-primary-light">
                            <TrendingUp size={24} className="text-primary" />
                        </div>
                        <div className="stat-info">
                            <h3 className="stat-value">{avgProgress}%</h3>
                            <p className="stat-label">Avg Course Completion</p>
                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody className="stat-card">
                        <div className="stat-icon-wrapper bg-secondary-light">
                            <Bookmark size={24} className="text-secondary" />
                        </div>
                        <div className="stat-info">
                            <h3 className="stat-value">{savedBookIds.length}</h3>
                            <p className="stat-label">Saved Books</p>
                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody className="stat-card">
                        <div className="stat-icon-wrapper bg-warning-light">
                            <BookOpen size={24} className="text-warning" />
                        </div>
                        <div className="stat-info">
                            <h3 className="stat-value">{enrolledCourses.length}</h3>
                            <p className="stat-label">Active Enrollments</p>
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div className="dashboard-content-grid">
                <Card className="full-height">
                    <CardHeader title="Activity Logs" />
                    <CardBody>
                        <ul className="activity-list">
                            {enrolledCourses.slice(0, 3).map((course, idx) => (
                                <li className="activity-item" key={idx}>
                                    <div className="activity-indicator"></div>
                                    <div className="activity-content">
                                        <p className="activity-title">Enrolled in "{course.title}"</p>
                                        <p className="activity-time">Recently</p>
                                    </div>
                                </li>
                            ))}
                            <li className="activity-item">
                                <div className="activity-indicator"></div>
                                <div className="activity-content">
                                    <p className="activity-title">Account Created</p>
                                    <p className="activity-time">Active</p>
                                </div>
                            </li>
                        </ul>
                    </CardBody>
                </Card>

                <Card className="full-height">
                    <CardHeader title="Enrolled Courses" />
                    <CardBody>
                        <div className="course-progress-list">
                            {enrolledCourses.length > 0 ? enrolledCourses.map(course => (
                                <div className="course-progress-item" key={course.id}>
                                    <div className="course-header">
                                        <span className="course-name">{course.title}</span>
                                        <span className="course-percentage">{course.progress}%</span>
                                    </div>
                                    <div className="progress-bar-bg">
                                        <div className={`progress-bar-fill ${course.progress === 100 ? 'bg-success' : 'bg-primary'}`} style={{ width: `${course.progress}%` }}></div>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-muted text-sm">No courses currently enrolled.</p>
                            )}
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
