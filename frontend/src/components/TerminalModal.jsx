import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal } from 'lucide-react';
import { useModalStore } from '../stores/modalStore';

const TerminalModal = () => {
  const { closeTerminal } = useModalStore();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', content: "Welcome to Jenish Patel's Portfolio Terminal! Type 'help' to get started." }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const historyRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
    if (historyRef.current) historyRef.current.scrollTop = historyRef.current.scrollHeight;
  }, [history]);

  const commands = {
    help: `Available Commands:
• help          - Show this help message
• whoami        - About me
• projects      - My projects
• skills        - Technical skills
• experience    - Work experience
• education     - Academic background
• achievements  - Awards & recognition
• leadership    - Leadership roles
• contact       - Get in touch
• resume        - Download resume
• clear         - Clear terminal
• exit          - Close terminal`,

    whoami: `Jenish Patel
Full-Stack Developer | DevOps Engineer | AI/ML Enthusiast

I'm a passionate developer with expertise in modern web technologies,
containerization, and emerging technologies like AI/ML and blockchain.
Currently pursuing BTech CSE at Nirma University with a focus on
Cybersecurity and maintaining a strong academic record.`,

    projects: `Featured Projects:

      🚀 TrackIT - Smart Attendance Management System
        Built with React, Node.js, MongoDB
        Features: Real-time tracking, analytics dashboard
        GitHub: https://github.com/Jenish-Patel31/TrackIT

      🔐 EviVault - Blockchain Evidence Management
        Built with Solidity, Web3.js, React
        Features: Immutable evidence storage, smart contracts
        GitHub: https://github.com/Jenish-Patel31/EviVault

      📈 StockPro - AI-Powered Stock Analysis
        Built with Python, TensorFlow, React
        Features: ML predictions, real-time data
        GitHub: https://github.com/Jenish-Patel31/StockPro

      🤖 UpNext AI - Intelligent Task Scheduler
        Built with Node.js, OpenAI API, React
        Features: AI-powered scheduling, natural language processing
        GitHub: https://github.com/Jenish-Patel31/UpNextAI

      🔧 CI/CD Pipeline - Automated Deployment
        Built with Docker, Jenkins, Kubernetes
        Features: Automated testing, container orchestration
        GitHub: https://github.com/Jenish-Patel31/CICD-Pipeline

      🌱 EcoFeed - Smart Food Redistribution
        Built with PHP, MySQL, JavaScript
        Features: Role-based dashboards, sustainability focus
        GitHub: https://github.com/Jenish-Patel31/EcoFeed`,

    skills: `Technical Skills:

        Languages: C++, Python, Java, JavaScript, Go
        Frontend: React.js, HTML/CSS, Tailwind CSS, Framer Motion
        Backend: Node.js, Express.js, REST API, MongoDB, MySQL
        DevOps: Docker, Jenkins, CI/CD, Linux, AWS, Kubernetes
        Emerging: Blockchain, Smart Contracts, AI/ML, LLMs, RAG
        Tools: Git, GitHub, Vercel, Render, Firebase`,

    experience: `Work Experience:

      🔧 DevOps Engineer Intern - AIVID Techvision Pvt. Ltd.
        Duration: May 2025 - July 2025
        Location: Ahmedabad, India
        
        Key Achievements:
        • Automated Docker + Jenkins CI/CD pipelines for microservices
        • Reduced manual workload by 40%
        • Hardened container security with base image restrictions
        • Built MQTT-powered media display tool using Python
        • Explored Kubernetes deployment and pod management
        
        Technologies: Docker, Jenkins, Kubernetes, Python, Bash, IoT, MQTT, Linux`,

    education: `Education:

      🎓 Bachelor of Technology in Computer Science
        Nirma University, Ahmedabad
        Duration: 2023 - 2027
        CGPA: 8.33/10
        Specialization: Cybersecurity
        
        Key Achievements:
        • Strong academic performance
        • Active in cybersecurity initiatives
        • Technical Head of Cybersecurity Club
        
      🎓 Diploma in Computer Engineering
        MSU Baroda
        Duration: 2020 - 2023
        Rank: 1st in class
        Percentage: 87.47%`,

    achievements: `Awards & Recognition:

      🏆 MINeD 2025 Hackathon - 2nd Place
        Prize: ₹47,000
        Project: Innovative tech solution
        Participants: 250+
        
      🏆 MSU Baroda - 1st Rank
        Diploma in Computer Engineering
        Academic Excellence
        
      🏆 Technical Leadership
        Technical Head - Cybersecurity Club
        Organized workshops and webinars
        Led club launch initiatives`,

    leadership: `Leadership Experience:

    👑 Technical Head - Cybersecurity Club
      Nirma University
      Duration: 2023 - Present
      
      Responsibilities:
      • Led the club's launch and establishment
      • Organized technical workshops and webinars
      • Mentored junior members
      • Coordinated cybersecurity awareness programs
      
      Impact:
      • Increased club membership by 200%
      • Organized 15+ technical sessions
      • Built strong cybersecurity community`,

    contact: `Get In Touch:

      📧 Email: jenishkp07@gmail.com
      📱 Phone: +91 9876543210
      🌐 LinkedIn: https://www.linkedin.com/in/Jenish-Patel-31k/
      💻 GitHub: https://github.com/Jenish-Patel31
      📍 Location: Ahmedabad, Gujarat, India
        
      I'm always open to discussing new opportunities,
      collaborations, or just having a chat about technology!`,

    resume: `Resume Download:

📄 Download my full resume:
   https://drive.google.com/file/d/1LZZVVDCw8Pv5J1b14ZDtIIQDrpcyy8Aw/view?usp=drive_link
   
   The resume includes:
   • Detailed work experience
   • Complete project portfolio
   • Technical skills breakdown
   • Academic achievements
   • Contact information`,

    clear: () => setHistory([{ type: 'output', content: "Terminal cleared. Type 'help' for available commands." }]),
    exit: () => closeTerminal(),
  };

  const processCommand = (cmd) => {
    const command = cmd.toLowerCase().trim();
    if (commands[command]) {
      const response = commands[command];
      if (typeof response === 'function') {
        response();
        return;
      }
      setHistory(prev => [...prev, { type: 'output', content: response }]);
    } else if (command) {
      setHistory(prev => [...prev, { type: 'output', content: `Command not found: ${command}. Type "help" for available commands.` }]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const command = input.trim();
    setHistory(prev => [...prev, { type: 'input', content: `$ ${command}` }]);
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(commandHistory.length);
    setInput('');
    setIsProcessing(true);

    setTimeout(() => {
      processCommand(command);
      setIsProcessing(false);
    }, 100);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeTerminal();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setInput(commandHistory[newIndex]);
        setHistoryIndex(newIndex);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setInput(commandHistory[newIndex]);
        setHistoryIndex(newIndex);
      } else {
        setInput('');
        setHistoryIndex(commandHistory.length);
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[100]"
        onClick={closeTerminal}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="max-w-5xl bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-[95%] sm:w-4/5 h-4/5 flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
            <div className="flex items-center space-x-3">
              <Terminal className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-bold text-white">Portfolio Terminal v2.0</h2>
            </div>
            <button
              onClick={closeTerminal}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Terminal Content */}
          <div className="flex-1 overflow-y-auto font-mono text-sm p-4 text-green-400 bg-black" ref={historyRef}>
            {history.map((item, index) => (
              <div key={index} className="mb-2">
                {item.type === 'input' ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500 font-bold">portfolio@jenish:~$</span>
                    <span className="text-white">{item.content.replace('$ ', '')}</span>
                  </div>
                ) : (
                  <pre className="text-gray-200 whitespace-pre-wrap leading-relaxed">{item.content}</pre>
                )}
              </div>
            ))}
            {isProcessing && (
              <span className="text-green-500 animate-pulse">Processing...</span>
            )}
            <form onSubmit={handleSubmit} className="flex items-center space-x-2 mt-2">
              <span className="text-green-500 font-bold">portfolio@jenish:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command..."
                className="flex-1 bg-transparent border-none outline-none caret-green-500 text-white font-mono placeholder-gray-500"
                disabled={isProcessing}
                spellCheck="false"
              />
            </form>
          </div>

          {/* Help Text */}
          <div className="p-3 text-xs text-gray-400 border-t border-gray-700 bg-gray-800">
            Press <kbd className="px-1 py-0.5 bg-gray-700 rounded text-xs">Esc</kbd> to close •
            Use <kbd className="px-1 py-0.5 bg-gray-700 rounded text-xs">↑</kbd> and <kbd className="px-1 py-0.5 bg-gray-700 rounded text-xs">↓</kbd> for command history
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TerminalModal;