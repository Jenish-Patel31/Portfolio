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

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
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

            {/* Mobile Menu Button - Hidden in header, will be floating */}
            <div className="md:hidden">
              {/* This will be replaced by floating button */}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
              
              {/* Mobile Menu Panel */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-80 max-w-[85vw] h-full bg-bg-card border-r border-border-color shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border-color">
                  <h2 className="text-xl font-bold text-text-primary">Navigation</h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-bg-secondary rounded-lg transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-text-secondary" />
                  </button>
                </div>

                {/* Navigation Items */}
                <div className="p-6 space-y-3">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="block w-full text-left px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-all duration-300 ease-in-out"
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
                      <button
                        onClick={handleEditResume}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors duration-200"
                      >
                        <User className="w-4 h-4" />
                        <span>Edit Portfolio</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-border-color text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleLogin}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors duration-200"
                    >
                      <User className="w-4 h-4" />
                      <span>Admin Login</span>
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navbar Transition */}
        <motion.div
          className="md:hidden"
          initial={false}
          animate={isMenuOpen ? 'collapsed' : 'expanded'}
          variants={{
            expanded: {
              x: 0,
              y: 0,
              scale: 1,
              transition: { duration: 0.5, ease: "easeInOut" }
            },
            collapsed: {
              x: -300,
              y: 0,
              scale: 0.8,
              transition: { duration: 0.5, ease: "easeInOut" }
            }
          }}
        >
          {/* Mobile Navigation Bar */}
          <motion.nav
            className="fixed top-4 left-4 z-50 bg-bg-card/95 backdrop-blur-md border border-border-color rounded-2xl shadow-2xl p-3"
            variants={{
              expanded: {
                width: "auto",
                height: "auto",
                transition: { duration: 0.5, ease: "easeInOut" }
              },
              collapsed: {
                width: "56px",
                height: "56px",
                transition: { duration: 0.5, ease: "easeInOut" }
              }
            }}
          >
            {!isMenuOpen ? (
              // Expanded Navbar
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-4"
              >
                {navItems.slice(0, 4).map((item) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="px-3 py-2 text-sm text-text-secondary hover:text-accent-blue transition-colors duration-200 rounded-lg hover:bg-bg-secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
                <motion.button
                  onClick={() => setIsMenuOpen(true)}
                  className="w-8 h-8 bg-accent-blue text-white rounded-lg flex items-center justify-center hover:bg-accent-blue/90 transition-colors duration-200"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Menu className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ) : (
              // Collapsed Hamburger Menu
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full flex items-center justify-center"
              >
                <motion.button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-8 h-8 bg-gradient-to-r from-accent-blue to-accent-cyan text-white rounded-lg flex items-center justify-center hover:from-accent-blue/90 hover:to-accent-cyan/90 transition-all duration-200"
                  whileHover={{ scale: 1.1, rotate: -90 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ rotate: isMenuOpen ? 0 : 90 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </motion.div>
            )}
          </motion.nav>
        </motion.div>
      </div>
    </motion.header>
  )
}

export default Header
