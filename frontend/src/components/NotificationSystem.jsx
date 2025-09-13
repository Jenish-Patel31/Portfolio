import { motion, AnimatePresence } from 'framer-motion'
import { useLoadingStore } from '../stores/loadingStore'

const NotificationSystem = () => {
  const { notifications, removeNotification } = useLoadingStore()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative max-w-sm"
          >
            <div className={`
              bg-white rounded-lg shadow-lg border-l-4 p-4
              ${notification.type === 'info' ? 'border-blue-500 bg-blue-50' : ''}
              ${notification.type === 'success' ? 'border-green-500 bg-green-50' : ''}
              ${notification.type === 'warning' ? 'border-yellow-500 bg-yellow-50' : ''}
              ${notification.type === 'error' ? 'border-red-500 bg-red-50' : ''}
            `}>
              {/* Close button */}
              <button
                onClick={() => removeNotification(notification.id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Icon */}
              <div className="flex items-start">
                <div className={`
                  flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3
                  ${notification.type === 'info' ? 'bg-blue-100' : ''}
                  ${notification.type === 'success' ? 'bg-green-100' : ''}
                  ${notification.type === 'warning' ? 'bg-yellow-100' : ''}
                  ${notification.type === 'error' ? 'bg-red-100' : ''}
                `}>
                  {notification.type === 'info' && (
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {notification.type === 'success' && (
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {notification.type === 'warning' && (
                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  )}
                  {notification.type === 'error' && (
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h4 className={`
                    text-sm font-semibold mb-1
                    ${notification.type === 'info' ? 'text-blue-800' : ''}
                    ${notification.type === 'success' ? 'text-green-800' : ''}
                    ${notification.type === 'warning' ? 'text-yellow-800' : ''}
                    ${notification.type === 'error' ? 'text-red-800' : ''}
                  `}>
                    {notification.title}
                  </h4>
                  <p className={`
                    text-sm
                    ${notification.type === 'info' ? 'text-blue-700' : ''}
                    ${notification.type === 'success' ? 'text-green-700' : ''}
                    ${notification.type === 'warning' ? 'text-yellow-700' : ''}
                    ${notification.type === 'error' ? 'text-red-700' : ''}
                  `}>
                    {notification.message}
                  </p>
                </div>
              </div>

              {/* Progress bar for auto-dismiss */}
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: notification.duration / 1000, ease: "linear" }}
                className={`
                  absolute bottom-0 left-0 h-1 rounded-b-lg
                  ${notification.type === 'info' ? 'bg-blue-500' : ''}
                  ${notification.type === 'success' ? 'bg-green-500' : ''}
                  ${notification.type === 'warning' ? 'bg-yellow-500' : ''}
                  ${notification.type === 'error' ? 'bg-red-500' : ''}
                `}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default NotificationSystem
