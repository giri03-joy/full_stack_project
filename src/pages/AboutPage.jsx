import React from 'react';
import { Users, Target, BookOpen, Shield } from 'lucide-react';
import Card, { CardBody } from '../components/ui/Card';
import './InfoPages.css';

const AboutPage = () => {
    const team = [
        { name: 'Dr. Sarah Connor', role: 'Chief Learning Officer', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200' },
        { name: 'Michael Chen', role: 'Head of Technology', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200' },
        { name: 'Elena Rodriguez', role: 'Curriculum Director', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200' },
        { name: 'David Smith', role: 'Student Success Lead', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200' },
    ];

    return (
        <div className="info-page">
            <div className="info-hero bg-primary text-white">
                <div className="container info-hero-content animate-fade-in">
                    <h1 className="info-title">About EduLibrary</h1>
                    <p className="info-subtitle">Empowering learners worldwide through accessible, high-quality digital education resources.</p>
                </div>
            </div>

            <div className="container mt-neg-50">
                <div className="mission-vision-grid">
                    <Card className="mission-card">
                        <CardBody className="mission-body">
                            <div className="mission-icon">
                                <Target size={32} className="text-secondary" />
                            </div>
                            <h2>Our Mission</h2>
                            <p>To democratize education by providing a comprehensive, interactive, and accessible digital library for students and educators globally.</p>
                        </CardBody>
                    </Card>
                    <Card className="mission-card">
                        <CardBody className="mission-body">
                            <div className="mission-icon">
                                <BookOpen size={32} className="text-warning" />
                            </div>
                            <h2>Our Vision</h2>
                            <p>A world where anyone, anywhere can transform their life through access to world-class learning materials and continuous education.</p>
                        </CardBody>
                    </Card>
                    <Card className="mission-card">
                        <CardBody className="mission-body">
                            <div className="mission-icon">
                                <Shield size={32} className="text-success" />
                            </div>
                            <h2>Our Values</h2>
                            <p>We believe in accessibility, academic integrity, continuous innovation, and building a supportive global learning community.</p>
                        </CardBody>
                    </Card>
                </div>
            </div>

            <div className="team-section container mt-4">
                <div className="section-header text-center">
                    <h2 className="section-title">Meet Our Leadership Team</h2>
                    <p className="text-muted mt-4">The minds behind the platform</p>
                </div>

                <div className="team-grid">
                    {team.map((member, idx) => (
                        <Card key={idx} hoverable className="team-card">
                            <CardBody className="team-card-body">
                                <img src={member.image} alt={member.name} className="team-image" />
                                <h3 className="team-name">{member.name}</h3>
                                <p className="team-role">{member.role}</p>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
