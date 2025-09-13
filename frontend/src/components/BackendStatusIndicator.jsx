import { motion } from 'framer-motion'
import { useLoadingStore } from '../stores/loadingStore'

const BackendStatusIndicator = () => {
  const { backendStatus, addNotification } = useLoadingStore()

  const handleRetry = () => {
    addNotification({
      type: 'info',
      title: 'Retrying Connection',
      message: 'Attempting to reconnect to the portfolio server...',
      duration: 5000
    })
    
    // Trigger a page refresh to retry
    window.location.reload()
  }

  if (backendStatus === 'unknown') return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-4 z-30"
    >
      {backendStatus === 'ready' ? (
        // Just show a green animated dot with tooltip when ready
        <div className="relative group">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg" />
          <div className="absolute top-full left-0 mt-2 px-2 py-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 min-w-max">
            Server is running
            <div className="absolute bottom-full left-3 w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-black/90" />
          </div>
        </div>
      ) : (
        // Show full indicator for other states
        <div className={`
          flex items-center space-x-2 px-3 py-2 rounded-lg shadow-lg backdrop-blur-sm
          ${backendStatus === 'starting' ? 'bg-yellow-500/20 border border-yellow-500/30' : ''}
          ${backendStatus === 'error' ? 'bg-red-500/20 border border-red-500/30' : ''}
        `}>
          <div className={`
            w-2 h-2 rounded-full
            ${backendStatus === 'starting' ? 'bg-yellow-500 animate-pulse' : ''}
            ${backendStatus === 'error' ? 'bg-red-500' : ''}
          `} />
          
          <span className="text-sm font-medium text-white">
            {backendStatus === 'starting' && 'Server Starting...'}
            {backendStatus === 'error' && 'Connection Issue'}
          </span>
          
          {backendStatus === 'error' && (
            <button
              onClick={handleRetry}
              className="ml-2 px-2 py-1 text-xs bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded transition-colors"
            >
              Retry
            </button>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default BackendStatusIndicator
