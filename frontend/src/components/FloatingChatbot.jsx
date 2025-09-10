import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useModalStore } from '../stores/modalStore'

const FloatingChatbot = () => {
  const { openChatbot } = useModalStore()

  return (
    <motion.button
      onClick={openChatbot}
      className="floating-element bottom-6 right-6 w-14 h-14 bg-bg-card border border-border-color rounded-xl shadow-2xl flex items-center justify-center text-accent-cyan hover:border-accent-cyan hover:shadow-accent-cyan/20"
      whileHover={{ scale: 1.1, rotate: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, rotate: 180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
    >
      <MessageCircle className="w-6 h-6" />
    </motion.button>
  )
}

export default FloatingChatbot
