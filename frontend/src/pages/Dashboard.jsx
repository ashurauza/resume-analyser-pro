import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { apiClient } from '../config/api';
import {
  ChartBarIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  TrophyIcon,
  ArrowTrendingUpIcon,
  CloudArrowDownIcon,
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await apiClient.get('/reports/analytics/dashboard');
      setDashboardData(response.data.dashboard);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      id: 'new_analysis',
      label: 'Analyze Resume',
      icon: DocumentTextIcon,
      color: 'from-pink-500 to-rose-500',
      path: '/analyze',
    },
    {
      id: 'skill_test',
      label: 'Take Skill Test',
      icon: AcademicCapIcon,
      color: 'from-purple-500 to-pink-500',
      path: '/skill-test',
    },
    {
      id: 'view_progress',
      label: 'View Progress',
      icon: ChartBarIcon,
      color: 'from-blue-500 to-purple-500',
      path: '/analytics',
    },
    {
      id: 'export_report',
      label: 'Export Report',
      icon: CloudArrowDownIcon,
      color: 'from-green-500 to-teal-500',
      path: '/reports',
    },
  ];

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner-large"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <motion.div
        className="welcome-section"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="welcome-content">
          <h1>Welcome back, {user?.name || 'User'}! 👋</h1>
          <p>Here's your career progress overview</p>
        </div>
        <div className="welcome-avatar">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} />
          ) : (
            <div className="avatar-placeholder">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <motion.div
          className="stat-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <DocumentTextIcon className="icon" />
          </div>
          <div className="stat-content">
            <h3>{dashboardData?.stats?.totalAnalyses || 0}</h3>
            <p>Total Analyses</p>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <ChartBarIcon className="icon" />
          </div>
          <div className="stat-content">
            <h3>{dashboardData?.stats?.averageScore || 0}%</h3>
            <p>Average Score</p>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <ArrowTrendingUpIcon className="icon" />
          </div>
          <div className="stat-content">
            <h3>+{dashboardData?.stats?.improvement || 0}</h3>
            <p>Improvement</p>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
            <TrophyIcon className="icon" />
          </div>
          <div className="stat-content">
            <h3>{dashboardData?.stats?.achievements || 0}</h3>
            <p>Achievements</p>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        className="section-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.id}
              className="quick-action-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`action-icon bg-gradient-to-br ${action.color}`}>
                <action.icon className="icon" />
              </div>
              <h3>{action.label}</h3>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        className="section-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <h2 className="section-title">Recent Activity</h2>
        <div className="activity-list">
          {dashboardData?.recentActivity && dashboardData.recentActivity.length > 0 ? (
            dashboardData.recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id || index}
                className="activity-item glass-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
              >
                <div className="activity-icon">
                  <DocumentTextIcon className="icon" />
                </div>
                <div className="activity-content">
                  <h4>Resume Analysis - {activity.jobRole || 'General'}</h4>
                  <p>Score: {activity.score}% • {new Date(activity.date).toLocaleDateString()}</p>
                </div>
                <div className={`activity-badge ${activity.score >= 75 ? 'badge-success' : activity.score >= 50 ? 'badge-warning' : 'badge-danger'}`}>
                  {activity.score >= 75 ? '⭐ Excellent' : activity.score >= 50 ? '👍 Good' : '📈 Needs Work'}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="empty-state">
              <DocumentTextIcon className="empty-icon" />
              <h3>No activity yet</h3>
              <p>Start by analyzing your first resume!</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Progress Overview */}
      {dashboardData?.stats?.totalAnalyses > 0 && (
        <motion.div
          className="section-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          <h2 className="section-title">Your Progress</h2>
          <div className="progress-overview glass-card">
            <div className="progress-stat">
              <div className="progress-circle">
                <svg viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="10"
                    strokeDasharray={`${(dashboardData?.stats?.latestScore || 0) * 2.827} 282.7`}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f093fb" />
                      <stop offset="100%" stopColor="#f5576c" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="progress-value">
                  <h3>{dashboardData?.stats?.latestScore || 0}</h3>
                  <p>Latest Score</p>
                </div>
              </div>
            </div>
            <div className="progress-details">
              <div className="progress-detail-item">
                <span className="detail-label">Total Improvement</span>
                <span className="detail-value">+{dashboardData?.stats?.improvement || 0} points</span>
              </div>
              <div className="progress-detail-item">
                <span className="detail-label">Pending Recommendations</span>
                <span className="detail-value">{dashboardData?.stats?.pendingRecommendations || 0} items</span>
              </div>
              <div className="progress-detail-item">
                <span className="detail-label">Member Since</span>
                <span className="detail-value">
                  {new Date(dashboardData?.user?.memberSince).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
