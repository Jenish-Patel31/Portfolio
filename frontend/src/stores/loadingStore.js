import { create } from 'zustand'

export const useLoadingStore = create((set, get) => ({
  // Global loading state
  isGlobalLoading: false,
  loadingMessage: 'Loading your dynamic portfolio...',
  
  // Individual section loading states
  sectionLoading: {
    hero: false,
    projects: false,
    experience: false,
    skills: false,
    education: false,
    achievements: false,
    leadership: false,
  },
  
  // Notification system
  notifications: [],
  lastNotificationType: null,
  notificationCooldown: 5000, // 5 seconds cooldown between same type notifications
  
  // Backend status
  backendStatus: 'unknown', // 'unknown', 'starting', 'ready', 'error'
  backendStartTime: null,
  hasShownStartupNotification: false,
  
  // Actions
  setGlobalLoading: (isLoading, message = 'Loading your dynamic portfolio...') => {
    set({ 
      isGlobalLoading: isLoading,
      loadingMessage: message,
      backendStartTime: isLoading ? Date.now() : null
    })
  },
  
  setSectionLoading: (section, isLoading) => {
    set(state => ({
      sectionLoading: {
        ...state.sectionLoading,
        [section]: isLoading
      }
    }))
  },
  
  setBackendStatus: (status) => {
    set({ backendStatus: status })
  },
  
  addNotification: (notification) => {
    const state = get()
    const now = Date.now()
    
    // Check for duplicate notifications within cooldown period
    if (state.lastNotificationType === notification.type && 
        (now - (state.lastNotificationTime || 0)) < state.notificationCooldown) {
      return null // Don't show duplicate notification
    }
    
    const id = Date.now() + Math.random()
    const newNotification = {
      id,
      type: 'info', // 'info', 'success', 'warning', 'error'
      title: 'Backend Starting',
      message: 'Our dynamic portfolio server is waking up from sleep mode. This usually takes 10-15 seconds on the free tier.',
      duration: 8000,
      ...notification
    }
    
    set(state => ({
      notifications: [...state.notifications, newNotification],
      lastNotificationType: notification.type,
      lastNotificationTime: now
    }))
    
    // Auto remove notification after duration
    setTimeout(() => {
      get().removeNotification(id)
    }, newNotification.duration)
    
    return id
  },
  
  removeNotification: (id) => {
    set(state => ({
      notifications: state.notifications.filter(notification => notification.id !== id)
    }))
  },
  
  clearNotifications: () => {
    set({ notifications: [] })
  },
  
  // Helper to check if any section is loading
  isAnySectionLoading: () => {
    const { sectionLoading } = get()
    return Object.values(sectionLoading).some(loading => loading)
  },
  
  // Helper to get loading progress
  getLoadingProgress: () => {
    const { sectionLoading } = get()
    const totalSections = Object.keys(sectionLoading).length
    const loadedSections = Object.values(sectionLoading).filter(loading => !loading).length
    return Math.round((loadedSections / totalSections) * 100)
  },
  
  // Reset notification state (for fresh page loads)
  resetNotificationState: () => {
    set({
      notifications: [],
      lastNotificationType: null,
      hasShownStartupNotification: false,
    })
  },
  
  // Reset loading state for retry
  resetLoadingState: () => {
    set({
      isGlobalLoading: true,
      backendStatus: 'unknown',
      hasShownStartupNotification: false,
    })
  }
}))
