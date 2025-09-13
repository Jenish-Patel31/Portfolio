import { motion, AnimatePresence } from 'framer-motion'
import { useLoadingStore } from '../stores/loadingStore'
import { usePortfolioStore } from '../stores/portfolioStore'

const LoadingOverlay = () => {
  const { isGlobalLoading, getLoadingProgress, backendStatus } = useLoadingStore()
  const { fetchAllData } = usePortfolioStore()
  const progress = getLoadingProgress()

  const handleRetry = () => {
    // Refresh the entire browser page
    window.location.reload()
  }

  return (
    <AnimatePresence mode="wait">
      {isGlobalLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ 
            duration: 0.2, 
            ease: "easeInOut",
            exit: { duration: 0.25, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
          style={{ background: 'transparent' }}
        >
          {/* Loading content container with subtle backdrop */}
          <motion.div 
            className="relative bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10" 
            style={{ pointerEvents: 'auto' }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Animated logo/icon */}
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="relative w-16 h-16"
              >
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-500/30" />
                {/* Inner spinning ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-1 rounded-full border-2 border-transparent border-t-blue-500 border-r-purple-500"
                />
                {/* Center dot */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                />
              </motion.div>
            </div>

            {/* Loading text */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-6"
            >
              <h2 className="text-xl font-semibold text-white mb-1">
                {backendStatus === 'error' ? 'Server Unavailable' : 'Loading Portfolio'}
              </h2>
              <p className="text-gray-300 text-sm">
                {backendStatus === 'error' 
                  ? 'My portfolio server is currently unavailable. Please try refreshing the page.'
                  : 'Preparing your dynamic resume...'
                }
              </p>
            </motion.div>

            {/* Progress bar or retry button */}
            {backendStatus === 'error' ? (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-4"
              >
                <button
                  onClick={handleRetry}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer"
                  style={{ pointerEvents: 'auto' }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Refresh Page</span>
                  </div>
                </button>
              </motion.div>
            ) : (
              <>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-4"
                >
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>Loading</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-64 bg-gray-800/50 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                    />
                  </div>
                </motion.div>

                {/* Animated dots */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-center space-x-1.5"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                    />
                  ))}
                </motion.div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingOverlay
