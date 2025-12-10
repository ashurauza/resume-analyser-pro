/**
 * Client-Side Interview Preparation Service
 * Provides mock interview questions and stores sessions in localStorage
 */

const STORAGE_KEY = 'resumeAnalyzer_interviewSessions';

// Mock interview questions database
const questionBank = {
  technical: {
    'Software Engineer': [
      'Explain the difference between TCP and UDP protocols.',
      'What is the time complexity of binary search?',
      'Describe how RESTful APIs work.',
      'What are the principles of Object-Oriented Programming?',
      'Explain the concept of closures in JavaScript.',
      'What is the difference between SQL and NoSQL databases?',
      'Describe the MVC architecture pattern.',
      'What is a promise in JavaScript and how does it work?',
      'Explain the concept of microservices.',
      'What are the SOLID principles?'
    ],
    'Data Scientist': [
      'What is the difference between supervised and unsupervised learning?',
      'Explain the bias-variance tradeoff.',
      'What is cross-validation and why is it important?',
      'Describe the difference between L1 and L2 regularization.',
      'What is a confusion matrix?',
      'Explain principal component analysis (PCA).',
      'What is the difference between bagging and boosting?',
      'Describe how gradient descent works.',
      'What is overfitting and how can you prevent it?',
      'Explain the ROC curve and AUC metric.'
    ],
    'Product Manager': [
      'How do you prioritize features in a product roadmap?',
      'What metrics would you use to measure product success?',
      'Describe your process for conducting user research.',
      'How do you handle conflicting stakeholder requirements?',
      'What is your approach to competitive analysis?',
      'How do you define and track KPIs?',
      'Describe a time when you had to make a data-driven decision.',
      'How do you balance technical debt with new features?',
      'What frameworks do you use for product strategy?',
      'How do you ensure alignment between engineering and business goals?'
    ]
  },
  behavioral: {
    'Software Engineer': [
      'Tell me about a time when you faced a difficult technical challenge.',
      'Describe a situation where you had to work with a difficult team member.',
      'How do you handle tight deadlines?',
      'Tell me about a project you are most proud of.',
      'Describe a time when you made a mistake. How did you handle it?',
      'How do you stay updated with new technologies?',
      'Tell me about a time when you had to learn something new quickly.',
      'Describe your code review process.',
      'How do you handle disagreements about technical decisions?',
      'What motivates you as a software engineer?'
    ],
    'Data Scientist': [
      'Describe a complex data problem you solved.',
      'Tell me about a time when your analysis influenced a business decision.',
      'How do you communicate technical findings to non-technical stakeholders?',
      'Describe a time when you had to work with incomplete data.',
      'Tell me about a project where you collaborated with cross-functional teams.',
      'How do you ensure the ethical use of data?',
      'Describe a time when you had to pivot your analysis approach.',
      'How do you handle stakeholder expectations when results are unexpected?',
      'Tell me about your experience with A/B testing.',
      'What is your approach to continuous learning in data science?'
    ],
    'Product Manager': [
      'Tell me about a time when you launched a successful product.',
      'Describe a situation where you had to say no to a stakeholder.',
      'How do you handle conflicting priorities?',
      'Tell me about a product failure and what you learned.',
      'Describe your approach to user empathy.',
      'How do you build consensus among different teams?',
      'Tell me about a time when you used data to drive a decision.',
      'Describe your experience with agile methodologies.',
      'How do you handle ambiguity in product requirements?',
      'What is your leadership style?'
    ]
  },
  mixed: {} // Will be populated dynamically
};

// Generate mixed questions
Object.keys(questionBank.technical).forEach(role => {
  questionBank.mixed[role] = [
    ...questionBank.technical[role].slice(0, 5),
    ...questionBank.behavioral[role].slice(0, 5)
  ];
});

/**
 * Create a new interview session
 */
export const createInterviewSession = (config) => {
  const { jobRole = 'Software Engineer', interviewType = 'mixed', difficulty = 'intermediate' } = config;
  
  // Get questions based on type and role
  const questions = questionBank[interviewType]?.[jobRole] || questionBank.mixed['Software Engineer'];
  
  // Adjust number of questions based on difficulty
  const numQuestions = difficulty === 'easy' ? 5 : difficulty === 'hard' ? 10 : 7;
  
  // Randomly select questions
  const selectedQuestions = shuffleArray([...questions]).slice(0, numQuestions).map((q, index) => ({
    id: index + 1,
    question: q,
    answer: '',
    feedback: '',
    score: 0
  }));
  
  const session = {
    id: Date.now().toString(),
    userId: getCurrentUserId(),
    jobRole,
    interviewType,
    difficulty,
    questions: selectedQuestions,
    currentQuestionIndex: 0,
    status: 'in-progress',
    startTime: new Date().toISOString(),
    endTime: null,
    overallScore: 0,
    createdAt: new Date().toISOString()
  };
  
  saveSession(session);
  return session;
};

/**
 * Get a session by ID
 */
export const getSession = (sessionId) => {
  const sessions = getAllSessions();
  return sessions.find(s => s.id === sessionId);
};

/**
 * Submit an answer to a question
 */
export const submitAnswer = (sessionId, questionIndex, answer) => {
  const session = getSession(sessionId);
  if (!session) throw new Error('Session not found');
  
  // Update the answer
  session.questions[questionIndex].answer = answer;
  
  // Generate feedback and score (simple mock scoring)
  const wordCount = answer.trim().split(/\s+/).length;
  const score = Math.min(10, Math.floor(wordCount / 10)); // 1 point per 10 words, max 10
  
  session.questions[questionIndex].score = score;
  session.questions[questionIndex].feedback = generateFeedback(score, answer);
  
  // Move to next question
  session.currentQuestionIndex = Math.min(questionIndex + 1, session.questions.length);
  
  saveSession(session);
  return session;
};

/**
 * Complete the interview session
 */
export const completeSession = (sessionId) => {
  const session = getSession(sessionId);
  if (!session) throw new Error('Session not found');
  
  // Calculate overall score
  const totalScore = session.questions.reduce((sum, q) => sum + (q.score || 0), 0);
  const averageScore = session.questions.length > 0 ? totalScore / session.questions.length : 0;
  
  session.status = 'completed';
  session.endTime = new Date().toISOString();
  session.overallScore = averageScore;
  
  saveSession(session);
  return session;
};

/**
 * Get interview history
 */
export const getInterviewHistory = () => {
  const sessions = getAllSessions();
  const userId = getCurrentUserId();
  
  const userSessions = sessions.filter(s => s.userId === userId);
  
  // Calculate stats
  const completedSessions = userSessions.filter(s => s.status === 'completed');
  const stats = {
    totalSessions: completedSessions.length,
    averageScore: completedSessions.length > 0 
      ? completedSessions.reduce((sum, s) => sum + s.overallScore, 0) / completedSessions.length 
      : 0,
    totalQuestions: completedSessions.reduce((sum, s) => sum + s.questions.length, 0),
    topScore: completedSessions.length > 0 
      ? Math.max(...completedSessions.map(s => s.overallScore)) 
      : 0
  };
  
  return {
    sessions: userSessions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    stats
  };
};

/**
 * Get preparation tips
 */
export const getPreparationTips = (jobRole, interviewType) => {
  const tips = {
    general: [
      'Research the company thoroughly before the interview',
      'Practice your answers to common questions out loud',
      'Prepare specific examples from your experience',
      'Have questions ready to ask the interviewer',
      'Dress appropriately for the company culture'
    ],
    technical: [
      'Review fundamental data structures and algorithms',
      'Practice coding problems on platforms like LeetCode',
      'Be ready to explain your thought process',
      'Review your past projects and be ready to discuss them',
      'Understand time and space complexity analysis'
    ],
    behavioral: [
      'Use the STAR method (Situation, Task, Action, Result)',
      'Be honest and authentic in your responses',
      'Show self-awareness and ability to learn from mistakes',
      'Demonstrate your soft skills through examples',
      'Prepare stories that highlight your achievements'
    ]
  };
  
  return {
    general: tips.general,
    specific: tips[interviewType] || tips.technical,
    roleSpecific: getRoleSpecificTips(jobRole)
  };
};

/**
 * Helper functions
 */

function getCurrentUserId() {
  try {
    const user = JSON.parse(localStorage.getItem('resumeAnalyzer_user'));
    return user?.id || 'anonymous';
  } catch {
    return 'anonymous';
  }
}

function getAllSessions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveSession(session) {
  const sessions = getAllSessions();
  const index = sessions.findIndex(s => s.id === session.id);
  
  if (index >= 0) {
    sessions[index] = session;
  } else {
    sessions.push(session);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateFeedback(score, answer) {
  if (score >= 8) {
    return 'Excellent answer! You provided comprehensive details and demonstrated strong understanding.';
  } else if (score >= 6) {
    return 'Good answer! Consider adding more specific examples or technical details.';
  } else if (score >= 4) {
    return 'Fair answer. Try to elaborate more and provide concrete examples.';
  } else {
    return 'Your answer could be improved. Provide more details and specific examples.';
  }
}

function getRoleSpecificTips(jobRole) {
  const roleTips = {
    'Software Engineer': [
      'Be ready to write code on a whiteboard or in a shared editor',
      'Discuss trade-offs in your technical decisions',
      'Demonstrate knowledge of design patterns',
      'Be prepared to discuss system design at scale'
    ],
    'Data Scientist': [
      'Be ready to explain your modeling choices',
      'Discuss how you validate your models',
      'Show understanding of statistical concepts',
      'Prepare to discuss real-world applications of your work'
    ],
    'Product Manager': [
      'Have metrics ready to demonstrate product impact',
      'Be prepared to discuss product strategy frameworks',
      'Show understanding of user needs and market dynamics',
      'Demonstrate your ability to work with technical teams'
    ]
  };
  
  return roleTips[jobRole] || roleTips['Software Engineer'];
}

export default {
  createInterviewSession,
  getSession,
  submitAnswer,
  completeSession,
  getInterviewHistory,
  getPreparationTips
};
