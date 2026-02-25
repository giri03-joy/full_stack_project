import React, { useState } from 'react';
import Card, { CardHeader, CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { User, Mail, Shield, Camera } from 'lucide-react';

const UserProfile = () => {
    // Mock user for UI testing
    const user = { name: 'Rajes', email: 'rajes@example.com', role: 'user' };

    // Simulate local state for editing profile
    const [profileData, setProfileData] = useState({
        name: user?.name || 'Student User',
        email: user?.email || 'student@example.com',
        bio: 'Aspiring software engineer learning full stack development.',
    });

    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        }, 1000);
    };

    return (
        <div className="dashboard-content-section animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Card>
                <CardHeader title="Profile Settings" />
                <CardBody>
                    {saveSuccess && (
                        <div className="alert alert-success mb-6 p-3 bg-success-light text-success rounded border border-success">
                            Profile updated successfully!
                        </div>
                    )}

                    <div className="profile-header flex flex-col md:flex-row items-center gap-6 mb-8 pb-8 border-b border-border">
                        <div className="profile-avatar-wrapper relative">
                            <div className="avatar-circle w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold">
                                {profileData.name.charAt(0)}
                            </div>
                            <button className="absolute bottom-0 right-0 bg-white border border-border p-2 rounded-full shadow-sm hover:bg-bg-secondary transition-colors cursor-pointer text-text-primary" title="Update Photo">
                                <Camera size={16} />
                            </button>
                        </div>
                        <div className="profile-info text-center md:text-left">
                            <h2 className="text-2xl font-bold mb-1">{profileData.name}</h2>
                            <p className="text-muted flex items-center justify-center md:justify-start gap-1">
                                <Shield size={14} /> {user?.role === 'admin' ? 'Administrator' : 'Student Account'}
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSave} className="profile-form">
                        <h3 className="text-lg font-semibold mb-4 border-b border-border pb-2">Personal Information</h3>
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            <Input
                                label="Full Name"
                                name="name"
                                value={profileData.name}
                                onChange={handleChange}
                                icon={<User size={18} />}
                            />
                            <Input
                                label="Email Address"
                                type="email"
                                name="email"
                                value={profileData.email}
                                onChange={handleChange}
                                icon={<Mail size={18} />}
                                disabled // Simulate un-editable email
                            />
                        </div>

                        <div className="input-group mb-6">
                            <label className="input-label">Bio / About Me</label>
                            <textarea
                                name="bio"
                                className="input-field"
                                rows="4"
                                value={profileData.bio}
                                onChange={handleChange}
                                placeholder="Tell us a bit about yourself..."
                            ></textarea>
                        </div>

                        <div className="form-actions mt-8 flex justify-end">
                            <Button type="submit" variant="primary" disabled={isSaving}>
                                {isSaving ? 'Saving Changes...' : 'Save Profile'}
                            </Button>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default UserProfile;
