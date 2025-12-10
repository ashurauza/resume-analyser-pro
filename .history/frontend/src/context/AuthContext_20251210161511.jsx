import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem('resumeAnalyzer_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('resumeAnalyzer_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Client-side "login" - check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('resumeAnalyzer_users') || '{}');
    const user = users[email];

    if (!user) {
      throw new Error('User not found. Please sign up first.');
    }

    if (user.password !== password) {
      throw new Error('Invalid password.');
    }

    // "Login" successful
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    };

    setUser(userData);
    localStorage.setItem('resumeAnalyzer_user', JSON.stringify(userData));
    
    return userData;
  };

  const register = async (name, email, password) => {
    // Client-side "registration" - store in localStorage
    const users = JSON.parse(localStorage.getItem('resumeAnalyzer_users') || '{}');

    // Check if user already exists
    if (users[email]) {
      throw new Error('User already exists with this email.');
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In real app, this would be hashed!
      createdAt: new Date().toISOString()
    };

    // Save to users list
    users[email] = newUser;
    localStorage.setItem('resumeAnalyzer_users', JSON.stringify(users));

    // Auto-login
    const userData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt
    };

    setUser(userData);
    localStorage.setItem('resumeAnalyzer_user', JSON.stringify(userData));

    return userData;
  };

  const logout = () => {
    localStorage.removeItem('resumeAnalyzer_user');
    setUser(null);
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('resumeAnalyzer_user', JSON.stringify(updatedUser));
    
    // Also update in users list
    const users = JSON.parse(localStorage.getItem('resumeAnalyzer_users') || '{}');
    if (users[user.email]) {
      users[user.email] = { ...users[user.email], ...userData };
      localStorage.setItem('resumeAnalyzer_users', JSON.stringify(users));
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
