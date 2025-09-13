import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { useModalStore } from '../stores/modalStore'
import toast from 'react-hot-toast'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, isAuthenticated, logout } = useAuthStore()
  const { openEditResumeModal, openLoginModal } = useModalStore()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle logout
  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
    toast.success('Logged out successfully')
  }

  // Handle edit resume
  const handleEditResume = () => {
    openEditResumeModal()
    setIsMenuOpen(false)
  }

  // Handle login
  const handleLogin = () => {
    openLoginModal()
    setIsMenuOpen(false)
  }

  // Navigation items
  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Leadership', href: '#leadership' },
  ];

  // Track active section for underline
  const [activeSection, setActiveSection] = useState('Home');
  useEffect(() => {
    const handleScroll = () => {
      let found = 'Home';
      for (const item of navItems) {
        const el = document.querySelector(item.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            found = item.name;
            break;
          }
        }
      }
      setActiveSection(found);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    // Close mobile menu with a slight delay to prevent quick close/open effect
    if (isMenuOpen) {
      setTimeout(() => {
        setIsMenuOpen(false)
      }, 100)
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-bg-primary/90 backdrop-blur-md border-b border-border-color' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 select-none px-2 transition-all duration-300 ease-in-out"
            >
              <div className="w-9 h-9 bg-gradient-to-r from-accent-blue to-accent-cyan rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-extrabold text-2xl font-[Sora,Inter,sans-serif]">J</span>
              </div>
              <span className="text-2xl font-extrabold text-text-primary tracking-tight font-[Sora,Inter,sans-serif]">
                Jenish Patel
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 relative">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative text-text-secondary hover:text-text-primary transition-all duration-500 ease-in-out font-medium py-2 px-3 mx-1 rounded-lg ${activeSection === item.name ? 'text-accent-blue' : ''}`}
                  style={{ fontFamily: 'Inter, Sora, sans-serif' }}
                >
                  <span className="relative z-10">{item.name}</span>
                  {activeSection === item.name && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-0 bg-accent-blue/10 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  )}
                  <motion.span
                    className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-accent-blue to-accent-cyan rounded-full"
                    whileHover={{ 
                      width: "80%", 
                      x: "-40%",
                      transition: { duration: 0.3, ease: "easeInOut" }
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </motion.button>
              ))}
            </nav>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEditResume}
                    className="btn-primary text-sm transition-all duration-300 ease-in-out"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Edit Portfolio
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="btn-outline text-sm transition-all duration-300 ease-in-out"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogin}
                  className="btn-primary text-sm transition-all duration-300 ease-in-out"
                >
                  <User className="w-4 h-4 mr-2" />
                  Admin Login
                </motion.button>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <motion.button
              className="md:hidden fixed top-4 right-4 w-14 h-14 bg-red-500 border-4 border-yellow-400 rounded-xl shadow-2xl flex items-center justify-center text-white hover:bg-red-600 transition-all duration-300 z-[9999]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ 
                backgroundColor: isMenuOpen ? 'rgba(34, 197, 94, 1)' : 'rgba(239, 68, 68, 1)',
                borderColor: isMenuOpen ? 'rgba(251, 191, 36, 1)' : 'rgba(251, 191, 36, 1)'
              }}
            >
              <motion.div
                className="relative w-6 h-6"
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <motion.span
                  className="absolute top-1 left-0 w-6 h-0.5 bg-current rounded-full"
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 6 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span
                  className="absolute top-3 left-0 w-6 h-0.5 bg-current rounded-full"
                  animate={{
                    opacity: isMenuOpen ? 0 : 1,
                    x: isMenuOpen ? -10 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span
                  className="absolute top-5 left-0 w-6 h-0.5 bg-current rounded-full"
                  animate={{
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? -6 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 300,
                mass: 0.8
              }}
              className="relative w-80 max-w-[85vw] h-full bg-bg-card border-r border-border-color shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border-color">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-accent-blue to-accent-cyan rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">J</span>
                  </div>
                  <h2 className="text-xl font-bold text-text-primary">Menu</h2>
                </div>
                <motion.button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-bg-secondary rounded-lg transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-text-secondary" />
                </motion.button>
              </div>

              {/* Navigation Items */}
              <div className="p-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`block w-full text-left px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-all duration-300 ease-in-out ${
                      activeSection === item.name ? 'text-accent-blue bg-accent-blue/10' : ''
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>

              {/* Auth Section */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border-color">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <motion.button
                      onClick={handleEditResume}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <User className="w-4 h-4" />
                      <span>Edit Portfolio</span>
                    </motion.button>
                    <motion.button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-border-color text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </motion.button>
                  </div>
                ) : (
                  <motion.button
                    onClick={handleLogin}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <User className="w-4 h-4" />
                    <span>Admin Login</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header