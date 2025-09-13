import { useEffect, useState, memo } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, ArrowRight, Download, MessageCircle } from 'lucide-react'
import { usePortfolioStore } from '../stores/portfolioStore'
import { useLoadingStore } from '../stores/loadingStore'

const HeroSection = () => {
  const { hero, projects, fetchHero, isLoading, errors } = usePortfolioStore()
  const { isGlobalLoading } = useLoadingStore()
  const [isVisible, setIsVisible] = useState(false)

  // Data is fetched by App.jsx fetchAllData, no need to fetch here
  // useEffect(() => {
  //   console.log('HeroSection: useEffect triggered, fetching hero data')
  //   fetchHero()
  // }, [])

  // Always call useTypewriter, even if hero is missing
  const animatedTitle = useTypewriter(hero && hero.title ? hero.title : '', 40, 400);

  // Trigger visibility animation
  useEffect(() => {
    setIsVisible(true)
  }, [])



  if (isLoading.hero) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center pt-16">
        <div className="animate-pulse">
          <div className="h-8 bg-bg-card rounded w-64 mb-4"></div>
          <div className="h-4 bg-bg-card rounded w-96 mb-2"></div>
          <div className="h-4 bg-bg-card rounded w-80"></div>
        </div>
      </section>
    )
  }

  if (errors.hero && !isGlobalLoading) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center text-red-400">
          <p>Error loading hero data: {errors.hero}</p>
          <button 
            onClick={() => fetchHero()}
            className="mt-4 px-4 py-2 bg-accent-blue text-white rounded hover:bg-accent-blue/80"
          >
            Retry
          </button>
        </div>
      </section>
    )
  }

  if (!hero) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center text-text-secondary">
          <p>Loading hero data...</p>
          <p className="text-sm mt-2">If this persists, check the console for errors</p>
          <button 
            onClick={() => fetchHero()}
            className="mt-4 px-4 py-2 bg-accent-blue text-white rounded hover:bg-accent-blue/80"
          >
            Retry Fetch
          </button>
        </div>
      </section>
    )
  }


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative px-4">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-6 sm:space-y-6 lg:space-y-8"
        >
          {/* Name with subtle gradient */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-green bg-clip-text text-transparent">
                {hero.name}
              </span>
            </h1>
          </motion.div>

          {/* Animated Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-semibold text-accent-blue mb-4 sm:mb-4 lg:mb-6">
              {animatedTitle}
            </h2>
          </motion.div>

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-3xl mx-auto text-text-secondary text-lg sm:text-lg md:text-xl mb-6 sm:mb-6 lg:mb-8 leading-relaxed"
          >
            {hero.summary}
          </motion.p>


          {/* Contact Information - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-6 lg:mb-8 text-sm sm:text-sm lg:text-base"
          >
            {hero.email && (
              <motion.a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${hero.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-2 text-text-secondary hover:text-accent-blue transition-colors duration-200 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="p-2 sm:p-2 bg-accent-blue/10 rounded-lg sm:rounded-lg group-hover:bg-accent-blue/20 transition-colors">
                  <Mail className="w-4 h-4 sm:w-4 sm:h-4 text-accent-blue" />
                </div>
                <span>Email</span>
              </motion.a>
            )}

            {hero.phone && (
              <motion.a
                href={`https://wa.me/${hero.phone.replace(/[^\d]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-2 text-text-secondary hover:text-green-500 transition-colors duration-200 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="p-2 sm:p-2 bg-green-500/10 rounded-lg sm:rounded-lg group-hover:bg-green-500/20 transition-colors">
                  <MessageCircle className="w-4 h-4 sm:w-4 sm:h-4 text-green-500" />
                </div>
                <span>WhatsApp</span>
              </motion.a>
            )}

            {hero.location && (
              <motion.div
                className="flex items-center gap-2 sm:gap-2 text-text-secondary group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="p-2 sm:p-2 bg-accent-cyan/10 rounded-lg sm:rounded-lg group-hover:bg-accent-cyan/20 transition-colors">
                  <MapPin className="w-4 h-4 sm:w-4 sm:h-4 text-accent-cyan" />
                </div>
                <span>{hero.location}</span>
              </motion.div>
            )}
          </motion.div>

          {/* Social Links - Mobile Optimized */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex justify-center items-center space-x-4 sm:space-x-4 lg:space-x-6 mb-6 sm:mb-6 lg:mb-8"
          >
            {hero.socialLinks?.github && (
              <motion.a
                href={hero.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 sm:w-12 sm:h-12 bg-bg-card border border-border-color rounded-xl sm:rounded-xl flex items-center justify-center text-text-secondary hover:text-accent-blue hover:border-accent-blue transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/20"
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-6 h-6 sm:w-6 sm:h-6" />
                <div className="absolute inset-0 bg-accent-blue/5 rounded-xl sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            )}

            {hero.socialLinks?.linkedin && (
              <motion.a
                href={hero.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 sm:w-12 sm:h-12 bg-bg-card border border-border-color rounded-xl sm:rounded-xl flex items-center justify-center text-text-secondary hover:text-accent-blue hover:border-accent-blue transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/20"
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-6 h-6 sm:w-6 sm:h-6" />
                <div className="absolute inset-0 bg-accent-blue/5 rounded-xl sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            )}

            {hero.socialLinks?.leetcode && (
              <motion.a
                href={hero.socialLinks.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 sm:w-12 sm:h-12 bg-bg-card border border-border-color rounded-xl sm:rounded-xl flex items-center justify-center text-text-secondary hover:text-accent-green hover:border-accent-green transition-all duration-300 hover:shadow-lg hover:shadow-accent-green/20"
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-6 h-6 sm:w-6 sm:h-6" />
                <div className="absolute inset-0 bg-accent-green/5 rounded-xl sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            )}
          </motion.div>

          {/* CTA Buttons - Mobile Optimized */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6"
          >
            {projects && projects.length > 0 && (
              <motion.button
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 sm:px-8 py-3 sm:py-3 bg-gradient-to-r from-accent-blue to-accent-cyan text-white font-semibold rounded-xl sm:rounded-xl shadow-lg hover:shadow-xl hover:shadow-accent-blue/25 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-accent-blue/50 text-base sm:text-base"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center space-x-1.5 sm:space-x-2">
                  <span>View Projects</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            )}

            <motion.button
              onClick={() => document.getElementById('experience').scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-8 sm:px-8 py-3 sm:py-3 border-2 border-accent-blue text-accent-blue font-semibold rounded-xl sm:rounded-xl hover:bg-accent-blue hover:text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-accent-blue/50 text-base sm:text-base"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>View Experience</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-text-secondary/50 rounded-full flex justify-center cursor-pointer hover:border-accent-blue transition-colors"
          onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-text-secondary/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default memo(HeroSection)
