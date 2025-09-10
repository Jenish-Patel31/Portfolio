import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react'
import * as SI from 'react-icons/si';

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-bg-secondary border-t border-border-color py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4 px-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-accent-blue to-accent-cyan rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <span className="text-xl font-bold text-text-primary">
                Jenish Patel
              </span>
            </div>
            <p className="text-text-secondary text-sm">
              Full-Stack Developer | DevOps Engineer | AI/ML Enthusiast
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Quick Links</h3>
            <ul className="space-y-2 px-1">
              {['Home', 'Projects', 'Experience', 'Skills', 'Education', 'Achievements'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-text-secondary hover:text-accent-blue transition-colors duration-200 text-sm"
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
              <a
                href="mailto:23bce529@nirmauni.ac.in"
                className="flex items-center space-x-2 text-text-secondary hover:text-accent-blue transition-colors duration-200 text-sm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-[#EA4335]" />
                <span>23bce529@nirmauni.ac.in</span>
              </a>
              <a
                href="https://github.com/Jenish-Patel31"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-text-secondary hover:text-accent-blue transition-colors duration-200 text-sm"
                aria-label="GitHub"
              >
                <SI.SiGithub size={18} color="#181717" style={{ marginRight: 4 }} />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/Jenish-Patel-31k/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-text-secondary hover:text-accent-blue transition-colors duration-200 text-sm"
                aria-label="LinkedIn"
              >
                <SI.SiLinkedin size={18} color="#0077B5" style={{ marginRight: 4 }} />
                <span>LinkedIn</span>
              </a>
            </div>
            {/* Back to Top Button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-4 flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-accent-blue to-accent-cyan text-white rounded-full shadow hover:scale-110 transition-all duration-200 group"
              aria-label="Back to Top"
            >
              <svg className="w-5 h-5 text-white group-hover:text-accent-yellow transition-colors duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border-color mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-text-secondary text-sm">
              © {currentYear} Jenish Patel. All rights reserved.
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
