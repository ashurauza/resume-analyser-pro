// Client-side resume analysis engine
// This replaces the backend analysis service

/**
 * Analyze a resume comprehensively
 * @param {string} resumeText - Extracted resume text
 * @param {Object} options - Analysis options (jobRole, jobDescription)
 * @returns {Object} - Complete analysis results
 */
export function analyzeResume(resumeText, options = {}) {
  const { jobRole = '', jobDescription = '' } = options;
  
  // Perform all analyses
  const contentAnalysis = analyzeContent(resumeText);
  const skillsAnalysis = analyzeSkills(resumeText, jobDescription);
  const experienceAnalysis = analyzeExperience(resumeText);
  const educationAnalysis = analyzeEducation(resumeText);
  const formatAnalysis = analyzeFormat(resumeText);
  const keywordAnalysis = analyzeKeywords(resumeText, jobDescription);
  const atsAnalysis = analyzeATSCompatibility(resumeText);
  
  // Calculate category scores
  const categoryScores = {
    content: contentAnalysis.score,
    skills: skillsAnalysis.score,
    experience: experienceAnalysis.score,
    education: educationAnalysis.score,
    formatting: formatAnalysis.score,
    keywords: keywordAnalysis.score,
    ats: atsAnalysis.score
  };
  
  // Calculate overall score
  const overallScore = calculateOverallScore(categoryScores);
  
  // Generate recommendations
  const recommendations = generateRecommendations({
    contentAnalysis,
    skillsAnalysis,
    experienceAnalysis,
    educationAnalysis,
    formatAnalysis,
    keywordAnalysis,
    atsAnalysis
  });
  
  return {
    overallScore,
    categoryScores,
    analysis: {
      content: contentAnalysis,
      skills: skillsAnalysis,
      experience: experienceAnalysis,
      education: educationAnalysis,
      formatting: formatAnalysis,
      keywords: keywordAnalysis,
      ats: atsAnalysis
    },
    recommendations,
    metadata: {
      analyzedAt: new Date().toISOString(),
      jobRole,
      wordCount: resumeText.split(/\s+/).length
    }
  };
}

/**
 * Analyze resume content quality
 */
function analyzeContent(text) {
  const wordCount = text.split(/\s+/).length;
  const hasObjective = /(?:objective|summary|profile)/i.test(text);
  const hasActionVerbs = countActionVerbs(text);
  const hasQuantifiableResults = /\d+%|\d+\s+(?:years?|months?)|increased|decreased|improved|reduced/i.test(text);
  
  let score = 50;
  if (wordCount >= 300 && wordCount <= 800) score += 15;
  if (hasObjective) score += 10;
  if (hasActionVerbs >= 5) score += 15;
  if (hasQuantifiableResults) score += 10;
  
  return {
    score: Math.min(score, 100),
    wordCount,
    hasObjective,
    actionVerbsCount: hasActionVerbs,
    hasQuantifiableResults,
    details: `Resume contains ${wordCount} words with ${hasActionVerbs} action verbs.`
  };
}

/**
 * Analyze skills and match with job description
 */
function analyzeSkills(text, jobDescription = '') {
  const commonSkills = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'AWS',
    'Docker', 'Kubernetes', 'Git', 'TypeScript', 'MongoDB', 'PostgreSQL',
    'Leadership', 'Communication', 'Problem Solving', 'Team Management',
    'Project Management', 'Agile', 'Scrum', 'CI/CD', 'API', 'REST'
  ];
  
  const foundSkills = commonSkills.filter(skill => 
    new RegExp(skill, 'i').test(text)
  );
  
  let matchedSkills = [];
  let score = Math.min((foundSkills.length / 10) * 100, 100);
  
  if (jobDescription) {
    matchedSkills = foundSkills.filter(skill =>
      new RegExp(skill, 'i').test(jobDescription)
    );
    const matchRate = foundSkills.length > 0 ? (matchedSkills.length / foundSkills.length) : 0;
    score = matchRate * 100;
  }
  
  return {
    score,
    foundSkills,
    matchedSkills,
    totalSkills: foundSkills.length,
    details: `Found ${foundSkills.length} relevant skills${jobDescription ? `, ${matchedSkills.length} match job requirements` : ''}.`
  };
}

/**
 * Analyze work experience
 */
function analyzeExperience(text) {
  const experienceKeywords = /experience|employment|work history/i;
  const hasExperienceSection = experienceKeywords.test(text);
  
  const yearMatches = text.match(/\b(19|20)\d{2}\b/g) || [];
  const years = [...new Set(yearMatches)].length;
  
  const companyIndicators = text.match(/(?:at|@|worked at|employed by)\s+[A-Z][a-z]+/g) || [];
  const positions = text.match(/(?:as|position:|role:)\s+[A-Z][a-z\s]+/g) || [];
  
  let score = 50;
  if (hasExperienceSection) score += 20;
  if (years >= 2) score += 15;
  if (companyIndicators.length > 0) score += 15;
  
  return {
    score: Math.min(score, 100),
    hasExperienceSection,
    estimatedYears: years,
    companiesCount: companyIndicators.length,
    details: `Found ${years} years mentioned with ${companyIndicators.length} company references.`
  };
}

/**
 * Analyze education
 */
function analyzeEducation(text) {
  const degrees = ['PhD', 'Ph.D', 'Master', 'Bachelor', 'MBA', 'BS', 'BA', 'MS', 'MA', 'Associate'];
  const foundDegrees = degrees.filter(degree => new RegExp(degree, 'i').test(text));
  
  const hasEducationSection = /education|academic|qualifications/i.test(text);
  const universities = text.match(/university|college|institute|school/gi) || [];
  
  let score = 40;
  if (hasEducationSection) score += 20;
  if (foundDegrees.length > 0) score += 25;
  if (universities.length > 0) score += 15;
  
  return {
    score: Math.min(score, 100),
    hasEducationSection,
    degrees: foundDegrees,
    institutionsCount: universities.length,
    details: `Found ${foundDegrees.length} degrees and ${universities.length} educational institutions.`
  };
}

/**
 * Analyze formatting and structure
 */
function analyzeFormat(text) {
  const sections = detectSections(text);
  const sectionCount = Object.values(sections).filter(Boolean).length;
  
  const hasBulletPoints = /[•\-\*]\s/.test(text);
  const hasProperSpacing = text.split('\n').filter(line => line.trim()).length > 10;
  const lineLength = text.split('\n').map(line => line.length);
  const avgLineLength = lineLength.reduce((a, b) => a + b, 0) / lineLength.length;
  
  let score = 50;
  if (sectionCount >= 4) score += 20;
  if (hasBulletPoints) score += 15;
  if (hasProperSpacing) score += 15;
  
  return {
    score: Math.min(score, 100),
    sectionsCount: sectionCount,
    hasBulletPoints,
    hasProperSpacing,
    details: `Resume has ${sectionCount} clear sections with ${hasBulletPoints ? 'good' : 'minimal'} formatting.`
  };
}

/**
 * Analyze keywords and relevance
 */
function analyzeKeywords(text, jobDescription = '') {
  if (!jobDescription) {
    return {
      score: 70,
      matchedKeywords: [],
      details: 'No job description provided for keyword analysis.'
    };
  }
  
  const jobKeywords = extractKeywords(jobDescription);
  const resumeKeywords = extractKeywords(text);
  
  const matched = jobKeywords.filter(keyword =>
    resumeKeywords.some(rk => rk.toLowerCase() === keyword.toLowerCase())
  );
  
  const score = jobKeywords.length > 0 ? (matched.length / jobKeywords.length) * 100 : 70;
  
  return {
    score,
    matchedKeywords: matched,
    totalKeywords: jobKeywords.length,
    details: `Matched ${matched.length} out of ${jobKeywords.length} key requirements.`
  };
}

/**
 * Analyze ATS compatibility
 */
function analyzeATSCompatibility(text) {
  const issues = [];
  let score = 100;
  
  // Check for common ATS issues
  if (/[^\x00-\x7F]/.test(text)) {
    issues.push('Contains special characters that may not be ATS-friendly');
    score -= 15;
  }
  
  if (!/email|phone|contact/i.test(text)) {
    issues.push('Contact information may be unclear');
    score -= 20;
  }
  
  const sections = detectSections(text);
  if (Object.values(sections).filter(Boolean).length < 3) {
    issues.push('Missing standard resume sections');
    score -= 15;
  }
  
  return {
    score: Math.max(score, 0),
    issues,
    isATSFriendly: score >= 70,
    details: `ATS compatibility score: ${score}%. ${issues.length} potential issues found.`
  };
}

/**
 * Calculate weighted overall score
 */
function calculateOverallScore(categoryScores) {
  const weights = {
    content: 0.25,
    skills: 0.25,
    experience: 0.20,
    education: 0.10,
    formatting: 0.10,
    keywords: 0.05,
    ats: 0.05
  };
  
  let totalScore = 0;
  for (const [category, score] of Object.entries(categoryScores)) {
    totalScore += score * (weights[category] || 0);
  }
  
  return Math.round(totalScore);
}

/**
 * Generate actionable recommendations
 */
function generateRecommendations(analyses) {
  const recommendations = [];
  
  // Content recommendations
  if (analyses.contentAnalysis.score < 70) {
    recommendations.push({
      category: 'Content',
      priority: 'high',
      suggestion: 'Add more action verbs and quantifiable achievements to strengthen your resume.',
      impact: 'High - Significantly improves resume impact'
    });
  }
  
  // Skills recommendations
  if (analyses.skillsAnalysis.score < 60) {
    recommendations.push({
      category: 'Skills',
      priority: 'high',
      suggestion: 'Add more relevant technical and soft skills. Include both hard and soft skills.',
      impact: 'High - Increases match with job requirements'
    });
  }
  
  // Experience recommendations
  if (!analyses.experienceAnalysis.hasExperienceSection) {
    recommendations.push({
      category: 'Experience',
      priority: 'high',
      suggestion: 'Add a clear "Work Experience" or "Professional Experience" section.',
      impact: 'Critical - Essential for most positions'
    });
  }
  
  // Education recommendations
  if (analyses.educationAnalysis.score < 60) {
    recommendations.push({
      category: 'Education',
      priority: 'medium',
      suggestion: 'Include your educational background with degrees, institutions, and graduation dates.',
      impact: 'Medium - Important for credibility'
    });
  }
  
  // Formatting recommendations
  if (!analyses.formatAnalysis.hasBulletPoints) {
    recommendations.push({
      category: 'Formatting',
      priority: 'medium',
      suggestion: 'Use bullet points to make your resume more scannable and ATS-friendly.',
      impact: 'Medium - Improves readability'
    });
  }
  
  // ATS recommendations
  if (analyses.atsAnalysis.issues.length > 0) {
    recommendations.push({
      category: 'ATS',
      priority: 'high',
      suggestion: `Fix ATS issues: ${analyses.atsAnalysis.issues.join('; ')}`,
      impact: 'High - Ensures your resume passes ATS screening'
    });
  }
  
  return recommendations;
}

/**
 * Helper: Count action verbs
 */
function countActionVerbs(text) {
  const actionVerbs = [
    'achieved', 'managed', 'led', 'developed', 'created', 'implemented',
    'designed', 'improved', 'increased', 'reduced', 'launched', 'built',
    'established', 'coordinated', 'executed', 'optimized', 'delivered'
  ];
  
  let count = 0;
  actionVerbs.forEach(verb => {
    const regex = new RegExp(`\\b${verb}\\w*\\b`, 'gi');
    const matches = text.match(regex);
    if (matches) count += matches.length;
  });
  
  return count;
}

/**
 * Helper: Extract keywords from text
 */
function extractKeywords(text) {
  // Simple keyword extraction - remove common words
  const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']);
  const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
  
  const keywords = words.filter(word => 
    word.length > 3 && !commonWords.has(word)
  );
  
  // Count frequency
  const frequency = {};
  keywords.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  // Return top keywords
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([word]) => word);
}

/**
 * Helper: Detect sections
 */
function detectSections(text) {
  return {
    experience: /(?:work\s+)?experience|employment/i.test(text),
    education: /education|academic/i.test(text),
    skills: /skills|technologies/i.test(text),
    summary: /summary|profile|objective/i.test(text),
    projects: /projects|portfolio/i.test(text),
    certifications: /certifications?|licenses?/i.test(text)
  };
}
