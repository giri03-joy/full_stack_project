import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    BookOpen,
    Library,
    Bookmark,
    TrendingUp,
    CheckSquare,
    Bell,
    User,
    Settings,
    Users,
    PieChart,
    UploadCloud,
    Layers,
    Megaphone,
    LogOut,
    Monitor,
    Shield
} from 'lucide-react';
import { useAuth } from '../../App';
import './Sidebar.css';

// Reusable mapping of icons
export const sidebarIcons = {
    BookOpen, Library, Bookmark, TrendingUp, CheckSquare, Bell, User, Settings,
    Users, PieChart, UploadCloud, Layers, Megaphone, LogOut, Monitor, Shield
};

const Sidebar = ({ menuItems, role = 'user' }) => {
    const { user, logout } = useAuth();

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2 className="sidebar-title">
                    {role === 'admin' ? 'Admin Panel' : 'My Dashboard'}
                </h2>
            </div>

            <nav className="sidebar-nav">
                <ul className="sidebar-menu">
                    {menuItems.map((item, index) => {
                        const IconComponent = item.icon ? sidebarIcons[item.icon] : BookOpen;
                        return (
                            <li key={index} className="sidebar-item">
                                <NavLink
                                    to={item.path}
                                    end={item.exact}
                                    className={({ isActive }) =>
                                        `sidebar-link ${isActive ? 'active' : ''}`
                                    }
                                >
                                    <IconComponent size={20} className="sidebar-icon" />
                                    <span>{item.label}</span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="sidebar-footer">
                {user?.role === 'admin' && (
                    <div className="admin-switch mb-2">
                        {role === 'admin' ? (
                            <NavLink to="/dashboard/user" className="sidebar-link text-primary">
                                <Monitor size={20} className="sidebar-icon" />
                                <span>View as Student</span>
                            </NavLink>
                        ) : (
                            <NavLink to="/dashboard/admin" className="sidebar-link text-primary">
                                <Shield size={20} className="sidebar-icon" />
                                <span>View as Admin</span>
                            </NavLink>
                        )}
                        <div className="sidebar-divider" style={{ margin: '10px 0', borderTop: '1px solid var(--border-color)' }}></div>
                    </div>
                )}

                <button onClick={logout} className="sidebar-link text-danger w-full text-left bg-transparent border-0 cursor-pointer p-0 m-0">
                    <LogOut size={20} className="sidebar-icon" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
