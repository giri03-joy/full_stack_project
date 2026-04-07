import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiFetch } from '../utils/api';
import { useAuth } from './AuthContext';

export const CourseContext = createContext(null);

export const useCourses = () => useContext(CourseContext);

export const CourseProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const { user } = useAuth();

    // Fetch all courses
    useEffect(() => {
        const fetchCourses = async () => {
            if (!user) return; // Prevent unauthenticated fetch
            try {
                const data = await apiFetch('/courses');
                setCourses(data);
            } catch (error) {
                console.error("Failed to fetch courses", error);
            }
        };
        fetchCourses();
    }, [user]);

    // Fetch enrolled courses for user
    useEffect(() => {
        const fetchEnrolled = async () => {
            if (user && user.id) {
                try {
                    const data = await apiFetch(`/users/${user.id}/courses`);
                    // Backends returns UserCourse entities with `course` and `progress`
                    // Let's flatten them for the mock structure
                    const formatted = data.map(uc => ({
                        ...uc.course,
                        progress: uc.progress
                    }));
                    setEnrolledCourses(formatted);
                } catch (error) {
                    console.error("Failed to fetch enrolled courses", error);
                }
            } else {
                setEnrolledCourses([]);
            }
        };
        fetchEnrolled();
    }, [user]);

    const enrollCourse = async (courseId) => {
        if (!user || !user.id) return;
        
        try {
            const data = await apiFetch(`/users/${user.id}/courses/${courseId}`, { method: 'POST' });
            if (data.course) {
                setEnrolledCourses(prev => [...prev, { ...data.course, progress: data.progress }]);
            }
        } catch (error) {
            console.error("Failed to enroll in course", error);
        }
    };

    const updateProgress = async (courseId, newProgress) => {
        if (!user || !user.id) return;
        
        const clampedProgress = Math.min(100, Math.max(0, newProgress));
        
        // Optimistic update
        setEnrolledCourses(prev => prev.map(course =>
            course.id === courseId ? { ...course, progress: clampedProgress } : course
        ));

        try {
            await apiFetch(`/users/${user.id}/courses/${courseId}/progress`, {
                method: 'PUT',
                body: JSON.stringify({ progress: clampedProgress })
            });
        } catch (error) {
            console.error("Failed to update progress", error);
        }
    };

    return (
        <CourseContext.Provider value={{
            courses,
            enrolledCourses,
            enrollCourse,
            updateProgress
        }}>
            {children}
        </CourseContext.Provider>
    );
};
