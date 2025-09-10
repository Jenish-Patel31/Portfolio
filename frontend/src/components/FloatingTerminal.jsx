// import React from 'react';
// import InteractiveTerminal from './InteractiveTerminal';
// import { useModalStore } from '../stores/modalStore';

// // Floating terminal button
// import { motion } from 'framer-motion';
// import { Terminal } from 'lucide-react';

// const FloatingTerminalButton = ({ openTerminal }) => (
//   <motion.button
//     onClick={openTerminal}
//     className="floating-element fixed bottom-6 left-6 w-14 h-14 bg-bg-card border border-border-color rounded-xl shadow-2xl flex items-center justify-center text-accent-green hover:border-accent-green hover:shadow-accent-green/20 z-50 floating-button-animate animate-bounce-hover"
//     whileHover={{ scale: 1.1, rotate: 5 }}
//     whileTap={{ scale: 0.95 }}
//     initial={{ scale: 0, rotate: -180 }}
//     animate={{ scale: 1, rotate: 0 }}
//     transition={{ delay: 1, type: "spring", stiffness: 200 }}
//     aria-label="Open Terminal"
//   >
//     <Terminal className="w-6 h-6" />
//   </motion.button>
// );

// // Terminal modal
// const TerminalModal = ({ isOpen, closeTerminal }) => {
//   const modalRef = React.useRef(null);

//   React.useEffect(() => {
//     const handleEscape = (event) => {
//       if (event.key === 'Escape') {
//         closeTerminal();
//       }
//     };
//     if (isOpen) {
//       document.addEventListener('keydown', handleEscape);
//     }
//     return () => {
//       document.removeEventListener('keydown', handleEscape);
//     };
//   }, [isOpen, closeTerminal]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[100]" onClick={closeTerminal}>
//       <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-[95%] sm:w-3/4 max-w-4xl h-3/4 flex flex-col p-4 overflow-hidden" onClick={e => e.stopPropagation()}>
//         {/* Terminal header */}
//         <div className="flex items-center justify-between p-2 border-b border-gray-700">
//           <div className="flex space-x-2">
//             <button onClick={closeTerminal} className="w-3 h-3 bg-red-500 rounded-full" aria-label="Close"></button>
//             <span className="w-3 h-3 bg-yellow-500 rounded-full" aria-label="Minimize"></span>
//             <span className="w-3 h-3 bg-green-500 rounded-full" aria-label="Maximize"></span>
//           </div>
//           <span className="text-xs text-gray-500 font-mono">portfolio@terminal-ui:~</span>
//           <div className="w-8"></div>
//         </div>
//         {/* Terminal body */}
//         <InteractiveTerminal />
//       </div>
//     </div>
//   );
// };

// // Main FloatingTerminal component
// const FloatingTerminal = () => {
//   const { openTerminal, isTerminalOpen, closeTerminal } = useModalStore();
//   return (
//     <>
//       <style>{`
//         @keyframes scaleIn {
//           from { transform: scale(0) rotate(-180deg); opacity: 0; }
//           to { transform: scale(1) rotate(0deg); opacity: 1; }
//         }
//         .floating-button-animate {
//           animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.27) both;
//           animation-delay: 1s;
//         }
//         .animate-bounce-hover:hover {
//             animation: bounce 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.27) both;
//         }
//         @keyframes bounce {
//             0% { transform: scale(1) rotate(0deg); }
//             50% { transform: scale(1.1) rotate(5deg); }
//             100% { transform: scale(1) rotate(0deg); }
//         }
//       `}</style>
//       <FloatingTerminalButton openTerminal={openTerminal} />
//       <TerminalModal isOpen={isTerminalOpen} closeTerminal={closeTerminal} />
//     </>
//   );
// };

// // ...existing code...
//           } else if (e.key === 'ArrowUp') {
//             e.preventDefault();
//             if (historyIndex > 0) {
//               const newIndex = historyIndex - 1;
//               setCurrentCommand(commandHistory[newIndex]);
//               setHistoryIndex(newIndex);
//             }
//           } else if (e.key === 'ArrowDown') {
//             e.preventDefault();
//             if (historyIndex < commandHistory.length - 1) {
//               const newIndex = historyIndex + 1;
//               setCurrentCommand(commandHistory[newIndex]);
//               setHistoryIndex(newIndex);
//             } else if (historyIndex === commandHistory.length - 1) {
//               setCurrentCommand('');
//               setHistoryIndex(commandHistory.length);
//             }
//           }
//         };

//         const handleInputChange = (e) => {
//           setCurrentCommand(e.target.value);
//         };

//         useEffect(() => {
//           if (inputRef.current) {
//             inputRef.current.focus();
//           }
//         }, [history]);

//         return (
//           <div 
//             className="flex-1 overflow-y-auto font-mono text-sm p-2 text-green-400"
//             ref={terminalRef}
//           >
//             {history.map((line, index) => (
//               <React.Fragment key={index}>
//                 {line.type === 'input' && (
//                   <div className="flex items-center space-x-2">
//                     <span className="text-green-500 font-bold">portfolio@terminal-ui:<span className="text-blue-400">{path}</span>$</span>
//                     <span className="text-white">{line.text}</span>
//                   </div>
//                 )}
//                 {line.type === 'output' && (
//                   <pre className="text-gray-200 whitespace-pre-wrap">{line.text}</pre>
//                 )}
//               </React.Fragment>
//             ))}

//             {/* Dynamic input line that follows output */}
//             <div className="flex items-center space-x-2 mt-2">
//               <span className="text-green-500 font-bold">portfolio@terminal-ui:<span className="text-blue-400">{path}</span>$</span>
//               <input
//                 ref={inputRef}
//                 type="text"
//                 className="flex-1 bg-transparent border-none outline-none caret-green-500 text-white"
//                 value={currentCommand}
//                 onChange={handleInputChange}
//                 onKeyDown={handleKeyDown}
//                 spellCheck="false"
//               />
//             </div>
//           </div>
//         );
//       };
//       setHistory(prev => [...prev, { type: 'output', text: output }]);
      
//       // Use flushSync to ensure the DOM updates and we can scroll
//       // This is a React-specific behavior for immediate DOM updates.
//       if (typeof flushSync !== 'undefined') {
//         flushSync(() => {
//           if (terminalRef.current) {
//             const scrollable = terminalRef.current;
//             scrollable.scrollTop = scrollable.scrollHeight;
//           }
//         });
//       }
//     } else if (e.key === 'ArrowUp') {
//         e.preventDefault();
//         if (historyIndex > 0) {
//             const newIndex = historyIndex - 1;
//             setCurrentCommand(commandHistory[newIndex]);
//             setHistoryIndex(newIndex);
//         }
//     } else if (e.key === 'ArrowDown') {
//         e.preventDefault();
//         if (historyIndex < commandHistory.length - 1) {
//             const newIndex = historyIndex + 1;
//             setCurrentCommand(commandHistory[newIndex]);
//             setHistoryIndex(newIndex);
//         } else if (historyIndex === commandHistory.length - 1) {
//             setCurrentCommand('');
//             setHistoryIndex(commandHistory.length);
//         }
//     }
//   };

//   const handleInputChange = (e) => {
//     setCurrentCommand(e.target.value);
//   };
  
//   // Focus the input when the terminal opens or history changes
//   useEffect(() => {
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [history]);

//   return (
//     <div 
//       className="flex-1 overflow-y-auto font-mono text-sm p-2 text-green-400"
//       ref={terminalRef}
//     >
//       {history.map((line, index) => (
//         <React.Fragment key={index}>
//           {line.type === 'input' && (
//             <div className="flex items-center space-x-2">
//               <span className="text-green-500 font-bold">portfolio@terminal-ui:<span className="text-blue-400">{path}</span>$</span>
//               <span className="text-white">{line.text}</span>
//             </div>
//           )}
//           {line.type === 'output' && (
//             <pre className="text-gray-200 whitespace-pre-wrap">{line.text}</pre>
//           )}
//         </React.Fragment>
//       ))}

//       {/* Dynamic input line that follows output */}
//       <div className="flex items-center space-x-2 mt-2">
//         <span className="text-green-500 font-bold">portfolio@terminal-ui:<span className="text-blue-400">{path}</span>$</span>
//         <input
//           ref={inputRef}
//           type="text"
//           className="flex-1 bg-transparent border-none outline-none caret-green-500 text-white"
//           value={currentCommand}
//           onChange={handleInputChange}
//           onKeyDown={handleKeyDown}
//           spellCheck="false"
//         />
//       </div>
//     </div>
//   );
// };

















//************************************************ */





// import { motion } from 'framer-motion'
// import { Terminal } from 'lucide-react'
// import { useModalStore } from '../stores/modalStore'

// const FloatingTerminal = () => {
//   const { openTerminal } = useModalStore()

//   return (
//     <motion.button
//       onClick={openTerminal}
//       className="floating-element bottom-6 left-6 w-14 h-14 bg-bg-card border border-border-color rounded-xl shadow-2xl flex items-center justify-center text-accent-green hover:border-accent-green hover:shadow-accent-green/20"
//       whileHover={{ scale: 1.1, rotate: 5 }}
//       whileTap={{ scale: 0.95 }}
//       initial={{ scale: 0, rotate: -180 }}
//       animate={{ scale: 1, rotate: 0 }}
//       transition={{ delay: 1, type: "spring", stiffness: 200 }}
//     >
//       <Terminal className="w-6 h-6" />
//     </motion.button>
//   )
// }

// export default FloatingTerminal







// ********************************************************************




import React, { useState, useRef, useEffect } from 'react';

// Main App component that simulates your portfolio page.
export default function App() {
  const [isTerminalOpen, setTerminalOpen] = useState(false);

  const openTerminal = () => setTerminalOpen(true);
  const closeTerminal = () => setTerminalOpen(false);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-200 font-sans p-4 overflow-hidden">
      {/* Background grid effect */}
      <style>{`
        .bg-grid {
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        @keyframes scaleIn {
          from { transform: scale(0) rotate(-180deg); opacity: 0; }
          to { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .floating-button-animate {
          animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.27) both;
          animation-delay: 1s;
        }
        .animate-bounce-hover:hover {
            animation: bounce 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.27) both;
        }
        @keyframes bounce {
            0% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.1) rotate(5deg); }
            100% { transform: scale(1) rotate(0deg); }
        }
      `}</style>
      <div className="absolute inset-0 bg-grid [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]"></div>
      
      {/* Main content placeholder */}
      <div className="relative z-10 p-8">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-center mb-4 leading-tight tracking-tighter">
          Welcome to my <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Portfolio</span>
        </h1>
        <p className="text-center text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
          This is a showcase of my projects and skills. Explore the interactive terminal to learn more about my work.
        </p>
      </div>

      {/* Floating terminal button */}
      <FloatingTerminalButton openTerminal={openTerminal} />
      
      {/* The terminal modal */}
      <TerminalModal isOpen={isTerminalOpen} closeTerminal={closeTerminal} />
    </div>
  );
}

// Your FloatingTerminal component, now with pure CSS animations.
const FloatingTerminalButton = ({ openTerminal }) => {
  return (
    <button
      onClick={openTerminal}
      className="floating-element fixed bottom-6 left-6 w-14 h-14 bg-gray-800 border-2 border-gray-700 rounded-full shadow-2xl flex items-center justify-center text-green-400 hover:border-green-400 hover:shadow-green-400/20 z-50 transition-colors floating-button-animate animate-bounce-hover"
      aria-label="Open Terminal"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <polyline points="4 17 10 11 4 5"></polyline>
          <line x1="12" x2="20" y1="19" y2="19"></line>
      </svg>
    </button>
  );
};

// The terminal modal component.
const TerminalModal = ({ isOpen, closeTerminal }) => {
  const modalRef = useRef(null);

  const handleEscape = (event) => {
    if (event.key === 'Escape') {
      closeTerminal();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    } else {
      document.removeEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[100]"
      onClick={closeTerminal}
    >
      <div
        className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-[95%] sm:w-3/4 max-w-4xl h-3/4 flex flex-col p-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        {/* Terminal header */}
        <div className="flex items-center justify-between p-2 border-b border-gray-700">
          <div className="flex space-x-2">
            <button onClick={closeTerminal} className="w-3 h-3 bg-red-500 rounded-full" aria-label="Close"></button>
            <span className="w-3 h-3 bg-yellow-500 rounded-full" aria-label="Minimize"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full" aria-label="Maximize"></span>
          </div>
          <span className="text-xs text-gray-500 font-mono">portfolio@terminal-ui:~</span>
          <div className="w-8"></div>
        </div>

        {/* Terminal body */}
        <InteractiveTerminal />
      </div>
    </div>
  );
};

// The core interactive terminal logic
const InteractiveTerminal = () => {
  const [history, setHistory] = useState([
    { type: 'output', text: "Welcome to my interactive terminal! Type 'help' to get started." },
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const [path, setPath] = useState('~');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // A simple, virtual file system for basic commands
  const fileSystem = {
    '~': ['about.txt', 'projects', 'contact'],
    'projects': ['web-app', 'ai-tool', 'github'],
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newCommand = currentCommand.trim().toLowerCase();
      
      setCommandHistory(prev => [...prev, newCommand]);
      setHistoryIndex(prev => prev + 1);
      
      const newHistory = [...history, { type: 'input', text: currentCommand }];
      setHistory(newHistory);
      setCurrentCommand('');

      // Command parsing logic
      let output = '';
      const [cmd, ...args] = newCommand.split(' ');

      switch (cmd) {
        case 'help':
          output = `
Available Commands:
- help: Shows this help message.
- ls: Lists files and directories.
- cd [dir]: Changes the current directory.
- pwd: Prints the current working directory.
- echo [text]: Prints text to the terminal.
- clear: Clears the terminal screen.
          `;
          break;
        case 'ls':
          const dirContent = fileSystem[path] || [];
          output = dirContent.length > 0 ? dirContent.join('\n') : 'No files or directories found.';
          break;
        case 'cd':
          const targetDir = args[0] || '~';
          if (targetDir === '..') {
            if (path !== '~') {
              setPath('~');
            } else {
              output = 'Already at the root.';
            }
          } else if (fileSystem[targetDir] && path === '~') {
            setPath(targetDir);
          } else if (targetDir === '~') {
            setPath('~');
          } else {
            output = `cd: No such file or directory: ${targetDir}`;
          }
          break;
        case 'pwd':
          output = path;
          break;
        case 'echo':
          output = args.join(' ');
          break;
        case 'clear':
          setHistory([
            { type: 'output', text: "Welcome to my interactive terminal! Type 'help' to get started." }
          ]);
          setCommandHistory([]);
          return;
        default:
          output = `Command not found: ${newCommand}`;
          break;
      }

      setHistory(prev => [...prev, { type: 'output', text: output }]);
      
      // Use flushSync to ensure the DOM updates and we can scroll
      flushSync(() => {
        if (terminalRef.current) {
          const scrollable = terminalRef.current;
          scrollable.scrollTop = scrollable.scrollHeight;
        }
      });
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setCurrentCommand(commandHistory[newIndex]);
            setHistoryIndex(newIndex);
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            const newIndex = historyIndex + 1;
            setCurrentCommand(commandHistory[newIndex]);
            setHistoryIndex(newIndex);
        } else if (historyIndex === commandHistory.length - 1) {
            setCurrentCommand('');
            setHistoryIndex(commandHistory.length);
        }
    }
  };

  const handleInputChange = (e) => {
    setCurrentCommand(e.target.value);
  };
  
  // Focus the input when the terminal opens or history changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [history]);

  return (
    <div 
      className="flex-1 overflow-y-auto font-mono text-sm p-2 text-green-400"
      ref={terminalRef}
    >
      {history.map((line, index) => (
        <React.Fragment key={index}>
          {line.type === 'input' && (
            <div className="flex items-center space-x-2">
              <span className="text-green-500 font-bold">portfolio@terminal-ui:<span className="text-blue-400">{path}</span>$</span>
              <span className="text-white">{line.text}</span>
            </div>
          )}
          {line.type === 'output' && (
            <pre className="text-gray-200 whitespace-pre-wrap">{line.text}</pre>
          )}
        </React.Fragment>
      ))}

      {/* Dynamic input line that follows output */}
      <div className="flex items-center space-x-2 mt-2">
        <span className="text-green-500 font-bold">portfolio@terminal-ui:<span className="text-blue-400">{path}</span>$</span>
        <input
          ref={inputRef}
          type="text"
          className="flex-1 bg-transparent border-none outline-none caret-green-500 text-white"
          value={currentCommand}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          spellCheck="false"
        />
      </div>
    </div>
  );
};
