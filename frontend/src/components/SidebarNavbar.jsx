import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  User,
  Folder,
  Award,
  BookOpen,
  Star,
  Phone,
  FileText,
  LogOut,
  Edit,
  Users,
  Trophy,
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useModalStore } from '../stores/modalStore';

const NAV_LINKS = [
  { label: 'Home', section: 'home', icon: <Home size={22} /> },
  { label: 'Projects', section: 'projects', icon: <Folder size={22} /> },
  { label: 'Experience', section: 'experience', icon: <User size={22} /> },
  { label: 'Skills', section: 'skills', icon: <Star size={22} /> },
  { label: 'Education', section: 'education', icon: <BookOpen size={22} /> },
  { label: 'Achievements', section: 'achievements', icon: <Trophy size={22} /> },
  { label: 'Leadership', section: 'leadership', icon: <Users size={22} /> },
  { label: 'Resume/CV', to: 'https://drive.google.com/file/d/1LZZVVDCw8Pv5J1b14ZDtIIQDrpcyy8Aw/view?usp=drive_link', icon: <FileText size={22} />, external: true },
];

const SidebarNavbar = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const { openLoginModal, openEditResumeModal } = useModalStore();

  // Helper for section scroll
  const scrollToSection = (section) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-1/2 left-6 z-[3000] -translate-y-1/2 flex flex-col gap-2 bg-[rgba(28,28,48,0.38)] backdrop-blur-lg border border-[#7f5cff44] shadow-xl rounded-2xl p-3 items-center">
      {NAV_LINKS.filter(l => l.label !== 'Chat').map(link => {
        const isActive = link.section
          ? window.location.hash === `#${link.section}` || (window.location.pathname === '/' && (window.location.hash === '' && link.section === 'home'))
          : false;
        if (link.external) {
          return (
            <a
              key={link.label}
              href={link.to}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-3 px-2 py-2 rounded-xl transition-all duration-300 ease-in-out w-full ${isActive ? 'bg-[rgba(127,85,255,0.18)] text-white' : 'text-[#bdbdfc] hover:bg-[rgba(127,85,255,0.10)] hover:text-white'}`}
              aria-label={link.label}
            >
              {link.icon}
              <AnimatePresence>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="ml-3 whitespace-nowrap text-base font-semibold bg-[#23234a] px-3 py-1 rounded-lg shadow-lg hidden group-hover:inline-block"
                >
                  {link.label}
                </motion.span>
              </AnimatePresence>
            </a>
          );
        } else {
          return (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.section)}
              className={`group flex items-center gap-3 px-2 py-2 rounded-xl transition-all duration-300 ease-in-out w-full ${isActive ? 'bg-[rgba(127,85,255,0.18)] text-white' : 'text-[#bdbdfc] hover:bg-[rgba(127,85,255,0.10)] hover:text-white'}`}
              aria-label={link.label}
            >
              {link.icon}
              <AnimatePresence>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="ml-3 whitespace-nowrap text-base font-semibold bg-[#23234a] px-3 py-1 rounded-lg shadow-lg hidden group-hover:inline-block"
                >
                  {link.label}
                </motion.span>
              </AnimatePresence>
            </button>
          );
        }
      })}

      {/* Auth/Admin Section */}
      <div className="mt-6 flex flex-col gap-2">
        {isAuthenticated ? (
          <>
            <button
              onClick={openEditResumeModal}
              className="group flex items-center gap-3 px-2 py-2 rounded-xl transition-all duration-300 ease-in-out w-full text-[#bdbdfc] hover:bg-[rgba(127,85,255,0.10)] hover:text-white"
              aria-label="Edit Portfolio"
            >
              <Edit size={22} />
              <span className="ml-3 whitespace-nowrap text-base font-semibold bg-[#23234a] px-3 py-1 rounded-lg shadow-lg hidden group-hover:inline-block">Edit Portfolio</span>
            </button>
            <button
              onClick={logout}
              className="group flex items-center gap-3 px-2 py-2 rounded-xl transition-all duration-300 ease-in-out w-full text-[#bdbdfc] hover:bg-[rgba(127,85,255,0.10)] hover:text-white"
              aria-label="Logout"
            >
              <LogOut size={22} />
              <span className="ml-3 whitespace-nowrap text-base font-semibold bg-[#23234a] px-3 py-1 rounded-lg shadow-lg hidden group-hover:inline-block">Logout</span>
            </button>
          </>
        ) : (
          <button
            onClick={openLoginModal}
            className="group flex items-center gap-3 px-2 py-2 rounded-xl transition-all duration-300 ease-in-out w-full text-[#bdbdfc] hover:bg-[rgba(127,85,255,0.10)] hover:text-white"
            aria-label="Admin Login"
          >
            <User size={22} />
            <span className="ml-3 whitespace-nowrap text-base font-semibold bg-[#23234a] px-3 py-1 rounded-lg shadow-lg hidden group-hover:inline-block">Admin Login</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default SidebarNavbar;
