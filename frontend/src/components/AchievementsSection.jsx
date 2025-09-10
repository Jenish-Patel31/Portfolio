import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Calendar, Award, Users } from 'lucide-react'
import { usePortfolioStore } from '../stores/portfolioStore'

const AchievementsSection = () => {
  const { achievements, fetchAchievements, isLoading } = usePortfolioStore()

  useEffect(() => {
    fetchAchievements()
  }, [fetchAchievements])

  if (isLoading.achievements) {
    return (
  <section id="achievements" className="py-10 px-4">
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
                <div className="h-48 bg-bg-card rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
  <section id="achievements" className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <span className="gradient-text">Achievements</span> & Recognition
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card group text-center"
            >
              {/* Achievement Icon */}
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent-yellow to-accent-orange flex items-center justify-center">
                <Trophy className="w-10 h-10 text-white" />
              </div>

              {/* Achievement Details */}
              <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent-yellow transition-colors duration-200">
                {achievement.title}
              </h3>
              
              <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                {achievement.description}
              </p>

              {/* Achievement Meta */}
              <div className="space-y-2 text-xs text-text-secondary">
                <div className="flex items-center justify-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(achievement.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
                
                {achievement.category && (
                  <div className="inline-block px-3 py-1 bg-bg-secondary text-text-secondary rounded-full">
                    {achievement.category}
                  </div>
                )}

                {achievement.organization && (
                  <div className="text-text-secondary">
                    by {achievement.organization}
                  </div>
                )}

                {achievement.participants && (
                  <div className="flex items-center justify-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{achievement.participants} participants</span>
                  </div>
                )}

                {achievement.rank && (
                  <div className="inline-block px-3 py-1 bg-accent-yellow/20 text-accent-yellow rounded-full font-medium">
                    Rank: {achievement.rank}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AchievementsSection
