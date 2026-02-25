import React, { useState } from 'react';
import Card, { CardHeader, CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Send, Clock, Trash2 } from 'lucide-react';

const Announcements = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [urgency, setUrgency] = useState('normal');

    const [announcements, setAnnouncements] = useState([
        {
            id: 1,
            title: 'System Maintenance Scheduled',
            content: 'The EduLibrary platform will undergo standard maintenance this weekend. Expect 1-2 hours of downtime starting Saturday at 2:00 AM.',
            date: 'Oct 24, 2023',
            urgency: 'high',
            author: 'Admin'
        },
        {
            id: 2,
            title: 'New Computer Science Textbooks Added',
            content: 'We have just uploaded 50 new textbooks covering AI, Machine Learning, and Data Structures. Check the library to download them!',
            date: 'Oct 20, 2023',
            urgency: 'normal',
            author: 'Librarian'
        }
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) return;

        const newAnnouncement = {
            id: Date.now(),
            title,
            content,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            urgency,
            author: 'Admin' // Hardcoded for simulation
        };

        setAnnouncements([newAnnouncement, ...announcements]);
        setTitle('');
        setContent('');
        setUrgency('normal');
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this announcement?')) {
            setAnnouncements(announcements.filter(a => a.id !== id));
        }
    };

    const getUrgencyColor = (level) => {
        switch (level) {
            case 'high': return 'var(--danger-color)';
            case 'normal': return 'var(--primary-color)';
            case 'low': return 'var(--text-muted)';
            default: return 'var(--primary-color)';
        }
    };

    return (
        <div className="dashboard-content-section animate-fade-in dashboard-announcements">
            <header className="mb-6">
                <h2 className="text-2xl font-bold">Announcements</h2>
                <p className="text-muted">Broadcast messages, platform updates, and alerts to all users.</p>
            </header>

            <div className="dashboard-content-grid" style={{ gridTemplateColumns: '1fr 2fr' }}>

                {/* Create Announcement Form */}
                <div className="create-announcement-col">
                    <Card className="full-height">
                        <CardHeader title="Create New Announcement" />
                        <CardBody>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <Input
                                    label="Announcement Title"
                                    name="title"
                                    placeholder="e.g., New Courses Available"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />

                                <div className="input-group">
                                    <label className="input-label">Message Content</label>
                                    <textarea
                                        className="input-field"
                                        rows="5"
                                        placeholder="Type the announcement details here..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                        style={{ resize: 'vertical', minHeight: '120px' }}
                                    ></textarea>
                                </div>

                                <div className="input-group">
                                    <label className="input-label">Urgency Level</label>
                                    <select
                                        className="input-field"
                                        value={urgency}
                                        onChange={(e) => setUrgency(e.target.value)}
                                    >
                                        <option value="normal">Normal (Information)</option>
                                        <option value="high">High (Alert / Maintenance)</option>
                                        <option value="low">Low (Minor Update)</option>
                                    </select>
                                </div>

                                <Button type="submit" variant="primary" icon={Send} className="mt-2 w-full justify-center">
                                    Publish Announcement
                                </Button>
                            </form>
                        </CardBody>
                    </Card>
                </div>

                {/* Announcement Feed */}
                <div className="announcement-feed-col">
                    <Card className="full-height">
                        <CardHeader title="Published Announcements" />
                        <CardBody className="p-0">
                            {announcements.length === 0 ? (
                                <div className="p-8 text-center text-muted border-t border-border">
                                    <p>No announcements published yet.</p>
                                </div>
                            ) : (
                                <div className="announcement-list">
                                    {announcements.map((announcement) => (
                                        <div
                                            key={announcement.id}
                                            className="announcement-item p-5 border-b border-border hover:bg-bg-secondary transition-colors"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-lg font-semibold" style={{ color: getUrgencyColor(announcement.urgency) }}>
                                                    {announcement.title}
                                                </h3>
                                                <button
                                                    onClick={() => handleDelete(announcement.id)}
                                                    className="text-muted hover:text-danger bg-transparent border-0 cursor-pointer p-1"
                                                    title="Delete Announcement"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>

                                            <p className="text-text-primary mb-3 leading-relaxed">
                                                {announcement.content}
                                            </p>

                                            <div className="flex items-center text-sm text-muted gap-4">
                                                <span className="flex items-center gap-1">
                                                    <Clock size={14} /> {announcement.date}
                                                </span>
                                                <span className="font-medium">
                                                    By {announcement.author}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </div>

            </div>
        </div>
    );
};

export default Announcements;
