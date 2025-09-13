import { useEffect } from 'react'
import SidebarNavbar from './components/SidebarNavbar'
import HeroSection from './components/HeroSection'
import ProjectsSection from './components/ProjectsSection'
import ExperienceSection from './components/ExperienceSection'
import SkillsSection from './components/SkillsSection'
import EducationSection from './components/EducationSection'
import AchievementsSection from './components/AchievementsSection'
import LeadershipSection from './components/LeadershipSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import TerminalModal from './components/TerminalModal'
import ChatbotModal from './components/ChatbotModal'
import LoginModal from './components/LoginModal'
import EditPortfolioModal from './components/EditPortfolioModal'
import FloatingTerminal from './components/FloatingTerminal'
import FloatingChatbot from './components/FloatingChatbot'
import { useModalStore } from './stores/modalStore'
import { useAuthStore } from './stores/authStore'
import { usePortfolioStore } from './stores/portfolioStore'
import { useLoadingStore } from './stores/loadingStore'
import StarsBackground from './components/StarsBackground'
import LoadingOverlay from './components/LoadingOverlay'
import NotificationSystem from './components/NotificationSystem'
import BackendStatusIndicator from './components/BackendStatusIndicator'
import { AnimatePresence, motion } from 'framer-motion'



function App() {
  const { isTerminalOpen, isChatbotOpen } = useModalStore()
  const { checkAuth } = useAuthStore()
  const { fetchAllData } = usePortfolioStore()
  const { resetNotificationState } = useLoadingStore()

  useEffect(() => {
    // Reset notification state on fresh load
    resetNotificationState()
    // Check authentication status on app load
    checkAuth()
    fetchAllData()
  }, []) // Remove dependencies to prevent infinite loop

  const { isLoginOpen, isEditPortfolioOpen } = useModalStore()

  const { isGlobalLoading, backendStatus } = useLoadingStore()

  return (
  <div className="bg-bg-primary">
      <StarsBackground />
      {/* Only show sidebar if not loading and not in error state */}
      {!isGlobalLoading && <SidebarNavbar />}
      {/* Only show main content if not loading and not in error state */}
      {!isGlobalLoading && (
        <AnimatePresence mode="wait">
          <motion.main
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <HeroSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <EducationSection />
            <AchievementsSection />
            <LeadershipSection />
            <ContactSection />
          </motion.main>
        </AnimatePresence>
      )}
      {/* Only show footer and floating elements if not loading and not in error state */}
      {!isGlobalLoading && (
        <>
          <Footer />
          {/* Floating Elements */}
          <FloatingTerminal />
          <FloatingChatbot />
        </>
      )}
      {/* Modals */}
      {isTerminalOpen && <TerminalModal />}
      {isChatbotOpen && <ChatbotModal />}
      <LoginModal />
      <EditPortfolioModal />
      {/* Loading and Notification Systems */}
      <LoadingOverlay />
      <NotificationSystem />
      <BackendStatusIndicator />
    </div>
  )
}

export default App
