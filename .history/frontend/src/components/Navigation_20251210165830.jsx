import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  ChartBarIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: HomeIcon },
    { path: '/analyze', label: 'Analyze', icon: DocumentTextIcon },
    { path: '/interview', label: 'Interview Prep', icon: ChatBubbleLeftRightIcon },
    { path: '/mcq', label: 'MCQ Test', icon: AcademicCapIcon },
    { path: '/analytics', label: 'Analytics', icon: ChartBarIcon },
  ];

  const isActive = (path) => location.pathname === path;

  if (!user) {
    return null;
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <motion.div
            className="logo-icon"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            📄
          </motion.div>
          <span className="logo-text">Resume Analyzer</span>
        </Link>

        {/* Nav Links */}
        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
            >
              <item.icon className="nav-icon" />
              <span>{item.label}</span>
              {isActive(item.path) && (
                <motion.div
                  className="active-indicator"
                  layoutId="activeIndicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* User Menu */}
        <div className="nav-user">
          <div className="user-info">
            <div className="user-avatar">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <div className="avatar-placeholder">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
            </div>
            <div className="user-details">
              <span className="user-name">{user?.name || 'User'}</span>
              <span className="user-email">{user?.email}</span>
            </div>
          </div>

          <div className="user-actions">
            <Link to="/profile" className="user-action-btn">
              <UserCircleIcon className="icon" />
            </Link>
            <button onClick={handleLogout} className="user-action-btn logout-btn">
              <ArrowRightOnRectangleIcon className="icon" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
