import React from 'react';
import Card, { CardHeader, CardBody } from '../../../components/ui/Card';
import { useCourses } from '../../../context/CourseContext';
import { Award, Clock, BookOpen, Target, CheckCircle } from 'lucide-react';

const LearningProgress = () => {
    const { enrolledCourses } = useCourses();

    // Derived stats
    const totalEnrolled = enrolledCourses.length;
    const completedCourses = enrolledCourses.filter(c => c.progress === 100).length;
    const activeCourses = totalEnrolled - completedCourses;

    // Calculate average progress
    const averageProgress = totalEnrolled > 0
        ? Math.round(enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / totalEnrolled)
        : 0;

    // Fixed mock analytics data
    const totalStudyHours = 124;
    const weeklyTarget = 15;
    const currentWeekHours = 11.5;

    // Mock recent activity log
    const recentActivity = [
        { id: 1, action: 'Completed module: Neural Networks', course: 'Machine Learning A-Z', time: '2 hours ago', icon: CheckCircle, color: 'text-success' },
        { id: 2, action: 'Read 40 pages', course: 'Clean Code: A Handbook', time: 'Yesterday', icon: BookOpen, color: 'text-primary' },
        { id: 3, action: 'Enrolled in new course', course: 'Advanced React patterns', time: '3 days ago', icon: Target, color: 'text-secondary' }
    ];

    return (
        <div className="dashboard-content-section animate-fade-in dashboard-learning-progress">
            <header className="mb-6">
                <h2 className="text-2xl font-bold">Learning Progress</h2>
                <p className="text-muted">Detailed analytical insights into your learning habits.</p>
            </header>

            {/* Quick Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardBody className="flex flex-col items-center p-6">
                        <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent flex items-center justify-center mb-4" style={{ borderTopColor: 'var(--primary-color)', transform: `rotate(${averageProgress * 3.6}deg)` }}>
                            <div className="w-full h-full rounded-full flex items-center justify-center bg-transparent" style={{ transform: `rotate(-${averageProgress * 3.6}deg)` }}>
                                <span className="text-xl font-bold text-primary">{averageProgress}%</span>
                            </div>
                        </div>
                        <h3 className="text-sm text-muted uppercase tracking-wider font-semibold">Avg. Completion</h3>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody className="flex flex-col items-center justify-center p-6 text-center h-full">
                        <Award size={36} className="text-warning mb-2" />
                        <h3 className="text-3xl font-bold mb-1">{completedCourses}</h3>
                        <p className="text-sm text-muted uppercase tracking-wider font-semibold">Certificates Earned</p>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody className="flex flex-col items-center justify-center p-6 text-center h-full">
                        <BookOpen size={36} className="text-secondary mb-2" />
                        <h3 className="text-3xl font-bold mb-1">{activeCourses}</h3>
                        <p className="text-sm text-muted uppercase tracking-wider font-semibold">Active Courses</p>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody className="flex flex-col items-center justify-center p-6 text-center h-full">
                        <Clock size={36} className="text-success mb-2" />
                        <h3 className="text-3xl font-bold mb-1">{totalStudyHours}h</h3>
                        <p className="text-sm text-muted uppercase tracking-wider font-semibold">Total Time Learning</p>
                    </CardBody>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Weekly Goal Tracker */}
                <Card className="lg:col-span-1">
                    <CardHeader title="Weekly Study Goal" />
                    <CardBody className="flex flex-col justify-center gap-6 p-6">
                        <div className="text-center">
                            <h4 className="text-4xl font-bold mb-2">{currentWeekHours} <span className="text-lg text-muted font-normal">/ {weeklyTarget} hours</span></h4>
                            <p className="text-muted">You're on track to hit your goal!</p>
                        </div>

                        <div className="progress-bar-bg w-full h-4 bg-bg-secondary rounded-full overflow-hidden">
                            <div
                                className="h-full bg-success rounded-full transition-all duration-1000"
                                style={{ width: `${Math.min(100, (currentWeekHours / weeklyTarget) * 100)}%` }}
                            ></div>
                        </div>

                        <div className="flex justify-between text-xs text-muted font-semibold px-2">
                            <span>0h</span>
                            <span>Target: {weeklyTarget}h</span>
                        </div>
                    </CardBody>
                </Card>

                {/* Recent Activity Log */}
                <Card className="lg:col-span-2">
                    <CardHeader title="Recent Activity" />
                    <CardBody>
                        <div className="relative pl-6 border-l-2 border-border ml-4 mt-2 mb-4 space-y-8">
                            {recentActivity.map((activity, index) => {
                                const Icon = activity.icon;
                                return (
                                    <div key={activity.id} className="relative">
                                        <div className={`absolute -left-[35px] bg-white border-2 border-border p-1.5 rounded-full ${activity.color}`}>
                                            <Icon size={16} />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold">{activity.action}</h4>
                                            <p className="text-text-primary mt-1">{activity.course}</p>
                                            <p className="text-sm text-muted mt-2">{activity.time}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default LearningProgress;
