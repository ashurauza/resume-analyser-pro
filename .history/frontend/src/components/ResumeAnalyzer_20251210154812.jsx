import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, Brain, Target, TrendingUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import { parsePDFFile } from '../services/pdfParser'
import { analyzeResume } from '../services/resumeAnalyzer'
import { saveAnalysis } from '../services/storageService'
import '../App.css'

function App() {
  const [file, setFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [jobRole, setJobRole] = useState('')
  const [jobDescription, setJobDescription] = useState('')

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleAnalyze = async () => {
    if (!file) return

    setLoading(true)

    try {
      // Step 1: Parse PDF file client-side
      console.log('Parsing PDF...')
      const resumeText = await parsePDFFile(file)
      console.log('PDF parsed successfully, length:', resumeText.length)
      
      // Step 2: Analyze resume client-side
      console.log('Analyzing resume...')
      const analysisResult = analyzeResume(resumeText, {
        jobRole,
        jobDescription
      })
      console.log('Analysis complete:', analysisResult)
      
      // Step 3: Save to localStorage
      saveAnalysis({
        ...analysisResult,
        fileName: file.name,
        fileSize: file.size,
        jobRole,
        jobDescription
      })
      
      setAnalysis(analysisResult)
      alert('✅ Resume analyzed successfully!\n\n🎉 All processing done in your browser - no backend needed!')
    } catch (error) {
      console.error('Analysis failed:', error)
      alert(`Analysis failed: ${error.message}\n\nPlease ensure you uploaded a valid PDF file.`)
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981'
    if (score >= 60) return '#f59e0b'
    return '#ef4444'
  }

  const getPriorityIcon = (priority) => {
    if (priority === 'high') return <AlertCircle className="text-red-500" size={20} />
    if (priority === 'medium') return <AlertCircle className="text-yellow-500" size={20} />
    return <CheckCircle className="text-green-500" size={20} />
  }

  return (
    <div className="app">
      {/* Header */}
      <motion.header 
        className="header"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="header-content">
          <div className="logo">
            <Brain className="logo-icon" />
            <h1>Resume Analyzer Pro</h1>
          </div>
          <p className="tagline">AI-Powered Resume Analysis & ATS Optimization</p>
        </div>
      </motion.header>

      <main className="main-content">
        {!analysis || !analysis.overallScore ? (
          <motion.div 
            className="upload-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Job Details */}
            <div className="input-group">
              <div className="input-card">
                <label>Job Role</label>
                <input
                  type="text"
                  placeholder="e.g., Senior Software Engineer"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="input-card">
                <label>Job Description (Optional)</label>
                <textarea
                  placeholder="Paste the job description here for better analysis..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="textarea-field"
                  rows={4}
                />
              </div>
            </div>

            {/* Upload Area */}
            <div
              className={`upload-area ${dragActive ? 'drag-active' : ''} ${file ? 'has-file' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                accept=".pdf"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="file-upload" className="upload-label">
                {file ? (
                  <>
                    <FileText size={48} className="upload-icon success" />
                    <h3>{file.name}</h3>
                    <p>Click to change or drag a new file</p>
                  </>
                ) : (
                  <>
                    <Upload size={48} className="upload-icon" />
                    <h3>Drop your resume here</h3>
                    <p>or click to browse (PDF only)</p>
                  </>
                )}
              </label>
            </div>

            <motion.button
              className="analyze-btn"
              onClick={handleAnalyze}
              disabled={!file || loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? (
                <>
                  <div className="spinner" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Target size={20} />
                  Analyze Resume
                </>
              )}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            className="results-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Overall Score */}
            <motion.div 
              className="score-card main-score"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <h2>Overall Score</h2>
              <div className="score-chart">
                <ResponsiveContainer width="100%" height={200}>
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="90%"
                    data={[{ value: analysis?.overallScore || 0, fill: getScoreColor(analysis?.overallScore || 0) }]}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar dataKey="value" cornerRadius={10} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="score-value">
                  <span className="score-number" style={{ color: getScoreColor(analysis?.overallScore || 0) }}>
                    {analysis?.overallScore || 0}
                  </span>
                  <span className="score-label">/ 100</span>
                </div>
              </div>
              <p className="score-description">
                {(analysis?.overallScore || 0) >= 80 ? 'Excellent!' : 
                 (analysis?.overallScore || 0) >= 60 ? 'Good, but can improve' : 
                 'Needs improvement'}
              </p>
            </motion.div>

            {/* Detailed Scores */}
            <div className="scores-grid">
              {analysis.categoryScores && Object.entries(analysis.categoryScores).map(([key, value], index) => (
                <motion.div
                  key={key}
                  className="score-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <h3>{key.toUpperCase()}</h3>
                  <div className="score-bar">
                    <div 
                      className="score-fill"
                      style={{ 
                        width: `${value}%`,
                        backgroundColor: getScoreColor(value)
                      }}
                    />
                  </div>
                  <p className="score-percent">{value}%</p>
                </motion.div>
              ))}
            </div>

            {/* Recommendations */}
            <motion.div
              className="recommendations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2>
                <TrendingUp size={24} />
                Recommendations
              </h2>
              <div className="recommendations-list">
                {analysis.recommendations && analysis.recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    className={`recommendation-card ${rec.priority}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    {getPriorityIcon(rec.priority)}
                    <div className="rec-content">
                      <h4>{rec.category}</h4>
                      <p>{rec.message}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="action-buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <button className="btn-secondary" onClick={() => { setAnalysis(null); setFile(null) }}>
                Analyze Another Resume
              </button>
              <button className="btn-primary" onClick={() => window.print()}>
                Download Report
              </button>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  )
}

export default App
