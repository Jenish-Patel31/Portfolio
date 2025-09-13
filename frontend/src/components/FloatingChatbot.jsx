import { motion } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { useModalStore } from '../stores/modalStore'
import { useState } from 'react'

const FloatingChatbot = () => {
  const { openChatbot } = useModalStore()
  const [showMessage, setShowMessage] = useState(true)

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      {/* Chatbot Message Bubble - Positioned absolutely above button */}
      {showMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="absolute bottom-16 right-0 w-64 sm:w-72"
        >
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 flex-1">
                Hey! Ask me anything about <span className="font-semibold text-accent-cyan">Jenish</span> 😊
              </p>
              <button
                onClick={() => setShowMessage(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex-shrink-0"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
            {/* Speech bubble tail - positioned to point to button */}
            <div className="absolute bottom-0 right-4 sm:right-6 transform translate-y-full">
              <div className="w-0 h-0 border-l-6 border-r-6 border-t-6 sm:border-l-8 sm:border-r-8 sm:border-t-8 border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800"></div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Chatbot Button - Always stays in right corner */}
      <motion.button
        onClick={openChatbot}
        className="w-14 h-14 bg-bg-card border border-border-color rounded-xl shadow-2xl flex items-center justify-center text-accent-cyan hover:border-accent-cyan hover:shadow-accent-cyan/20 transition-all duration-300 hover:scale-110"
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </div>
  )
}

export default FloatingChatbot
