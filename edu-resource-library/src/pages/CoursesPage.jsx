import React, { useState } from 'react';
import { PlayCircle, Clock, Award, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardBody } from '../components/ui/Card';
import './Library.css'; // Reusing layout styles where applicable

import { useCourses } from '../context/CourseContext';

const CoursesPage = () => {
    const { courses, enrolledCourses, enrollCourse } = useCourses();
    const [activeCourse, setActiveCourse] = useState(null);
    return (
        <div className="library-page bg-main">
            <div className="courses-hero bg-secondary text-white">
                <div className="container courses-hero-content">
                    <div className="hero-text-block">
                        <h1 className="hero-title">Master New Skills</h1>
                        <p className="hero-subtitle">Learn from industry experts with our high-quality video courses. Earn certificates upon completion.</p>
                    </div>
                </div>
            </div>

            <div className="container mt-neg-50">
                <div className="courses-grid animate-fade-in">
                    {courses.map(course => {
                        const enrolledCourse = enrolledCourses.find(c => c.id === course.id);
                        const isEnrolled = !!enrolledCourse;
                        const progress = enrolledCourse ? enrolledCourse.progress : 0;

                        return (
                            <Card key={course.id} hoverable className="course-card">
                                <div className="course-thumbnail">
                                    <img src={course.thumbnail} alt={course.title} />
                                    <div className="course-play-overlay">
                                        <PlayCircle size={48} className="text-white" />
                                    </div>
                                    {course.tag && <span className="course-tag">{course.tag}</span>}
                                </div>
                                <CardBody className="course-body">
                                    <h3 className="course-title">{course.title}</h3>
                                    <p className="course-instructor">By {course.instructor}</p>

                                    <div className="course-meta">
                                        <span className="meta-item"><Clock size={14} /> {course.duration}</span>
                                        <span className="meta-item"><PlayCircle size={14} /> {course.lessons} lessons</span>
                                        <span className="meta-item"><Award size={14} /> Certificate</span>
                                    </div>

                                    {isEnrolled ? (
                                        <div className="course-progress mt-4">
                                            <div className="progress-header">
                                                <span className="progress-text">{progress}% Completed</span>
                                                {progress === 100 && <CheckCircle size={16} className="text-success" />}
                                            </div>
                                            <div className="progress-bar-bg">
                                                <div
                                                    className={`progress-bar-fill ${progress === 100 ? 'bg-success' : ''}`}
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>
                                            <Button 
                                                variant="primary" 
                                                fullWidth 
                                                className="mt-4"
                                                onClick={() => setActiveCourse(course)}
                                            >
                                                Continue on course
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            fullWidth
                                            className="mt-4"
                                            onClick={() => enrollCourse(course.id)}
                                        >
                                            Enroll Now
                                        </Button>
                                    )}
                                </CardBody>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Video Player Modal */}
            {activeCourse && (
                <div className="video-modal-overlay" style={{position: 'fixed', inset: 0, zIndex: 1050, background: 'rgba(0,0,0,0.85)', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'auto', padding: '2rem'}}>
                    <div className="bg-white p-6 rounded" style={{width: '100%', maxWidth: '800px', borderRadius: '12px', background: '#fff', padding: '2rem', color: '#1a1a1a'}}>
                        <div className="flex justify-between items-center mb-6" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem'}}>
                            <h2 style={{fontSize: '1.5rem', fontWeight: 'bold'}}>{activeCourse.title} - Video Lessons</h2>
                            <Button variant="outline" onClick={() => setActiveCourse(null)}>Close Player</Button>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
                            {activeCourse.videoUrls && activeCourse.videoUrls.length > 0 ? (
                                activeCourse.videoUrls.map((url, index) => (
                                    <div key={index} className="video-wrapper" style={{width: '100%', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>
                                        <iframe 
                                            width="100%" 
                                            height="450" 
                                            src={url} 
                                            title={`Video ${index + 1}`} 
                                            frameBorder="0" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowFullScreen>
                                        </iframe>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center p-8 rounded" style={{background: '#f8f9fa'}}>
                                    <p style={{color: '#6c757d'}}>No videos have been uploaded for this course yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoursesPage;
