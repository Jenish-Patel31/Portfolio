import axios from 'axios'
import { useLoadingStore } from '../stores/loadingStore'

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 30000, // Increased timeout for cold starts
  headers: {
    'Content-Type': 'application/json',
  },
})

// Track request timing for backend delay detection
let requestStartTime = null
let isFirstRequest = true
let hasShownStartupNotification = false
let consecutiveErrors = 0
let lastErrorTime = 0

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Track request start time
    requestStartTime = Date.now()
    
    // Set backend status to starting on first request
    if (isFirstRequest) {
      const loadingStore = useLoadingStore.getState()
      loadingStore.setBackendStatus('starting')
      loadingStore.setGlobalLoading(true, 'Waking up our dynamic portfolio server...')
      
      // Don't show startup notification for first request since we have loading overlay
      // This will be handled by the loading overlay itself
      
      isFirstRequest = false
    } else {
      // For subsequent requests, show notification if server seems to be sleeping
      const loadingStore = useLoadingStore.getState()
      if (loadingStore.backendStatus === 'unknown' || loadingStore.backendStatus === 'error') {
        loadingStore.addNotification({
          type: 'info',
          title: 'Server Starting',
          message: 'Our portfolio server is waking up from sleep mode. This usually takes 10-15 seconds on the free tier.',
          duration: 10000
        })
      }
    }
    
    // Add auth token if available
    const token = localStorage.getItem('auth-storage') 
      ? JSON.parse(localStorage.getItem('auth-storage')).state.token 
      : null
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
    }
    
    // Don't set Content-Type for FormData (file uploads)
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type']
    }
    
    return config
  },
  (error) => {
    console.error('Request interceptor error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Calculate request duration
    const requestDuration = requestStartTime ? Date.now() - requestStartTime : 0
    
    // If this is a successful response and we were in loading state
    const loadingStore = useLoadingStore.getState()
    
    // Reset error counter on successful response
    consecutiveErrors = 0
    
    // Check if this was a slow request (indicating cold start)
    if (requestDuration > 5000) {
      
      // Show success notification for slow requests
      loadingStore.addNotification({
        type: 'success',
        title: 'Server Ready!',
        message: `Portfolio loaded successfully! (${Math.round(requestDuration/1000)}s)`,
        duration: 5000
      })
    }
    
    // Set backend status to ready
    loadingStore.setBackendStatus('ready')
    
    // Log successful responses
    
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data, error.config?.url)
    
    const loadingStore = useLoadingStore.getState()
    
    // Handle timeout errors (likely cold start)
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      loadingStore.setBackendStatus('error')
      // Don't show error notifications - let the loading overlay handle it
    }
    
    // Handle network errors
    if (error.code === 'ERR_NETWORK' || !error.response) {
      loadingStore.setBackendStatus('error')
      consecutiveErrors++
      // Don't show error notifications - let the loading overlay handle it
    }
    
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - clear auth and redirect to login
      console.error('Unauthorized - clearing auth token')
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
      loadingStore.setBackendStatus('error')
      // Don't show error notifications - let the loading overlay handle it
    }
    
    return Promise.reject(error)
  }
)

export default api
