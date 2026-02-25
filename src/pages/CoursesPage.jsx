import React, { useState } from 'react';
import { PlayCircle, Clock, Award, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardBody } from '../components/ui/Card';
import './Library.css'; // Reusing layout styles where applicable

import { useCourses } from '../context/CourseContext';

const CoursesPage = () => {
    const { courses, enrolledCourses, enrollCourse } = useCourses();
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
                                            <Button variant={progress === 100 ? 'outline' : 'primary'} fullWidth className="mt-4">
                                                {progress === 100 ? 'View Certificate' : 'Continue Course'}
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
        </div>
    );
};

export default CoursesPage;
