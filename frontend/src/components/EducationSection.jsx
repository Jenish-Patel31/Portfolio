import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react'
import { usePortfolioStore } from '../stores/portfolioStore'

const EducationSection = () => {
  const { education, fetchEducation, isLoading } = usePortfolioStore()

  useEffect(() => {
    fetchEducation()
  }, [fetchEducation])

  if (isLoading.education) {
    return (
  <section id="education" className="py-10 px-4">
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
  <section id="education" className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <span className="gradient-text">Education</span> & Training
          </h2>
        </motion.div>
        
        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card group"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Institution Logo */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-bg-secondary rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-10 h-10 text-text-secondary" />
                  </div>
                </div>

                {/* Education Details */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary group-hover:text-accent-blue transition-colors duration-200">
                      {edu.degree} in {edu.field}
                    </h3>
                    <div className="flex items-center space-x-4 text-text-secondary mt-1">
                      <span className="font-medium">{edu.institution}</span>
                      {edu.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{edu.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                        {new Date(edu.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    {edu.gpa && (
                      <div className="flex items-center space-x-1">
                        <Award className="w-4 h-4" />
                        <span>GPA: {edu.gpa}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-text-secondary leading-relaxed">
                    {edu.description}
                  </p>

                  {/* Achievements */}
                  {edu.achievements && edu.achievements.length > 0 && (
                    <div>
                      <h4 className="font-medium text-text-primary mb-1">Achievements:</h4>
                      <ul className="space-y-1">
                        {edu.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-text-secondary text-sm flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 bg-accent-green rounded-full mt-2 flex-shrink-0"></span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
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

export default EducationSection
