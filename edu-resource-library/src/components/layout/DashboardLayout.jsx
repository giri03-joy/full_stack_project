import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';
import './DashboardLayout.css';

const DashboardLayout = ({ children, menuItems, role }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className="dashboard-container">
            {/* Mobile Sidebar Toggle - overlay for mobile */}
            <div className="dashboard-mobile-header">
                <button className="dashboard-menu-btn" onClick={toggleSidebar}>
                    {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <h2 className="dashboard-mobile-title">
                    {role === 'admin' ? 'Admin Panel' : 'My Dashboard'}
                </h2>
            </div>

            <div className={`dashboard-sidebar-wrapper ${sidebarOpen ? 'open' : ''}`}>
                <Sidebar menuItems={menuItems} role={role} />
            </div>

            {sidebarOpen && (
                <div className="sidebar-overlay" onClick={toggleSidebar}></div>
            )}

            <main className="dashboard-main">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
