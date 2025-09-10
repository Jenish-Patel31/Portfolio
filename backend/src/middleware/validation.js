const Joi = require('joi');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return res.status(400).json({
        status: 'error',
        message: `Validation error: ${errorMessage}`
      });
    }
    
    next();
  };
};

// Validation schemas
const authSchemas = {
  login: Joi.object({
    username: Joi.string().required().messages({
      'string.empty': 'Username is required',
      'any.required': 'Username is required'
    }),
    password: Joi.string().required().min(6).messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters long',
      'any.required': 'Password is required'
    })
  }),
  
  register: Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
      'string.empty': 'Username is required',
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username cannot exceed 30 characters',
      'any.required': 'Username is required'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Please enter a valid email address',
      'string.empty': 'Email is required',
      'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters long',
      'any.required': 'Password is required'
    })
  })
};

const portfolioSchemas = {
  experience: Joi.object({
    // _id: Joi.string().optional(),
    company: Joi.string().required().max(200).messages({
      'string.empty': 'Company name is required',
      'string.max': 'Company name cannot exceed 200 characters',
      'any.required': 'Company name is required'
    }),
    position: Joi.string().required().max(200).messages({
      'string.empty': 'Position is required',
      'string.max': 'Position cannot exceed 200 characters',
      'any.required': 'Position is required'
    }),
    startDate: Joi.date().required().messages({
      'any.required': 'Start date is required'
    }),
    endDate: Joi.date().optional(),
    current: Joi.boolean().optional(),
    description: Joi.string().required().max(2000).messages({
      'string.empty': 'Job description is required',
      'string.max': 'Description cannot exceed 2000 characters',
      'any.required': 'Job description is required'
    }),
    achievements: Joi.array().items(Joi.string().max(300)).optional(),
    technologies: Joi.array().items(Joi.string().max(50)).optional(),
    location: Joi.string().max(200).optional()
  }),
  
  education: Joi.object({
    _id: Joi.string().optional(),
    institution: Joi.string().required().max(200).messages({
      'string.empty': 'Institution name is required',
      'string.max': 'Institution name cannot exceed 200 characters',
      'any.required': 'Institution name is required'
    }),
    degree: Joi.string().required().max(200).messages({
      'string.empty': 'Degree is required',
      'string.max': 'Degree cannot exceed 200 characters',
      'any.required': 'Degree is required'
    }),
    field: Joi.string().required().max(200).messages({
      'string.empty': 'Field of study is required',
      'string.max': 'Field cannot exceed 200 characters',
      'any.required': 'Field of study is required'
    }),
    startDate: Joi.date().required().messages({
      'any.required': 'Start date is required'
    }),
    endDate: Joi.date().required().messages({
      'any.required': 'End date is required'
    }),
    gpa: Joi.number().min(0).max(10).optional(),
    percentage: Joi.number().min(0).max(100).optional(),
    description: Joi.string().max(1000).optional(),
    location: Joi.string().max(200).optional(),
    achievements: Joi.array().items(Joi.string().max(300)).optional()
  }),
  
  achievement: Joi.object({
    _id: Joi.string().optional(),
    title: Joi.string().required().max(200).messages({
      'string.empty': 'Achievement title is required',
      'string.max': 'Title cannot exceed 200 characters',
      'any.required': 'Achievement title is required'
    }),
    description: Joi.string().required().max(1000).messages({
      'string.empty': 'Achievement description is required',
      'string.max': 'Description cannot exceed 1000 characters',
      'any.required': 'Achievement description is required'
    }),
    category: Joi.string().valid('academic', 'hackathon', 'competition', 'certification', 'publication', 'leadership', 'other').optional(),
    date: Joi.date().required().messages({
      'any.required': 'Achievement date is required'
    }),
    organization: Joi.string().max(200).optional(),
    participants: Joi.number().min(1).optional(),
    rank: Joi.number().min(1).optional()
  }),
  
  leadership: Joi.object({
    _id: Joi.string().optional(),
    role: Joi.string().required().max(200).messages({
      'string.empty': 'Leadership role is required',
      'string.max': 'Role cannot exceed 200 characters',
      'any.required': 'Leadership role is required'
    }),
    organization: Joi.string().required().max(200).messages({
      'string.empty': 'Organization name is required',
      'string.max': 'Organization name cannot exceed 200 characters',
      'any.required': 'Organization name is required'
    }),
    startDate: Joi.date().required().messages({
      'any.required': 'Start date is required'
    }),
    endDate: Joi.date().optional(),
    current: Joi.boolean().optional(),
    description: Joi.string().required().max(2000).messages({
      'string.empty': 'Role description is required',
      'string.max': 'Description cannot exceed 2000 characters',
      'any.required': 'Role description is required'
    }),
    keyContributions: Joi.array().items(Joi.string().max(300)).optional(),
    teamSize: Joi.number().min(1).optional(),
    impact: Joi.string().max(500).optional(),
  skills: Joi.array().items(Joi.string()).optional()
  }),
  hero: Joi.object({
    name: Joi.string().required().max(100).messages({
      'string.empty': 'Name is required',
      'string.max': 'Name cannot exceed 100 characters',
      'any.required': 'Name is required'
    }),
    title: Joi.string().required().max(200).messages({
      'string.empty': 'Professional title is required',
      'string.max': 'Title cannot exceed 200 characters',
      'any.required': 'Professional title is required'
    }),
    summary: Joi.string().required().max(1000).messages({
      'string.empty': 'Professional summary is required',
      'string.max': 'Summary cannot exceed 1000 characters',
      'any.required': 'Professional summary is required'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Please enter a valid email address',
      'string.empty': 'Email is required',
      'any.required': 'Email is required'
    }),
    phone: Joi.string().max(20).optional(),
    location: Joi.string().max(200).optional(),
    socialLinks: Joi.object({
      github: Joi.string().uri().allow('').optional(),
      linkedin: Joi.string().uri().allow('').optional(),
      leetcode: Joi.string().uri().allow('').optional(),
      portfolio: Joi.string().uri().allow('').optional()
    }).optional()
  }),
  
  project: Joi.object({
    _id: Joi.string().optional(),
    title: Joi.string().required().max(200).messages({
      'string.empty': 'Project title is required',
      'string.max': 'Title cannot exceed 200 characters',
      'any.required': 'Project title is required'
    }),
    description: Joi.string().required().max(2000).messages({
      'string.empty': 'Project description is required',
      'string.max': 'Description cannot exceed 2000 characters',
      'any.required': 'Project description is required'
    }),
    summary: Joi.string().required().max(500).messages({
      'string.empty': 'Project summary is required',
      'string.max': 'Summary cannot exceed 500 characters',
      'any.required': 'Project summary is required'
    }),
  technologies: Joi.array().items(Joi.string().max(50)).optional(),
  image: Joi.string().uri().allow('').optional(),
  liveUrl: Joi.string().uri().allow('').optional(),
  githubUrl: Joi.string().uri().allow('').optional(),
  featured: Joi.boolean().optional(),
  order: Joi.number().integer().min(0).optional(),
  category: Joi.string().valid('web', 'mobile', 'ai', 'blockchain', 'devops', 'other').optional(),
  teamSize: Joi.number().integer().min(1).optional(),
  duration: Joi.string().max(100).optional(),
  achievements: Joi.array().items(Joi.string().max(200)).optional()
  })
};

module.exports = {
  validate,
  authSchemas,
  portfolioSchemas
};
