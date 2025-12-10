import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClockIcon, 
  CheckCircleIcon,
  XCircleIcon,
  ChartBarIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import {
  createMCQSession,
  submitMCQAnswer,
  completeMCQSession,
  getMCQHistory,
  getMCQTopicsAndStats
} from '../services/interviewService';

const MCQTest = () => {
  const [view, setView] = useState('setup'); // setup, test, results, history
  const [topic, setTopic] = useState('All');
  const [difficulty, setDifficulty] = useState('all');
  const [questionCount, setQuestionCount] = useState(10);
  const [currentSession, setCurrentSession] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [history, setHistory] = useState({ sessions: [], stats: {} });
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const { topics: availableTopics } = getMCQTopicsAndStats();
    setTopics(['All', ...availableTopics]);
    fetchHistory();
  }, []);

  useEffect(() => {
    if (currentSession && view === 'test' && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleCompleteTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentSession, view, timeRemaining]);

  const fetchHistory = () => {
    const historyData = getMCQHistory();
    setHistory(historyData);
  };

  const handleStartTest = () => {
    const session = createMCQSession({
      topic: topic === 'All' ? null : topic,
      difficulty: difficulty === 'all' ? null : difficulty,
      questionCount: parseInt(questionCount),
      timeLimit: parseInt(questionCount) * 60 // 1 minute per question
    });
    
    setCurrentSession(session);
    setTimeRemaining(session.timeLimit);
    setView('test');
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (!showFeedback) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      alert('Please select an answer');
      return;
    }

    const currentQ = currentSession.questions[currentSession.currentQuestionIndex];
    const result = submitMCQAnswer(
      currentSession.id,
      currentSession.currentQuestionIndex,
      selectedAnswer,
      60
    );

    setFeedback(result);
    setShowFeedback(true);

    // Update session
    const updatedSession = { ...currentSession };
    updatedSession.questions[currentSession.currentQuestionIndex].userAnswer = selectedAnswer;
    updatedSession.questions[currentSession.currentQuestionIndex].isCorrect = result.isCorrect;
    setCurrentSession(updatedSession);

    // Auto move to next question after 3 seconds
    setTimeout(() => {
      handleNextQuestion();
    }, 3000);
  };

  const handleNextQuestion = () => {
    if (currentSession.currentQuestionIndex < currentSession.questions.length - 1) {
      setCurrentSession(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
      setSelectedAnswer(null);
      setShowFeedback(false);
      setFeedback(null);
    } else {
      handleCompleteTest();
    }
  };

  const handleCompleteTest = () => {
    const completed = completeMCQSession(currentSession.id);
    setCurrentSession(completed);
    setView('results');
    fetchHistory();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = currentSession?.questions[currentSession.currentQuestionIndex];

  return (
    <div className="mcq-test-container min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            MCQ Test Center
          </h1>
          <p className="text-gray-600">Test your knowledge with 100 carefully curated questions</p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          {['setup', 'history'].map((tab) => (
            <button
              key={tab}
              onClick={() => setView(tab)}
              disabled={view === 'test' || view === 'results'}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                view === tab
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } ${(view === 'test' || view === 'results') ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Setup View */}
          {view === 'setup' && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Configure Your Test</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {topics.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">All Levels</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Questions
                  </label>
                  <select
                    value={questionCount}
                    onChange={(e) => setQuestionCount(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="5">5 Questions</option>
                    <option value="10">10 Questions</option>
                    <option value="15">15 Questions</option>
                    <option value="20">20 Questions</option>
                    <option value="25">25 Questions</option>
                  </select>
                </div>

                <button
                  onClick={handleStartTest}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Start Test
                </button>
              </div>

              {/* Stats Preview */}
              {history.stats.totalTests > 0 && (
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">{history.stats.totalTests}</div>
                    <div className="text-sm text-gray-600">Tests Taken</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">{history.stats.averageScore}%</div>
                    <div className="text-sm text-gray-600">Avg Score</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">{history.stats.highestScore}%</div>
                    <div className="text-sm text-gray-600">Best Score</div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Test View */}
          {view === 'test' && currentQuestion && (
            <motion.div
              key="test"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl p-8"
            >
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Question {currentSession.currentQuestionIndex + 1} of {currentSession.questions.length}</span>
                  <span className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4" />
                    {formatTime(timeRemaining)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentSession.currentQuestionIndex + 1) / currentSession.questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    {currentQuestion.topic}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                    currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {currentQuestion.difficulty}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedAnswer === index
                        ? showFeedback
                          ? index === currentQuestion.correctAnswer
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : 'border-purple-500 bg-purple-50'
                        : showFeedback && index === currentQuestion.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                    } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                        selectedAnswer === index
                          ? showFeedback
                            ? index === currentQuestion.correctAnswer
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                            : 'bg-purple-500 text-white'
                          : showFeedback && index === currentQuestion.correctAnswer
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1">{option}</span>
                      {showFeedback && index === currentQuestion.correctAnswer && (
                        <CheckCircleIcon className="w-6 h-6 text-green-500" />
                      )}
                      {showFeedback && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                        <XCircleIcon className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Feedback */}
              {showFeedback && feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg mb-6 ${
                    feedback.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                  }`}
                >
                  <p className={`font-semibold mb-2 ${feedback.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {feedback.isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                  </p>
                  <p className="text-gray-700">{feedback.explanation}</p>
                </motion.div>
              )}

              {/* Submit Button */}
              {!showFeedback && (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Submit Answer
                </button>
              )}
            </motion.div>
          )}

          {/* Results View */}
          {view === 'results' && currentSession && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl p-8"
            >
              <div className="text-center mb-8">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {currentSession.score}%
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-2">Test Complete!</h2>
                <p className="text-gray-600">
                  You answered {currentSession.correctAnswers} out of {currentSession.totalQuestions} questions correctly
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg">
                  <ChartBarIcon className="w-8 h-8 text-purple-600 mb-2" />
                  <div className="text-2xl font-bold text-purple-600">{currentSession.score}%</div>
                  <div className="text-sm text-gray-600">Score</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg">
                  <AcademicCapIcon className="w-8 h-8 text-blue-600 mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{currentSession.correctAnswers}/{currentSession.totalQuestions}</div>
                  <div className="text-sm text-gray-600">Correct</div>
                </div>
              </div>

              {/* Topic Performance */}
              {currentSession.topicPerformance && (
                <div className="mb-8">
                  <h3 className="font-bold text-lg mb-4">Performance by Topic</h3>
                  <div className="space-y-3">
                    {Object.entries(currentSession.topicPerformance).map(([topic, perf]) => (
                      <div key={topic} className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{topic}</span>
                            <span className="text-gray-600">{perf.correct}/{perf.total}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                              style={{ width: `${(perf.correct / perf.total) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setView('setup')}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-lg hover:shadow-xl transition-all"
                >
                  Take Another Test
                </button>
                <button
                  onClick={() => setView('history')}
                  className="flex-1 bg-white border-2 border-purple-600 text-purple-600 font-bold py-4 rounded-lg hover:bg-purple-50 transition-all"
                >
                  View History
                </button>
              </div>
            </motion.div>
          )}

          {/* History View */}
          {view === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Test History</h2>
              
              {history.sessions.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No tests taken yet. Start your first test!</p>
              ) : (
                <div className="space-y-4">
                  {history.sessions.map((session) => (
                    <div key={session.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                            {session.topic || 'All Topics'}
                          </span>
                          {session.difficulty && session.difficulty !== 'all' && (
                            <span className="ml-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                              {session.difficulty}
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${
                            session.score >= 80 ? 'text-green-600' :
                            session.score >= 60 ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {session.score}%
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(session.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {session.correctAnswers} / {session.totalQuestions} questions correct
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MCQTest;
