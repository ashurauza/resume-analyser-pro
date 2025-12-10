// API Configuration for local and production environments
const getApiUrl = () => {
  // Check if we're in development mode
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  }
  
  // Production mode - use environment variable or default
  return import.meta.env.VITE_API_URL || 'https://your-backend-app.onrender.com/api';
};

export const API_BASE_URL = getApiUrl();

export const API_ENDPOINTS = {
  ANALYZE: `${API_BASE_URL}/resume/analyze`,
  HISTORY: `${API_BASE_URL}/resume/history`,
  STATISTICS: `${API_BASE_URL}/resume/statistics`,
  GET_BY_ID: (id) => `${API_BASE_URL}/resume/analysis/${id}`,
  DELETE: (id) => `${API_BASE_URL}/resume/analysis/${id}`,
  COMPARE: `${API_BASE_URL}/resume/compare`,
  HEALTH: `${API_BASE_URL}/health`,
};

// Axios instance with default config
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
