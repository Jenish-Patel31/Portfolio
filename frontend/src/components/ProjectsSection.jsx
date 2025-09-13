import { useEffect, memo } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Users, Clock, Star } from 'lucide-react'
import * as SI from 'react-icons/si';
// Map technology names to logo imports
// Map normalized tech names to react-icons SimpleIcons component names
const techIconMap = {
  python: 'SiPython',
  react: 'SiReact',
  javascript: 'SiJavascript',
  js: 'SiJavascript',
  typescript: 'SiTypescript',
  ts: 'SiTypescript',
  nodejs: 'SiNodedotjs',
  node: 'SiNodedotjs',
  html: 'SiHtml5',
  html5: 'SiHtml5',
  css: 'SiCss3',
  css3: 'SiCss3',
  cpp: 'SiCplusplus',
  'c++': 'SiCplusplus',
  java: 'SiJava',
  mongodb: 'SiMongodb',
  mysql: 'SiMysql',
  tailwind: 'SiTailwindcss',
  tailwindcss: 'SiTailwindcss',
  docker: 'SiDocker',
  git: 'SiGit',
  nextjs: 'SiNextdotjs',
  express: 'SiExpress',
  redux: 'SiRedux',
  vite: 'SiVite',
  graphql: 'SiGraphql',
  aws: 'SiAmazonaws',
  firebase: 'SiFirebase',
  linux: 'SiLinux',
  ubuntu: 'SiUbuntu',
  vscode: 'SiVisualstudiocode',
  figma: 'SiFigma',
  dockercompose: 'SiDocker',
  c: 'SiC',
  go: 'SiGo',
  rust: 'SiRust',
  bootstrap: 'SiBootstrap',
  materialui: 'SiMaterialui',
  postgresql: 'SiPostgresql',
  redis: 'SiRedis',
  jest: 'SiJest',
  mocha: 'SiMocha',
  selenium: 'SiSelenium',
  azure: 'SiMicrosoftazure',
  azuredevops: 'SiAzuredevops',
  jira: 'SiJira',
  trello: 'SiTrello',
  slack: 'SiSlack',
  github: 'SiGithub',
  gitlab: 'SiGitlab',
  bitbucket: 'SiBitbucket',
  npm: 'SiNpm',
  yarn: 'SiYarn',
  pnpm: 'SiPnpm',
  ...SI // fallback for all SI icons
};
import { usePortfolioStore } from '../stores/portfolioStore'
import { useModalStore } from '../stores/modalStore'
import { useLoadingStore } from '../stores/loadingStore'
// Removed ProjectsModal import - using simple page instead
import { useState } from 'react'

const ProjectsSection = () => {
  const { projects, fetchProjects, isLoading, errors } = usePortfolioStore()
  // const { openProjectModal } = useModalStore() // Modal removed, no longer needed
  const { isGlobalLoading } = useLoadingStore()
  const [showAllProjects, setShowAllProjects] = useState(false)

  // Data is fetched by App.jsx fetchAllData, no need to fetch here
  // useEffect(() => {
  //   console.log('ProjectsSection: useEffect triggered, fetching projects data')
  //   fetchProjects()
  // }, [])


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const getCategoryColor = (category) => {
    const colors = {
      web: 'bg-accent-blue/20 text-accent-blue border-accent-blue/30',
      mobile: 'bg-accent-green/20 text-accent-green border-accent-green/30',
      ai: 'bg-accent-yellow/20 text-accent-yellow border-accent-yellow/30',
      blockchain: 'bg-accent-cyan/20 text-accent-cyan border-accent-cyan/30',
      devops: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      other: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
    return colors[category] || colors.other
  }

  if (isLoading.projects) {
    return (
  <section id="projects" className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-10 bg-bg-card rounded w-48 mx-auto mb-4"></div>
              <div className="h-6 bg-bg-card rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-bg-card rounded-lg mb-4"></div>
                <div className="h-6 bg-bg-card rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-bg-card rounded w-full mb-2"></div>
                <div className="h-4 bg-bg-card rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (errors.projects && !isGlobalLoading) {
    return (
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Featured <span className="gradient-text">Projects</span>
            </h2>
           
          </div>
          <div className="text-center text-red-400">
            <p>Error loading projects: {errors.projects}</p>
            <button 
              onClick={() => fetchProjects()}
              className="mt-4 px-4 py-2 bg-accent-blue text-white rounded hover:bg-accent-blue/80"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    )
  }

  if (!projects || !Array.isArray(projects) || projects.length === 0) {
    return (
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Featured <span className="gradient-text">Projects</span>
            </h2>
          </div>
          <div className="text-center text-text-secondary">
            <p>No projects available at the moment.</p>
            <button 
              onClick={() => fetchProjects()}
              className="mt-4 px-4 py-2 bg-accent-blue text-white rounded hover:bg-accent-blue/80"
            >
              Refresh
            </button>
          </div>
        </div>
      </section>
    )
  }


  return (
    <>
    <section id="projects" className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        {/* Projects Grid - Show only first 3 projects */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
          {(showAllProjects ? projects : projects.slice(0, 3)).map((project, index) => (
            <div
              key={project._id}
              className="card group m-2 relative hover:transform hover:-translate-y-2 transition-transform duration-300"
              // onClick={() => openProjectModal(project)} // Modal removed, no click action needed
            >
              {/* Modern Floating Action Button - GitHub */}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group border border-slate-600"
                  onClick={e => e.stopPropagation()}
                  aria-label="View on GitHub"
                >
                  <Github className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                </a>
              )}
              {/* Modern Floating Action Button - Live */}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 left-4 z-20 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
                  onClick={e => e.stopPropagation()}
                  aria-label="View Live Demo"
                >
                  <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
              )}
              {/* Project Image */}
              <div className="h-48 bg-bg-secondary rounded-lg mb-4 overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      console.error('Image load error:', e.target.src)
                      e.target.style.display = 'none'
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-6xl text-text-secondary/20 font-bold">
                      {project.title.charAt(0)}
                    </div>
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="space-y-3">
                {/* Title and Featured Badge */}
                <div className="flex items-start justify-between space-x-2">
                  <h3 className="text-xl font-semibold text-text-primary group-hover:text-accent-blue transition-colors duration-200">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <Star className="w-5 h-5 text-accent-yellow fill-current" />
                  )}
                </div>

                {/* Summary */}
                <p className="text-text-secondary text-sm line-clamp-2">
                  {project.summary}
                </p>

                {/* Project Meta */}
                <div className="flex items-center space-x-4 text-xs text-text-secondary">
                  {project.teamSize && (
                    <div className="flex items-center space-x-1 mx-1">
                      <Users className="w-3 h-3" />
                      <span>{project.teamSize}</span>
                    </div>
                  )}
                  {project.duration && (
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{project.duration}</span>
                    </div>
                  )}
                </div>

                {/* Category Badge */}
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(project.category)}`}>
                  {project.category}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.slice(0, 3).map((tech, techIndex) => {
                    const key = tech.toLowerCase().replace(/[^a-z0-9]/g, '');
                    const iconName = techIconMap[key];
                    const Icon = SI[iconName] || null;
                    return (
                      <span
                        key={techIndex}
                        className="flex items-center gap-1 px-2 py-1 bg-bg-secondary text-text-secondary text-xs rounded-md mx-1 my-1"
                      >
                        {Icon && <Icon size={20} title={tech + ' logo'} color="unset" style={{ display: 'block', marginRight: '0.25rem' }} />}
                        {tech}
                      </span>
                    );
                  })}
                  {project.technologies?.length > 3 && (
                    <span className="px-2 py-1 bg-bg-secondary text-text-secondary text-xs rounded-md">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Buttons - GitHub button moved to floating top-right, Live button moved to floating top-left */}
                <div className="flex items-center space-x-3 pt-2">
                  {/* Buttons moved to floating positions above */}
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* View More/Less Button - Fixed z-index and styling */}
        <div className="text-center mt-12 relative z-50">
          <button 
            onClick={() => setShowAllProjects(!showAllProjects)}
            className="bg-gradient-to-r from-accent-blue to-accent-cyan hover:from-accent-cyan hover:to-accent-blue text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer relative z-50"
            style={{ zIndex: 9999 }}
          >
            {showAllProjects ? 'Show Less Projects' : 'View More Projects'} 
            <span className="ml-2 text-sm opacity-90">
              ({showAllProjects ? `Showing ${projects.length}` : `+${Math.max(0, projects.length - 3)} more`})
            </span>
          </button>
        </div>

      </div>
    </section>
    </>
  )
}

export default memo(ProjectsSection)
