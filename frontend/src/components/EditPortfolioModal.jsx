import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Edit, Trash2, Save, Image as ImageIcon, Upload, Eye, User, Rocket, Briefcase, Zap, GraduationCap, Trophy, Crown } from 'lucide-react'
import { usePortfolioStore } from '../stores/portfolioStore'
import { useModalStore } from '../stores/modalStore'
import toast from 'react-hot-toast'
import api from '../utils/api'

const EditPortfolioModal = () => {
  const [activeTab, setActiveTab] = useState('hero')
  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { 
    isEditResumeModalOpen, 
    closeEditResumeModal,
    selectedProject,
    selectedExperience 
  } = useModalStore()
  
  const {
    hero,
    projects,
    experience,
    skills,
    education,
    achievements,
    leadership,
    isLoading,
    errors,
    fetchHero,
    fetchProjects,
    fetchExperience,
    fetchSkills,
    fetchEducation,
    fetchAchievements,
    fetchLeadership,
    updateHero,
    addProject,
    updateProject,
    deleteProject,
    addExperience,
    updateExperience,
    deleteExperience,
    addSkill,
    updateSkill,
    deleteSkill,
    addEducation,
    updateEducation,
    deleteEducation,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    addLeadership,
    updateLeadership,
    deleteLeadership
  } = usePortfolioStore()

  // Load data when modal opens
  useEffect(() => {
    if (isEditResumeModalOpen) {
      fetchHero()
      fetchProjects()
      fetchExperience()
      fetchSkills()
      fetchEducation()
      fetchAchievements()
      fetchLeadership()
    }
  }, [isEditResumeModalOpen])

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Handle array field changes (like technologies)
  const handleArrayFieldChange = (field, value) => {
    const arrayValue = value.split(',').map(item => item.trim()).filter(item => item)
    setFormData(prev => ({ ...prev, [field]: arrayValue }))
  }

  // Start editing an item
  const startEditing = (item, type) => {
    // Prepare the item data for editing
    const itemData = { ...item }
    
    // Convert arrays to strings for form inputs
    if (itemData.technologies && Array.isArray(itemData.technologies)) {
      itemData.technologies = itemData.technologies.join(', ')
    }
    if (itemData.achievements && Array.isArray(itemData.achievements)) {
      itemData.achievements = itemData.achievements.join(', ')
    }
    if (itemData.keyContributions && Array.isArray(itemData.keyContributions)) {
      itemData.keyContributions = itemData.keyContributions.join(', ')
    }
    if (itemData.skills && Array.isArray(itemData.skills)) {
      itemData.skills = itemData.skills.join(', ')
    }
    
    setEditingItem({ ...item, type })
    setFormData(itemData)
    setIsEditing(true)
  }

  // Cancel editing
  const cancelEditing = () => {
    setIsEditing(false)
    setEditingItem(null)
    setFormData({})
  }

  // Validate form data
  const validateFormData = (type, data) => {
    const errors = []
    
    if (type === 'hero') {
      if (!data.name?.trim()) errors.push('Name is required')
      if (!data.title?.trim()) errors.push('Title is required')
      if (!data.summary?.trim()) errors.push('Summary is required')
      if (!data.email?.trim()) errors.push('Email is required')
    } else if (type === 'project') {
      if (!data.title?.trim()) errors.push('Project title is required')
      if (!data.description?.trim()) errors.push('Project description is required')
      if (!data.summary?.trim()) errors.push('Project summary is required')
    } else if (type === 'experience') {
      if (!data.company?.trim()) errors.push('Company name is required')
      if (!data.position?.trim()) errors.push('Position is required')
      if (!data.description?.trim()) errors.push('Job description is required')
      if (!data.startDate) errors.push('Start date is required')
    } else if (type === 'education') {
      if (!data.institution?.trim()) errors.push('Institution name is required')
      if (!data.degree?.trim()) errors.push('Degree is required')
      if (!data.field?.trim()) errors.push('Field of study is required')
      if (!data.startDate) errors.push('Start date is required')
      if (!data.endDate) errors.push('End date is required')
    } else if (type === 'achievement') {
      if (!data.title?.trim()) errors.push('Achievement title is required')
      if (!data.description?.trim()) errors.push('Achievement description is required')
      if (!data.date) errors.push('Achievement date is required')
    } else if (type === 'leadership') {
      if (!data.role?.trim()) errors.push('Leadership role is required')
      if (!data.organization?.trim()) errors.push('Organization name is required')
      if (!data.description?.trim()) errors.push('Role description is required')
      if (!data.startDate) errors.push('Start date is required')
    }
    
    // Validate URLs if they are provided
    if (data.liveUrl && data.liveUrl.trim() && !data.liveUrl.startsWith('http')) {
      errors.push('Live URL must start with http:// or https://')
    }
    if (data.githubUrl && data.githubUrl.trim() && !data.githubUrl.startsWith('http')) {
      errors.push('GitHub URL must start with http:// or https://')
    }
    
    return errors
  }

  // Save changes
  const saveChanges = async () => {
    if (!editingItem) return
    
    // Validate form data
    const validationErrors = validateFormData(editingItem.type, formData)
    if (validationErrors.length > 0) {
      toast.error(validationErrors[0])
      return
    }
    
    setIsSubmitting(true)
    try {
      const { type, _id } = editingItem
      
      // Prepare data for API
      const apiData = { ...formData }
      
      // Convert string fields back to arrays where needed
      if (apiData.technologies && typeof apiData.technologies === 'string') {
        apiData.technologies = apiData.technologies.split(',').map(item => item.trim()).filter(item => item)
      }
      if (apiData.achievements && typeof apiData.achievements === 'string') {
        apiData.achievements = apiData.achievements.split(',').map(item => item.trim()).filter(item => item)
      }
      if (apiData.keyContributions && typeof apiData.keyContributions === 'string') {
        apiData.keyContributions = apiData.keyContributions.split(',').map(item => item.trim()).filter(item => item)
      }
      if (apiData.skills && typeof apiData.skills === 'string') {
        apiData.skills = apiData.skills.split(',').map(item => item.trim()).filter(item => item)
      }
      
      // Handle empty URL fields - convert empty strings to null/undefined
      if (apiData.liveUrl === '') {
        delete apiData.liveUrl
      }
      if (apiData.githubUrl === '') {
        delete apiData.githubUrl
      }
      
      // Handle dates for experience
      if (type === 'experience') {
        if (apiData.startDate) {
          apiData.startDate = new Date(apiData.startDate).toISOString()
        }
        if (apiData.endDate && !apiData.current) {
          apiData.endDate = new Date(apiData.endDate).toISOString()
        }
        if (apiData.current) {
          apiData.endDate = null
        }
      }
      
      // Handle dates for education
      if (type === 'education') {
        if (apiData.startDate) {
          apiData.startDate = new Date(apiData.startDate).toISOString()
        }
        if (apiData.endDate) {
          apiData.endDate = new Date(apiData.endDate).toISOString()
        }
      }
      
      // Handle dates for achievement
      if (type === 'achievement') {
        if (apiData.date) {
          apiData.date = new Date(apiData.date).toISOString()
        }
      }
      
      // Handle dates for leadership
      if (type === 'leadership') {
        if (apiData.startDate) {
          apiData.startDate = new Date(apiData.startDate).toISOString()
        }
        if (apiData.endDate && !apiData.current) {
          apiData.endDate = new Date(apiData.endDate).toISOString()
        }
        if (apiData.current) {
          apiData.endDate = null
        }
      }
      
      if (type === 'hero') {
        // Remove _id, isActive, createdAt, updatedAt, __v before sending to backend (not allowed by validation)
        const { _id, isActive, createdAt, updatedAt, __v, ...heroData } = apiData;
        await updateHero(heroData)
        toast.success('Hero section updated successfully!')
      } else if (type === 'project') {
        if (_id) {
          await updateProject(_id, apiData)
          toast.success('Project updated successfully!')
        } else {
          await addProject(apiData)
          toast.success('Project added successfully!')
        }
      } else if (type === 'experience') {
        if (_id) {
          await updateExperience(_id, apiData)
          toast.success('Experience updated successfully!')
        } else {
          await addExperience(apiData)
          toast.success('Experience added successfully!')
        }
      } else if (type === 'skill') {
        if (_id) {
          await updateSkill(_id, apiData)
          toast.success('Skill updated successfully!')
        } else {
          await addSkill(apiData)
          toast.success('Skill added successfully!')
        }
      } else if (type === 'education') {
        if (_id) {
          await updateEducation(_id, apiData)
          toast.success('Education updated successfully!')
        } else {
          await addEducation(apiData)
          toast.success('Education added successfully!')
        }
      } else if (type === 'achievement') {
        if (_id) {
          await updateAchievement(_id, apiData)
          toast.success('Achievement updated successfully!')
        } else {
          await addAchievement(apiData)
          toast.success('Achievement added successfully!')
        }
      } else if (type === 'leadership') {
        if (_id) {
          await updateLeadership(_id, apiData)
          toast.success('Leadership updated successfully!')
        } else {
          await addLeadership(apiData)
          toast.success('Leadership added successfully!')
        }
      }
      
      cancelEditing()
    } catch (error) {
      console.error('Error saving:', error)
      const errorMessage = error.response?.data?.message || 'Failed to save changes. Please try again.'
      toast.error(errorMessage)
      
      // Log detailed error for debugging
      if (error.response?.data) {
        console.log('API Error Details:', error.response.data)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Delete an item
  const handleDelete = async (id, type) => {
    if (!confirm('Are you sure you want to delete this item?')) return
    
    try {
      if (type === 'project') await deleteProject(id)
      else if (type === 'experience') await deleteExperience(id)
      else if (type === 'skill') await deleteSkill(id)
      else if (type === 'education') await deleteEducation(id)
      else if (type === 'achievement') await deleteAchievement(id)
      else if (type === 'leadership') await deleteLeadership(id)
      
      toast.success('Item deleted successfully!')
    } catch (error) {
      console.error('Error deleting:', error)
      toast.error('Failed to delete item. Please try again.')
    }
  }

  // Add new item
  const addNewItem = (type) => {
    setEditingItem({ type })
    setFormData({})
    setIsEditing(true)
  }

  const tabs = [
    { id: 'hero', label: 'Hero Section', icon: 'User' },
    { id: 'projects', label: 'Projects', icon: 'Rocket' },
    { id: 'experience', label: 'Experience', icon: 'Briefcase' },
    { id: 'skills', label: 'Skills', icon: 'Zap' },
    { id: 'education', label: 'Education', icon: 'GraduationCap' },
    { id: 'achievements', label: 'Achievements', icon: 'Trophy' },
    { id: 'leadership', label: 'Leadership', icon: 'Crown' }
  ]

  const renderHeroForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Name</label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="Your full name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Title</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="Your professional title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Summary</label>
        <textarea
          value={formData.summary || ''}
          onChange={(e) => handleInputChange('summary', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="Brief summary about yourself"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Email</label>
        <input
          type="email"
          value={formData.email || ''}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="your.email@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Phone</label>
        <input
          type="tel"
          value={formData.phone || ''}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="+1 (555) 123-4567"
        />
      </div>
    </div>
  )

  const renderProjectForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Title *</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="Project title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Summary *</label>
        <input
          type="text"
          value={formData.summary || ''}
          onChange={(e) => handleInputChange('summary', e.target.value)}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="Brief project summary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Description *</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="Detailed project description"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Technologies</label>
        <input
          type="text"
          value={formData.technologies || ''}
          onChange={(e) => handleArrayFieldChange('technologies', e.target.value)}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="React, Node.js, MongoDB (comma separated)"
        />
        <p className="text-xs text-text-secondary mt-1">Separate multiple technologies with commas</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">GitHub URL</label>
        <input
          type="url"
          value={formData.githubUrl || ''}
          onChange={(e) => handleInputChange('githubUrl', e.target.value)}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="https://github.com/username/project (optional)"
        />
        <p className="text-xs text-text-secondary mt-1">Leave empty if no GitHub repository</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Live URL</label>
        <input
          type="url"
          value={formData.liveUrl || ''}
          onChange={(e) => handleInputChange('liveUrl', e.target.value)}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="https://project-demo.com (optional)"
        />
        <p className="text-xs text-text-secondary mt-1">Leave empty if no live demo</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Category</label>
        <select
          value={formData.category || 'web'}
          onChange={(e) => handleInputChange('category', e.target.value)}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
        >
          <option value="web">Web Development</option>
          <option value="mobile">Mobile Development</option>
          <option value="ai">AI/ML</option>
          <option value="blockchain">Blockchain</option>
          <option value="devops">DevOps</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-text-primary mb-2">Team Size</label>
          <input
            type="number"
            value={formData.teamSize || 1}
            onChange={(e) => handleInputChange('teamSize', parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
            min="1"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-text-primary mb-2">Duration</label>
          <input
            type="text"
            value={formData.duration || ''}
            onChange={(e) => handleInputChange('duration', e.target.value)}
            className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
            placeholder="e.g., 3 months"
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured || false}
          onChange={(e) => handleInputChange('featured', e.target.checked)}
          className="w-4 h-4 text-accent-blue bg-bg-secondary border-border-color rounded focus:ring-accent-blue"
        />
        <label htmlFor="featured" className="text-sm text-text-primary">
          Featured Project
        </label>
      </div>
    </div>
  )

  const renderExperienceForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Company *</label>
        <input
          type="text"
          value={formData.company || ''}
          onChange={(e) => handleInputChange('company', e.target.value)}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="Company name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Position *</label>
        <input
          type="text"
          value={formData.position || ''}
          onChange={(e) => handleInputChange('position', e.target.value)}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="Job title"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Start Date *</label>
          <input
            type="date"
            value={formData.startDate || ''}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">End Date</label>
          <input
            type="date"
            value={formData.endDate || ''}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
            className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
            disabled={formData.current}
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="current"
          checked={formData.current || false}
          onChange={(e) => handleInputChange('current', e.target.checked)}
          className="w-4 h-4 text-accent-blue bg-bg-secondary border-border-color rounded focus:ring-accent-blue"
        />
        <label htmlFor="current" className="text-sm text-text-primary">
          Current Position
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Location</label>
        <input
          type="text"
          value={formData.location || ''}
          onChange={(e) => handleInputChange('location', e.target.value)}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="City, Country (optional)"
        />
        <p className="text-xs text-text-secondary mt-1">e.g., New York, USA or Remote</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Description *</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="Detailed job description and responsibilities"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Technologies</label>
        <input
          type="text"
          value={formData.technologies || ''}
          onChange={(e) => handleArrayFieldChange('technologies', e.target.value)}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="React, Node.js, Docker (comma separated)"
        />
        <p className="text-xs text-text-secondary mt-1">Separate multiple technologies with commas</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Achievements</label>
        <textarea
          value={formData.achievements || ''}
          onChange={(e) => handleArrayFieldChange('achievements', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="Key achievements and accomplishments (comma separated)"
        />
        <p className="text-xs text-text-secondary mt-1">Separate multiple achievements with commas</p>
      </div>
    </div>
  )

  const renderEducationForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Institution *</label>
        <input
          type="text"
          value={formData.institution || ''}
          onChange={(e) => handleInputChange('institution', e.target.value)}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="University/College name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Degree *</label>
        <input
          type="text"
          value={formData.degree || ''}
          onChange={(e) => handleInputChange('degree', e.target.value)}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="e.g., Bachelor of Technology"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Field of Study *</label>
        <input
          type="text"
          value={formData.field || ''}
          onChange={(e) => handleInputChange('field', e.target.value)}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="e.g., Computer Science"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Start Date *</label>
          <input
            type="date"
            value={formData.startDate || ''}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">End Date *</label>
          <input
            type="date"
            value={formData.endDate || ''}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
            className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">GPA</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="10"
            value={formData.gpa || ''}
            onChange={(e) => handleInputChange('gpa', parseFloat(e.target.value))}
            className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
            placeholder="e.g., 8.33"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Percentage</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="100"
            value={formData.percentage || ''}
            onChange={(e) => handleInputChange('percentage', parseFloat(e.target.value))}
            className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
            placeholder="e.g., 87.47"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Location</label>
        <input
          type="text"
          value={formData.location || ''}
          onChange={(e) => handleInputChange('location', e.target.value)}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="e.g., Ahmedabad, Gujarat"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Description</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="Brief description of your education"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Achievements</label>
        <textarea
          value={formData.achievements || ''}
          onChange={(e) => handleArrayFieldChange('achievements', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="Academic achievements (comma separated)"
        />
        <p className="text-xs text-text-secondary mt-1">Separate multiple achievements with commas</p>
      </div>
    </div>
  )

  const renderAchievementForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Title *</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="Achievement title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Description *</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="Detailed description of the achievement"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Category</label>
        <select
          value={formData.category || 'other'}
          onChange={(e) => handleInputChange('category', e.target.value)}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
        >
          <option value="academic">Academic</option>
          <option value="hackathon">Hackathon</option>
          <option value="competition">Competition</option>
          <option value="certification">Certification</option>
          <option value="publication">Publication</option>
          <option value="leadership">Leadership</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Date *</label>
        <input
          type="date"
          value={formData.date || ''}
          onChange={(e) => handleInputChange('date', e.target.value)}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Organization</label>
        <input
          type="text"
          value={formData.organization || ''}
          onChange={(e) => handleInputChange('organization', e.target.value)}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="e.g., Nirma University"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Participants</label>
          <input
            type="number"
            min="1"
            value={formData.participants || ''}
            onChange={(e) => handleInputChange('participants', parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
            placeholder="e.g., 250"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Rank</label>
          <input
            type="number"
            min="1"
            value={formData.rank || ''}
            onChange={(e) => handleInputChange('rank', parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
            placeholder="e.g., 2"
          />
        </div>
      </div>
    </div>
  )

  const renderLeadershipForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Role *</label>
        <input
          type="text"
          value={formData.role || ''}
          onChange={(e) => handleInputChange('role', e.target.value)}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="e.g., Technical Head"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Organization *</label>
        <input
          type="text"
          value={formData.organization || ''}
          onChange={(e) => handleInputChange('organization', e.target.value)}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="e.g., Cybersecurity Club"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Start Date *</label>
          <input
            type="date"
            value={formData.startDate || ''}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">End Date</label>
          <input
            type="date"
            value={formData.endDate || ''}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
            className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
            disabled={formData.current}
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="current"
          checked={formData.current || false}
          onChange={(e) => handleInputChange('current', e.target.checked)}
          className="w-4 h-4 text-accent-blue bg-bg-secondary border-border-color rounded focus:ring-accent-blue"
        />
        <label htmlFor="current" className="text-sm text-text-primary">
          Current Position
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Description *</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="Detailed description of your role and responsibilities"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Key Contributions</label>
        <textarea
          value={formData.keyContributions || ''}
          onChange={(e) => handleArrayFieldChange('keyContributions', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="Key contributions and initiatives (comma separated)"
        />
        <p className="text-xs text-text-secondary mt-1">Separate multiple contributions with commas</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Team Size</label>
        <input
          type="number"
          min="1"
          value={formData.teamSize || 1}
          onChange={(e) => handleInputChange('teamSize', parseInt(e.target.value))}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Impact</label>
        <textarea
          value={formData.impact || ''}
          onChange={(e) => handleInputChange('impact', e.target.value)}
          rows={2}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="Impact of your leadership"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Skills Applied</label>
        <input
          type="text"
          value={formData.skills || ''}
          onChange={(e) => handleArrayFieldChange('skills', e.target.value)}
          className="w-full px-3 py-2 bg-bg-secondary border border-border-color rounded-lg text-text-primary"
          placeholder="Skills used in this role (comma separated)"
        />
        <p className="text-xs text-text-secondary mt-1">Separate multiple skills with commas</p>
      </div>
    </div>
  )

  const renderContentList = (items, type, renderItem) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-text-primary capitalize">{type}</h3>
        <button
          onClick={() => addNewItem(type)}
          className="flex items-center space-x-2 px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New</span>
        </button>
      </div>
      
      {isLoading[type] ? (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-2 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-text-secondary mt-2">Loading...</p>
        </div>
      ) : items && items.length > 0 ? (
        <div className="space-y-3">
          {items.map((item) => renderItem(item))}
        </div>
      ) : (
        <div className="text-center py-8 text-text-secondary">
          <p>No {type} found. Click "Add New" to create one.</p>
        </div>
      )}
    </div>
  )

  const renderProjectItem = (project) => (
    <div key={project._id} className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg border border-border-color">
      <div className="flex-1">
        <h4 className="font-medium text-text-primary">{project.title}</h4>
        <p className="text-sm text-text-secondary">{project.summary}</p>
        {project.category && (
          <span className="inline-block px-2 py-1 bg-accent-blue/20 text-accent-blue text-xs rounded-full mt-1">
            {project.category}
          </span>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => startEditing(project, 'project')}
          className="p-2 text-accent-blue hover:bg-accent-blue/10 rounded-lg transition-colors"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleDelete(project._id, 'project')}
          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )

  const renderExperienceItem = (exp) => (
    <div key={exp._id} className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg border border-border-color">
      <div className="flex-1">
        <h4 className="font-medium text-text-primary">{exp.position} at {exp.company}</h4>
        <p className="text-sm text-text-secondary">
          {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
          {exp.current ? ' Present' : new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </p>
        {exp.location && (
          <p className="text-xs text-text-secondary">{exp.location}</p>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => startEditing(exp, 'experience')}
          className="p-2 text-accent-blue hover:bg-accent-blue/10 rounded-lg transition-colors"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleDelete(exp._id, 'experience')}
          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )

  const renderEducationItem = (edu) => (
    <div key={edu._id} className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg border border-border-color">
      <div className="flex-1">
        <h4 className="font-medium text-text-primary">{edu.degree} in {edu.field}</h4>
        <p className="text-sm text-text-secondary">{edu.institution}</p>
        <p className="text-xs text-text-secondary">
          {new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
          {new Date(edu.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </p>
        {edu.gpa && (
          <p className="text-xs text-text-secondary">GPA: {edu.gpa}</p>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => startEditing(edu, 'education')}
          className="p-2 text-accent-blue hover:bg-accent-blue/10 rounded-lg transition-colors"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleDelete(edu._id, 'education')}
          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )

  const renderAchievementItem = (achievement) => (
    <div key={achievement._id} className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg border border-border-color">
      <div className="flex-1">
        <h4 className="font-medium text-text-primary">{achievement.title}</h4>
        <p className="text-sm text-text-secondary">{achievement.description}</p>
        <p className="text-xs text-text-secondary">
          {new Date(achievement.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
        {achievement.category && (
          <span className="inline-block px-2 py-1 bg-accent-yellow/20 text-accent-yellow text-xs rounded-full mt-1">
            {achievement.category}
          </span>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => startEditing(achievement, 'achievement')}
          className="p-2 text-accent-blue hover:bg-accent-blue/10 rounded-lg transition-colors"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleDelete(achievement._id, 'achievement')}
          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )

  const renderLeadershipItem = (leadership) => (
    <div key={leadership._id} className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg border border-border-color">
      <div className="flex-1">
        <h4 className="font-medium text-text-primary">{leadership.role}</h4>
        <p className="text-sm text-text-secondary">{leadership.organization}</p>
        <p className="text-xs text-text-secondary">
          {new Date(leadership.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
          {leadership.current ? ' Present' : new Date(leadership.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => startEditing(leadership, 'leadership')}
          className="p-2 text-accent-blue hover:bg-accent-blue/10 rounded-lg transition-colors"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleDelete(leadership._id, 'leadership')}
          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )

  return (
    <AnimatePresence>
      {isEditResumeModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="w-full max-w-6xl h-[90vh] bg-bg-card border border-border-color rounded-xl shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border-color">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">Edit Portfolio</h2>
                <p className="text-text-secondary">Manage your portfolio content</p>
              </div>
              <button
                onClick={closeEditResumeModal}
                className="p-2 hover:bg-bg-secondary rounded-lg transition-colors duration-200"
              >
                <X className="w-6 h-6 text-text-secondary" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar Tabs */}
              <div className="w-64 bg-bg-secondary border-r border-border-color p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const IconComponent = {
                      'User': User,
                      'Rocket': Rocket,
                      'Briefcase': Briefcase,
                      'Zap': Zap,
                      'GraduationCap': GraduationCap,
                      'Trophy': Trophy,
                      'Crown': Crown
                    }[tab.icon]
                    
                    return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-accent-blue text-white'
                          : 'text-text-secondary hover:bg-bg-primary hover:text-text-primary'
                      }`}
                    >
                        <IconComponent className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                    )
                  })}
                </nav>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                {isEditing ? (
                  // Edit Form
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-text-primary">
                        {editingItem._id ? 'Edit' : 'Add New'} {editingItem.type}
                      </h3>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={cancelEditing}
                          className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={saveChanges}
                          disabled={isSubmitting}
                          className="px-6 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 disabled:opacity-50 transition-colors"
                        >
                          {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                      </div>
                    </div>

                    {editingItem.type === 'hero' && renderHeroForm()}
                    {editingItem.type === 'project' && renderProjectForm()}
                    {editingItem.type === 'experience' && renderExperienceForm()}
                    {editingItem.type === 'education' && renderEducationForm()}
                    {editingItem.type === 'achievement' && renderAchievementForm()}
                    {editingItem.type === 'leadership' && renderLeadershipForm()}
                  </div>
                ) : (
                  // Content Display
                  <div>
                    {activeTab === 'hero' && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-semibold text-text-primary">Hero Section</h3>
                          <button
                            onClick={() => startEditing(hero, 'hero')}
                            className="flex items-center space-x-2 px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Edit Hero</span>
                          </button>
                        </div>
                        {hero && (
                          <div className="p-4 bg-bg-secondary rounded-lg border border-border-color">
                            <h4 className="font-medium text-text-primary">{hero.name}</h4>
                            <p className="text-text-secondary">{hero.title}</p>
                            <p className="text-text-secondary mt-2">{hero.summary}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'projects' && renderContentList(projects, 'projects', renderProjectItem)}
                    {activeTab === 'experience' && renderContentList(experience, 'experience', renderExperienceItem)}
                    {activeTab === 'education' && renderContentList(education, 'education', renderEducationItem)}
                    {activeTab === 'achievements' && renderContentList(achievements, 'achievements', renderAchievementItem)}
                    {activeTab === 'leadership' && renderContentList(leadership, 'leadership', renderLeadershipItem)}
                    {activeTab === 'skills' && <div className="text-center py-8 text-text-secondary">Skills management coming soon...</div>}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default EditPortfolioModal
