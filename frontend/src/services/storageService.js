// Client-side storage using localStorage
// This replaces MongoDB for data persistence

const STORAGE_KEYS = {
  ANALYSES: 'resume_analyses',
  INTERVIEW_HISTORY: 'interview_history',
  USER_PREFERENCES: 'user_preferences'
};

/**
 * Save a resume analysis to localStorage
 * @param {Object} analysis - Analysis results
 * @returns {Object} - Saved analysis with ID
 */
export function saveAnalysis(analysis) {
  const analyses = getAnalyses();
  const newAnalysis = {
    id: generateId(),
    ...analysis,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  analyses.unshift(newAnalysis); // Add to beginning
  localStorage.setItem(STORAGE_KEYS.ANALYSES, JSON.stringify(analyses));
  
  return newAnalysis;
}

/**
 * Get all saved analyses
 * @returns {Array} - Array of analyses
 */
export function getAnalyses() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ANALYSES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading analyses:', error);
    return [];
  }
}

/**
 * Get a specific analysis by ID
 * @param {string} id - Analysis ID
 * @returns {Object|null} - Analysis object or null
 */
export function getAnalysisById(id) {
  const analyses = getAnalyses();
  return analyses.find(a => a.id === id) || null;
}

/**
 * Delete an analysis
 * @param {string} id - Analysis ID
 * @returns {boolean} - Success status
 */
export function deleteAnalysis(id) {
  try {
    const analyses = getAnalyses();
    const filtered = analyses.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEYS.ANALYSES, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting analysis:', error);
    return false;
  }
}

/**
 * Get analysis statistics
 * @returns {Object} - Statistics
 */
export function getStatistics() {
  const analyses = getAnalyses();
  
  if (analyses.length === 0) {
    return {
      totalAnalyses: 0,
      averageScore: 0,
      topScore: 0,
      recentAnalyses: []
    };
  }
  
  const scores = analyses.map(a => a.overallScore || 0);
  const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  const topScore = Math.max(...scores);
  
  return {
    totalAnalyses: analyses.length,
    averageScore: Math.round(averageScore),
    topScore,
    recentAnalyses: analyses.slice(0, 5),
    scoreDistribution: calculateScoreDistribution(scores)
  };
}

/**
 * Clear all analyses
 */
export function clearAllAnalyses() {
  localStorage.removeItem(STORAGE_KEYS.ANALYSES);
}

/**
 * Save interview session
 * @param {Object} session - Interview session data
 * @returns {Object} - Saved session
 */
export function saveInterviewSession(session) {
  const sessions = getInterviewHistory();
  const newSession = {
    id: generateId(),
    ...session,
    createdAt: new Date().toISOString()
  };
  
  sessions.unshift(newSession);
  localStorage.setItem(STORAGE_KEYS.INTERVIEW_HISTORY, JSON.stringify(sessions));
  
  return newSession;
}

/**
 * Get interview history
 * @returns {Array} - Array of interview sessions
 */
export function getInterviewHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.INTERVIEW_HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading interview history:', error);
    return [];
  }
}

/**
 * Save user preferences
 * @param {Object} preferences - User preferences
 */
export function savePreferences(preferences) {
  localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
}

/**
 * Get user preferences
 * @returns {Object} - User preferences
 */
export function getPreferences() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error reading preferences:', error);
    return {};
  }
}

/**
 * Export all data as JSON
 * @returns {Object} - All stored data
 */
export function exportData() {
  return {
    analyses: getAnalyses(),
    interviewHistory: getInterviewHistory(),
    preferences: getPreferences(),
    exportedAt: new Date().toISOString()
  };
}

/**
 * Import data from JSON
 * @param {Object} data - Data to import
 */
export function importData(data) {
  if (data.analyses) {
    localStorage.setItem(STORAGE_KEYS.ANALYSES, JSON.stringify(data.analyses));
  }
  if (data.interviewHistory) {
    localStorage.setItem(STORAGE_KEYS.INTERVIEW_HISTORY, JSON.stringify(data.interviewHistory));
  }
  if (data.preferences) {
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(data.preferences));
  }
}

// Helper functions

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function calculateScoreDistribution(scores) {
  const ranges = {
    excellent: 0, // 80-100
    good: 0,      // 60-79
    fair: 0,      // 40-59
    poor: 0       // 0-39
  };
  
  scores.forEach(score => {
    if (score >= 80) ranges.excellent++;
    else if (score >= 60) ranges.good++;
    else if (score >= 40) ranges.fair++;
    else ranges.poor++;
  });
  
  return ranges;
}
