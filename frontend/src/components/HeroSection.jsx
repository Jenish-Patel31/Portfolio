import { useEffect } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink } from 'lucide-react'
import { usePortfolioStore } from '../stores/portfolioStore'

const HeroSection = () => {
  const { hero, fetchHero, isLoading, errors } = usePortfolioStore()

  useEffect(() => {
    console.log('HeroSection: useEffect triggered, fetching hero data')
    fetchHero()
  }, [fetchHero])

  // Always call useTypewriter, even if hero is missing
  const animatedTitle = useTypewriter(hero && hero.title ? hero.title : '', 40, 400);

  console.log('HeroSection render:', { hero, isLoading: isLoading.hero, errors: errors.hero })

  if (isLoading.hero) {
    console.log('HeroSection: Showing loading state')
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

  if (errors.hero) {
    console.log('HeroSection: Showing error state:', errors.hero)
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
    console.log('HeroSection: Hero data is null or undefined:', hero)
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

  console.log('HeroSection: Rendering with hero data:', hero)

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
  <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden px-4">
      {/* Background Elements removed for cleaner look */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-6"
        >
          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-text-primary mb-4"
          >
            {hero.name}
          </motion.h1>
          {/* Animated Title */}
          <motion.h2
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-accent-blue mb-6"
          >
            {animatedTitle}
          </motion.h2>
          {/* Summary */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-text-secondary text-base md:text-lg mb-8"
          >
            {hero.summary}
          </motion.p>
          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center items-center gap-6 mb-8 space-x-4"
          >
            {hero.email && (
              <a
                href={`mailto:${hero.email}`}
                className="flex items-center gap-2 text-text-secondary hover:text-accent-blue underline"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
                {hero.email}
              </a>
            )}
            {hero.phone && (
              <a
                href={`tel:${hero.phone}`}
                className="flex items-center gap-2 text-text-secondary hover:text-accent-blue underline"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Phone"
              >
                <Phone className="w-5 h-5" />
                {hero.phone}
              </a>
            )}
            {hero.location && (
              <span className="flex items-center gap-2 text-text-secondary">
                <MapPin className="w-5 h-5" />
                {hero.location}
              </span>
            )}
          </motion.div>

          {/* Social Links */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center items-center space-x-6 mb-12"
          >
            {hero.socialLinks?.github && (
              <motion.a
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href={hero.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-bg-card border border-border-color rounded-full flex items-center justify-center text-text-secondary hover:text-accent-blue hover:border-accent-blue transition-all duration-200"
              >
                <Github className="w-6 h-6" />
              </motion.a>
            )}

            {hero.socialLinks?.linkedin && (
              <motion.a
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href={hero.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-bg-card border border-border-color rounded-full flex items-center justify-center text-text-secondary hover:text-accent-blue hover:border-accent-blue transition-all duration-200"
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
            )}

            {hero.socialLinks?.leetcode && (
              <motion.a
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href={hero.socialLinks.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-bg-card border border-border-color rounded-full flex items-center justify-center text-text-secondary hover:text-accent-green hover:border-accent-green transition-all duration-200"
              >
                <ExternalLink className="w-6 h-6" />
              </motion.a>
            )}
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <motion.button
              whileHover={{ scale: 1.08, boxShadow: '0 4px 24px 0 rgba(59,130,246,0.25)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              className="relative text-lg px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-green text-white shadow-lg overflow-hidden border-0 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all duration-200"
              style={{ zIndex: 1 }}
            >
              <span className="relative z-10">View Projects</span>
              <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              <span className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-accent-cyan to-accent-green opacity-70 animate-pulse rounded-t-lg" style={{ zIndex: 0 }} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('experience').scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline text-lg px-8 py-3"
            >
              View Experience
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-text-secondary rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-text-secondary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
