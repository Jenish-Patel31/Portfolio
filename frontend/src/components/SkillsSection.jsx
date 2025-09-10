import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings } from 'lucide-react';
import * as SI from 'react-icons/si';
import { usePortfolioStore } from '../stores/portfolioStore';

const glassBg = 'bg-white/10 backdrop-blur-md border border-white/20 shadow-xl'; // glassmorphism

const SkillsSection = () => {
  const { skills, fetchSkills, isLoading } = usePortfolioStore();
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  // Get all unique categories from backend
  const categories = ['all', ...skills.map(cat => cat.category)];

  // Filtered skills
  const filteredSkills =
    activeCategory === 'all'
      ? skills.flatMap(cat => cat.skills.map(skill => ({ ...skill, category: cat.category })))
      : (skills.find(cat => cat.category === activeCategory)?.skills || []).map(skill => ({ ...skill, category: activeCategory }));

  return (
  <section id="skills" className="py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 space-y-2"
        >
          <h2 className="section-title text-3xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>
        {/* Category Filter */}
        <motion.div layout className="flex flex-wrap justify-center gap-3 mb-10">
          <AnimatePresence>
            {categories.map(cat => (
              <motion.button
                key={cat}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`px-4 py-1.5 rounded-full font-medium transition-all duration-200 border border-white/20 text-sm mx-1 my-1 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : glassBg + ' text-text-secondary hover:bg-white/20'
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          <AnimatePresence>
            {filteredSkills.map((skill, idx) => (
              <motion.div
                key={skill.name + idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                whileHover={{ scale: 1.08, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)', borderColor: '#a5b4fc' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`flex flex-col items-center justify-center text-center p-4 rounded-2xl ${glassBg} group cursor-pointer relative overflow-hidden mx-2 my-2`}
                style={{ minWidth: 140, minHeight: 160 }}
              >
                {/* Glass shine effect */}
                <span className="absolute left-0 top-0 w-full h-full pointer-events-none">
                  <span className="block w-1/2 h-full bg-gradient-to-br from-white/30 to-transparent blur-2xl opacity-0 group-hover:opacity-60 transition-all duration-500" />
                </span>
                <div className="w-12 h-12 mb-2 flex items-center justify-center rounded-lg bg-bg-secondary shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {(() => {
                    // Normalize skill name for icon mapping
                    const key = skill.name.toLowerCase().replace(/[^a-z0-9]/g, '');
                    // Try SiXxx icon from react-icons/si
                    const iconName = 'Si' + key.charAt(0).toUpperCase() + key.slice(1);
                    const Icon = SI[iconName] || null;
                    return Icon ? (
                      <Icon size={32} title={skill.name + ' logo'} color="unset" style={{ display: 'block', margin: '0 auto' }} />
                    ) : (
                      <Settings className="w-6 h-6 text-text-secondary" />
                    );
                  })()}
                </div>
                <span className="text-sm font-semibold text-text-primary truncate w-24" title={skill.name}>
                  {skill.name}
                </span>
                <span className="text-xs text-text-secondary mt-1 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                  {skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
