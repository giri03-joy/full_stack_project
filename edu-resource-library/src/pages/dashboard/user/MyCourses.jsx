import React, { useState } from 'react';
import { useCourses } from '../../../context/CourseContext';
import Card, { CardBody, CardHeader } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { PlayCircle, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyCourses = () => {
    const { enrolledCourses } = useCourses();
    const navigate = useNavigate();
    const [activeCourse, setActiveCourse] = useState(null);

    return (
        <div className="dashboard-content-section animate-fade-in dashboard-my-courses">
            <header className="mb-6 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">My Courses</h2>
                    <p className="text-muted">Track and resume your active learning journeys.</p>
                </div>
                <Button variant="outline" onClick={() => navigate('/courses')}>Browse More Courses</Button>
            </header>

            {enrolledCourses.length === 0 ? (
                <Card className="text-center p-12 mt-8">
                    <CardBody className="flex flex-col items-center gap-4">
                        <PlayCircle size={64} className="text-muted" />
                        <h3 className="text-xl font-bold mt-2">No active enrollments</h3>
                        <p className="text-muted max-w-md mx-auto">You haven't enrolled in any courses yet. Browse our catalog to discover new skills to learn.</p>
                        <Button variant="primary" className="mt-4" onClick={() => navigate('/courses')}>Explore Courses</Button>
                    </CardBody>
                </Card>
            ) : (
                <div className="courses-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                    {enrolledCourses.map(course => (
                        <Card key={course.id} hoverable className="course-card h-full flex flex-col">
                            <div className="course-thumbnail relative h-48 w-full">
                                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover rounded-t-lg" />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <PlayCircle size={48} className="text-white" />
                                </div>
                            </div>

                            <CardBody className="flex-grow flex flex-col">
                                <h3 className="text-lg font-bold mb-1 leading-tight">{course.title}</h3>
                                <p className="text-sm text-muted mb-4">{course.instructor}</p>

                                <div className="mt-auto">
                                    <div className="flex justify-between items-center mb-2 text-sm">
                                        <span className="font-semibold">{course.progress}% Complete</span>
                                        <span className="text-muted flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
                                    </div>

                                    <div className="progress-bar-bg w-full h-2 bg-bg-secondary rounded-full overflow-hidden mb-4">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ${course.progress === 100 ? 'bg-success' : 'bg-primary'}`}
                                            style={{ width: `${course.progress}%` }}
                                        ></div>
                                    </div>

                                    <Button
                                        variant="primary"
                                        fullWidth
                                        icon={PlayCircle}
                                        onClick={() => setActiveCourse(course)}
                                    >
                                        Continue on course
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )}

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

export default MyCourses;
