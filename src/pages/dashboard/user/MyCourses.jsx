import React from 'react';
import { useCourses } from '../../../context/CourseContext';
import Card, { CardBody, CardHeader } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { PlayCircle, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyCourses = () => {
    const { enrolledCourses } = useCourses();
    const navigate = useNavigate();

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
                                        variant={course.progress === 100 ? "outline" : "primary"}
                                        fullWidth
                                        icon={course.progress === 100 ? CheckCircle : PlayCircle}
                                    >
                                        {course.progress === 100 ? 'Review Material' : (course.progress > 0 ? 'Resume Lesson' : 'Start Course')}
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyCourses;
