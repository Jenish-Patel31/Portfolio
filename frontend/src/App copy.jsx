import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarTestPage from './pages/NavbarTestPage';
import SidebarNavbar from './components/SidebarNavbar'
import HeroSection from './components/HeroSection'
import ProjectsSection from './components/ProjectsSection'
import ExperienceSection from './components/ExperienceSection'
import SkillsSection from './components/SkillsSection'
import EducationSection from './components/EducationSection'
import AchievementsSection from './components/AchievementsSection'
import LeadershipSection from './components/LeadershipSection'
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
import StarsBackground from './components/StarsBackground'
import { AnimatePresence, motion } from 'framer-motion'



function App() {
  const { isTerminalOpen, isChatbotOpen } = useModalStore()
  const { checkAuth } = useAuthStore()
  const { fetchAllData } = usePortfolioStore()

  useEffect(() => {
    console.log('App: useEffect triggered')
    // Check authentication status on app load
    checkAuth()
    fetchAllData()
  }, [checkAuth, fetchAllData])

  const { isLoginOpen, isEditPortfolioOpen } = useModalStore()

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg-primary">
        <StarsBackground />
        <SidebarNavbar />
        <AnimatePresence mode="wait">
          <motion.main
            key={location?.pathname || 'main'}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <Routes>
              <Route path="/" element={
                <>
                  <HeroSection />
                  <ProjectsSection />
                  <ExperienceSection />
                  <SkillsSection />
                  <EducationSection />
                  <AchievementsSection />
                  <LeadershipSection />
                </>
              } />
              <Route path="/navbar-test" element={<NavbarTestPage />} />
            </Routes>
          </motion.main>
        </AnimatePresence>
        <Footer />
        {/* Floating Elements */}
        <FloatingTerminal />
        <FloatingChatbot />
        {/* Modals */}
        {isTerminalOpen && <TerminalModal />}
        {isChatbotOpen && <ChatbotModal />}
        <LoginModal />
        <EditPortfolioModal />
      </div>
    </BrowserRouter>
  )
}

export default App
