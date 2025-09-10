import axios from 'axios'

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth-storage') 
      ? JSON.parse(localStorage.getItem('auth-storage')).state.token 
      : null
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - clear auth and redirect to login
      localStorage.removeItem('auth-storage')
      window.location.href = '/'
    }
    
    if (error.response?.status === 403) {
      // Forbidden - user doesn't have permission
      console.error('Access denied: Insufficient permissions')
    }
    
    if (error.response?.status === 500) {
      // Server error
      console.error('Server error:', error.response.data)
    }
    
    return Promise.reject(error)
  }
)

export default api
