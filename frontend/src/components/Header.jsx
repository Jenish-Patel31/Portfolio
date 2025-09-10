import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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
    setIsMenuOpen(false)
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
            className="flex items-center space-x-2 select-none px-2"
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
                className={`relative text-text-secondary hover:text-text-primary transition-colors duration-200 font-medium pb-1 mx-2 ${activeSection === item.name ? 'text-accent-blue' : ''}`}
                style={{ fontFamily: 'Inter, Sora, sans-serif' }}
              >
                {item.name}
                {activeSection === item.name && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 -bottom-0.5 h-1 rounded bg-gradient-to-r from-accent-blue to-accent-cyan"
                    style={{ zIndex: 1 }}
                  />
                )}
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
                  className="btn-primary text-sm"
                >
                  <User className="w-4 h-4 mr-2" />
                  Edit Portfolio
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="btn-outline text-sm"
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
                className="btn-primary text-sm"
              >
                <User className="w-4 h-4 mr-2" />
                Admin Login
              </motion.button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-bg-card transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-text-primary" />
              ) : (
                <Menu className="w-6 h-6 text-text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.nav
          initial={false}
          animate={isMenuOpen ? 'open' : 'closed'}
          variants={{
            open: { opacity: 1, height: 'auto' },
            closed: { opacity: 0, height: 0 }
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-card rounded-lg transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
          </div>
        </motion.nav>
      </div>
    </motion.header>
  )
}

export default Header
