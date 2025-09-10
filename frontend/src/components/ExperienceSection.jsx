import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Building2, Calendar, MapPin, ExternalLink } from 'lucide-react'
import { usePortfolioStore } from '../stores/portfolioStore'

const ExperienceSection = () => {
  const { experience, fetchExperience, isLoading } = usePortfolioStore()

  useEffect(() => {
    fetchExperience()
  }, [fetchExperience])

  if (isLoading.experience) {
    return (
  <section id="experience" className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-10 bg-bg-card rounded w-48 mx-auto mb-4"></div>
              <div className="h-6 bg-bg-card rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-bg-card rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
  <section id="experience" className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>
        
        <div className="space-y-8">
          {experience.map((exp, index) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card group"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Company Logo */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-bg-secondary rounded-lg flex items-center justify-center">
                    <Building2 className="w-10 h-10 text-text-secondary" />
                  </div>
                </div>

                {/* Experience Details */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary group-hover:text-accent-blue transition-colors duration-200">
                      {exp.position}
                    </h3>
                    <div className="flex items-center space-x-4 text-text-secondary mt-1">
                      <span className="font-medium">{exp.company}</span>
                      {exp.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                        {exp.current ? ' Present' : new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <p className="text-text-secondary leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Key Achievements */}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">Key Achievements:</h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-text-secondary text-sm flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 bg-accent-blue rounded-full mt-2 flex-shrink-0"></span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-bg-secondary text-text-secondary text-sm rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
