import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import InterviewPrep from './pages/InterviewPrep';
import './App.css';
import './styles/theme.css';

// Import your existing resume analyzer component
import ResumeAnalyzer from './components/ResumeAnalyzer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Navigation />
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/analyze"
              element={
                <ProtectedRoute>
                  <Navigation />
                  <ResumeAnalyzer />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/interview"
              element={
                <ProtectedRoute>
                  <Navigation />
                  <InterviewPrep />
                </ProtectedRoute>
              }
            />
            
            {/* Redirect root to dashboard or login */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Catch all - redirect to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
