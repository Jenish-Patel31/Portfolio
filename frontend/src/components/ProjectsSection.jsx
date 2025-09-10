import { useEffect } from 'react'
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

const ProjectsSection = () => {
  const { projects, fetchProjects, isLoading, errors } = usePortfolioStore()
  const { openProjectModal } = useModalStore()

  useEffect(() => {
    console.log('ProjectsSection: useEffect triggered, fetching projects data')
    fetchProjects()
  }, [fetchProjects])

  console.log('ProjectsSection render:', { projects, isLoading: isLoading.projects, errors: errors.projects })

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
    console.log('ProjectsSection: Showing loading state')
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

  if (errors.projects) {
    console.log('ProjectsSection: Showing error state:', errors.projects)
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
    console.log('ProjectsSection: No projects data available:', projects)
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

  console.log('ProjectsSection: Rendering with projects data:', projects)

  return (
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

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="card group cursor-pointer m-2 relative"
              onClick={() => openProjectModal(project)}
            >
              {/* Floating GitHub Button */}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 z-20 flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan text-white font-semibold shadow hover:shadow-lg hover:from-accent-cyan hover:to-accent-blue transition-all duration-200 text-xs opacity-90 hover:opacity-100"
                  onClick={e => e.stopPropagation()}
                  aria-label="View on GitHub"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
              {/* Project Image Placeholder */}
              <div className="h-48 bg-bg-secondary rounded-lg mb-4 flex items-center justify-center">
                <div className="text-6xl text-text-secondary/20 font-bold">
                  {project.title.charAt(0)}
                </div>
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

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 pt-2">
                  {/* GitHub button moved to floating top-right */}
                  
                  {project.liveUrl && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-text-secondary hover:text-accent-green transition-colors duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-xs">Live</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-outline text-lg px-8 py-3"
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection
