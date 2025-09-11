import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Code, Palette, Database, Cloud, Cpu, Globe, Zap, Target, TrendingUp, X } from 'lucide-react';
import * as SI from 'react-icons/si';
import { usePortfolioStore } from '../stores/portfolioStore';

const SkillsSection = () => {
  const { skills, fetchSkills, isLoading } = usePortfolioStore();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  
  // Disable hover states completely to prevent re-renders
  // const [hoveredSkill, setHoveredSkill] = useState(null);
  // const [hoveredCategory, setHoveredCategory] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  // Handle keyboard events for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showCategoryModal) {
        setShowCategoryModal(false);
      }
    };

    if (showCategoryModal) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [showCategoryModal]);

  // Removed all hover state effects to prevent re-renders

  // Get all unique categories from backend
  const categories = skills && skills.length > 0 ? [...new Set(skills.map(cat => cat.category))] : [];

  // Get all skills flattened
  const allSkills = skills && skills.length > 0 ? skills.flatMap(cat => cat.skills.map(skill => ({ ...skill, category: cat.category }))) : [];

  // Category icons and colors
  const categoryData = {
    'frontend': { icon: <Palette className="w-4 h-4" />, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-500/10' },
    'backend': { icon: <Database className="w-4 h-4" />, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-500/10' },
    'devops': { icon: <Cloud className="w-4 h-4" />, color: 'from-purple-500 to-violet-500', bgColor: 'bg-purple-500/10' },
    'mobile': { icon: <Cpu className="w-4 h-4" />, color: 'from-orange-500 to-red-500', bgColor: 'bg-orange-500/10' },
    'tools': { icon: <Settings className="w-4 h-4" />, color: 'from-gray-500 to-slate-500', bgColor: 'bg-gray-500/10' },
    'other': { icon: <Globe className="w-4 h-4" />, color: 'from-pink-500 to-rose-500', bgColor: 'bg-pink-500/10' }
  };

  // Get skill icon
  const getSkillIcon = (skillName) => {
    const key = skillName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const iconName = 'Si' + key.charAt(0).toUpperCase() + key.slice(1);
    const Icon = SI[iconName];
    return Icon ? <Icon size={20} /> : <Code className="w-5 h-5" />;
  };

  // Get skill level from backend data (now truly dynamic!)
  const getSkillLevel = (skill) => {
    // Use proficiency from backend if available, otherwise fallback to 70
    return skill.proficiency || 70;
  };

  // Handle category click to show skills
  const handleCategoryClick = useCallback((category) => {
    setSelectedCategory(category);
    setShowCategoryModal(true);
  }, []);

  // Get skills for a specific category
  const getCategorySkills = useCallback((category) => {
    return allSkills.filter(skill => skill.category === category);
  }, [allSkills]);

  // Category Skills Modal Component
  const CategorySkillsModal = () => {
    if (!showCategoryModal || !selectedCategory) return null;

    const categorySkills = getCategorySkills(selectedCategory);
    const categoryInfo = categoryData[selectedCategory];

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowCategoryModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-2xl bg-bg-card border border-border-color rounded-2xl shadow-2xl max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border-color">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${categoryInfo?.bgColor || 'bg-accent-blue/10'} flex items-center justify-center`}>
                  {categoryInfo?.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary capitalize">{selectedCategory} Skills</h3>
                  <p className="text-text-secondary text-sm">{categorySkills.length} technologies</p>
                </div>
              </div>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="p-2 hover:bg-bg-secondary rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            {/* Skills Grid */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categorySkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-center gap-3 p-4 bg-bg-secondary/50 rounded-xl border border-border-color transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    // Hover events removed to prevent re-renders
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-accent-blue to-accent-cyan rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      {getSkillIcon(skill.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-text-primary truncate">{skill.name}</span>
                        <span className="text-xs text-text-secondary">{getSkillLevel(skill)}%</span>
                      </div>
                      <div className="w-full bg-bg-primary rounded-full h-1.5">
                        <motion.div
                          className={`h-1.5 rounded-full bg-gradient-to-r ${categoryInfo?.color || 'from-accent-blue to-accent-cyan'}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${getSkillLevel(skill)}%` }}
                          transition={{ delay: index * 0.05 + 0.3, duration: 0.8 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border-color bg-bg-secondary/30">
              <div className="flex items-center justify-between">
                <div className="text-sm text-text-secondary">
                  <span className="font-medium text-text-primary">{categorySkills.length}</span> skills in {selectedCategory} category
                </div>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors duration-200 text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // Skill Radar Chart Component
  const SkillRadarChart = () => {
    const centerX = 150;
    const centerY = 150;
    const radius = 120;
    const numCategories = categories.length;
    const angleStep = (2 * Math.PI) / numCategories;

    return (
      <div className="relative w-80 h-80 mx-auto">
        <svg width="300" height="300" className="absolute inset-0">
          {/* Background circles */}
          {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
            <circle
              key={i}
              cx={centerX}
              cy={centerY}
              r={radius * scale}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          ))}
          
          {/* Category lines */}
          {categories.map((category, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            return (
              <line
                key={category}
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
              />
            );
          })}

          {/* Skill points */}
          {categories.map((category, i) => {
            const categorySkills = allSkills.filter(skill => skill.category === category);
            const avgLevel = categorySkills.length > 0 
              ? categorySkills.reduce((sum, skill) => sum + getSkillLevel(skill), 0) / categorySkills.length
              : 70;
            
            const angle = i * angleStep - Math.PI / 2;
            const distance = (avgLevel / 100) * radius;
            const x = centerX + distance * Math.cos(angle);
            const y = centerY + distance * Math.sin(angle);
            
            return (
              <motion.circle
                key={category}
                cx={x}
                cy={y}
                r="6"
                fill={`url(#gradient-${category})`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                // whileHover removed to prevent re-renders
                // Hover events removed to prevent re-renders
              />
            );
          })}

          {/* Gradients */}
          <defs>
            {categories.map(category => {
              const categoryInfo = categoryData[category];
              const colorString = categoryInfo?.color || 'from-accent-blue to-accent-cyan';
              const colorParts = colorString.split(' ');
              const fromColor = colorParts[0]?.replace('from-', '#') || '#3b82f6';
              const toColor = colorParts[2]?.replace('to-', '#') || '#06b6d4';
              
              return (
                <linearGradient key={category} id={`gradient-${category}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={fromColor} />
                  <stop offset="100%" stopColor={toColor} />
                </linearGradient>
              );
            })}
          </defs>
        </svg>

        {/* Category labels */}
        {categories.map((category, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = centerX + (radius + 30) * Math.cos(angle);
          const y = centerY + (radius + 30) * Math.sin(angle);
          
          return (
            <motion.div
              key={category}
              className="absolute flex items-center gap-1 text-xs font-medium text-text-secondary"
              style={{
                left: x - 30,
                top: y - 10,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 + 0.5 }}
            >
              {categoryData[category]?.icon}
              <span className="capitalize">{category}</span>
            </motion.div>
          );
        })}
      </div>
    );
  };

  // Skill Level Bars
  const SkillLevelBars = () => {
    const topSkills = allSkills
      .map(skill => ({ ...skill, level: getSkillLevel(skill) }))
      .sort((a, b) => b.level - a.level)
      .slice(0, 8);

    return (
      <div className="space-y-3">
        {topSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            // Hover events removed to prevent re-renders
          >
            <div className="w-8 h-8 bg-gradient-to-br from-accent-blue to-accent-cyan rounded-lg flex items-center justify-center text-white flex-shrink-0">
              {getSkillIcon(skill.name)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-text-primary">{skill.name}</span>
                <span className="text-xs text-text-secondary">{skill.level}%</span>
              </div>
              <div className="w-full bg-bg-secondary rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full bg-gradient-to-r ${categoryData[skill.category]?.color || 'from-accent-blue to-accent-cyan'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  // Category Distribution
  const CategoryDistribution = () => {
    const categoryStats = categories.map(category => ({
      name: category,
      count: allSkills.filter(skill => skill.category === category).length,
      percentage: Math.round((allSkills.filter(skill => skill.category === category).length / allSkills.length) * 100)
    }));

    return (
      <div className="space-y-4">
        {categoryStats.map((stat, index) => (
          <motion.div
            key={stat.name}
            className="flex items-center gap-3 p-3 rounded-xl bg-bg-card/50 backdrop-blur-md border border-border-color cursor-pointer transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            // Hover events removed to prevent re-renders
            onClick={() => handleCategoryClick(stat.name)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCategoryClick(stat.name);
              }
            }}
            // whileHover and whileTap removed to prevent re-renders
            tabIndex={0}
            role="button"
            aria-label={`View ${stat.name} skills`}
          >
            <div className={`w-10 h-10 rounded-lg ${categoryData[stat.name]?.bgColor || 'bg-accent-blue/10'} flex items-center justify-center`}>
              {categoryData[stat.name]?.icon}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-text-primary capitalize">{stat.name}</span>
                <span className="text-xs text-text-secondary">{stat.count} skills</span>
              </div>
              <div className="w-full bg-bg-secondary rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full bg-gradient-to-r ${categoryData[stat.name]?.color || 'from-accent-blue to-accent-cyan'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.percentage}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                />
              </div>
            </div>
            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: -10 }}
              animate={{ x: 0 }}
            >
              <div className="w-6 h-6 rounded-full bg-accent-blue/20 flex items-center justify-center">
                <span className="text-accent-blue text-xs">→</span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    );
  };

  // Show loading state
  if (isLoading.skills) {
    return (
      <section id="skills" className="py-16 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-12 bg-bg-card rounded w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-bg-card rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-80 bg-bg-card rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show empty state
  if (!skills || skills.length === 0 || allSkills.length === 0) {
    return (
      <section id="skills" className="py-16 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              background: "linear-gradient(45deg, #3b82f6, #06b6d4, #22c55e, #3b82f6)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Skills & Expertise
          </motion.h2>
          <p className="text-text-secondary mb-8">
            Skills data is being loaded or is not available yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-16 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-blue/5 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -25, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-cyan/5 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 25, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              background: "linear-gradient(45deg, #3b82f6, #06b6d4, #22c55e, #3b82f6)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Skills & Expertise
          </motion.h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Dynamic visualization of my technical skills across different domains
          </p>
        </motion.div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Skill Radar Chart */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-bg-card/50 backdrop-blur-md border border-border-color rounded-2xl p-6 h-full">
              <div className="flex items-center gap-2 mb-6">
                <Target className="w-5 h-5 text-accent-blue" />
                <h3 className="text-lg font-semibold text-text-primary">Skill Radar</h3>
              </div>
              <SkillRadarChart />
              {/* Hover display removed to prevent re-renders */}
            </div>
          </motion.div>

          {/* Center: Top Skills */}
            <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-bg-card/50 backdrop-blur-md border border-border-color rounded-2xl p-6 h-full">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-accent-green" />
                <h3 className="text-lg font-semibold text-text-primary">Top Skills</h3>
              </div>
              <SkillLevelBars />
            </div>
          </motion.div>

          {/* Right: Category Distribution */}
                  <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-bg-card/50 backdrop-blur-md border border-border-color rounded-2xl p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent-cyan" />
                  <h3 className="text-lg font-semibold text-text-primary">Categories</h3>
                    </div>
                <span className="text-xs text-text-secondary bg-bg-secondary px-2 py-1 rounded-full">
                  Click to explore
                </span>
                    </div>
              <CategoryDistribution />
                    </div>
                  </motion.div>
        </div>

        {/* Hover tooltip removed to prevent re-renders */}

        {/* Category Skills Modal */}
        <CategorySkillsModal />
      </div>
    </section>
  );
};

export default SkillsSection;
