import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Calendar, MapPin, Target } from 'lucide-react'
import { usePortfolioStore } from '../stores/portfolioStore'

const LeadershipSection = () => {
  const { leadership, fetchLeadership, isLoading } = usePortfolioStore()

  useEffect(() => {
    fetchLeadership()
  }, [fetchLeadership])

  if (isLoading.leadership) {
    return (
  <section id="leadership" className="py-10 px-4">
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
  <section id="leadership" className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <span className="gradient-text">Leadership</span> & Involvement
          </h2>

        </motion.div>
        
        <div className="space-y-8">
          {leadership.map((role, index) => (
            <motion.div
              key={role._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card group"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Organization Logo */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-bg-secondary rounded-lg flex items-center justify-center">
                    <Users className="w-10 h-10 text-text-secondary" />
                  </div>
                </div>

                {/* Leadership Details */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary group-hover:text-accent-blue transition-colors duration-200">
                      {role.role}
                    </h3>
                    <div className="flex items-center space-x-4 text-text-secondary mt-1">
                      <span className="font-medium">{role.organization}</span>
                      {role.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{role.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(role.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                        {role.current ? ' Present' : new Date(role.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    {role.teamSize && (
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>Team: {role.teamSize}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-text-secondary leading-relaxed">
                    {role.description}
                  </p>

                  {/* Key Contributions */}
                  {role.keyContributions && role.keyContributions.length > 0 && (
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">Key Contributions:</h4>
                      <ul className="space-y-1">
                        {role.keyContributions.map((contribution, idx) => (
                          <li key={idx} className="text-text-secondary text-sm flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 bg-accent-purple rounded-full mt-2 flex-shrink-0"></span>
                            <span>{contribution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Skills Used */}
                  {role.skills && role.skills.length > 0 && (
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">Skills Applied:</h4>
                      <div className="flex flex-wrap gap-2">
                        {role.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-bg-secondary text-text-secondary text-sm rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Impact */}
                  {role.impact && (
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">Impact:</h4>
                      <p className="text-text-secondary text-sm">
                        {role.impact}
                      </p>
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

export default LeadershipSection
