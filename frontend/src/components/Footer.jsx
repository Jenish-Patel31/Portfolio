import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, ArrowUp, Phone, MapPin, ExternalLink } from 'lucide-react'
import * as SI from 'react-icons/si';
import { usePortfolioStore } from '../stores/portfolioStore'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { hero, fetchHero, isLoading } = usePortfolioStore()

  useEffect(() => {
    fetchHero()
  }, [fetchHero])

  if (isLoading.hero) {
    return (
      <footer className="bg-bg-secondary border-t border-border-color py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="h-6 bg-bg-card rounded w-32"></div>
                <div className="h-4 bg-bg-card rounded w-48"></div>
              </div>
              <div className="space-y-4">
                <div className="h-6 bg-bg-card rounded w-24"></div>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-4 bg-bg-card rounded w-20"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-6 bg-bg-card rounded w-20"></div>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-4 bg-bg-card rounded w-32"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-bg-secondary border-t border-border-color py-12 relative z-10 pointer-events-auto">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4 px-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-accent-blue to-accent-cyan rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {hero?.name ? hero.name.charAt(0) : 'J'}
                </span>
              </div>
              <span className="text-xl font-bold text-text-primary">
                {hero?.name || 'Jenish Patel'}
              </span>
            </div>
            <p className="text-text-secondary text-sm">
              {hero?.title || 'Full-Stack Developer | DevOps Engineer | AI/ML Enthusiast'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Quick Links</h3>
            <ul className="space-y-2 px-1">
              {['Home', 'Skills', 'Experience', 'Projects', 'Education', 'Achievements'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-text-secondary hover:text-accent-blue transition-colors duration-200 text-sm cursor-pointer hover:underline"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Connect</h3>
            <div className="space-y-3 px-1">
              {hero?.email && (
                <a
                  href={`mailto:${hero.email}`}
                  className="flex items-center space-x-2 text-text-secondary hover:text-accent-blue transition-colors duration-200 text-sm group cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4 text-[#EA4335] group-hover:scale-110 transition-transform duration-200" />
                  <span className="truncate">{hero.email}</span>
                </a>
              )}
              
              {hero?.phone && (
                <a
                  href={`tel:${hero.phone}`}
                  className="flex items-center space-x-2 text-text-secondary hover:text-accent-green transition-colors duration-200 text-sm group cursor-pointer"
                  aria-label="Phone"
                >
                  <Phone className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform duration-200" />
                  <span>{hero.phone}</span>
                </a>
              )}
              
              {hero?.location && (
                <div className="flex items-center space-x-2 text-text-secondary text-sm">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span className="truncate">{hero.location}</span>
                </div>
              )}
              
              {hero?.socialLinks?.github && (
                <a
                  href={hero.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-text-secondary hover:text-accent-blue transition-colors duration-200 text-sm group cursor-pointer"
                  aria-label="GitHub"
                >
                  <SI.SiGithub size={18} color="#181717" className="group-hover:scale-110 transition-transform duration-200" />
                  <span>GitHub</span>
                </a>
              )}
              
              {hero?.socialLinks?.linkedin && (
                <a
                  href={hero.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-text-secondary hover:text-accent-blue transition-colors duration-200 text-sm group cursor-pointer"
                  aria-label="LinkedIn"
                >
                  <SI.SiLinkedin size={18} color="#0077B5" className="group-hover:scale-110 transition-transform duration-200" />
                  <span>LinkedIn</span>
                </a>
              )}
              
              {hero?.socialLinks?.leetcode && (
                <a
                  href={hero.socialLinks.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-text-secondary hover:text-accent-green transition-colors duration-200 text-sm group cursor-pointer"
                  aria-label="LeetCode"
                >
                  <ExternalLink className="w-4 h-4 text-yellow-500 group-hover:scale-110 transition-transform duration-200" />
                  <span>LeetCode</span>
                </a>
              )}
            </div>
            
            {/* Back to Top Button */}
            <div className="mt-6">
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-accent-blue to-accent-cyan text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
                aria-label="Back to Top"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowUp className="w-4 h-4 text-white group-hover:text-accent-yellow transition-colors duration-200" />
                <span className="font-medium">Back to Top</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border-color mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-text-secondary text-sm">
              © {currentYear} {hero?.name || 'Jenish Patel'}. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-2 text-text-secondary text-sm">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </motion.div>
              <span>using React & Tailwind CSS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
