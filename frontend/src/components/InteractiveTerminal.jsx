import React, { useState, useRef, useEffect } from 'react';

// Helper: Simulated file content for 'cat' command
const getFileContent = (path, file) => {
  if (path === '~' && file === 'about.txt') {
    return `Jenish Patel\nFull-stack developer, DevOps engineer, and emerging tech enthusiast.\nHackathon winner, production deployments, and strong academic record.`;
  }
  // Add more file/section content as needed
  return `cat: No such file: ${file}`;
};

const fileSystem = {
  '~': ['about.txt', 'skills', 'projects', 'experience', 'education', 'achievements', 'contact'],
  'projects': ['trackIT', 'EviVault', 'StockPro', 'UpNextAI', 'CICD-Pipeline', 'EcoFeed'],
};

const InteractiveTerminal = () => {
  const [history, setHistory] = useState([
    { type: 'output', text: "Welcome to Jenish Patel's interactive portfolio terminal! Type 'help' to get started." },
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const [path, setPath] = useState('~');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newCommand = currentCommand.trim();
      const lowerCommand = newCommand.toLowerCase();

      setCommandHistory(prev => [...prev, newCommand]);
      setHistoryIndex(commandHistory.length);

      setHistory(prev => [...prev, { type: 'input', text: newCommand }]);
      setCurrentCommand('');

      let output = '';
      const [cmd, ...args] = lowerCommand.split(' ');

      switch (cmd) {
        case 'help':
          output = `\nAvailable Commands:\n- help: Shows this help message.\n- ls: Lists sections/files in the current directory.\n- cd [section]: Navigate to a section (e.g., cd projects).\n- cat [file]: Display the content of a file (e.g., cat about.txt).\n- echo [text]: Repeat your text.\n- clear: Clear the terminal screen.\n- whoami: Show a brief professional summary.\n- resume: Show a summary or download link for my resume.`;
          break;
        case 'ls':
          const dirContent = fileSystem[path] || [];
          output = dirContent.length > 0 ? dirContent.join('  ') : 'No files or directories found.';
          break;
        case 'cd':
          const targetDir = args[0] || '~';
          if (fileSystem[targetDir]) {
            setPath(targetDir);
            output = `Entered ${targetDir}`;
          } else if (targetDir === '..') {
            setPath('~');
            output = 'Returned to root directory.';
          } else {
            output = `cd: No such section: ${targetDir}`;
          }
          break;
        case 'cat':
          const file = args[0];
          output = getFileContent(path, file);
          break;
        case 'echo':
          output = args.join(' ');
          break;
        case 'clear':
          setHistory([
            { type: 'output', text: "Welcome to Jenish Patel's interactive portfolio terminal! Type 'help' to get started." }
          ]);
          setCommandHistory([]);
          setHistoryIndex(-1);
          return;
        case 'whoami':
          output = `Jenish Patel — Full-stack developer, DevOps engineer, and emerging tech enthusiast. Hackathon winner, production deployments, and strong academic record.`;
          break;
        case 'resume':
          output = `Download my full resume: https://github.com/Jenish-Patel31/portfolio/raw/main/resume.pdf\nOr type 'cat about.txt' for a summary.`;
          break;
        default:
          output = `Command not found: ${newCommand}`;
          break;
      }
      setHistory(prev => [...prev, { type: 'output', text: output }]);
      setTimeout(() => {
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, 0);
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

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [history]);

  return (
    <div className="flex-1 overflow-y-auto font-mono text-sm p-2 text-green-400" ref={terminalRef}>
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

export default InteractiveTerminal;
