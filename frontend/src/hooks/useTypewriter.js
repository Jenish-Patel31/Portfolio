import { useEffect, useState } from 'react';

// Simple typewriter effect hook
export function useTypewriter(text, speed = 40, delay = 0) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let timeout;
    if (delay) {
      timeout = setTimeout(() => setDisplayed(''), delay);
    }
    let i = 0;
    function type() {
      setDisplayed(text.slice(0, i));
      if (i <= text.length) {
        timeout = setTimeout(() => {
          i++;
          type();
        }, speed);
      }
    }
    type();
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);
  return displayed;
}
