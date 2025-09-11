import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { useModalStore } from '../stores/modalStore'
import toast from 'react-hot-toast'

const LoginModal = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { login } = useAuthStore()
  const { isLoginModalOpen, closeLoginModal } = useModalStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!username.trim() || !password.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    setIsSubmitting(true)
    
    try {
      await login(username, password)
      toast.success('Login successful!')
      closeLoginModal()
      // Reset form
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error('Login error:', error)
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    closeLoginModal()
    setUsername('')
    setPassword('')
  }

  return (
    <AnimatePresence>
      {isLoginModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="w-full max-w-md bg-bg-card border border-border-color rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border-color">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-accent-blue to-accent-cyan rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-text-primary">Admin Login</h2>
                  <p className="text-sm text-text-secondary">Access your portfolio dashboard</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-bg-secondary rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-text-primary">
                  Username
                </label>
                <div className="relative">
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 bg-bg-secondary border border-border-color rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all duration-200"
                    placeholder="Enter your username"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-text-primary">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-bg-secondary border border-border-color rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-bg-primary rounded transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-text-secondary" />
                    ) : (
                      <Eye className="w-4 h-4 text-text-secondary" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-accent-blue to-accent-cyan text-white py-3 px-6 rounded-lg font-medium hover:from-accent-blue/90 hover:to-accent-cyan/90 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-bg-card transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  'Login'
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoginModal
