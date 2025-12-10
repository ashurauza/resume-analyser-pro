import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlayIcon, 
  ClockIcon, 
  CheckCircleIcon,
  MicrophoneIcon,
  ChartBarIcon,
  TrophyIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import {
  createInterviewSession,
  submitAnswer as submitAnswerService,
  completeSession as completeSessionService,
  getInterviewHistory as getHistoryService,
  getPreparationTips as getTipsService,
  createMCQSession,
  submitMCQAnswer,
  completeMCQSession,
  getMCQHistory,
  getMCQTopicsAndStats
} from '../services/interviewService';

const InterviewPrep = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('start'); // start, mcq, interview, history, tips
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [stats, setStats] = useState(null);
  const [tips, setTips] = useState(null);

  // Form state for creating new session
  const [jobRole, setJobRole] = useState('Software Engineer');
  const [interviewType, setInterviewType] = useState('mixed');
  const [difficulty, setDifficulty] = useState('intermediate');

  // MCQ state
  const [mcqTopic, setMcqTopic] = useState('All');
  const [mcqDifficulty, setMcqDifficulty] = useState('all');
  const [mcqQuestionCount, setMcqQuestionCount] = useState(10);
  const [mcqSessions, setMcqSessions] = useState([]);
  const [mcqStats, setMcqStats] = useState(null);
  const [currentMcqSession, setCurrentMcqSession] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showMcqFeedback, setShowMcqFeedback] = useState(false);
  const [mcqTopics, setMcqTopics] = useState([]);

  useEffect(() => {
    fetchHistory();
    fetchTips();
    fetchMCQHistory();
    const { topics } = getMCQTopicsAndStats();
    setMcqTopics(topics);
  }, []);

  useEffect(() => {
    if (currentSession && currentSession.status === 'in-progress' && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentSession, timeRemaining]);

  const fetchHistory = async () => {
    try {
      const { sessions: historySessions, stats: historyStats } = getHistoryService();
      setSessions(historySessions);
      setStats(historyStats);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    }
  };

  const fetchMCQHistory = async () => {
    try {
      const { sessions: mcqSessionsData, stats: mcqStatsData } = getMCQHistory();
      setMcqSessions(mcqSessionsData);
      setMcqStats(mcqStatsData);
    } catch (error) {
      console.error('Failed to fetch MCQ history:', error);
    }
  };

  const fetchTips = async () => {
    try {
      const tipsData = getTipsService(jobRole, interviewType);
      setTips(tipsData);
    } catch (error) {
      console.error('Failed to fetch tips:', error);
    }
  };

  const createSession = async () => {
    setLoading(true);
    try {
      const session = createInterviewSession({
        jobRole,
        interviewType,
        difficulty
      });
      
      startSession(session);
    } catch (error) {
      console.error('Failed to create session:', error);
      alert('Failed to create interview session');
    } finally {
      setLoading(false);
    }
  };

  const startSession = (session) => {
    try {
      setCurrentSession(session);
      setCurrentQuestionIndex(0);
      setTimeRemaining(30 * 60); // 30 minutes
      setActiveTab('interview');
      setAnswer('');
      setFeedback(null);
    } catch (error) {
      console.error('Failed to start session:', error);
      alert('Failed to start interview');
    }
  };

  const submitCurrentAnswer = async () => {
    if (!answer.trim()) {
      alert('Please provide an answer');
      return;
    }

    setLoading(true);
    try {
      const updatedSession = submitAnswerService(currentSession.id, currentQuestionIndex, answer);
      const question = updatedSession.questions[currentQuestionIndex];
      
      setFeedback({
        score: question.score,
        feedback: question.feedback
      });
      
      // Show feedback for 3 seconds then move to next question
      setTimeout(() => {
        if (currentQuestionIndex < updatedSession.questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setCurrentSession(updatedSession);
          setAnswer('');
          setFeedback(null);
        } else {
          completeSession();
        }
      }, 3000);
    } catch (error) {
      console.error('Failed to submit answer:', error);
      alert('Failed to submit answer');
    } finally {
      setLoading(false);
    }
  };

  const completeSession = async () => {
    setLoading(true);
    try {
      const completedSession = completeSessionService(currentSession.id);
      
      // Show completion report
      alert(`Interview Complete! Your average score: ${completedSession.overallScore.toFixed(1)}/10`);
      setActiveTab('history');
      fetchHistory();
      setCurrentSession(null);
    } catch (error) {
      console.error('Failed to complete session:', error);
      alert('Failed to complete interview');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (diff) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-orange-100 text-orange-800',
      expert: 'bg-red-100 text-red-800'
    };
    return colors[diff] || colors.intermediate;
  };

  return (
    <div className="interview-prep-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">AI Interview Preparation</h1>
          <p className="page-subtitle">Practice with AI-powered mock interviews and get instant feedback</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {[
          { id: 'start', label: 'Start Interview', icon: PlayIcon },
          { id: 'history', label: 'History', icon: ClockIcon },
          { id: 'tips', label: 'Preparation Tips', icon: AcademicCapIcon }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Start Interview Tab */}
        {activeTab === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="tab-content"
          >
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-6">Create New Interview Session</h2>
              
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Job Role</label>
                  <select
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    className="glass-input"
                  >
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="Product Manager">Product Manager</option>
                    <option value="Marketing Manager">Marketing Manager</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Interview Type</label>
                  <select
                    value={interviewType}
                    onChange={(e) => setInterviewType(e.target.value)}
                    className="glass-input"
                  >
                    <option value="mixed">Mixed (Technical + Behavioral + HR)</option>
                    <option value="technical">Technical Only</option>
                    <option value="behavioral">Behavioral Only</option>
                    <option value="hr">HR Only</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Difficulty Level</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="glass-input"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 p-4 bg-pink-50 rounded-lg">
                <h3 className="font-semibold text-pink-900 mb-2">Interview Details:</h3>
                <ul className="text-sm text-pink-800 space-y-1">
                  <li>• 10 questions tailored to your role</li>
                  <li>• 30 minutes duration</li>
                  <li>• Instant AI feedback on each answer</li>
                  <li>• Detailed performance report at the end</li>
                </ul>
              </div>

              <button
                onClick={createSession}
                disabled={loading}
                className="btn-primary w-full mt-6"
              >
                {loading ? 'Starting...' : 'Start Interview'}
              </button>
            </div>

            {/* Stats Summary */}
            {stats && (
              <div className="stats-grid mt-6">
                <div className="stat-card">
                  <div className="stat-icon bg-blue-500">
                    <DocumentTextIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="stat-content">
                    <p className="stat-label">Total Interviews</p>
                    <p className="stat-value">{stats.totalSessions}</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon bg-green-500">
                    <ChartBarIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="stat-content">
                    <p className="stat-label">Average Score</p>
                    <p className="stat-value">{stats.averageScore.toFixed(1)}</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon bg-purple-500">
                    <TrophyIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="stat-content">
                    <p className="stat-label">Highest Score</p>
                    <p className="stat-value">{stats.highestScore}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Interview In Progress Tab */}
        {activeTab === 'interview' && currentSession && (
          <motion.div
            key="interview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="tab-content"
          >
            {/* Timer and Progress */}
            <div className="glass-card p-6 mb-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <ClockIcon className="w-6 h-6 text-pink-500" />
                  <span className="text-2xl font-bold">{formatTime(timeRemaining)}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Question {currentQuestionIndex + 1} of {currentSession.questions.length}</p>
                  <div className="w-64 bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-pink-500 h-2 rounded-full transition-all"
                      style={{ width: `${((currentQuestionIndex + 1) / currentSession.questions.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Question Card */}
            <div className="glass-card p-8 mb-6">
              <div className="mb-4">
                <span className={`badge ${getDifficultyColor(currentSession.questions[currentQuestionIndex].difficulty)}`}>
                  {currentSession.questions[currentQuestionIndex].difficulty}
                </span>
                <span className="badge bg-purple-100 text-purple-800 ml-2">
                  {currentSession.questions[currentQuestionIndex].category}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold mb-6">
                {currentSession.questions[currentQuestionIndex].question}
              </h2>

              {!feedback ? (
                <>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer here... Use the STAR method for behavioral questions."
                    rows={8}
                    className="glass-input w-full mb-4"
                  />

                  <div className="flex gap-4">
                    <button
                      onClick={submitCurrentAnswer}
                      disabled={loading || !answer.trim()}
                      className="btn-primary flex-1"
                    >
                      {loading ? 'Submitting...' : 'Submit Answer'}
                    </button>
                    
                    <button
                      onClick={() => setIsRecording(!isRecording)}
                      className={`btn-secondary ${isRecording ? 'bg-red-500 text-white' : ''}`}
                    >
                      <MicrophoneIcon className="w-5 h-5" />
                      {isRecording ? 'Stop' : 'Record'}
                    </button>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="feedback-card"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      feedback.score >= 80 ? 'bg-green-100' :
                      feedback.score >= 60 ? 'bg-yellow-100' : 'bg-red-100'
                    }`}>
                      <span className={`text-2xl font-bold ${
                        feedback.score >= 80 ? 'text-green-800' :
                        feedback.score >= 60 ? 'text-yellow-800' : 'text-red-800'
                      }`}>
                        {feedback.score}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Instant Feedback</h3>
                      <p className="text-gray-600">Moving to next question...</p>
                    </div>
                  </div>

                  {feedback.strengths && feedback.strengths.length > 0 && (
                    <div className="mb-3">
                      <p className="font-semibold text-green-700 mb-1">✓ Strengths:</p>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {feedback.strengths.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {feedback.improvements && feedback.improvements.length > 0 && (
                    <div>
                      <p className="font-semibold text-orange-700 mb-1">→ Areas to Improve:</p>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {feedback.improvements.map((i, idx) => (
                          <li key={idx}>{i}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="tab-content"
          >
            <div className="glass-card">
              <h2 className="text-2xl font-bold mb-6 p-6 border-b">Interview History</h2>
              
              {sessions.length === 0 ? (
                <div className="empty-state">
                  <ClockIcon className="w-16 h-16 text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Interview History</h3>
                  <p className="text-gray-600">Start your first mock interview to see your progress here</p>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {sessions.map((session) => (
                    <div key={session._id} className="session-card">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{session.jobRole}</h3>
                          <p className="text-sm text-gray-600">
                            {session.interviewType} • {session.difficulty}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(session.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        
                        {session.status === 'completed' && (
                          <div className="text-right">
                            <div className={`text-3xl font-bold ${
                              session.overallScore >= 80 ? 'text-green-600' :
                              session.overallScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {session.overallScore}
                            </div>
                            <p className="text-xs text-gray-500">Overall Score</p>
                          </div>
                        )}
                        
                        {session.status !== 'completed' && (
                          <span className="badge bg-blue-100 text-blue-800">
                            {session.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Tips Tab */}
        {activeTab === 'tips' && tips && (
          <motion.div
            key="tips"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="tab-content"
          >
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-6">Preparation Tips</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-pink-700">General Tips</h3>
                  <ul className="space-y-2">
                    {tips.general.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-pink-700">Specific to {interviewType} Interviews</h3>
                  <ul className="space-y-2">
                    {tips.specific.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {tips.roleSpecific && tips.roleSpecific.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-pink-700">Role-Specific Tips for {jobRole}</h3>
                    <ul className="space-y-2">
                      {tips.roleSpecific.map((tip, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircleIcon className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InterviewPrep;
