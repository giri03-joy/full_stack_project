import React, { createContext, useState, useContext } from 'react';

export const CourseContext = createContext(null);

export const useCourses = () => useContext(CourseContext);

const MOCK_COURSES = [
    {
        id: 1, title: 'Full Stack Web Development', instructor: 'Tech Academy',
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600&h=400',
        duration: '48h 30m', lessons: 124, tag: 'Bestseller', progress: 0
    },
    {
        id: 2, title: 'Machine Learning A-Z', instructor: 'Dr. Data',
        thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=600&h=400',
        duration: '60h 15m', lessons: 156, tag: 'New', progress: 0
    },
    {
        id: 3, title: 'Advanced React patterns', instructor: 'UI Masters',
        thumbnail: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=600&h=400',
        duration: '12h 45m', lessons: 42, progress: 0
    },
    {
        id: 4, title: 'Data Structures in Java', instructor: 'Code Prep',
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600&h=400',
        duration: '22h 10m', lessons: 85, progress: 0
    },
];

export const CourseProvider = ({ children }) => {
    const [courses, setCourses] = useState(MOCK_COURSES);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const enrollCourse = (courseId) => {
        const courseToEnroll = courses.find(c => c.id === courseId);
        if (courseToEnroll && !enrolledCourses.some(c => c.id === courseId)) {
            // Give 0% progress on enrollment
            setEnrolledCourses(prev => [...prev, { ...courseToEnroll, progress: 0 }]);
        }
    };

    const updateProgress = (courseId, newProgress) => {
        setEnrolledCourses(prev => prev.map(course =>
            course.id === courseId
                ? { ...course, progress: Math.min(100, Math.max(0, newProgress)) }
                : course
        ));
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
