import React from 'react';
import Card, { CardHeader, CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { CheckSquare, AlertCircle, PlayCircle, Award } from 'lucide-react';

const Quizzes = () => {
    // Mock Data for Quizzes
    const pendingQuizzes = [
        { id: 1, title: 'Basics of Algorithms', course: 'Introduction to Algorithms', questions: 15, time: '20 mins', difficulty: 'Medium' },
        { id: 2, title: 'React Hooks Deep Dive', course: 'Advanced React patterns', questions: 10, time: '15 mins', difficulty: 'Hard' },
    ];

    const completedQuizzes = [
        { id: 3, title: 'Data Structures 101', course: 'Data Structures in Java', score: 92, date: 'Oct 15, 2023' },
        { id: 4, title: 'Machine Learning Concepts', course: 'Machine Learning A-Z', score: 85, date: 'Oct 10, 2023' },
        { id: 5, title: 'HTML & CSS Fundamentals', course: 'Full Stack Web Development', score: 100, date: 'Sep 28, 2023' },
    ];

    return (
        <div className="dashboard-content-section animate-fade-in dashboard-quizzes">
            <header className="mb-6">
                <h2 className="text-2xl font-bold">Quizzes & Assessments</h2>
                <p className="text-muted">Test your knowledge and track your assessment scores.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Pending Quizzes */}
                <div className="quiz-column">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <AlertCircle className="text-warning" size={20} /> Pending Assessments
                    </h3>

                    {pendingQuizzes.length === 0 ? (
                        <Card className="text-center p-8">
                            <CardBody>
                                <CheckSquare size={48} className="text-muted mx-auto mb-4" />
                                <p className="text-muted">You have no pending quizzes. Great job!</p>
                            </CardBody>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {pendingQuizzes.map(quiz => (
                                <Card key={quiz.id} hoverable className="border-l-4 border-warning">
                                    <CardBody className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <h4 className="text-lg font-bold">{quiz.title}</h4>
                                            <p className="text-sm text-text-primary mb-2 line-clamp-1">{quiz.course}</p>
                                            <div className="flex gap-3 text-xs text-muted font-medium">
                                                <span className="bg-bg-secondary px-2 py-1 rounded">{quiz.questions} Questions</span>
                                                <span className="bg-bg-secondary px-2 py-1 rounded">{quiz.time}</span>
                                                <span className={`px-2 py-1 rounded ${quiz.difficulty === 'Hard' ? 'bg-danger-light text-danger' :
                                                    quiz.difficulty === 'Medium' ? 'bg-warning-light text-warning' :
                                                        'bg-success-light text-success'
                                                    }`}>
                                                    {quiz.difficulty}
                                                </span>
                                            </div>
                                        </div>
                                        <Button variant="primary" icon={PlayCircle} className="whitespace-nowrap w-full sm:w-auto mt-2 sm:mt-0">
                                            Start Quiz
                                        </Button>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Completed Quizzes */}
                <div className="quiz-column">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Award className="text-success" size={20} /> Completed Assessments
                    </h3>

                    <div className="space-y-4">
                        {completedQuizzes.map(quiz => (
                            <Card key={quiz.id} hoverable className="border-l-4 border-success bg-success-light bg-opacity-10">
                                <CardBody className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <h4 className="text-lg font-bold">{quiz.title}</h4>
                                        <p className="text-sm text-text-primary mb-2 line-clamp-1">{quiz.course}</p>
                                        <div className="text-xs text-muted font-medium">
                                            Completed on {quiz.date}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end mt-2 sm:mt-0 pb-2 sm:pb-0 border-b sm:border-0 border-border">
                                        <div className="text-right">
                                            <div className="text-xs text-muted uppercase tracking-wider mb-1 font-semibold">Score</div>
                                            <div className={`text-2xl font-bold ${quiz.score >= 90 ? 'text-success' : 'text-primary'}`}>
                                                {quiz.score}%
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Quizzes;
