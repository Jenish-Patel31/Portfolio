import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { useModalStore } from '../stores/modalStore';

const FloatingTerminal = () => {
  const { openTerminal } = useModalStore();

  return (
  <motion.button
    onClick={openTerminal}
      className="fixed bottom-6 left-6 w-14 h-14 bg-bg-card border border-border-color rounded-xl shadow-2xl flex items-center justify-center text-accent-green hover:border-accent-green hover:shadow-accent-green/20 z-40 transition-all duration-300"
    whileHover={{ scale: 1.1, rotate: 5 }}
    whileTap={{ scale: 0.95 }}
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ delay: 1, type: 'spring', stiffness: 200 }}
    aria-label="Open Terminal"
  >
    <Terminal className="w-6 h-6" />
  </motion.button>
);
};

export default FloatingTerminal;
