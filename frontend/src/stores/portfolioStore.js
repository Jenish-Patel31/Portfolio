import { create } from 'zustand'
import api from '../utils/api'
import { useLoadingStore } from './loadingStore'

export const usePortfolioStore = create((set, get) => ({
  // Portfolio data
  hero: null,
  projects: [],
  experience: [],
  skills: [],
  education: [],
  achievements: [],
  leadership: [],
  
  // Loading states
  isLoading: {
    hero: false,
    projects: false,
    experience: false,
    skills: false,
    education: false,
    achievements: false,
    leadership: false,
  },
  
  // Error states
  errors: {},
  
  // Actions
  fetchHero: async () => {
    set({ isLoading: { ...get().isLoading, hero: true } })
    try {
      const response = await api.get('/portfolio/hero')
      set({ 
        hero: response.data.data,
        isLoading: { ...get().isLoading, hero: false },
        errors: { ...get().errors, hero: null }
      })
    } catch (error) {
      console.error('Error fetching hero:', error)
      set({ 
        isLoading: { ...get().isLoading, hero: false },
        errors: { ...get().errors, hero: null } // Don't store error message
      })
      // Set backend status to error so loading overlay can handle it
      const loadingStore = useLoadingStore.getState()
      loadingStore.setBackendStatus('error')
    }
  },
  
  fetchProjects: async () => {
    set({ isLoading: { ...get().isLoading, projects: true } })
    try {
      const response = await api.get('/portfolio/projects')
      set({ 
        projects: response.data.data,
        isLoading: { ...get().isLoading, projects: false },
        errors: { ...get().errors, projects: null }
      })
    } catch (error) {
      console.error('Error fetching projects:', error)
      set({ 
        isLoading: { ...get().isLoading, projects: false },
        errors: { ...get().errors, projects: error.message }
      })
    }
  },
  
  fetchExperience: async () => {
    set({ isLoading: { ...get().isLoading, experience: true } })
    try {
      const response = await api.get('/portfolio/experience')
      set({ 
        experience: response.data.data,
        isLoading: { ...get().isLoading, experience: false },
        errors: { ...get().errors, experience: null }
      })
    } catch (error) {
      set({ 
        isLoading: { ...get().isLoading, experience: false },
        errors: { ...get().errors, experience: error.message }
      })
    }
  },
  
  fetchSkills: async () => {
    set({ isLoading: { ...get().isLoading, skills: true } })
    try {
      const response = await api.get('/portfolio/skills')
      set({ 
        skills: response.data.data,
        isLoading: { ...get().isLoading, skills: false },
        errors: { ...get().errors, skills: null }
      })
    } catch (error) {
      set({ 
        isLoading: { ...get().isLoading, skills: false },
        errors: { ...get().errors, skills: error.message }
      })
    }
  },
  
  fetchEducation: async () => {
    set({ isLoading: { ...get().isLoading, education: true } })
    try {
      const response = await api.get('/portfolio/education')
      set({ 
        education: response.data.data,
        isLoading: { ...get().isLoading, education: false },
        errors: { ...get().errors, education: null }
      })
    } catch (error) {
      set({ 
        isLoading: { ...get().isLoading, education: false },
        errors: { ...get().errors, education: error.message }
      })
    }
  },
  
  fetchAchievements: async () => {
    set({ isLoading: { ...get().isLoading, achievements: true } })
    try {
      const response = await api.get('/portfolio/achievements')
      set({ 
        achievements: response.data.data,
        isLoading: { ...get().isLoading, achievements: false },
        errors: { ...get().errors, achievements: null }
      })
    } catch (error) {
      set({ 
        isLoading: { ...get().isLoading, achievements: false },
        errors: { ...get().errors, achievements: error.message }
      })
    }
  },
  
  fetchLeadership: async () => {
    set({ isLoading: { ...get().isLoading, leadership: true } })
    try {
      const response = await api.get('/portfolio/leadership')
      set({ 
        leadership: response.data.data,
        isLoading: { ...get().isLoading, leadership: false },
        errors: { ...get().errors, leadership: null }
      })
    } catch (error) {
      set({ 
        isLoading: { ...get().isLoading, leadership: false },
        errors: { ...get().errors, leadership: error.message }
      })
    }
  },
  
  // Fetch all portfolio data
  fetchAllData: async () => {
    const loadingStore = useLoadingStore.getState()
    
    // Set global loading to true when starting to fetch data
    loadingStore.setGlobalLoading(true, 'Loading your dynamic portfolio...')
    
    try {
      // First fetch hero data and hide loading when hero is ready
      await get().fetchHero()
      
      // Check if hero fetch was successful
      const currentState = get()
      if (currentState.hero) {
        // Hide global loading with a small delay for smooth transition
        setTimeout(() => {
          loadingStore.setGlobalLoading(false)
        }, 150) // 150ms delay for faster transition
        
        // Then fetch other data in background
        Promise.all([
          get().fetchProjects(),
          get().fetchExperience(),
          get().fetchSkills(),
          get().fetchEducation(),
          get().fetchAchievements(),
          get().fetchLeadership(),
        ]).catch(error => {
          console.error('Error fetching additional portfolio data:', error)
        })
      }
      // If hero fetch failed, the loading overlay will show error state
      
    } catch (error) {
      console.error('Error fetching hero data:', error)
      // Don't hide loading - let the error state show
    }
  },
  
  // Update methods (for authenticated users)
  updateHero: async (heroData) => {
    try {
      const response = await api.put('/portfolio/hero', heroData)
      set({ hero: response.data.data })
      return { success: true }
    } catch (error) {
      throw error
    }
  },
  
  addProject: async (projectData) => {
    try {
      const response = await api.post('/portfolio/projects', projectData)
      set({ projects: [...get().projects, response.data.data] })
      return { success: true, project: response.data.data }
    } catch (error) {
      throw error
    }
  },
  
  updateProject: async (id, projectData) => {
    try {
      const response = await api.put(`/portfolio/projects/${id}`, projectData)
      const updatedProjects = get().projects.map(project => 
        project._id === id ? response.data.data : project
      )
      set({ projects: updatedProjects })
      return { success: true }
    } catch (error) {
      throw error
    }
  },
  
  deleteProject: async (id) => {
    try {
      await api.delete(`/portfolio/projects/${id}`)
      const filteredProjects = get().projects.filter(project => project._id !== id)
      set({ projects: filteredProjects })
      return { success: true }
    } catch (error) {
      throw error
    }
  },

  // Experience methods
  addExperience: async (experienceData) => {
    try {
      const response = await api.post('/portfolio/experience', experienceData)
      set({ experience: [...get().experience, response.data.data] })
      return { success: true, experience: response.data.data }
    } catch (error) {
      throw error
    }
  },

  updateExperience: async (id, experienceData) => {
    try {
      const response = await api.put(`/portfolio/experience/${id}`, experienceData)
      const updatedExperience = get().experience.map(exp => 
        exp._id === id ? response.data.data : exp
      )
      set({ experience: updatedExperience })
      return { success: true }
    } catch (error) {
      throw error
    }
  },

  deleteExperience: async (id) => {
    try {
      await api.delete(`/portfolio/experience/${id}`)
      const filteredExperience = get().experience.filter(exp => exp._id !== id)
      set({ experience: filteredExperience })
      return { success: true }
    } catch (error) {
      throw error
    }
  },

  // Skills methods
  addSkill: async (skillData) => {
    try {
      // Remove category from individual skill data as it's not allowed in validation
      const { category, ...skillWithoutCategory } = skillData
      
      // Wrap individual skill data in the expected format
      const requestData = {
        category: category,
        skills: [skillWithoutCategory] // Wrap the skill in an array without category
      }
      const response = await api.post('/portfolio/skills', requestData)
      // Refresh skills data to get updated structure
      await get().fetchSkills()
      return { success: true, skill: response.data.data }
    } catch (error) {
      console.error('Error adding skill:', error)
      throw error
    }
  },

  updateSkill: async (categoryId, skillId, skillData) => {
    try {
      // Remove category from skill data as it's not allowed in individual skill updates
      const { category, ...skillWithoutCategory } = skillData
      
      const response = await api.put(`/portfolio/skills/${categoryId}/skills/${skillId}`, skillWithoutCategory)
      // Refresh skills data to get updated structure
      await get().fetchSkills()
      return { success: true }
    } catch (error) {
      console.error('Error updating skill:', error)
      throw error
    }
  },

  deleteSkill: async (categoryId, skillId) => {
    try {
      await api.delete(`/portfolio/skills/${categoryId}/skills/${skillId}`)
      // Refresh skills data to get updated structure
      await get().fetchSkills()
      return { success: true }
    } catch (error) {
      throw error
    }
  },

  // Category management methods
  addCategory: async (categoryData) => {
    try {
      const response = await api.post('/portfolio/skills/categories', categoryData)
      // Refresh skills data to get updated structure
      await get().fetchSkills()
      return { success: true, category: response.data.data }
    } catch (error) {
      console.error('Error adding category:', error)
      throw error
    }
  },

  updateCategory: async (categoryId, categoryData) => {
    try {
      const response = await api.put(`/portfolio/skills/categories/${categoryId}`, categoryData)
      // Refresh skills data to get updated structure
      await get().fetchSkills()
      return { success: true }
    } catch (error) {
      console.error('Error updating category:', error)
      throw error
    }
  },

  deleteCategory: async (categoryId) => {
    try {
      await api.delete(`/portfolio/skills/categories/${categoryId}`)
      // Refresh skills data to get updated structure
      await get().fetchSkills()
      return { success: true }
    } catch (error) {
      throw error
    }
  },

  // Education methods
  addEducation: async (educationData) => {
    try {
      const response = await api.post('/portfolio/education', educationData)
      set({ education: [...get().education, response.data.data] })
      return { success: true, education: response.data.data }
    } catch (error) {
      throw error
    }
  },

  updateEducation: async (id, educationData) => {
    try {
      const response = await api.put(`/portfolio/education/${id}`, educationData)
      const updatedEducation = get().education.map(edu => 
        edu._id === id ? response.data.data : edu
      )
      set({ education: updatedEducation })
      return { success: true }
    } catch (error) {
      throw error
    }
  },

  deleteEducation: async (id) => {
    try {
      await api.delete(`/portfolio/education/${id}`)
      const filteredEducation = get().education.filter(edu => edu._id !== id)
      set({ education: filteredEducation })
      return { success: true }
    } catch (error) {
      throw error
    }
  },

  // Achievements methods
  addAchievement: async (achievementData) => {
    try {
      const response = await api.post('/portfolio/achievements', achievementData)
      set({ achievements: [...get().achievements, response.data.data] })
      return { success: true, achievement: response.data.data }
    } catch (error) {
      throw error
    }
  },

  updateAchievement: async (id, achievementData) => {
    try {
      const response = await api.put(`/portfolio/achievements/${id}`, achievementData)
      const updatedAchievements = get().achievements.map(achievement => 
        achievement._id === id ? response.data.data : achievement
      )
      set({ achievements: updatedAchievements })
      return { success: true }
    } catch (error) {
      throw error
    }
  },

  deleteAchievement: async (id) => {
    try {
      await api.delete(`/portfolio/achievements/${id}`)
      const filteredAchievements = get().achievements.filter(achievement => achievement._id !== id)
      set({ achievements: filteredAchievements })
      return { success: true }
    } catch (error) {
      throw error
    }
  },

  // Leadership methods
  addLeadership: async (leadershipData) => {
    try {
      const response = await api.post('/portfolio/leadership', leadershipData)
      set({ leadership: [...get().leadership, response.data.data] })
      return { success: true, leadership: response.data.data }
    } catch (error) {
      throw error
    }
  },

  updateLeadership: async (id, leadershipData) => {
    try {
      const response = await api.put(`/portfolio/leadership/${id}`, leadershipData)
      const updatedLeadership = get().leadership.map(lead => 
        lead._id === id ? response.data.data : lead
      )
      set({ leadership: updatedLeadership })
      return { success: true }
    } catch (error) {
      throw error
    }
  },

  deleteLeadership: async (id) => {
    try {
      await api.delete(`/portfolio/leadership/${id}`)
      const filteredLeadership = get().leadership.filter(lead => lead._id !== id)
      set({ leadership: filteredLeadership })
      return { success: true }
    } catch (error) {
      throw error
    }
  },
  
  // Clear all data
  clearData: () => {
    set({
      hero: null,
      projects: [],
      experience: [],
      skills: [],
      education: [],
      achievements: [],
      leadership: [],
      isLoading: {
        hero: false,
        projects: false,
        experience: false,
        skills: false,
        education: false,
        achievements: false,
        leadership: false,
      },
      errors: {},
    })
  },
}))
