import React, { useState } from 'react';
import Card, { CardHeader, CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { CheckSquare, AlertCircle, PlayCircle, Award } from 'lucide-react';

const INITIAL_QUIZZES = [
    { 
        id: 1, 
        title: 'Cyber Security Fundamentals', 
        course: 'Ethical Hacking Masterclass', 
        questions: [
            { q: "What does the CIA triad stand for in security?", options: ["Confidentiality, Integrity, Availability", "Central Intelligence Agency", "Cyber Information Access"], a: 0 },
            { q: "Which of the following is a common one-way hashing algorithm?", options: ["AES", "RSA", "SHA-256"], a: 2 },
            { q: "What is Social Engineering?", options: ["Building a backend infrastructure", "Manipulating individuals into revealing confidential information", "Reverse compiling a software binary"], a: 1 }
        ], 
        time: '5 mins', 
        difficulty: 'Medium' 
    },
    { 
        id: 2, 
        title: 'Network Penetration Basics', 
        course: 'Advanced Penetration Testing', 
        questions: [
            { q: "Which tool is intrinsically used for network discovery and security auditing?", options: ["Nmap", "Wireshark", "Burp Suite"], a: 0 },
            { q: "What default port does secure HTTPS run on?", options: ["443", "80", "8080"], a: 0 }
        ], 
        time: '5 mins', 
        difficulty: 'Hard' 
    }
];

const Quizzes = () => {
    const [pendingQuizzes, setPendingQuizzes] = useState(INITIAL_QUIZZES);
    const [completedQuizzes, setCompletedQuizzes] = useState([]);
    
    // Quiz state
    const [activeQuiz, setActiveQuiz] = useState(null);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);

    const startQuiz = (quiz) => {
        setActiveQuiz(quiz);
        setCurrentQuestionIdx(0);
        setScore(0);
        setSelectedOptionIdx(null);
    };

    const handleNextQuestion = () => {
        if (selectedOptionIdx === null) return;

        const isCorrect = selectedOptionIdx === activeQuiz.questions[currentQuestionIdx].a;
        const newScore = isCorrect ? score + 1 : score;
        setScore(newScore);
        
        if (currentQuestionIdx + 1 < activeQuiz.questions.length) {
            setCurrentQuestionIdx(prev => prev + 1);
            setSelectedOptionIdx(null);
        } else {
            // Finish Quiz
            const percentage = Math.round((newScore / activeQuiz.questions.length) * 100);
            
            const completed = {
                id: activeQuiz.id,
                title: activeQuiz.title,
                course: activeQuiz.course,
                score: percentage,
                date: new Date().toLocaleDateString()
            };
            
            setCompletedQuizzes(prev => [completed, ...prev]);
            setPendingQuizzes(prev => prev.filter(q => q.id !== activeQuiz.id));
            setActiveQuiz(null);
        }
    };

    return (
        <div className="dashboard-content-section animate-fade-in dashboard-quizzes">
            <header className="mb-6">
                <h2 className="text-2xl font-bold">Quizzes & Assessments</h2>
                <p className="text-muted">Test your knowledge and track your assessment scores.</p>
            </header>

            {activeQuiz ? (
                <Card className="max-w-2xl mx-auto border border-primary">
                    <CardHeader title={`${activeQuiz.title} - Question ${currentQuestionIdx + 1} of ${activeQuiz.questions.length}`} />
                    <CardBody className="p-8">
                        <h3 className="text-xl font-bold mb-6">{activeQuiz.questions[currentQuestionIdx].q}</h3>
                        <div className="space-y-4">
                            {activeQuiz.questions[currentQuestionIdx].options.map((opt, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setSelectedOptionIdx(idx)}
                                    className={`w-full text-left p-4 rounded border transition-all font-medium focus:outline-none flex items-center gap-3 ${
                                        selectedOptionIdx === idx 
                                        ? 'bg-primary-light border-primary text-primary' 
                                        : 'hover:bg-bg-secondary hover:border-primary text-text-primary border-border'
                                    }`}
                                >
                                    <div className={`w-5 h-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center ${
                                        selectedOptionIdx === idx ? 'border-primary' : 'border-muted'
                                    }`}>
                                        {selectedOptionIdx === idx && <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>}
                                    </div>
                                    <span>{String.fromCharCode(65 + idx)}. {opt}</span>
                                </button>
                            ))}
                        </div>
                        <div className="mt-8 flex justify-between items-center bg-bg-secondary p-4 rounded-lg">
                            <Button variant="outline" onClick={() => setActiveQuiz(null)}>Cancel Quiz</Button>
                            <Button 
                                variant="primary" 
                                onClick={handleNextQuestion}
                                disabled={selectedOptionIdx === null}
                            >
                                {currentQuestionIdx + 1 === activeQuiz.questions.length ? 'Submit Quiz' : 'Next Question'}
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            ) : (
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
                                                    <span className="bg-bg-secondary px-2 py-1 rounded">{quiz.questions.length} Questions</span>
                                                    <span className="bg-bg-secondary px-2 py-1 rounded">{quiz.time}</span>
                                                    <span className={`px-2 py-1 rounded ${quiz.difficulty === 'Hard' ? 'bg-danger-light text-danger' : 'bg-warning-light text-warning'}`}>
                                                        {quiz.difficulty}
                                                    </span>
                                                </div>
                                            </div>
                                            <Button variant="primary" icon={PlayCircle} onClick={() => startQuiz(quiz)} className="whitespace-nowrap w-full sm:w-auto mt-2 sm:mt-0">
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
                            <Award className="text-success" size={20} /> Completed History
                        </h3>

                        {completedQuizzes.length === 0 ? (
                            <Card className="text-center p-8">
                                <CardBody>
                                    <p className="text-muted">Take a quiz to see your score history appear here.</p>
                                </CardBody>
                            </Card>
                        ) : (
                            <div className="space-y-4">
                                {completedQuizzes.map((quiz, idx) => (
                                    <Card key={idx} hoverable className="border-l-4 border-success bg-success-light bg-opacity-10">
                                        <CardBody className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                            <div>
                                                <h4 className="text-lg font-bold">{quiz.title}</h4>
                                                <p className="text-sm text-text-primary mb-2 line-clamp-1">{quiz.course}</p>
                                                <div className="text-xs text-muted font-medium">
                                                    Submitted: {quiz.date}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end mt-2 sm:mt-0 pb-2 sm:pb-0 border-b sm:border-0 border-border">
                                                <div className="text-right">
                                                    <div className="text-xs text-muted uppercase tracking-wider mb-1 font-semibold">Final Score</div>
                                                    <div className={`text-2xl font-bold ${quiz.score >= 80 ? 'text-success' : 'text-primary'}`}>
                                                        {quiz.score}%
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quizzes;
