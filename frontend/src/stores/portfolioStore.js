import { create } from 'zustand'
import api from '../utils/api'

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
    console.log('Fetching hero data...')
    set({ isLoading: { ...get().isLoading, hero: true } })
    try {
      const response = await api.get('/portfolio/hero')
      console.log('Hero API response:', response.data)
      set({ 
        hero: response.data.data,
        isLoading: { ...get().isLoading, hero: false },
        errors: { ...get().errors, hero: null }
      })
    } catch (error) {
      console.error('Error fetching hero:', error)
      set({ 
        isLoading: { ...get().isLoading, hero: false },
        errors: { ...get().errors, hero: error.message }
      })
    }
  },
  
  fetchProjects: async () => {
    console.log('Fetching projects data...')
    set({ isLoading: { ...get().isLoading, projects: true } })
    try {
      const response = await api.get('/portfolio/projects')
      console.log('Projects API response:', response.data)
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
    await Promise.all([
      get().fetchHero(),
      get().fetchProjects(),
      get().fetchExperience(),
      get().fetchSkills(),
      get().fetchEducation(),
      get().fetchAchievements(),
      get().fetchLeadership(),
    ])
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
      const response = await api.post('/portfolio/skills', skillData)
      set({ skills: [...get().skills, response.data.data] })
      return { success: true, skill: response.data.data }
    } catch (error) {
      throw error
    }
  },

  updateSkill: async (id, skillData) => {
    try {
      const response = await api.put(`/portfolio/skills/${id}`, skillData)
      const updatedSkills = get().skills.map(skill => 
        skill._id === id ? response.data.data : skill
      )
      set({ skills: updatedSkills })
      return { success: true }
    } catch (error) {
      throw error
    }
  },

  deleteSkill: async (id) => {
    try {
      await api.delete(`/portfolio/skills/${id}`)
      const filteredSkills = get().skills.filter(skill => skill._id !== id)
      set({ skills: filteredSkills })
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
