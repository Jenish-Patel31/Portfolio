import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../utils/api'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // Auth state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      
      // Actions
      login: async (username, password) => {
        set({ isLoading: true })
        try {
          const response = await api.post('/auth/login', { username, password })
          const { user, token } = response.data.data
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          })
          
          // Set token in API headers
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          return { success: true, user }
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
        
        // Remove token from API headers
        delete api.defaults.headers.common['Authorization']
      },
      
      checkAuth: async () => {
        const { token } = get()
        if (!token) return
        
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          const response = await api.get('/auth/verify')
          const { user } = response.data.data
          
          set({
            user,
            isAuthenticated: true,
          })
        } catch (error) {
          // Token is invalid, logout user
          get().logout()
        }
      },
      
      updateProfile: (userData) => {
        set({ user: { ...get().user, ...userData } })
      },
      
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
)
