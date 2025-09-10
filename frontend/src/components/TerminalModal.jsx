import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Terminal } from 'lucide-react'
import { useModalStore } from '../stores/modalStore'

const TerminalModal = () => {
  const { closeTerminal } = useModalStore()
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    { type: 'output', content: 'Portfolio Terminal v1.0 - Type "help" for available commands' }
  ])
  const [isProcessing, setIsProcessing] = useState(false)
  const inputRef = useRef(null)
  const historyRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    historyRef.current?.scrollTo(0, historyRef.current.scrollHeight)
  }, [history])

  const commands = {
    help: 'Available commands: help, about, projects, skills, experience, education, achievements, leadership, clear, exit',
    about: 'I am Jenish Patel, a Full-Stack Developer and DevOps Engineer passionate about AI/ML and blockchain technologies.',
    projects: 'I have built several projects including TrackIT, EviVault, StockPro, UpNext AI, and more. Check out my GitHub!',
    skills: 'My technical skills include React, Node.js, Python, Docker, Kubernetes, AI/ML, and blockchain development.',
    experience: 'I have experience as a DevOps Engineer Intern at AIVID Techvision and as Technical Head of Cybersecurity Club.',
    education: 'I am pursuing BTech CSE at Nirma University with a CGPA of 8.33/10, specializing in Cyber Security.',
    achievements: 'I secured 2nd place at MINeD 2025 Hackathon, ranked 1st in Diploma at MSU Baroda, and more.',
    leadership: 'I am the Technical Head of Cybersecurity Club at Nirma University, organizing workshops and events.',
    clear: () => setHistory([]),
    exit: () => closeTerminal()
  }

  const processCommand = async (cmd) => {
    const command = cmd.toLowerCase().trim()
    
    if (commands[command]) {
      const response = commands[command]
      if (typeof response === 'function') {
        response()
        return
      }
      setHistory(prev => [...prev, { type: 'output', content: response }])
    } else if (command) {
      setHistory(prev => [...prev, { type: 'output', content: `Command not found: ${command}. Type "help" for available commands.` }])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isProcessing) return

    const command = input.trim()
    setHistory(prev => [...prev, { type: 'input', content: `$ ${command}` }])
    setInput('')
    setIsProcessing(true)

    // Simulate processing delay
    setTimeout(() => {
      processCommand(command)
      setIsProcessing(false)
    }, 100)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeTerminal()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-overlay"
        onClick={closeTerminal}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="modal-content max-w-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border-color">
            <div className="flex items-center space-x-3">
              <Terminal className="w-6 h-6 text-accent-green" />
              <h2 className="text-xl font-bold text-text-primary">Portfolio Terminal v1.0</h2>
            </div>
            <button
              onClick={closeTerminal}
              className="p-2 hover:bg-bg-secondary rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5 text-text-secondary" />
            </button>
          </div>

          {/* Terminal Content */}
          <div className="p-6">
            {/* History */}
            <div
              ref={historyRef}
              className="h-96 bg-bg-primary border border-border-color rounded-lg p-4 mb-4 overflow-y-auto font-mono text-sm"
            >
              {history.map((item, index) => (
                <div key={index} className="mb-2">
                  {item.type === 'input' ? (
                    <span className="text-accent-green">{item.content}</span>
                  ) : (
                    <span className="text-text-secondary">{item.content}</span>
                  )}
                </div>
              ))}
              {isProcessing && (
                <span className="text-accent-green animate-pulse">Processing...</span>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center space-x-3">
              <span className="text-accent-green font-mono">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command..."
                className="flex-1 bg-transparent border-none outline-none text-text-primary font-mono placeholder-text-secondary"
                disabled={isProcessing}
              />
            </form>

            {/* Help Text */}
            <div className="mt-4 text-xs text-text-secondary">
              Press <kbd className="px-2 py-1 bg-bg-secondary rounded text-xs">Esc</kbd> to close
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default TerminalModal
