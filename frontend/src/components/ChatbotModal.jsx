import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, User } from 'lucide-react'
import { useModalStore } from '../stores/modalStore'
import api from '../utils/api'
import toast from 'react-hot-toast'

const ChatbotModal = () => {
  const { closeChatbot } = useModalStore()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I am your AI portfolio assistant. I can help you learn more about Jenish Patel, his projects, skills, and experience. What would you like to know?',
      timestamp: new Date()
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    
    // Add user message
    const newUserMessage = {
      id: Date.now(),
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newUserMessage])
    setIsLoading(true)

    try {
      const response = await api.post('/chatbot/query', {
        message: userMessage,
        conversationHistory: messages.slice(-5) // Send last 5 messages for context
      })

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: response.data.data.message,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Chatbot error:', error)
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: 'Sorry, I encountered an error. Please try again later.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      toast.error('Failed to get response from AI')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeChatbot()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-overlay"
        onClick={closeChatbot}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="modal-content max-w-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border-color">
            <div className="flex items-center space-x-3">
              <Bot className="w-6 h-6 text-accent-cyan" />
              <h2 className="text-xl font-bold text-text-primary">AI Portfolio Assistant</h2>
            </div>
            <button
              onClick={closeChatbot}
              className="p-2 hover:bg-bg-secondary rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5 text-text-secondary" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-6">
            <div className="h-96 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-accent-blue text-white' 
                        : 'bg-accent-cyan text-white'
                    }`}>
                      {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`rounded-lg px-4 py-2 ${
                      message.type === 'user'
                        ? 'bg-accent-blue text-white'
                        : 'bg-bg-card border border-border-color text-text-primary'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-text-secondary'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-accent-cyan text-white flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-bg-card border border-border-color rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-accent-cyan rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-accent-cyan rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-accent-cyan rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="p-6 border-t border-border-color">
            <form onSubmit={handleSubmit} className="flex space-x-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me about Jenish's portfolio..."
                className="flex-1 bg-bg-primary border border-border-color rounded-lg px-4 py-2 text-text-primary placeholder-text-secondary focus:border-accent-cyan transition-colors duration-200"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-accent-cyan hover:bg-accent-cyan/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            
            <div className="mt-3 text-xs text-text-secondary">
              Press <kbd className="px-2 py-1 bg-bg-secondary rounded text-xs">Esc</kbd> to close
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ChatbotModal
