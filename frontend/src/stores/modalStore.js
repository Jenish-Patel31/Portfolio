import { create } from 'zustand'

export const useModalStore = create((set) => ({
  // Modal states
  isTerminalOpen: false,
  isChatbotOpen: false,
  isProjectModalOpen: false,
  isExperienceModalOpen: false,
  isEditResumeModalOpen: false,
  isLoginModalOpen: false,
  
  // Selected items for editing
  selectedProject: null,
  selectedExperience: null,
  
  // Actions
  openTerminal: () => set({ isTerminalOpen: true }),
  closeTerminal: () => set({ isTerminalOpen: false }),
  
  openChatbot: () => set({ isChatbotOpen: true }),
  closeChatbot: () => set({ isChatbotOpen: false }),
  
  openProjectModal: (project = null) => set({ 
    isProjectModalOpen: true, 
    selectedProject: project 
  }),
  closeProjectModal: () => set({ 
    isProjectModalOpen: false, 
    selectedProject: null 
  }),
  
  openExperienceModal: (experience = null) => set({ 
    isExperienceModalOpen: true, 
    selectedExperience: experience 
  }),
  closeExperienceModal: () => set({ 
    isExperienceModalOpen: false, 
    selectedExperience: null 
  }),
  
  openEditResumeModal: () => set({ isEditResumeModalOpen: true }),
  closeEditResumeModal: () => set({ isEditResumeModalOpen: false }),
  
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
  
  // Close all modals
  closeAllModals: () => set({
    isTerminalOpen: false,
    isChatbotOpen: false,
    isProjectModalOpen: false,
    isExperienceModalOpen: false,
    isEditResumeModalOpen: false,
    isLoginModalOpen: false,
    selectedProject: null,
    selectedExperience: null,
  }),
}))
